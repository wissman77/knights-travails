import GraphNode from './graphNode';

function produceBoard(rows, cols) {
  const array = [];
  for (let i = 0; i < rows; i += 1) {
    array[i] = [];
    for (let j = 0; j < cols; j += 1) {
      array[i][j] = new GraphNode(i, j);
    }
  }
  return array;
}

function getValidMoves(graphNode) {
  const moves = [
    new GraphNode(graphNode.x - 2, graphNode.y - 1),
    new GraphNode(graphNode.x - 2, graphNode.y + 1),
    new GraphNode(graphNode.x - 1, graphNode.y - 2),
    new GraphNode(graphNode.x - 1, graphNode.y + 2),
    new GraphNode(graphNode.x + 1, graphNode.y - 2),
    new GraphNode(graphNode.x + 1, graphNode.y + 2),
    new GraphNode(graphNode.x + 2, graphNode.y - 1),
    new GraphNode(graphNode.x + 2, graphNode.y + 1),
  ];

  return moves.filter(
    (move) => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8
  );
}

function knightTravails(start, target) {
  const startNode = new GraphNode(start[0], start[1]);
  const targetNode = new GraphNode(target[0], target[1]);
  // queue that hold the current position and path
  const queue = [{ position: startNode, pathNodes: [startNode] }];

  while (queue.length) {
    // destruct first object in the queue and mark it as visited
    const { position, pathNodes } = queue.shift();
    position.markAsVisited();

    if (position.x === targetNode.x && position.y === targetNode.y) {
      const path = [];
      for (const node of pathNodes) {
        path.push([node.x, node.y]);
      }
      return path;
    }

    // Get valid unique moves that not going out of the board and add them to the queue
    const validMoves = getValidMoves(position);
    for (const move of validMoves) {
      if (!move.visited) {
        move.markAsVisited();
        queue.push({ position: move, pathNodes: [...pathNodes, move] });
      }
    }
  }
  return null;
}

function knightMoves(start, target) {
  const shortestMoves = knightTravails(start, target);
  if (shortestMoves.length) {
    console.log(
      `You made it in ${shortestMoves.length - 1} moves!  Here's your path:`
    );
    for (const move of shortestMoves) {
      console.log(move);
    }
  }
  return shortestMoves;
}

export { produceBoard, knightMoves, knightTravails };
