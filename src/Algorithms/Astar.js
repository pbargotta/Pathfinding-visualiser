// Calculate the f-score by finding the Euclidean distance between the current and target nodes - calculated using the pythagorean theorem
const calculateFScore = (currentNode, targetNode) => {
  return Math.sqrt(
    Math.pow(currentNode.row - targetNode.row, 2) +
      Math.pow(currentNode.col - targetNode.col, 2)
  );
};

// Iterate through the unvisited nodes and return the node with the lowest f-score
const getMinimumFScoreNode = (unvisited) => {
  let minimumFScoreValue = Infinity;
  for (let index = 0; index < unvisited.length; index++) {
    let node = unvisited[index];
    if (node.fScore < minimumFScoreValue) {
      minimumFScoreValue = node.fScore;
      var minimumFScoreNode = node;
    }
  }
  return minimumFScoreNode;
};

const aStar = (graph, startNode, targetNode) => {
  // Initialise the visited and unvisited lists
  let visited = [];
  let unvisited = [];

  // Add every node to the unvisited list
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      unvisited.push(graph[row][col]);
    }
  }

  // Update the f and g scores for the start node in the unvisited list
  startNode.fScore = calculateFScore(startNode);
  startNode.gScore = 0;

  // Repeat until there are no more nodes in the unvisited list
  while (unvisited.length > 0) {
    // Get the node with the minimum f-score in the unvisited list
    let currentNode = getMinimumFScoreNode(unvisited);

    // Check if the current node is the target node
    if (currentNode === targetNode) {
      // Add the current node to the visited list and break out of loop
      visited.push(currentNode);
      break;
    } else {
      // Get current node's neighbours, check if each has been visited and calculate a new g-score for each that have not been visited
      for (let neighbour in currentNode.neighbours) {
        if (!visited.include(neighbour)) {
          // The distance between neighbours is 1
          let newGScore = currentNode.gScore + 1;
          // Update neighbour's f and g scores and previous node if new cost is less than their current cost
          if (newGScore < neighbour.gScore) {
            neighbour.gScore = newGScore;
            neighbour.fScore =
              newGScore + calculateFScore(neighbour, targetNode);
            neighbour.previous = currentNode;
          }
        }
      }

      // Remove the current node from the unvisited list and into the visited list
      unvisited.splice(unvisited.indexOf(currentNode), 1);
      visited.push(currentNode);
    }
  }
};
