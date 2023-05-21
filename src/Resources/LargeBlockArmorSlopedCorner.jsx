/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 src/Resources/LargeBlockArmorSlopedCorner.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import modelUrl from './LargeBlockArmorSlopedCorner.glb'

export default function Model(props) {
  const { nodes, materials } = useGLTF(modelUrl)
  const material1 = materials.material_1.clone()
  material1.opacity=props.opacity;
  material1.color=props.color;
  material1.transparent=true;
  const material2 = materials.material_2.clone()
  material2.opacity=props.opacity;
  material2.color=props.color;
  material2.transparent=true;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.LargeBlockArmorSlopedCorner_part1.geometry} material={material1} />
      <mesh geometry={nodes.LargeBlockArmorSlopedCorner_part2.geometry} material={material2} />
    </group>
  )
}

useGLTF.preload(modelUrl)
