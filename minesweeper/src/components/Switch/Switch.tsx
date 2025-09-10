import { useEffect, useState } from 'react';
import darkMode from './../../assets/dark-mode.svg';
import './Switch.css';

const Switch = () => {

  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTheme(event.target.checked ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (

    <div className="switch-container">
      <img src={darkMode} className="switch-image" alt="Dark Mode"/>
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={theme === 'dark'}/>
        <span className="slider"></span>
      </label>
      
    </div>
  )
}

export default Switch;