export function simpleMaze(grid, startNode, finishNode) {
  let nodes = [];
  for (let i = 0; i < 600; i++) {
    let row = Math.floor(Math.random() * 29);
    let col = Math.floor(Math.random() * 76);
    let currentNode = grid[row][col];
    if (currentNode !== startNode && currentNode !== finishNode) {
      nodes.push(currentNode);
    }
  }
  return nodes;
}
