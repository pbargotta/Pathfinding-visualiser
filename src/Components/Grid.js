import { useState, useEffect } from "react";
import Node from "./Node";
import "./Grid.css";

// Set the size of the grid
const COLS = 40;
const ROWS = 15;

// Set the start and end nodes
const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = ROWS - 1;
const NODE_END_COL = COLS - 1;

// Create a component to initialise the Grid with each cell having the Node property
const Pathfind = () => {
  // Create a 'Grid' state to be rendered when this
  const [Grid, setGrid] = useState([]);

  useEffect(() => {
    initialiseGrid();
  }, []);

  const initialiseGrid = () => {
    // Make a 2d array 'grid' --> go through the number of rows wanted (indicated by the constant 'ROWS') and create a new array (indicating a column)
    const grid = new Array(ROWS);
    for (let row = 0; row < ROWS; row++) {
      grid[row] = new Array(COLS);
    }

    createSpot(grid);
    setGrid(grid);
  };

  const createSpot = (grid) => {
    // Look at each cell in the 2d array 'grid' and turn it into a node with information -->
    for (let row = 0; row < ROWS; row++) {
      grid[row] = new Array(COLS);
      for (let col = 0; col < COLS; col++) {
        grid[row][col] = new Spot(row, col);
      }
    }
  };

  // Spot constructor
  function Spot(row, col) {
    this.row = row;
    this.col = col;
    this.isStart = this.row === NODE_START_ROW && this.col === NODE_START_COL; // Cell is considered as the start if it is at the start node's row AND column
    this.isEnd = this.row === NODE_END_ROW && this.col === NODE_END_COL; // Cell is considered as the end if it is at the end node's row AND column
    this.gScore = 0;
    this.fScore = 0;
    this.hScore = 0;
  }

  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="wrapper">
      <h1>Pathfind component</h1>
      {gridWithNode}
    </div>
  );
};

export default Pathfind;
