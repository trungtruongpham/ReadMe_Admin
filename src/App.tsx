import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Root from './routes/route';

function App() {
  return (
    <div className="App">
      <Root></Root>
    </div>
  );
}

export default App;
