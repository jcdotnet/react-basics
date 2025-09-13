import { useState } from 'react';
import { createGrid, gameWon, initialize, reveal, revealMines } from './utils';
import type { Game, GameMode } from './types';

import Border from './components/Border/Border';
import Header from './components/Header/Header';
import ModeSelect from './components/ModeSelect/ModeSelect';
import SizeSelect from './components/SizeSelect/SizeSelect';
import Switch from './components/Switch/Switch';
import Grid from './components/Grid/Grid'
import './App.css'

function App() {

  const [game, setGame] = useState<Game>({
    flags: 0,
    grid: createGrid('easy'),
    mode: 'easy',
    status: 'initial',
  });
  const [size, setSize] = useState<string>('2rem')  

  const handleClick = (row: number, col: number) => {
    if (game.grid[row][col].flagged || game.grid[row][col].opened
      || game.status === 'won' || game.status === 'over') return;

    if (game.status === 'initial') {
      setGame((prevGame) => {
        // workaround for this hook being triggered twice (React strict mode)
        let newGrid = JSON.parse(JSON.stringify(prevGame.grid));
        // updating the grid to add mines (mine cannot be placed in row, col)
        initialize(newGrid, prevGame.mode, [row, col]);
        return {
          ...prevGame,
          grid: newGrid,
          status: 'ongoing',
        }
      });
    }
    setGame((prevGame) => {
      if (prevGame.grid[row][col].value === 9) {
        revealMines(prevGame.grid);
        prevGame.grid[row][col].cssClass = 'red';
        return {
          ...prevGame,
          grid: prevGame.grid,
          status: 'over'
        };
      }
      reveal(prevGame, row, col);
      if (gameWon(prevGame.grid, game.mode)) {
        revealMines(prevGame.grid, 'green');
        return {
          ...prevGame,
          grid: prevGame.grid,
          status: 'won'
        };
      } else return {
        ...prevGame,
        grid: prevGame.grid
      };
    });
  }

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>, row: number, col: number) => {
    event.preventDefault();
    if (game.status !== 'won' && game.status !== 'over' && !game.grid[row][col].opened) {
      setGame(prevGame => {
        let flagsCount = 0;
        let newGrid = JSON.parse(JSON.stringify(prevGame.grid));
        newGrid[row][col].flagged = !newGrid[row][col].flagged;
        newGrid[row][col].flagged ? flagsCount++ : flagsCount--
        if (gameWon(newGrid, game.mode)) {
          prevGame.status = 'won';
          revealMines(newGrid, 'green');
        }
        return {
          ...prevGame,
          grid: newGrid,
          flags: prevGame.flags + flagsCount,
          status: prevGame.status
        }
      });
    }
  }

  const handleMode = (mode: GameMode) => {
    setGame({
      flags: 0,
      grid: createGrid(mode),
      mode,
      status: 'initial',
    });
  }

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleMode(event.target.value as GameMode);
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  }

  const handleSmiley = () => {
    handleMode(game.mode);
  }

  return (
    <div className="game">
      <div className="game-menu">
        <ModeSelect selectOnChange={handleModeChange}/>
        <SizeSelect selectOnChange={handleSizeChange}/>
        <Switch />
      </div>
      <div className="game-board" style={{'--cell-size': size} as React.CSSProperties}>
        <Border borderStyle="outset">
          <Header game={game} smileyOnClick={handleSmiley} />
          <Border padding="0">
            <Grid grid={game.grid}
              cellOnClick={handleClick} 
              cellOnContextMenu={handleContextMenu} />
          </Border>
        </Border>
      </div>
    </div>
  )
}

export default App
