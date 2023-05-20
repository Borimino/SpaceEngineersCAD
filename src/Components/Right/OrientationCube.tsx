import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, ThreeEvent } from '@react-three/fiber'

function OrientationCube(props: {onClick: (position: THREE.Vector3) => void}) {
  const group = useRef<THREE.Group>(null!)
  return (
    <group ref={group} dispose={null}>
        <mesh >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[0.5, 0.5, 0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(1, 1, 1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[-0.5, 0.5, 0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(-1, 1, 1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[0.5, -0.5, 0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(1, -1, 1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[0.5, 0.5, -0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(1, 1, -1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[-0.5, -0.5, 0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(-1, -1, 1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[0.5, -0.5, -0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(1, -1, -1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[-0.5, 0.5, -0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(-1, 1, -1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <mesh
          position={[-0.5, -0.5, -0.5]}
          onClick={(event) => {event.stopPropagation(); props.onClick(new THREE.Vector3(-1, -1, -1))}} >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="gray" />
        </mesh>
    </group>
  );
}

export default OrientationCube;
