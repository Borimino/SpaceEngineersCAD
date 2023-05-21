/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 src/Resources/LargeBlockArmorHalfSlopeCorner.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import modelUrl from './LargeBlockArmorHalfSlopeCorner.glb'

export default function Model(props) {
  const { nodes, materials } = useGLTF(modelUrl)
  const material1 = materials.material_1.clone()
  material1.opacity=props.opacity;
  material1.color=props.color;
  material1.transparent=true;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.LargeBlockArmorHalfSlopeCorner.geometry} material={material1} />
    </group>
  )
}

useGLTF.preload(modelUrl)
