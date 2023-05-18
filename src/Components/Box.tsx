import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, ThreeEvent } from '@react-three/fiber'

function Box(props: {position: THREE.Vector3, deleteBlock: (position: THREE.Vector3) => void, placeBlock: (position: THREE.Vector3) => void, actual: boolean, setHover: (position: THREE.Vector3, hovering: number, actual: boolean) => void, hover: boolean, removable: boolean}) {
  const mesh = useRef<THREE.Mesh>(null!)
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
      <meshStandardMaterial color={props.hover ? (props.removable ? "purple" : "red") : "gray"} wireframe={props.actual ? false : true}/>
    </mesh>
  );
}

export default Box;
