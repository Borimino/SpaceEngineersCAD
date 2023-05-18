import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import OrientationCube from './OrientationCube'
import CameraHandler from './CameraHandler'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function LeftPanel(props: {cameraPosition: THREE.Vector3, onClick: (position: THREE.Vector3) => void}) {
  return (
    <div className="LeftPanel">
      <div className="OrientationCube">
        <Canvas orthographic camera={{ zoom: 50, position: props.cameraPosition }} onContextMenu={(e) => e.preventDefault()}>
          <CameraHandler cameraPosition={props.cameraPosition} />
          <ambientLight />
          <directionalLight position={[1, 2, 0]} />
          <OrientationCube onClick={props.onClick} />
        </Canvas>
      </div>
      <p className="LeftPannelMid">
        Left panel
      </p>
      <div className="SaveLoadMenu">
        <TextField id="fileName" label="Filename.zip"/>
        <Button variant="contained">Load</Button>
        <Button variant="contained">Save</Button>
      </div>
    </div>
  );
}

export default LeftPanel;