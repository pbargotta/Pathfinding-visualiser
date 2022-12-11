// Import necessary files
import "./Node.css";

// Create a 'Node' component - takes in the nodes row and column position and if it is the end or start node
const Node = ({ row, col, isStart, isEnd }) => {
  const type = isStart ? "start" : isEnd ? "end" : ""; // Type = "start" or "end" if 'isStart' or 'isEnd' are True respectively else Type = "", indicating a normal node
  return <div className={`node ${type}`} id={`node-${row}-${col}`}></div>; // Gives each node a class name dependent the type of node they are (ie. "start", "end", "") and a unique id dependent on their position
};

export default Node;
