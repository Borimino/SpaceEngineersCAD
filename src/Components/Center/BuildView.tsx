import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import Box from './Box'
import CameraHandler from './../CameraHandler'
import BlockVO from './../../Data/BlockVO'

function BuildView(props: {
    cameraPosition: THREE.Vector3,
    blocks: Array<BlockVO>,
    possibleBlocks: Array<BlockVO>,
    deleteBlock: (position: THREE.Vector3) => void,
    placeBlock: (position: THREE.Vector3) => void,
    setHover: (position: THREE.Vector3, hovering: number, actual: boolean) => void,
    sliceLimitsMin: THREE.Vector3,
    sliceLimitsMax: THREE.Vector3,
    limitDirections: THREE.Vector3,
    rotateX: (up: boolean) => void,
    rotateY: (up: boolean) => void,
    rotateZ: (up: boolean) => void,
    resetPossibleBlocks: () => void,
     }) {
  const cameraPosition = props.cameraPosition.clone();
  cameraPosition.multiplyScalar(100);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "KeyS") {
      props.resetPossibleBlocks();
    }
    if (event.code === "KeyW") {
      props.resetPossibleBlocks();
    }
    if (event.code === "KeyA") {
      props.resetPossibleBlocks();
    }
    if (event.code === "KeyD") {
      props.resetPossibleBlocks();
    }
    if (event.code === "KeyQ") {
      props.resetPossibleBlocks();
    }
    if (event.code === "KeyE") {
      props.resetPossibleBlocks();
    }
  }

  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "KeyS") {
      props.rotateX(true);
    }
    if (event.code === "KeyW") {
      props.rotateX(false);
    }
    if (event.code === "KeyA") {
      props.rotateY(false);
    }
    if (event.code === "KeyD") {
      props.rotateY(true);
    }
    if (event.code === "KeyQ") {
      props.rotateZ(true);
    }
    if (event.code === "KeyE") {
      props.rotateZ(false);
    }
  }

  return (
    <div className="BuildView" >
        <Canvas orthographic camera={{ zoom: 50, position: cameraPosition }} onContextMenu={(e) => {e.preventDefault()}} tabIndex={0} onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
            <CameraHandler cameraPosition={cameraPosition} />
            <ambientLight />
            <directionalLight position={[1, 2, 0]} />
            {props.blocks.map(block => {
                if (props.limitDirections.x > 0) {
                  if (block.position.x < props.sliceLimitsMin.x || block.position.x > props.sliceLimitsMax.x) {
                    return (<></>);
                  }
                }
                if (props.limitDirections.y > 0) {
                  if (block.position.y < props.sliceLimitsMin.y || block.position.y > props.sliceLimitsMax.y) {
                    return (<></>);
                  }
                }
                if (props.limitDirections.z > 0) {
                  if (block.position.z < props.sliceLimitsMin.z || block.position.z > props.sliceLimitsMax.z) {
                    return (<></>);
                  }
                }
                return (
                    <Box block={block} key={block.key} deleteBlock={props.deleteBlock} placeBlock={props.placeBlock} actual={true} setHover={props.setHover} />
                )
            })}
            {props.possibleBlocks.map(block => {
                if (props.limitDirections.x > 0) {
                  if (block.position.x < props.sliceLimitsMin.x || block.position.x > props.sliceLimitsMax.x) {
                    return (<></>);
                  }
                }
                if (props.limitDirections.y > 0) {
                  if (block.position.y < props.sliceLimitsMin.y || block.position.y > props.sliceLimitsMax.y) {
                    return (<></>);
                  }
                }
                if (props.limitDirections.z > 0) {
                  if (block.position.z < props.sliceLimitsMin.z || block.position.z > props.sliceLimitsMax.z) {
                    return (<></>);
                  }
                }
                return (
                    <Box block={block} key={block.key} deleteBlock={props.deleteBlock} placeBlock={props.placeBlock} actual={false} setHover={props.setHover} />
                )
            })}
        </Canvas>
    </div>
  );
}

export default BuildView;
