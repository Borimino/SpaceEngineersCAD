/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 src/Resources/LargeBlockArmorSlope2Tip.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import modelUrl from './LargeBlockArmorSlope2Tip.glb'

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
  const material3 = materials.material_3.clone()
  material3.opacity=props.opacity;
  material3.color=props.color;
  material3.transparent=true;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.LargeBlockArmorSlope2Tip_part1.geometry} material={material1} />
      <mesh geometry={nodes.LargeBlockArmorSlope2Tip_part2.geometry} material={material2} />
      <mesh geometry={nodes.LargeBlockArmorSlope2Tip_part3.geometry} material={material3} />
    </group>
  )
}

useGLTF.preload(modelUrl)
