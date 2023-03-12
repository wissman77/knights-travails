class GraphNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
  }

  markAsVisited() {
    this.visited = true;
  }
}

export default GraphNode;
