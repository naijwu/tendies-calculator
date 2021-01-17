import './App.css';
import React from 'react';
import Calls from './modules/Calls';
import Puts from './modules/Puts';

function App() {
  
  return (
    <div className='App'>
      <div className='App-inner'>
        <Calls />
        <Puts />
      </div>
    </div>
  );
}

export default App;
