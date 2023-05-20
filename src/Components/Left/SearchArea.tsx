import * as THREE from 'three'
import { useRef, useState, ChangeEvent, ComponentType } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LargeBlockArmorBlock from './../../Resources/LargeBlockArmorBlock'
import LargeBlockArmorSlope from './../../Resources/LargeBlockArmorSlope'
import BlockTypeVO from './../../Data/BlockTypeVO'
import ModelProps from './../../Data/ModelProps'

function SearchArea(props: {
    blockTypes: Array<BlockTypeVO>,
    selectBlockType: (key: number) => void }) {

  return (
    <div className="SearchArea">
      <TextField id="searchbar" label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {props.blockTypes.map((blockType) => {
//        console.log(              blockType.renderer({color:new THREE.Color("white"), opacity:1, transparent:false, position:[0, 0, 0], scale:1/(1.25*2)}) )
//        const CustomTag = `${blockType.xmlName}` as keyof React.ElementType<React.HTMLAttributes<HTMLElement>>;
        const CustomTag: ComponentType<ModelProps> = blockType.renderer;
//        const CustomTag: ComponentType = LargeBlockArmorBlock;
        return (
          <div className={"SearchResult" + (blockType.active ? " SelectedSearchResult" : "")} key={blockType.key}>
            <Canvas orthographic camera={{ zoom: 25, position: new THREE.Vector3(1, 1, 1) }} onContextMenu={(e) => e.preventDefault()}>
              <ambientLight />
              <directionalLight position={[1, 2, 0]} />
              <CustomTag
                color={new THREE.Color("white")}
                opacity={1}
                position={new THREE.Vector3(0, 0, 0)}
                scale={1/(1.25*2)}
                transparent={false}
                rotation={new THREE.Euler()}
                onClick={(e) => props.selectBlockType(blockType.key)}
                onContextMenu={(e) => {}}
                onPointerLeave={(e) => {}}
                onPointerEnter={(e) => {}}
                />
            </Canvas>
          </div>
        )
      })}
    </div>
  )
}

export default SearchArea;