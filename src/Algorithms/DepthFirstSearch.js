// Create a stack data structure to be used in the depth first search
class Stack {
  constructor() {
    this.elements = [];
  }

  // Add an item to the stack
  push(item) {
    this.elements.push(item);
  }

  // Remove the top item in the stack
  pop() {
    if (this.elements.length > 0) {
      return this.elements.pop();
    }
  }

  // Check if the stack is empty
  isEmpty() {
    return this.elements.length === 0;
  }
}

const depthFirstSearch = (startNode, targetNode) => {
  // Initialise the stack and discovered lists with only the start node
  let stack = new Stack();
  stack.push(startNode);
  let discovered = [startNode];

  while (stack.isEmpty === false) {
    // Pop the top item from the stack to be the current node
    let currentNode = stack.elements.pop();

    // Iterate through all of the neighbours of the current node
    for (neighbour in currentNode.neighbours) {
      // Check if they have already been discovered
      if (!discovered.include(neighbour)) {
        // If the neighbour is the target node then break out of the loop as the target has been found
        if (neighbour === targetNode) {
          break;
        } else {
          // Add the neighbour to the stack and discovered list
          stack.push(neighbour);
          discovered.push(neighbour);
        }
      }
    }
  }
};
