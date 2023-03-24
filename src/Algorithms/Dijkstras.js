// Iterate through the unvisited nodes and return the node with the lowest cost
const getMinimumCostNode = (unvisited) => {
  let minimumCostValue = Infinity;
  for (let index = 0; index < unvisited.length; index++) {
    let node = unvisited[index];
    if (node.cost < minimumCostValue) {
      minimumCostValue = node.cost;
      var minimumCostNode = node;
    }
  }
  return minimumCostNode;
};

// Start at the end node and continuously look at a node’s previous value until the start node is reached, adding the current node to a final path list at each iteration
const constructFinalPath = (endNode) => {
  let finalPath = [];
  let currentNode = endNode;
  while (!currentNode.isStart) {
    finalPath.push(currentNode);
    currentNode = currentNode.previous;
  }
  finalPath.push(currentNode);
  return finalPath;
};

// Calculate the distance between two nodes by using the pythagorean theorem
const distanceBetweenNodes = (node1, node2) => {
  return Math.sqrt(
    Math.pow(node1.row - node2.row, 2) + Math.pow(node1.col - node2.col, 2)
  );
};

const dijkstras = (grid, startNode, targetNode) => {
  // Initialise the visited and unvisited lists
  let visited = [];
  let unvisited = [];

  // Add every node to the unvisited list
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      unvisited.push(grid[row][col]);
    }
  }

  // Update the cost for the start node
  startNode.cost = 0;

  // Repeat until there are no more nodes in the unvisited list
  while (unvisited.length > 0) {
    // Get the node with the minimum cost in the unvisited list
    let currentNode = getMinimumCostNode(unvisited);

    // Check if the current node is the target node
    if (currentNode === targetNode) {
      // Construct the final path and break out of loop
      var finalPath = constructFinalPath(currentNode);
      break;
    } else {
      // Iterate through current node's neighbours
      for (let index = 0; index < currentNode.neighbours.length; index++) {
        let neighbour = currentNode.neighbours[index];
        if (!neighbour.isWall) {
          // The distance between neighbours is calculated using the pythagorean theorem
          let newCost =
            currentNode.cost + distanceBetweenNodes(currentNode, neighbour);
          // Update neighbour's costs and previous node if new cost is less than their current cost
          if (newCost < neighbour.cost) {
            neighbour.cost = newCost;
            neighbour.previous = currentNode;
          }
        }
      }

      // Remove the current node from the unvisited list and into the visited list
      unvisited.splice(unvisited.indexOf(currentNode), 1);
      visited.push(currentNode);
    }
  }
  return { finalPath, visited };
};

export default dijkstras;
