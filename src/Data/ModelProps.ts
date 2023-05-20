import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'

interface ModelProps {
  color: THREE.Color,
  opacity: number,
  position: THREE.Vector3,
  scale: number,
  transparent: boolean,
  rotation: THREE.Euler,
  onClick: (event: ThreeEvent<MouseEvent>) => void
  onContextMenu: (event: ThreeEvent<MouseEvent>) => void
  onPointerLeave: (event: ThreeEvent<MouseEvent>) => void
  onPointerEnter: (event: ThreeEvent<MouseEvent>) => void
}

export default ModelProps;