// Import necessary libraries, components and files
import { useState, useEffect } from "react";
import Node from "./Node";
import dijkstras from "../Algorithms/Dijkstras";
import "./Grid.css";

// Set the size of the grid
const ROWS = 15;
const COLS = 40;
// Set the start and end nodes --> TODO: fetch values dynamically and allow user to choose start and end positions
const START_NODE_ROW = 3;
const START_NODE_COL = 5;
const END_NODE_ROW = 12;
const END_NODE_COL = 35;

// Create a node class - holds key information for each node that is needed for each algorithm
class node {
  constructor(row, col) {
    this.row = row; // Current nodes row position
    this.col = col; // Current nodes column position
    this.isStart = this.row === START_NODE_ROW && this.col === START_NODE_COL; // Returns True if the node's row and column match the start node's row and column
    this.isEnd = this.row === END_NODE_ROW && this.col === END_NODE_COL; // Returns True if the node's row and column match the end node's row and column
    this.isWall = false; // A node initially starts as a normal node and turns into a wall when the user clicks on it
    this.previous = null; // Immediate source of the current node
    this.neighbours = []; // Neighbours of the current node
    // Initialise variables specifically needed in Dijkstra's algorithm
    this.cost = Infinity; // Distance from the start to current node
    // Initialise variables specifically needed in the A star algorithm
    this.gScore = Infinity; // Distance from the start node to the current node
    this.fScore = Infinity; // Estimated distance from current to end node based on a heuristic + distance from the start to current node
  }

  // Create a class method to add the neighbours of a node to the ‘neighbours’ list
  addNeighbours(grid) {
    // Add the node ABOVE if the current node is not on the top row
    if (this.row > 0) {
      this.neighbours.push(grid[this.row - 1][this.col]);
    }
    // Add the node to the LEFT if the current node is not on the left wall
    if (this.col > 0) {
      this.neighbours.push(grid[this.row][this.col - 1]);
    }
    // Add the node UNDERNEATH if the current node is not on the bottom wall
    if (this.row < grid.length - 1) {
      this.neighbours.push(grid[this.row + 1][this.col]);
    }
    // Add the node to the RIGHT if the current node is not on the right wall
    if (this.col < grid[0].length - 1) {
      this.neighbours.push(grid[this.row][this.col + 1]);
    }
    // Add the node to the TOP-LEFT if the current node is not on the top or left wall
    if (this.row > 0 && this.col > 0) {
      this.neighbours.push(grid[this.row - 1][this.col - 1]);
    }
    // Add the node to the TOP-RIGHT if the current node is not on the top or right wall
    if (this.row > 0 && this.col < grid[0].length - 1) {
      this.neighbours.push(grid[this.row - 1][this.col + 1]);
    }
    // Add the node to the BOTTOM-LEFT if the current node is not on the bottom or left wall
    if (this.row < grid.length - 1 && this.col > 0) {
      this.neighbours.push(grid[this.row + 1][this.col - 1]);
    }
    // Add the node to the BOTTOM-RIGHT if the current node is not on the bottom or left wall
    if (this.row < grid.length - 1 && this.col < grid[0].length - 1) {
      this.neighbours.push(grid[this.row + 1][this.col + 1]);
    }
  }
}

// Convert the clciked node to and from a wall node (start and end nodes can not be converted into a wall)
export const convertWall = (clickedNode, node) => {
  let clickedNodeId = clickedNode.target.id;
  if (document.getElementById(clickedNodeId).className === "node ") {
    document.getElementById(clickedNodeId).className = "node wall";
    node.isWall = true;
  } else if (document.getElementById(clickedNodeId).className === "node wall") {
    document.getElementById(clickedNodeId).className = "node ";
    node.isWall = false;
  }
};

// Create a 'Grid' JSX component that can be exported and then imported into 'App.js' to be rendered
const Grid = () => {
  // Create a 'gridState' which is initialised as an empty array and is updated with the grid once populated
  const [gridState, setGridState] = useState([]);

  // Initialise the grid before anything else is initialised/rendered onto the DOM
  useEffect(() => {
    initialiseGrid();
  }, []); // To avoid repeatedly running and exceeding the maximum update depth, an empty dependency array is added

  // Function to initialise the grid
  const initialiseGrid = () => {
    // Make an empty 2d 'gridArray' of size 'ROWS' x 'COLS' and populate it with nodes
    const gridArray = new Array(ROWS);
    for (let row = 0; row < ROWS; row++) {
      gridArray[row] = new Array(COLS);
      for (let col = 0; col < COLS; col++) {
        gridArray[row][col] = new node(row, col);
      }
    }

    // Now that the grid is populated, add the neighbours to each node
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        gridArray[row][col].addNeighbours(gridArray);
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
          const { isStart, isEnd, isWall } = col; // Get the 'isStart' and 'isEnd' values from the current node being looked at
          return (
            <Node
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              isStart={isStart}
              isEnd={isEnd}
              isWall={isWall}
              node={gridState[rowIndex][colIndex]}
            ></Node>
          );
        })}
      </div>
    );
  });

  // Iterate through the final path, target each nodes, change their class name so it can be animated by the css
  const visualiseFinalPath = (finalPath) => {
    for (let index = 0; index < finalPath.length; index++) {
      setTimeout(() => {
        const currentNode = finalPath[index];
        document.getElementById(
          `${currentNode.row}-${currentNode.col}`
        ).className = "node final-path";
      }, 30 * index);
    }
  };

  // Iterate through the visited nodes, target each nodes, change their class name so it can be animated by the css and have a timeout so the animation can smoothly play
  const visualiseVisitedNodes = (visitedNodes, finalPath) => {
    for (let index = 0; index <= visitedNodes.length; index++) {
      if (index === visitedNodes.length) {
        setTimeout(() => {
          visualiseFinalPath(finalPath);
        }, 15 * index);
      } else {
        setTimeout(() => {
          const currentNode = visitedNodes[index];
          document.getElementById(
            `${currentNode.row}-${currentNode.col}`
          ).className = "node visited";
        }, 15 * index);
      }
    }
  };

  // Visualise Dijkstra's algorithm
  const visualiseDijkstras = () => {
    // Set the start and end nodes
    let startNode = gridState[START_NODE_ROW][START_NODE_COL];
    let endNode = gridState[END_NODE_ROW][END_NODE_COL];

    // Call the dijkstras function. It returns an object containing the final path and visited nodes lists as attributes
    let dijkstrasInfo = dijkstras(gridState, startNode, endNode);
    // Save the final path and visited nodes lists into separate variables
    let finalPath = dijkstrasInfo.finalPath;
    let visitedNodes = dijkstrasInfo.visited;

    visualiseVisitedNodes(visitedNodes, finalPath);
  };

  // Return the grid component
  return (
    <div className="grid">
      <hr></hr>
      <select name="algorithm" id="algorithm">
        <option value="Dijkstras">Select an Algorithm</option>
        <option value="A-star">A* Search</option>
        <option value="BFS">Breadth First</option>
        <option value="DFS">Depth First</option>
      </select>
      <h1 id="title">Pathfinding Visualiser</h1>
      <button onClick={visualiseDijkstras} id="play-button">
        PLAY
      </button>
      <hr></hr>
      <h1>Dijkstras algorithm</h1>
      {renderGrid}
    </div>
  );
};

export default Grid; // Allows for the 'Grid' component to be imported into 'App.js'
