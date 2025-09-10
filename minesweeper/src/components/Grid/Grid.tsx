import Cell from '../Cell/Cell.tsx';
import type GridProps from '../../types/components/Grid/index.ts';

import './Grid.css';

const Grid = ({ grid, cellOnClick, cellOnContextMenu }: GridProps) => {

  return grid.map((row, rowIndex) =>
    <div key={rowIndex} className="row">
      {row.map((cell, cellIndex) => (
        <Cell key={cellIndex} info={cell} row={rowIndex} col={cellIndex} 
          cellOnClick={cellOnClick} cellOnContextMenu={cellOnContextMenu} />
      ))}
    </div>
  );
}

export default Grid;