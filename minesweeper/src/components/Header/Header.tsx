
import { GAME_CONFIG } from '../../data';
import Counter from '../Counter/Counter';
import Border from '../Border/Border';
import SmileyFace from '../SmileyFace/SmileyFace';
import Timer from '../Timer/Timer';
import type HeaderProps from '../../types/components/Header';
import './Header.css';


const Header = ({game, smileyOnClick}:HeaderProps) => {

  const minesCounterValue = GAME_CONFIG[game.mode].mines - game.flags;

  return (
    <Border marginBottom="10px">
      <div className="game-board-header">
        <Counter value={minesCounterValue} />
        <SmileyFace game={game} smileyOnClick={smileyOnClick}/>
        <Timer game={game}/>
      </div>
    </Border>
  );
}

export default Header;
