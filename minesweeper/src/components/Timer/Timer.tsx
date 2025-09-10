import { useEffect, useRef, useState } from 'react';
import Counter from '../Counter/Counter';
import type TimerProps from '../../types/components/Timer';

const Timer = ({game}:TimerProps) => {
  const [value, setValue] = useState<number>(0);
  const [startTime, setStartTime] = useState<null | Date>(null);
  const interval = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(()=> {
    if (game.status === 'initial') {
      setValue(0); 
      setStartTime(null);
    }
    if (game.status === 'ongoing') setStartTime(new Date());
    if (game.status === 'won' || game.status === 'over') clearInterval(interval.current!);
  
    return () => clearInterval(interval.current!);
    
  }, [game.status]);

   useEffect(()=> {
    interval.current = setInterval(() => {
      if (startTime) setValue(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);  
  }, [startTime]);

  return (
    <Counter value={value} />
  );
}
export default Timer;