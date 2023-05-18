import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import Box from './Box'
import CameraHandler from './CameraHandler'
import BlockVO from './../Data/BlockVO'

function BuildView(props: {cameraPosition: THREE.Vector3}) {
  const [blocks, setBlocks] = useState<Array<BlockVO>>([
    new BlockVO(new THREE.Vector3(0, 0, 0), 0),
    new BlockVO(new THREE.Vector3(1, 0, 0), 1)
  ])

  const [possibleBlocks, setPossibleBlocks] = useState<Array<BlockVO>>(recalculatePossibleBlocks(blocks))

  function deleteBlock(position: THREE.Vector3) {
    const tmpBlocks = blocks.filter(block => block.position != position)
    setBlocks(tmpBlocks)
    setPossibleBlocks(recalculatePossibleBlocks(tmpBlocks))
  }

  function placeBlock(position: THREE.Vector3) {
    const tmpBlocks = blocks
    if (tmpBlocks.length === 0) {
        tmpBlocks.push(new BlockVO(position, 0));
    } else {
        tmpBlocks.push(new BlockVO(position, blocks.map((block) => block.key).reduce((one, two) => Math.max(one, two)) + 1));
    }
    setBlocks(tmpBlocks)
    setPossibleBlocks(recalculatePossibleBlocks(tmpBlocks))
  }

  function recalculatePossibleBlocks(blocks: Array<BlockVO>): Array<BlockVO> {
    const tmpBlocks = new Array<THREE.Vector3>()
    blocks.forEach((block) => {
        if (tmpBlocks.some(b => b.equals(block.position))) {
            tmpBlocks.splice(tmpBlocks.reduce((last, current, index) => current.equals(block.position) ? index : last, -1), 1)
        }
        let tmpPos = new THREE.Vector3()
        tmpPos.addVectors(block.position, new THREE.Vector3(1, 0, 0))
        if (!tmpBlocks.some(b => b.equals(tmpPos))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        tmpPos.addVectors(block.position, new THREE.Vector3(0, 1, 0))
        if (!tmpBlocks.some(b => b.equals(tmpPos))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        tmpPos.addVectors(block.position, new THREE.Vector3(0, 0, 1))
        if (!tmpBlocks.some(b => b.equals(tmpPos))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        tmpPos.addVectors(block.position, new THREE.Vector3(-1, 0, 0))
        if (!tmpBlocks.some(b => b.equals(tmpPos))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        tmpPos.addVectors(block.position, new THREE.Vector3(0, -1, 0))
        if (!tmpBlocks.some(b => b.equals(tmpPos))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        tmpPos.addVectors(block.position, new THREE.Vector3(0, 0, -1))
        if (!tmpBlocks.some(b => b.equals(tmpPos))) {
            tmpBlocks.push(tmpPos)
        }
    })
    if (tmpBlocks.length === 0) {
        tmpBlocks.push(new THREE.Vector3())
    }
    let key = blocks.length
    return tmpBlocks.map((position) => {return new BlockVO(position, key++)});
  }

  function setHover(position: THREE.Vector3, hovering: number, actual: boolean) {
    if (actual) {
        setBlocks(blocks.map((block) => {
            if (block.position.equals(position)) {
                block.hovering = hovering;
            }
            return block;
        }))
        if (!blocks.some((block) => block.hovering > -1)) {
            setBlocks(blocks.map((block) => {block.actuallyHovering = false; return block}))
        } else {
            const hoveringPosition = blocks.reduce((acc, cur) => {
                if (acc.hovering === -1) {
                    return cur;
                } else if (cur.hovering === -1) {
                    return acc;
                } else if (cur.hovering < acc.hovering) {
                    return cur;
                } else {
                    return acc;
                }
            }).position;
            setBlocks(blocks.map((block) => {
                if (block.position.equals(hoveringPosition)) {
                    block.actuallyHovering = true;
                } else {
                    block.actuallyHovering = false;
                }
                return block;
            }))
        }
    } else {
        setPossibleBlocks(possibleBlocks.map((block) => {
            if (block.position.equals(position)) {
                block.hovering = hovering;
            }
            return block;
        }))
        if (!possibleBlocks.some((block) => block.hovering > -1)) {
            setPossibleBlocks(possibleBlocks.map((block) => {block.actuallyHovering = false; return block}))
        } else {
            const hoveringPosition = possibleBlocks.reduce((acc, cur) => {
                if (acc.hovering === -1) {
                    return cur;
                } else if (cur.hovering === -1) {
                    return acc;
                } else if (cur.hovering < acc.hovering) {
                    return cur;
                } else {
                    return acc;
                }
            }).position;
            setPossibleBlocks(possibleBlocks.map((block) => {
                if (block.position.equals(hoveringPosition)) {
                    block.actuallyHovering = true;
                } else {
                    block.actuallyHovering = false;
                }
                return block;
            }))
        }
    }
  }

  const cameraPosition = props.cameraPosition.clone();
  cameraPosition.multiplyScalar(100);

  return (
    <div className="BuildView">
        <Canvas orthographic camera={{ zoom: 50, position: cameraPosition }} onContextMenu={(e) => {e.preventDefault()}}>
            <CameraHandler cameraPosition={cameraPosition} />
            <ambientLight />
            <directionalLight position={[1, 2, 0]} />
            {blocks.map(block => {
                return (
                    <Box key={block.key} position={block.position} deleteBlock={deleteBlock} placeBlock={placeBlock} actual={true} setHover={setHover} hover={block.actuallyHovering}/>
                )
            })}
            {possibleBlocks.map(block => {
                return (
                    <Box key={block.key} position={block.position} deleteBlock={deleteBlock} placeBlock={placeBlock} actual={false} setHover={setHover} hover={block.actuallyHovering}/>
                )
            })}
        </Canvas>
    </div>
  );
}

export default BuildView;
