import type CounterProps from '../../types/components/Counter';
import Border from '../Border/Border';
import './Counter.css';

const Counter = ({ value }: CounterProps) => {

  let counterValue = [...value.toString().padStart(3, '0')];

  return (
    <Border borderWidth="2px" padding="0">
      <div className="counter">
        {[0, 1, 2].map(num => (
          <img key={num} className="counter-img" src={`/images/${counterValue[num]}.svg`} />
        ))}
      </div>
    </Border>
  )
}

export default Counter;
