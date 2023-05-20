import * as THREE from 'three'
import { useRef, useState, ChangeEvent } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import Tooltip from '@mui/material/Tooltip';
import OrientationCube from './OrientationCube'
import CameraHandler from './../CameraHandler'
import SliceManager from './../SliceManager'
import BlockVO from './../../Data/BlockVO'

function RightPanel(props: {
    cameraPosition: THREE.Vector3,
    onClick: (position: THREE.Vector3) => void,
    blocks: Array<BlockVO>,
    possibleBlocks: Array<BlockVO>,
    applySliceLimits: (min: THREE.Vector3, max: THREE.Vector3) => void,
    sliceLimitsMin: THREE.Vector3,
    sliceLimitsMax: THREE.Vector3,
    limitDirections: THREE.Vector3,
    applyDirectionLimits: (limitDirections: THREE.Vector3) => void}) {

  return (
    <div className="RightPanel">
      <Tooltip title="Use W,S,A,D,Q,E to rotate blocks similar to Home,End,Delete,PgDwn,Insert,PgUp in game">
        <p className="Help">Keybindings</p>
      </Tooltip>
      <div className="OrientationCube">
        <Canvas orthographic camera={{ zoom: 50, position: props.cameraPosition }} onContextMenu={(e) => e.preventDefault()}>
          <CameraHandler cameraPosition={props.cameraPosition} />
          <ambientLight />
          <directionalLight position={[1, 2, 0]} />
          <OrientationCube onClick={props.onClick} />
        </Canvas>
      </div>
      <SliceManager
        blocks={props.blocks}
        possibleBlocks={props.possibleBlocks}
        applySliceLimits={props.applySliceLimits}
        sliceLimitsMin={props.sliceLimitsMin}
        sliceLimitsMax={props.sliceLimitsMax}
        limitDirections={props.limitDirections}
        applyDirectionLimits={props.applyDirectionLimits} />
      <div className="RightPanelMid">
      </div>
    </div>
  );
}

export default RightPanel;
