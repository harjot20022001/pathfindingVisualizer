import React, { Component } from "react";
import Node from "../Node/Node";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { depthFirstSearch } from "../Algorithms/depth-first-search";
import { simpleStairPattern } from "../MazeAlgo/simpleStairPattern";
import { simpleMaze } from "../MazeAlgo/simpleMaze";

const START_NODE_ROW = 12;
const START_NODE_COL = 17;
const FINISH_NODE_ROW = 12;
const FINISH_NODE_COL = 58;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  componentDidMount() {
    const grid = getInitialGrid();

    this.setState({ grid });
  }

  animateDFS(visitedNodesInOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(visitedNodesInOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-path";
      }, 50 * i);
    }
  }

  animateMaze(visitedWallsInOrder) {
    for (let i = 0; i < visitedWallsInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedWallsInOrder[i];
        this.handleMouseDown(node.row, node.col);
        this.handleMouseUp();
      }, 30 * i);
    }
  }

  animateSimpleMaze(walls) {
    for (let i = 0; i < walls.length; i++) {
      const node = walls[i];
      this.handleMouseDown(node.row, node.col);
      this.handleMouseUp();
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const nodes = [];
    const visitedNodesInOrder = depthFirstSearch(
      grid,
      startNode,
      finishNode,
      nodes
    );
    this.animateDFS(visitedNodesInOrder);
  }

  visualizeStairMaze() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedWallsInOrder = simpleStairPattern(grid, startNode, finishNode);
    this.animateMaze(visitedWallsInOrder);
  }

  visualizeSimpleMaze() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const walls = simpleMaze(grid, startNode, finishNode);
    this.animateSimpleMaze(walls);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand
              onClick={() => {
                window.location.reload(false);
              }}
              href="#home"
            >
              Pathfinding Visualizer
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button onClick={() => this.visualizeDijkstra()} variant="dark">
                  Visualize Dijkstra
                </Button>
                &nbsp;
                <Button variant="dark" onClick={() => this.visualizeDFS()}>
                  Visualize DFS
                </Button>
                &nbsp;
                <Button variant="dark">Visualize A*</Button>
                &nbsp; &nbsp;
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-button-dark"
                    variant="outline-dark"
                  >
                    Generate Maze
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() => this.visualizeSimpleMaze()}
                      href="#/action-1"
                    >
                      Simple Maze
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.visualizeStairMaze()}
                      href="#/action-2"
                    >
                      Stair Pattern
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 29; row++) {
    const currentRow = [];
    for (let col = 0; col < 76; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
