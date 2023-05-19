import React from 'react';
import * as THREE from 'three'
import { useRef, useState } from 'react'
import './App.css';
import BuildView from './Components/BuildView'
import LeftPanel from './Components/LeftPanel'
import BlockVO from './Data/BlockVO'
import DeleteChecker from './Services/DeleteChecker'

function App() {
  const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>(new THREE.Vector3(1, 1, 1))

  // Block handling start
  const [blocks, setBlocks] = useState<Array<BlockVO>>([
    new BlockVO(new THREE.Vector3(0, 0, 0), 0),
    new BlockVO(new THREE.Vector3(1, 0, 0), 1)
  ])

  const [possibleBlocks, setPossibleBlocks] = useState<Array<BlockVO>>(recalculatePossibleBlocks(blocks))

  function deleteBlock(position: THREE.Vector3) {
    if (DeleteChecker.checkIfBlockIsDeletable(position, blocks)) {
        const tmpBlocks = blocks.filter(block => block.position != position)
        setBlocks(tmpBlocks)
        setPossibleBlocks(recalculatePossibleBlocks(tmpBlocks))
    }
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
    setRemovable(position, actual);
  }

  function setRemovable(position: THREE.Vector3, actual: boolean) {
    if (actual) {
        setBlocks(blocks.map((block) => {
            block.removable = DeleteChecker.checkIfBlockIsDeletable(block.position, blocks);
            return block;
        }))
    }
  }

  function resetBlocks(blocks: Array<BlockVO>) {
    setBlocks(blocks);
    setPossibleBlocks(recalculatePossibleBlocks(blocks));
  }
  // Block handling end

  return (
    <div className="App">
        <LeftPanel cameraPosition={cameraPosition} onClick={(position: THREE.Vector3) => setCameraPosition(position)} blocks={blocks} resetBlocks={resetBlocks} />
        <BuildView cameraPosition={cameraPosition} blocks={blocks} possibleBlocks={possibleBlocks} deleteBlock={deleteBlock} placeBlock={placeBlock} setHover={setHover} />
    </div>
  );
}

export default App;
