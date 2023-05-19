import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, ThreeEvent } from '@react-three/fiber'

function Box(props: {position: THREE.Vector3, deleteBlock: (position: THREE.Vector3) => void, placeBlock: (position: THREE.Vector3) => void, actual: boolean, setHover: (position: THREE.Vector3, hovering: number, actual: boolean) => void, hover: boolean, removable: boolean}) {
  const mesh = useRef<THREE.Mesh>(null!)
  function chooseColor(hover: boolean, removable: boolean, actual: boolean): string {
    if (!hover) {
        return "gray";
    }
    if (!actual) {
        return "purple";
    }
    if (!removable) {
        return "red";
    }
    return "yellow";
  }

  return (
    <mesh
      position={props.position}
      ref={mesh}
      scale={1}
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
      onPointerEnter={(e) => {
        props.setHover(props.position, e.distance, props.actual)
      }}
      onPointerLeave={(e) => {
        props.setHover(props.position, -1, props.actual)
      }}
      >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={chooseColor(props.hover, props.removable, props.actual)} wireframe={props.actual ? false : true}/>
    </mesh>
  );
}

export default Box;