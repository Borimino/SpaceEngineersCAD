import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, ThreeEvent } from '@react-three/fiber'
import LargeBlockArmorBlock from './../Resources/LargeBlockArmorBlock'

function Box(props: {position: THREE.Vector3, deleteBlock: (position: THREE.Vector3) => void, placeBlock: (position: THREE.Vector3) => void, actual: boolean, setHover: (position: THREE.Vector3, hovering: number, actual: boolean) => void, hover: boolean, removable: boolean}) {
  function chooseColor(hover: boolean, removable: boolean, actual: boolean): THREE.Color {
    if (!hover) {
      return new THREE.Color("white");
    }
    if (!actual) {
      return new THREE.Color("purple");
    }
    if (!removable) {
      return new THREE.Color("red");
    }
    return new THREE.Color("yellow");
  }

  return (
    <LargeBlockArmorBlock
      color={chooseColor(props.hover, props.removable, props.actual)}
      opacity={props.actual ? 1 : (props.hover ? 0.5 : 0.1)}
      transparent={props.actual ? false : true}
      position={props.position}
      scale={1/(1.25*2)}
      onContextMenu={(event: ThreeEvent<MouseEvent>) => {
          if (props.actual) {
              event.stopPropagation()
              props.deleteBlock(props.position)
          }
      }}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        if (!props.actual) {
            event.stopPropagation()
            props.placeBlock(props.position)
        }
      }}
      onPointerEnter={(e: ThreeEvent<MouseEvent>) => {
        props.setHover(props.position, e.distance, props.actual)
      }}
      onPointerLeave={(e: ThreeEvent<MouseEvent>) => {
        props.setHover(props.position, -1, props.actual)
      }}
      >
//      <boxGeometry args={[1, 1, 1]} />
//      <meshStandardMaterial color={chooseColor(props.hover, props.removable, props.actual)} wireframe={props.actual ? false : true}/>
    </LargeBlockArmorBlock>
  );
}

export default Box;
