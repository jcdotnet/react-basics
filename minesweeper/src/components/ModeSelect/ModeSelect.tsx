import { GAME_CONFIG } from '../../data';
import type ModeSelectProps from '../../types/components/ModeSelect';
import Select from '../Select/Select';


const ModeSelect = ({selectOnChange}: ModeSelectProps) => {

  const selectValues = Object.keys(GAME_CONFIG).map(value => {
    const text = value.charAt(0).toUpperCase() + value.slice(1);
    return { 
      key: text, 
      value 
    }
  });

  return (
    <Select values={selectValues} selectOnChange={selectOnChange} />
  );
}

export default ModeSelect;