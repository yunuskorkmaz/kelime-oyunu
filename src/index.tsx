import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GameStoreProvider } from './stores/GameStore';

ReactDOM.render(
  <React.StrictMode>
    <GameStoreProvider>
      <App />
    </GameStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
