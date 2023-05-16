import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import Box from './Box'

function BuildView() {
  const [blocks, setBlocks] = useState<Array<{position:THREE.Vector3, key:number}>>([
    {position: new THREE.Vector3(0, 0, 0), key: 0},
    {position: new THREE.Vector3(1, 0, 0), key: 1},
  ])

  const [possibleBlocks, setPossibleBlocks] = useState<Array<{position:THREE.Vector3, key:number}>>(recalculatePossibleBlocks(blocks))

  function deleteBlock(position: THREE.Vector3) {
    const tmpBlocks = blocks.filter(block => block.position != position)
    setBlocks(tmpBlocks)
    setPossibleBlocks(recalculatePossibleBlocks(tmpBlocks))
  }

  function placeBlock(position: THREE.Vector3) {
    const tmpBlocks = blocks
    if (tmpBlocks.length === 0) {
        tmpBlocks.push({position: position, key: 0})
    } else {
        tmpBlocks.push({position: position, key: blocks.map((block) => block.key).reduce((one, two) => Math.max(one, two)) + 1})
    }
    setBlocks(tmpBlocks)
    setPossibleBlocks(recalculatePossibleBlocks(tmpBlocks))
  }

  function recalculatePossibleBlocks(blocks: Array<{position:THREE.Vector3, key:number}>): Array<{position:THREE.Vector3, key:number}> {
    const tmpBlocks = new Array<THREE.Vector3>()
    blocks.forEach((block) => {
        if (tmpBlocks.includes(block.position)) {
            tmpBlocks.splice(tmpBlocks.indexOf(block.position), 1)
        }
        let tmpPos = new THREE.Vector3()
        if (!tmpBlocks.includes(tmpPos.addVectors(block.position, new THREE.Vector3(1, 0, 0)))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        if (!tmpBlocks.includes(tmpPos.addVectors(block.position, new THREE.Vector3(0, 1, 0)))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        if (!tmpBlocks.includes(tmpPos.addVectors(block.position, new THREE.Vector3(0, 0, 1)))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        if (!tmpBlocks.includes(tmpPos.addVectors(block.position, new THREE.Vector3(-1, 0, 0)))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        if (!tmpBlocks.includes(tmpPos.addVectors(block.position, new THREE.Vector3(0, -1, 0)))) {
            tmpBlocks.push(tmpPos)
        }
        tmpPos = new THREE.Vector3()
        if (!tmpBlocks.includes(tmpPos.addVectors(block.position, new THREE.Vector3(0, 0, -1)))) {
            tmpBlocks.push(tmpPos)
        }
    })
    if (tmpBlocks.length === 0) {
        tmpBlocks.push(new THREE.Vector3())
    }
    let key = blocks.length
    return tmpBlocks.map((position) => {return {position: position, key: key++}})
  }

  return (
    <div className="BuildView">
        <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 5, 5] }} onContextMenu={(e) => {e.preventDefault()}}>
            <ambientLight />
            <pointLight position={[10, -5, -10]} />
            {blocks.map(block => {
                return (
                    <Box key={block.key} position={block.position} deleteBlock={deleteBlock} placeBlock={placeBlock} actual={true}/>
                )
            })}
            {possibleBlocks.map(block => {
                return (
                    <Box key={block.key} position={block.position} deleteBlock={deleteBlock} placeBlock={placeBlock} actual={false}/>
                )
            })}
        </Canvas>
    </div>
  );
}

export default BuildView;
