import { CELL_SIZES } from '../../data';
import type SizeSelectProps from '../../types/components/SizeSelect';
import Select from '../Select/Select';
import './SizeSelect.css';

const SizeSelect = ({selectOnChange}: SizeSelectProps) => {
  return (
    <div className="size-select">
      <img src="images/cell.png" className="select-image" alt="Cell Size"/>
      <Select values={CELL_SIZES} selectOnChange={selectOnChange} defaultValue="2rem"/>   
    </div>
  );
}

export default SizeSelect;