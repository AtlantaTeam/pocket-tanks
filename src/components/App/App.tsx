import React from 'react';
import img from '../../../static/images/tank.png';

import './App.css';

export function App() {
  return (
    <div>
      <h1>Крутые ПокеТанчики.</h1>
      <img src={img} alt="Tank" />
    </div>
  );
}
