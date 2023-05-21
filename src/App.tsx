import React from 'react';
import * as THREE from 'three'
import { Vector3, Euler } from 'three'
import { useRef, useState } from 'react'
import './App.css';
import BuildView from './Components/Center/BuildView'
import LeftPanel from './Components/Left/LeftPanel'
import RightPanel from './Components/Right/RightPanel'
import BlockVO from './Data/BlockVO'
import BlockTypeVO from './Data/BlockTypeVO'
import DeleteChecker from './Services/DeleteChecker'
import BlueprintWriter from './Services/BlueprintWriter'

function App() {
  const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>(new THREE.Vector3(1, 1, 1))

  // Rotation handling start
  const [rotation, setRotation] = useState<THREE.Object3D>(new THREE.Object3D());
  function getRotationXAxis(): Vector3 {
    if (cameraPosition.x === 1) {
      if (cameraPosition.z === 1) {
        return new Vector3(1, 0, 0);
      } else {
        return new Vector3(0, 0, -1);
      }
    } else {
      if (cameraPosition.z === 1) {
        return new Vector3(0, 0, 1);
      } else {
        return new Vector3(-1, 0, 0);
      }
    }
    return new Vector3(1, 0, 0);
  }
  function getRotationZAxis(): Vector3 {
    if (cameraPosition.x === 1) {
      if (cameraPosition.z === 1) {
        return new Vector3(0, 0, 1);
      } else {
        return new Vector3(1, 0, 0);
      }
    } else {
      if (cameraPosition.z === 1) {
        return new Vector3(-1, 0, );
      } else {
        return new Vector3(0, 0, -1);
      }
    }
    return new Vector3(0, 0, 1);
  }
  function rotateX(up: boolean) {
    rotation.rotateOnWorldAxis(getRotationXAxis(), Math.PI*(up ? 0.5 : -0.5));
    setPossibleBlocks(recalculatePossibleBlocks(blocks));
  }
  function rotateY(up: boolean) {
    rotation.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI*(up ? 0.5 : -0.5));
    setPossibleBlocks(recalculatePossibleBlocks(blocks));
  }
  function rotateZ(up: boolean) {
    rotation.rotateOnWorldAxis(getRotationZAxis(), Math.PI*(up ? 0.5 : -0.5));
    setPossibleBlocks(recalculatePossibleBlocks(blocks));
  }
  function resetPossibleBlocks() {
    setPossibleBlocks(new Array<BlockVO>());
  }
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "KeyS") {
      resetPossibleBlocks();
    }
    if (event.code === "KeyW") {
      resetPossibleBlocks();
    }
    if (event.code === "KeyA") {
      resetPossibleBlocks();
    }
    if (event.code === "KeyD") {
      resetPossibleBlocks();
    }
    if (event.code === "KeyQ") {
      resetPossibleBlocks();
    }
    if (event.code === "KeyE") {
      resetPossibleBlocks();
    }
  }
  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "KeyS") {
      rotateX(true);
    }
    if (event.code === "KeyW") {
      rotateX(false);
    }
    if (event.code === "KeyA") {
      rotateY(false);
    }
    if (event.code === "KeyD") {
      rotateY(true);
    }
    if (event.code === "KeyQ") {
      rotateZ(true);
    }
    if (event.code === "KeyE") {
      rotateZ(false);
    }
  }
  // Rotation handling end

  // Block type handling start
  const [blockTypes, setBlockTypes] = useState<Array<BlockTypeVO>>(BlockTypeVO.allBlockTypes);
  function selectBlockType(key: number) {
    setBlockTypes(blockTypes.map((blockType) => {
      if (blockType.key === key) {
        blockType.active = true;
      } else {
        blockType.active = false;
      }
      return blockType;
    }))
    setPossibleBlocks(recalculatePossibleBlocks(blocks));
  }
  function getActiveBlockType() {
    return blockTypes.reduce((acc, cur) => {
      if (acc.active) {
        return acc;
      }
      return cur;
    })
  }
  // Block type handling end

  // Block handling start
  const [blocks, setBlocks] = useState<Array<BlockVO>>([])

  const [possibleBlocks, setPossibleBlocks] = useState<Array<BlockVO>>(recalculatePossibleBlocks(blocks))

  function deleteBlock(position: THREE.Vector3) {
    if (DeleteChecker.checkIfBlockIsDeletable(blocks.filter(block => block.position.equals(position))[0], blocks)) {
        const tmpBlocks = blocks.filter(block => block.position != position)
        setBlocks(tmpBlocks)
        setPossibleBlocks(recalculatePossibleBlocks(tmpBlocks))
    }
  }

  function placeBlock(position: THREE.Vector3) {
    const tmpBlocks = blocks
    if (tmpBlocks.length === 0) {
        tmpBlocks.push(new BlockVO(position, 0, getActiveBlockType(), rotation.rotation.clone()));
    } else {
        tmpBlocks.push(new BlockVO(position, blocks.map((block) => block.key).reduce((one, two) => Math.max(one, two)) + 1, getActiveBlockType(), rotation.rotation.clone()));
    }
    setBlocks(tmpBlocks)
    setPossibleBlocks(recalculatePossibleBlocks(tmpBlocks))
  }

  function recalculatePossibleBlocks(blocks: Array<BlockVO>): Array<BlockVO> {
    const tmpBlocks = new Array<BlockVO>()
    blocks.forEach((block) => {
      if (tmpBlocks.some(b => b.position.equals(block.position))) {
          tmpBlocks.splice(tmpBlocks.reduce((last, current, index) => current.position.equals(block.position) ? index : last, -1), 1)
      }
      let tmpPos = new Vector3()
      let tmpBlock = new BlockVO(tmpPos, 0, getActiveBlockType(), rotation.rotation);
      tmpPos.addVectors(block.position, new Vector3(1, 0, 0))
      if (!tmpBlocks.some(b => b.position.equals(tmpPos))) {
        if (block.connectsTo(tmpBlock)) {
          tmpBlocks.push(tmpBlock)
        }
      }
      tmpPos = new Vector3()
      tmpPos.addVectors(block.position, new Vector3(0, 1, 0))
      tmpBlock = new BlockVO(tmpPos, 0, getActiveBlockType(), rotation.rotation);
      if (!tmpBlocks.some(b => b.position.equals(tmpPos))) {
        if (block.connectsTo(tmpBlock)) {
          tmpBlocks.push(tmpBlock)
        }
      }
      tmpPos = new Vector3()
      tmpPos.addVectors(block.position, new Vector3(0, 0, 1))
      tmpBlock = new BlockVO(tmpPos, 0, getActiveBlockType(), rotation.rotation);
      if (!tmpBlocks.some(b => b.position.equals(tmpPos))) {
        if (block.connectsTo(tmpBlock)) {
          tmpBlocks.push(tmpBlock)
        }
      }
      tmpPos = new Vector3()
      tmpPos.addVectors(block.position, new Vector3(-1, 0, 0))
      tmpBlock = new BlockVO(tmpPos, 0, getActiveBlockType(), rotation.rotation);
      if (!tmpBlocks.some(b => b.position.equals(tmpPos))) {
        if (block.connectsTo(tmpBlock)) {
          tmpBlocks.push(tmpBlock)
        }
      }
      tmpPos = new Vector3()
      tmpPos.addVectors(block.position, new Vector3(0, -1, 0))
      tmpBlock = new BlockVO(tmpPos, 0, getActiveBlockType(), rotation.rotation);
      if (!tmpBlocks.some(b => b.position.equals(tmpPos))) {
        if (block.connectsTo(tmpBlock)) {
          tmpBlocks.push(tmpBlock)
        }
      }
      tmpPos = new Vector3()
      tmpPos.addVectors(block.position, new Vector3(0, 0, -1))
      tmpBlock = new BlockVO(tmpPos, 0, getActiveBlockType(), rotation.rotation);
      if (!tmpBlocks.some(b => b.position.equals(tmpPos))) {
        if (block.connectsTo(tmpBlock)) {
          tmpBlocks.push(tmpBlock)
        }
      }
    })
    if (tmpBlocks.length === 0) {
      if (blocks.length === 0) {
        tmpBlocks.push(new BlockVO(new Vector3(), 0, getActiveBlockType(), rotation.rotation));
      } else {
        return new Array<BlockVO>();
      }
    }
    let key = blocks.length
    return tmpBlocks.map((block) => {block.key = key++; return block});
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
        if (block.position.equals(position)) {
          block.removable = DeleteChecker.checkIfBlockIsDeletable(block, blocks);
        }
        return block;
      }))
    }
  }

  function resetBlocks(blocks: Array<BlockVO>) {
    setBlocks(blocks);
    setPossibleBlocks(recalculatePossibleBlocks(blocks));
  }
  // Block handling end

  // Slice limit handling start
  const [sliceLimitsMax, setSliceLimitsMax] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [sliceLimitsMin, setSliceLimitsMin] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  function applySliceLimits(min: THREE.Vector3, max: THREE.Vector3) {
    setSliceLimitsMin(min);
    setSliceLimitsMax(max);
    setPossibleBlocks(recalculatePossibleBlocks(blocks)); //Force a re-render
  }

  const [limitDirections, setLimitDirections] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  function applyDirectionLimits(limitDirections: THREE.Vector3) {
    console.log(limitDirections);
    setLimitDirections(limitDirections);
    setPossibleBlocks(recalculatePossibleBlocks(blocks)); //Force a re-render
  }
  // Slice limit handling end

  return (
    <div className="App" tabIndex={0} onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
        <LeftPanel
          cameraPosition={cameraPosition}
          onClick={(position: THREE.Vector3) => setCameraPosition(position)}
          blocks={blocks}
          resetBlocks={resetBlocks}
          blockTypes={blockTypes}
          selectBlockType={selectBlockType} />
        <BuildView
          cameraPosition={cameraPosition}
          blocks={blocks}
          possibleBlocks={possibleBlocks}
          deleteBlock={deleteBlock}
          placeBlock={placeBlock}
          setHover={setHover}
          sliceLimitsMin={sliceLimitsMin}
          sliceLimitsMax={sliceLimitsMax}
          limitDirections={limitDirections}
          />
        <RightPanel
          cameraPosition={cameraPosition}
          onClick={(position: THREE.Vector3) => setCameraPosition(position)}
          blocks={blocks}
          possibleBlocks={possibleBlocks}
          applySliceLimits={applySliceLimits}
          sliceLimitsMin={sliceLimitsMin}
          sliceLimitsMax={sliceLimitsMax}
          limitDirections={limitDirections}
          applyDirectionLimits={applyDirectionLimits} />
    </div>
  );
}

export default App;
