import classNames from "classnames";
import type CellProps from "../../types/components/Cell";
import flag from "./../../assets/flag.png";
import mine from "./../../assets/mine.png";

import './Cell.css';

const Cell = ({info, row, col, cellOnClick, cellOnContextMenu}: CellProps) => {
  const {value, opened, flagged, cssClass} = info;
  const cellClassName = classNames('cell', {
    'hidden'    : !opened,
    'flag'      : flagged,
    [cssClass!] : cssClass, 
  });

  return (
    <div className={cellClassName} 
      onClick={() => cellOnClick(row, col)}
      onContextMenu={(event)=>cellOnContextMenu(event, row, col)}>
      { (opened && value > 0 && value < 9 ) && <span className="content">{value}</span> }
      { opened && value === 9 && <img className="content" src={mine} alt="Mine!"/> } 
      { !opened && flagged && <img className="flag" src={flag} alt="Flag"/> }
    </div>
  );
}

export default Cell;
