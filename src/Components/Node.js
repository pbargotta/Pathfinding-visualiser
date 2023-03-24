// Import necessary files
import "./Node.css";
import { convertWall } from "./Grid";

// Create a 'Node' component - takes in the nodes row and column position and if it is the start or end node
const Node = ({ row, col, isStart, isEnd, node }) => {
  const type = isStart ? "start" : isEnd ? "end" : ""; // Type = "start" or "end" if 'isStart' or 'isEnd' are True respectively else Type = "", indicating a normal node
  return (
    <button
      onClick={(event) => convertWall(event, node)}
      className={`node ${type}`}
      id={`${row}-${col}`}
    ></button>
  ); // Gives each node a class name dependent the type of node they are (ie. "start", "end", or "") and a unique id dependent on their position
};

export default Node;
