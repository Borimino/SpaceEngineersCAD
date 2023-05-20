import { Vector3, Euler } from 'three'
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
      const subtypeName = element.querySelector("SubtypeName");
      let name = "LargeBlockArmorBlock";
      if (subtypeName) {
        name = subtypeName.textContent!;
      }
      const min = element.querySelector("Min");
      let x = 0;
      let y = 0;
      let z = 0;
      if (min) {
        x = Number(min.getAttribute("x")!);
        y = Number(min.getAttribute("y")!);
        z = Number(min.getAttribute("z")!);
      }
      const blockOrientation = element.querySelector("BlockOrientation");
      let forward = "Forward";
      let up = "Up";
      if (blockOrientation) {
        forward = blockOrientation.getAttribute("Forward")!;
        up = blockOrientation.getAttribute("Up")!;
      }
      blocks.push(new BlockVO(new Vector3(x, y, z), index, BlockTypeVO.getBlockTypeByXmlName(name), BlueprintLoader.getRotationFromForwardAndUp(forward, up)));
    })
    resetBlocks(blocks);
  }

  private static getRotationFromForwardAndUp(forward: string, up: string) {
    switch (forward) {
      case "Forward":
        switch (up) {
          case "Up":
            return new Euler(0, 0, 0);
            break;
          case "Left":
            return new Euler(0, 0, Math.PI*0.5);
            break;
          case "Down":
            return new Euler(Math.PI*1, Math.PI*1, 0);
            break;
          case "Right":
            return new Euler(0, 0, Math.PI*-0.5);
            break;
        }
        break;
      case "Up":
        switch (up) {
          case "Forward":
            return new Euler(Math.PI*0.5, 0, 0);
            break;
          case "Left":
            return new Euler(Math.PI*0.5, Math.PI*0.5, 0);
            break;
          case "Backward":
            return new Euler(Math.PI*0.5, Math.PI*1, 0);
            break;
          case "Right":
            return new Euler(Math.PI*0.5, Math.PI*-0.5, 0);
            break;
        }
        break;
      case "Left":
        switch (up) {
          case "Forward":
            return new Euler(Math.PI*-0.5, 0, Math.PI*-0.5);
            break;
          case "Up":
            return new Euler(0, Math.PI*-0.5, 0);
            break;
          case "Backward":
            return new Euler(Math.PI*1, Math.PI*0.5, 0);
            break;
          case "Down":
            return new Euler(Math.PI*1, Math.PI*0.5, 0);
            break;
        }
        break;
      case "Backward":
        switch (up) {
          case "Up":
            return new Euler(0, Math.PI*1, 0);
            break;
          case "Left":
            return new Euler(Math.PI*1, 0, Math.PI*-0.5);
            break;
          case "Down":
            return new Euler(Math.PI*1, 0, 0);
            break;
          case "Right":
            return new Euler(Math.PI*1, 0, Math.PI*0.5);
            break;
        }
        break;
      case "Down":
        switch (up) {
          case "Forward":
            return new Euler(Math.PI*-0.5, 0, 0);
            break;
          case "Left":
            return new Euler(Math.PI*-0.5, Math.PI*-0.5, 0);
            break;
          case "Backward":
            return new Euler(Math.PI*-0.5, Math.PI*1, 0);
            break;
          case "Right":
            return new Euler(Math.PI*-0.5, Math.PI*0.5, 0);
            break;
        }
        break;
      case "Right":
        switch (up) {
          case "Forward":
            return new Euler(Math.PI*-0.5, 0, Math.PI*0.5);
            break;
          case "Up":
            return new Euler(0, Math.PI*0.5, 0);
            break;
          case "Backward":
            return new Euler(Math.PI*0.5, 0, Math.PI*-0.5);
            break;
          case "Down":
            return new Euler(Math.PI*1, Math.PI*-0.5, 0);
            break;
        }
        break;
    }
  }
}

export default BlueprintLoader;