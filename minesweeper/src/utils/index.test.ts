import { createGrid, initialize } from '.';
import type { GameGrid } from '../types';

describe('Minesweeper Utils', () => {

  describe('Create Grid', () => {
    test('gridHasOnlyEmptyCells', () => {
      const emptyCell = { flagged: false, opened: false, value: 0 };
      expect(createGrid('easy')).toStrictEqual([
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
        [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
      ]);
    });
    test('gridLengthMustBeNineForEasyMode', () => {
      const grid = createGrid('easy');
      expect(grid).toHaveLength(9);
      expect(grid[0]).toHaveLength(9);
    });
    test('gridLengthMustBeSixteenForMediumMode', () => {
      const grid = createGrid('medium');
      expect(grid).toHaveLength(16);
      expect(grid[0]).toHaveLength(16);
    });
    test('gridLengthMustBeSixteenThirtyForExpertMode', () => {
      const grid = createGrid('expert');
      expect(grid).toHaveLength(16);
      expect(grid[0]).toHaveLength(30);
    });
  });

  describe('Initialize Grid', ()=>{
    const minesCount = (grid: GameGrid):number => {
      let count = 0;
      grid.forEach( r => {
        r.forEach(c => {
          if (c.value === 9) count++;
        });
      });
      return count;
    }
    test('gridMinesCountMustBeTenForEasyMode', () => {
      const grid = createGrid('easy');
      initialize(grid, 'easy');
      expect(minesCount(grid)).toStrictEqual(10);
    });
    test('gridMinesCountMustBeFortyForMediumMode', () => {
      const grid = createGrid('medium');
      initialize(grid, 'medium');
      expect(minesCount(grid)).toStrictEqual(40);
    });
    test('gridMinesCountMustBeNinetyNineteenForExpertMode', () => {
      const grid = createGrid('expert');
      initialize(grid, 'expert');
      expect(minesCount(grid)).toStrictEqual(99);
    });
  })
});