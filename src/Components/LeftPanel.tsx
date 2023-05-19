import * as THREE from 'three'
import { useRef, useState, ChangeEvent } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import OrientationCube from './OrientationCube'
import CameraHandler from './CameraHandler'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import BlueprintWriter from './../Services/BlueprintWriter'
import BlueprintLoader from './../Services/BlueprintLoader'
import BlockVO from './../Data/BlockVO'

function LeftPanel(props: {cameraPosition: THREE.Vector3, onClick: (position: THREE.Vector3) => void, blocks: Array<BlockVO>, resetBlocks: (blocks: Array<BlockVO>) => void}) {
  const [gridName, setGridName] = useState<string>("");
  function handleGridName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setGridName(event.target.value)
  }

  function writeBlueprint() {
    BlueprintWriter.writeBlueprint(props.blocks, gridName);
  }

  function loadBlueprint(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      if (typeof result === 'string') {
        BlueprintLoader.loadBlueprint(props.resetBlocks, result);
      }
    }
    reader.readAsBinaryString(file);
  }

  return (
    <div className="LeftPanel">
      <div className="SearchArea">
        <TextField id="searchbar" label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <p>
          Future list of blocks
        </p>
      </div>
      <div className="SaveLoadMenu">
        <TextField id="gridName" label="Grid name" value={gridName} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleGridName(e)}/>
        <Tooltip title='Unzip the zip-file into C:\Users\<username>\AppData\Roaming\SpaceEngineers\Blueprints\local'>
          <Button variant="contained" onClick={writeBlueprint}>Save</Button>
        </Tooltip>
        <Tooltip title='Load the .sbc file located in C:\Users\<username>\AppData\Roaming\SpaceEngineers\Blueprints\local\<blueprintname>'>
          <Button variant="contained" component="label">
            Load
            <input type="file" accept=".sbc" hidden onChange={loadBlueprint} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default LeftPanel;
