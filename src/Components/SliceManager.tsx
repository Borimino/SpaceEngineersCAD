import * as THREE from 'three'
import { useRef, useState, ChangeEvent } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import BlockVO from './../Data/BlockVO'

function SliceManager(props: {
    blocks: Array<BlockVO>,
    possibleBlocks: Array<BlockVO>,
    applySliceLimits: (min: THREE.Vector3, max: THREE.Vector3) => void,
    sliceLimitsMin: THREE.Vector3,
    sliceLimitsMax: THREE.Vector3,
    limitDirections: THREE.Vector3,
    applyDirectionLimits: (limitDirections: THREE.Vector3) => void}) {
  const minX: number = Math.min(props.blocks.length > 0 ? props.blocks.reduce((acc, cur) => acc.position.x < cur.position.x ? acc : cur).position.x : 0, props.possibleBlocks.length > 0 ? props.possibleBlocks.reduce((acc, cur) => acc.position.x < cur.position.x ? acc : cur).position.x : 0)
  const maxX: number = Math.max(props.blocks.length > 0 ? props.blocks.reduce((acc, cur) => acc.position.x > cur.position.x ? acc : cur).position.x : 0, props.possibleBlocks.length > 0 ? props.possibleBlocks.reduce((acc, cur) => acc.position.x > cur.position.x ? acc : cur).position.x : 0)
  const minY: number = Math.min(props.blocks.length > 0 ? props.blocks.reduce((acc, cur) => acc.position.y < cur.position.y ? acc : cur).position.y : 0, props.possibleBlocks.length > 0 ? props.possibleBlocks.reduce((acc, cur) => acc.position.y < cur.position.y ? acc : cur).position.y : 0)
  const maxY: number = Math.max(props.blocks.length > 0 ? props.blocks.reduce((acc, cur) => acc.position.y > cur.position.y ? acc : cur).position.y : 0, props.possibleBlocks.length > 0 ? props.possibleBlocks.reduce((acc, cur) => acc.position.y > cur.position.y ? acc : cur).position.y : 0)
  const minZ: number = Math.min(props.blocks.length > 0 ? props.blocks.reduce((acc, cur) => acc.position.z < cur.position.z ? acc : cur).position.z : 0, props.possibleBlocks.length > 0 ? props.possibleBlocks.reduce((acc, cur) => acc.position.z < cur.position.z ? acc : cur).position.z : 0)
  const maxZ: number = Math.max(props.blocks.length > 0 ? props.blocks.reduce((acc, cur) => acc.position.z > cur.position.z ? acc : cur).position.z : 0, props.possibleBlocks.length > 0 ? props.possibleBlocks.reduce((acc, cur) => acc.position.z > cur.position.z ? acc : cur).position.z : 0)

  function handleXChange(event: Event, value: number | number[]) {
    const min = props.sliceLimitsMin;
    const max = props.sliceLimitsMax;
    if (typeof value === 'number') {
      min.x = value;
      max.x = value;
    } else {
      min.x = value[0];
      max.x = value[1];
    }
    props.applySliceLimits(min, max)
  }

  function handleYChange(event: Event, value: number | number[]) {
    const min = props.sliceLimitsMin;
    const max = props.sliceLimitsMax;
    if (typeof value === 'number') {
      min.y = value;
      max.y = value;
    } else {
      min.y = value[0];
      max.y = value[1];
    }
    props.applySliceLimits(min, max)
  }

  function handleZChange(event: Event, value: number | number[]) {
    const min = props.sliceLimitsMin;
    const max = props.sliceLimitsMax;
    if (typeof value === 'number') {
      min.z = value;
      max.z = value;
    } else {
      min.z = value[0];
      max.z = value[1];
    }
    props.applySliceLimits(min, max)
  }

  function handleXCheck(event: ChangeEvent<HTMLInputElement>) {
    const limits = props.limitDirections;
    limits.x = event.target.checked ? 1 : 0;
    props.applyDirectionLimits(limits);
  }

  function handleYCheck(event: ChangeEvent<HTMLInputElement>) {
    const limits = props.limitDirections;
    limits.y = event.target.checked ? 1 : 0;
    props.applyDirectionLimits(limits);
  }

  function handleZCheck(event: ChangeEvent<HTMLInputElement>) {
    const limits = props.limitDirections;
    limits.z = event.target.checked ? 1 : 0;
    props.applyDirectionLimits(limits);
  }

  return (
    <div className="SliceManager">
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={handleXCheck} />} label="Limit expansion along X" />
        <Slider defaultValue={[0, 0]} step={1} marks min={minX} max={maxX} onChange={handleXChange} />
        <FormControlLabel control={<Checkbox onChange={handleYCheck} />} label="Limit expansion along Y" />
        <Slider defaultValue={[0, 0]} step={1} marks min={minY} max={maxY} onChange={handleYChange} />
        <FormControlLabel control={<Checkbox onChange={handleZCheck} />} label="Limit expansion along Z" />
        <Slider defaultValue={[0, 0]} step={1} marks min={minZ} max={maxZ} onChange={handleZChange} />
      </FormGroup>
    </div>
  );
}

export default SliceManager;