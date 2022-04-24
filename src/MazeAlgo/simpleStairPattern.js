export function simpleStairPattern(grid, startNode, finishNode) {
  let node1 = grid[28][0];
  let node2 = grid[0][28];
  let node3 = grid[26][56];
  let visitedWallsInOrder = [];

  for (let i = node1.row, j = node1.col; i !== 0; i--, j++) {
    let currentNode = grid[i][j];
    if (
      currentNode.isWall !== true &&
      currentNode !== startNode &&
      currentNode !== finishNode
    ) {
      visitedWallsInOrder.push(currentNode);
    }
  }
  for (let i = node2.row, j = node2.col; i !== 28; i++, j++) {
    let currentNode = grid[i][j];
    if (
      currentNode.isWall !== true &&
      currentNode !== startNode &&
      currentNode !== finishNode
    ) {
      visitedWallsInOrder.push(currentNode);
    }
  }
  for (let i = node3.row, j = node3.col; j !== 75; i--, j++) {
    let currentNode = grid[i][j];
    if (
      currentNode.isWall !== true &&
      currentNode !== startNode &&
      currentNode !== finishNode
    ) {
      visitedWallsInOrder.push(currentNode);
    }
  }
  return visitedWallsInOrder;
}
