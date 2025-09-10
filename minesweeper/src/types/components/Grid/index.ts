import type { GameGrid } from '../..';

export default interface GridProps {
  grid: GameGrid,
  cellOnClick: (row: number, col: number) => void;
  cellOnContextMenu: (event: React.MouseEvent<HTMLDivElement>, row: number, col: number) => void;
}