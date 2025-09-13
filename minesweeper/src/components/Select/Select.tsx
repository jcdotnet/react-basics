import type SelectProps from '../../types/components/Select';
import './Select.css';

const Select = ({values, defaultValue, selectOnChange}: SelectProps) => {
  return(
    <select name="select" className="select-control" onChange={selectOnChange} defaultValue={defaultValue}>
      {values.map( ({key, value}) => (
        <option key={key} value={value}>{key}</option>
    ))}
    </select>
  );
}

export default Select;