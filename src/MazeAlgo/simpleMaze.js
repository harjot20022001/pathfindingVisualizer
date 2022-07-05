export function simpleMaze(grid, startNode, finishNode, rows, cols) {
  let nodes = [];
  for (let i = 0; i < 600; i++) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);
    let currentNode = grid[row][col];
    if (currentNode !== startNode && currentNode !== finishNode) {
      nodes.push(currentNode);
    }
  }
  return nodes;
}
