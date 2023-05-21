/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 src/Resources/LargeBlockArmorInvCorner2Base.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import modelUrl from './LargeBlockArmorInvCorner2Base.glb'

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
      <mesh geometry={nodes.LargeBlockArmorInvCorner2Base_part1.geometry} material={material1} />
      <mesh geometry={nodes.LargeBlockArmorInvCorner2Base_part2.geometry} material={material2} />
    </group>
  )
}

useGLTF.preload(modelUrl)
