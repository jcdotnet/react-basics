import { convertToGrid } from "../utils";
import type { CellValue, GameGrid } from "../types";

export const CELL_SIZES = [
  { key: 'XS', value: '1.5rem' },
  { key: 'S', value: '1.8rem' },
  { key: 'M', value: '2rem' },
  { key: 'L', value: '2.2rem' },
  { key: 'XL', value: '2.4rem' },
  { key: 'XXL', value: '2.8rem' },
]

export const CELL_STRING = [
  'empty',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'mine'
];

export const getEmptyGrid = (rows: number, cols: number): GameGrid => {
  const grid: CellValue[][] = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) grid[i][j] = 0;
  }
  return convertToGrid(grid);
}
/*
  Minesweeper difficulty levels determine the grid size and the number of hidden mines (bombs). 
  Standard difficulty levels include Beginner (e.g., 9x9 grid with 10 mines), 
  Intermediate (e.g., 16x16 grid with 40 mines), 
  and Expert (e.g., 16x30 or 30x16 grid with 99 mines).
 */
export const GAME_CONFIG = {
  easy: {
    rows: 9,
    cols: 9,
    mines: 10,
  },
  medium: {
    rows: 16,
    cols: 16,
    mines: 40,
  },
  expert: {
    rows: 16,
    cols: 30,
    mines: 99,
  }
}


