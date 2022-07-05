export function depthFirstSearch(
  grid,
  startNode,
  finishNode,
  visitedNodesInOrder
) {
  visitedNodesInOrder.push(startNode);
  startNode.isVisited = true;

  const unvisitedNeighbors = getUnvisitedNeighbors(startNode, grid);
  for (let neighbors of unvisitedNeighbors) {
    if (neighbors.isWall) continue;
    if (neighbors.isVisited === false) {
      depthFirstSearch(grid, neighbors, finishNode, visitedNodesInOrder);
    }
  }
  let newVisitedNodesInOrder = [];
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    if (visitedNodesInOrder[i] === finishNode) {
      newVisitedNodesInOrder = visitedNodesInOrder.slice(1, i);
    }
  }
  return newVisitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
