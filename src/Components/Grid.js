// Import necessary libraries, components and files
import { useState, useEffect } from "react";
import Node from "./Node";
import "./Grid.css";

// Set the size of the grid
const ROWS = 15;
const COLS = 40;
// Set the start and end nodes --> TODO: fetch values dynamically and allow user to choose start and end positions
const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const END_NODE_ROW = ROWS - 1;
const END_NODE_COL = COLS - 1;

// Create a node class - takes in row and column positions and holds extra key information
class node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isStart = this.row === START_NODE_ROW && this.col === START_NODE_COL; // Returns True if the node's row and column are the start node's row and column
    this.isEnd = this.row === END_NODE_ROW && this.col === END_NODE_COL; // Returns True if the node's row and column are the end node's row and column
  }
}

// Create a 'Grid' JSX component that can be exported and then imported into 'App.js' to be rendered
const Grid = () => {
  // Create a 'gridState' which is initialised as an empty array
  const [gridState, setGridState] = useState([]);

  // Initialise the grid before anything else is initialised/rendered onto the DOM
  useEffect(() => {
    initialiseGrid();
  }, []); // To avoid repeatedly running and exceeding the maximum update depth, an empty dependency array is added

  // Function to initialise the grid
  const initialiseGrid = () => {
    // Make an empty 2d 'gridArray' of size 'ROWS' x 'COLS'
    const gridArray = new Array(ROWS);
    for (let row = 0; row < ROWS; row++) {
      gridArray[row] = new Array(COLS);
    }

    // Populate 'gridArray' with nodes
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        gridArray[row][col] = new node(row, col);
      }
    }

    // Set the 'gridState' to the populated grid array
    setGridState(gridArray);
  };

  // Iterate through each node in 'gridState' (by mapping through the rows and then columns) and return the 'Node' JSX component from 'Node.js' to be rendered
  const renderGrid = gridState.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="row">
        {row.map((col, colIndex) => {
          const { isStart, isEnd } = col; // Get the 'isStart' and 'isEnd' values from the current node being looked at
          return (
            <Node
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              isStart={isStart}
              isEnd={isEnd}
            ></Node>
          );
        })}
      </div>
    );
  });

  // Return the grid component
  return (
    <div className="grid">
      <h1>Grid component</h1>
      {renderGrid}
    </div>
  );
};

export default Grid; // Allows for the 'Grid' component to be imported into 'App.js'
