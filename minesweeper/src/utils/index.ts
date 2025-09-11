import { CELL_STRING, GAME_CONFIG, getEmptyGrid } from '../data';
import type { CellPosition, CellValue, Game, GameMode, GameGrid } from '../types';

const getAdjacentCells = (grid:GameGrid, cell: CellPosition): number[][]  => {
  return [[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]]
    .map( ([x,y]) => ([cell[0]+x, cell[1]+y]) )
    .filter( ([x,y]) => x in grid && y in grid[x]) 
}

const setMines = (grid: GameGrid, rows: number, cols: number, mines: number, initialClick?:CellPosition) => {
  let minesCount = 0;
  while ( minesCount < mines ) {
    // select locations: a random row and a random column are chosen for each mine
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    // check if we are placing a mine in the first revealed cell
    if (randomRow === initialClick?.[0] && randomCol === initialClick?.[1]) continue;
    // mine collision: check if a mine has already been placed in that exact cell
    if (grid[randomRow][randomCol].value === 9 ) continue;
    // place the mine: If there's no collision, a mine is placed at the chosen location 
    grid[randomRow][randomCol].value = 9;
    // repeat until the desired number of mines has been placed on the grid
    minesCount++;
  } 
  // set numbers for the safe cells, indicating how many mines are adjacent to them
  setNumbers(grid); 
}

const setNumbers = (grid: GameGrid) => {
  grid.forEach( (row, rowIndex) => {
    row.forEach( (cell, colIndex) => {
      if (cell.value !== 9) {
        let mines:CellValue = 0;
        const adjacent = getAdjacentCells(grid, [rowIndex, colIndex]);
        adjacent.forEach( adjacentCell => {
          if (grid[adjacentCell[0]][adjacentCell[1]].value === 9) mines ++;
        } );
        grid[rowIndex][colIndex].value = mines;
      }
    });
  });
}

export const createGrid = (mode: GameMode) => {
  return getEmptyGrid(GAME_CONFIG[mode].rows, GAME_CONFIG[mode].cols);
}

export const convertToGrid = (grid: CellValue[][]): GameGrid => {
  return grid.map(row => row.map(cell => {
    return {
      value: cell,
      flagged: false,
      opened: false,
    }
  }))
}

export const gameWon = (grid: GameGrid, mode: GameMode): boolean => {
  let mines = 0;
  let unrevealedCells = 0; 
  grid.forEach( row => {
    row.forEach(cell => {
      if (!cell.opened) unrevealedCells++;
      if (cell.flagged && cell.value === 9) mines ++
    });
  });

  const totalMines = GAME_CONFIG[mode].mines;
  return mines === totalMines || unrevealedCells === totalMines;  
}

export const initialize = (emptyGrid: GameGrid, level: GameMode, initialClick?: CellPosition) => { 
  const config = GAME_CONFIG[level];
  setMines(emptyGrid, config.rows, config.cols, config.mines, initialClick);
}

export const reveal = (game: Game, row: number, col: number) => {
  const stack = [[row, col]]; // only clicked position in the array
  while (stack.length > 0) {
    const [ row, col ] = stack.pop()!;
    const gameCell = game.grid[row][col];
    if (gameCell.value < 9) {
      gameCell.opened = true;
      if (gameCell.flagged) {
        gameCell.flagged = false;
        game.flags --;
      }
      gameCell.cssClass = CELL_STRING[gameCell.value];
      if (gameCell.value === 0 ) {
        const adjacentCells = getAdjacentCells(game.grid, [row, col]);
        adjacentCells.forEach( adj => {
          if (!game.grid[adj[0]][adj[1]].opened) 
            stack.push(adj);
        });
      }
    }
  }
}

export const revealMines = (grid: GameGrid, cssClass?:string) => {
  grid.forEach( row => {
    row.forEach( cell => {
      if ( cell.value === 9 ) {
        cell.opened = true;
        cell.cssClass = cssClass;
      }
    });
  })
} 