import React from 'react';
import * as THREE from 'three'
import { useRef, useState } from 'react'
import './App.css';
import BuildView from './Components/BuildView'
import LeftPanel from './Components/LeftPanel'

function App() {
  const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>(new THREE.Vector3(1, 1, 1))
  return (
    <div className="App">
        <LeftPanel cameraPosition={cameraPosition} onClick={(position: THREE.Vector3) => setCameraPosition(position)} />
        <BuildView cameraPosition={cameraPosition} />
    </div>
  );
}

export default App;
