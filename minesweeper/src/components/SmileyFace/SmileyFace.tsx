import Border from '../Border/Border';
import type SmileyFaceProps from '../../types/components/SmileyFace';
import './SmileyFace.css';

const SmileyFace = ({game, smileyOnClick}: SmileyFaceProps) => {
  
  let imgSrc  = 'images/smiley.svg';
  if (game.status === 'won') imgSrc = 'images/bright.svg';
  else if (game.status === 'over') imgSrc = 'images/cry.svg';
 
  return (
    <Border className="smiley-box" borderStyle="outset" padding="4px">
      <img src={imgSrc} className="smiley-face" onClick={smileyOnClick} />
    </Border>
  )
}

export default SmileyFace;