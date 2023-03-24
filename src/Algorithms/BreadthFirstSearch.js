// Create a queue data structure to be used in the breadth first search
class Queue {
  constructor() {
    this.elements = [];
    this.head = 0;
    this.tail = 0;
  }

  // Add an item to the end of the queue
  enqueue(item) {
    this.elements[this.tail] = item;
    this.tail++;
  }

  // Remove the first item in the queue
  dequeue() {
    delete this.elements[this.head];
    this.head++;
  }

  // Check if the queue is empty
  isEmpty() {
    return this.elements.length === 0;
  }
}

const breadthFirstSearch = (startNode, targetNode) => {
  // Initialise the queue and discovered lists with only the start node
  let queue = new Queue();
  queue.enqueue(startNode);
  let discovered = [startNode];

  while (queue.isEmpty === false) {
    // Set the current node to be the first item in the queue
    let currentNode = queue.elements[queue.head];

    // Iterate through all of the neighbours of the current node
    for (neighbour in currentNode.neighbours) {
      // Check if they have already been discovered
      if (!discovered.include(neighbour)) {
        // If the neighbour is the target node then break out of the loop as the target has been found
        if (neighbour === targetNode) {
          break;
        } else {
          // Add the neighbour to the queue and discovered list
          queue.enqueue(neighbour);
          discovered.push(neighbour);
        }
      }
    }
    queue.dequeue;
  }
};
