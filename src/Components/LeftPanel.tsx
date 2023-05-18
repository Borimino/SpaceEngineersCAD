import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import OrientationCube from './OrientationCube'
import CameraHandler from './CameraHandler'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

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
      <div className="LeftPannelMid">
        <TextField id="searchbar" label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <p>
          Future list of blocks
        </p>
      </div>
      <div className="SaveLoadMenu">
        <TextField id="gridName" label="Grid name"/>
        <Button variant="contained">Load</Button>
        <Button variant="contained">Save</Button>
      </div>
    </div>
  );
}

export default LeftPanel;
