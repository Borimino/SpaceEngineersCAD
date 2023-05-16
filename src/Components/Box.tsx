import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, ThreeEvent } from '@react-three/fiber'

function Box(props: {position: THREE.Vector3, deleteBlock: (position: THREE.Vector3) => void, placeBlock: (position: THREE.Vector3) => void, actual: boolean}) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hover, setHover] = useState(false)
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
        event.stopPropagation()
        if (!props.actual) {
            props.placeBlock(props.position)
        }
      }}
      onPointerEnter={(e) => {
        e.stopPropagation()
        if (!props.actual) {
            setHover(true)
        }
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        if (!props.actual) {
            setHover(false)
        }
      }}
      >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? "purple" : "gray"} wireframe={props.actual ? false : true}/>
    </mesh>
  );
}

export default Box;
