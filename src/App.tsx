import React from 'react';
import './App.css';
import BuildView from './Components/BuildView'
import LeftPanel from './Components/LeftPanel'

function App() {
  return (
    <div className="App">
        <LeftPanel />
        <BuildView />
    </div>
  );
}

export default App;
