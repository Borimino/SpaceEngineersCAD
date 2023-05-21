import React from 'react';
import { Vector3, Euler, Color } from 'three'
import { Canvas, useFrame, ThreeElements, ThreeEvent } from '@react-three/fiber'
import CameraHandler from './../CameraHandler'
import BlockVO from './../../Data/BlockVO'
import ModelProps from './../../Data/ModelProps'

function CurrentBlock(props: {
    block: BlockVO|undefined,
    cameraPosition: Vector3,
    }) {

  if (props.block) {
    const CustomTag: React.ComponentType<ModelProps> = props.block.blockType.renderer;
    return (
      <div className="CurrentBlock" >
        <Canvas orthographic camera={{ zoom: 50, position: props.cameraPosition }} onContextMenu={(e) => e.preventDefault()} >
          <CameraHandler cameraPosition={props.cameraPosition} />
          <ambientLight />
          <directionalLight position={[1, 2, 0]} />
          <CustomTag
            color={new Color("white")}
            opacity={1}
            position={new Vector3(0, 0, 0)}
            scale={1/(1.25*2)}
            transparent={false}
            rotation={props.block.rotation}
            onClick={(e) => {}}
            onContextMenu={(e) => {}}
            onPointerLeave={(e) => {}}
            onPointerEnter={(e) => {}}
            />
        </Canvas>
      </div>
    )
  } else {
    return (
      <div className="CurrentBlock" >
        <Canvas orthographic camera={{ zoom: 50, position: props.cameraPosition }} onContextMenu={(e) => e.preventDefault()} >
          <CameraHandler cameraPosition={props.cameraPosition} />
          <ambientLight />
          <directionalLight position={[1, 2, 0]} />
        </Canvas>
      </div>
    )
  }
}

export default CurrentBlock;