import type { GameCell } from '../..';

export default interface CellProps {
  info: GameCell;
  row: number;
  col: number;
  cellOnClick: (row: number, col: number) => void;
  cellOnContextMenu: (event: React.MouseEvent<HTMLDivElement>, row: number, col: number) => void;
}
