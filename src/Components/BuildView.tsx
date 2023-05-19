import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import Box from './Box'
import CameraHandler from './CameraHandler'
import BlockVO from './../Data/BlockVO'

function BuildView(props: {cameraPosition: THREE.Vector3, blocks: Array<BlockVO>, possibleBlocks: Array<BlockVO>, deleteBlock: (position: THREE.Vector3) => void, placeBlock: (position: THREE.Vector3) => void, setHover: (position: THREE.Vector3, hovering: number, actual: boolean) => void}) {
  const cameraPosition = props.cameraPosition.clone();
  cameraPosition.multiplyScalar(100);

  return (
    <div className="BuildView">
        <Canvas orthographic camera={{ zoom: 50, position: cameraPosition }} onContextMenu={(e) => {e.preventDefault()}}>
            <CameraHandler cameraPosition={cameraPosition} />
            <ambientLight />
            <directionalLight position={[1, 2, 0]} />
            {props.blocks.map(block => {
                return (
                    <Box key={block.key} position={block.position} deleteBlock={props.deleteBlock} placeBlock={props.placeBlock} actual={true} setHover={props.setHover} hover={block.actuallyHovering} removable={block.removable}/>
                )
            })}
            {props.possibleBlocks.map(block => {
                return (
                    <Box key={block.key} position={block.position} deleteBlock={props.deleteBlock} placeBlock={props.placeBlock} actual={false} setHover={props.setHover} hover={block.actuallyHovering} removable={block.removable}/>
                )
            })}
        </Canvas>
    </div>
  );
}

export default BuildView;
