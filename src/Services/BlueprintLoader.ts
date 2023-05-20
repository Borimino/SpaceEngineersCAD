import * as THREE from 'three'
import BlockVO from './../Data/BlockVO'
import BlockTypeVO from './../Data/BlockTypeVO'
import LargeBlockArmorBlock from './../Resources/LargeBlockArmorBlock'

class BlueprintLoader {
  public static loadBlueprint(resetBlocks: (blocks: Array<BlockVO>) => void, xml: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    const errorNode = doc.querySelector("parseerror");
    if (errorNode) {
      console.log("error while parsing");
      console.log(errorNode);
      return;
    }
    const cubeBlocks = doc.querySelectorAll("MyObjectBuilder_CubeBlock");
    const blocks = new Array<BlockVO>()
    cubeBlocks.forEach((element, index) => {
      const min = element.querySelector("Min");
      let x = 0;
      let y = 0;
      let z = 0;
      if (min) {
        x = Number(min.getAttribute("x")!);
        y = Number(min.getAttribute("y")!);
        z = Number(min.getAttribute("z")!);
      }
      blocks.push(new BlockVO(new THREE.Vector3(x, y, z), index, BlockTypeVO.allBlockTypes[0]));
    })
    resetBlocks(blocks);
  }
}

export default BlueprintLoader;