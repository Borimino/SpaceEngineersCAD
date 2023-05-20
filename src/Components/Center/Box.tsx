import * as THREE from 'three'
import { useRef, useState, ComponentType } from 'react'
import { Canvas, useFrame, ThreeElements, ThreeEvent } from '@react-three/fiber'
import LargeBlockArmorBlock from './../../Resources/LargeBlockArmorBlock'
import BlockVO from './../../Data/BlockVO'
import ModelProps from './../../Data/ModelProps'

function Box(props: {
    block: BlockVO,
    deleteBlock: (position: THREE.Vector3) => void,
    placeBlock: (position: THREE.Vector3) => void,
    actual: boolean,
    setHover: (position: THREE.Vector3, hovering: number, actual: boolean) => void
     }) {
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

  const CustomTag: ComponentType<ModelProps> = props.block.blockType.renderer;
  return (
    <CustomTag
      color={chooseColor(props.block.actuallyHovering, props.block.removable, props.actual)}
      opacity={props.actual ? 1 : (props.block.actuallyHovering ? 0.5 : 0.1)}
      transparent={props.actual ? false : true}
      position={props.block.position}
      scale={1/(1.25*2)}
      rotation={props.block.rotation}
      onContextMenu={(event: ThreeEvent<MouseEvent>) => {
          if (props.actual) {
              event.stopPropagation()
              props.deleteBlock(props.block.position)
          }
      }}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        if (!props.actual) {
            event.stopPropagation()
            props.placeBlock(props.block.position)
        }
      }}
      onPointerEnter={(e: ThreeEvent<MouseEvent>) => {
        props.setHover(props.block.position, e.distance, props.actual)
      }}
      onPointerLeave={(e: ThreeEvent<MouseEvent>) => {
        props.setHover(props.block.position, -1, props.actual)
      }} />
  );
}

export default Box;
