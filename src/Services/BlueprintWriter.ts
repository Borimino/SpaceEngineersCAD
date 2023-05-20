import { Vector3, Euler } from 'three'
import JSZip from 'jszip'
import BlockVO from './../Data/BlockVO'
import {text as blockXmlTemplate} from './../Resources/blockTemplate'
import {text as bpXmlTemplate} from './../Resources/bpTemplate'

class BlueprintWriter {
  public static writeBlueprint(blocks: Array<BlockVO>, gridName: string) {
    const blockXmls = blocks.map((block) => {
      return blockXmlTemplate.
        replace('(?BLOCK_NAME?)', block.blockType.xmlName).
        replace('(?X?)', String(block.position.x)).
        replace('(?Y?)', String(block.position.y)).
        replace('(?Z?)', String(block.position.z)).
        replace('(?FORWARD?)', BlueprintWriter.getForward(block.rotation)).
        replace('(?UP?)', BlueprintWriter.getUp(block.rotation));
    })
    const bpXml = bpXmlTemplate.replace('(?GRID_NAME?)', gridName).replace('(?BLOCKS?)', blockXmls.join(""))
    console.log(bpXml);

    const zip = new JSZip();
    const folder = zip.folder(gridName)!;
    folder.file("bp.sbc", bpXml);

    zip.generateAsync({type:"blob"}).then(function(content: Blob) {
      BlueprintWriter.saveAs(content, gridName + ".zip");
    })
  }

  private static saveAs(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
  }

  private static getForward(rotation: Euler): string {
    if (rotation.x < 0.01 && rotation.y < 0.01) {
      return "Forward";
    }
    if (Math.abs(rotation.x-Math.PI*1) < 0.01 && rotation.y < 0.01) {
      return "Backward";
    }
    if (Math.abs(rotation.x-Math.PI*0.5) < 0.01) {
      if (rotation.z < 0.01) {
        return "Up";
      }
      if (Math.abs(rotation.z-Math.PI*1) < 0.01) {
        return "Down";
      }
      if (Math.abs(rotation.z-Math.PI*-0.5) < 0.01) {
        return "Right";
      }
      if (Math.abs(rotation.z-Math.PI*0.5) < 0.01) {
        return "Left";
      }
    }
    if (Math.abs(rotation.x-Math.PI*-0.5) < 0.01) {
      if (rotation.z < 0.01) {
        return "Down";
      }
      if (Math.abs(rotation.z-Math.PI*1) < 0.01) {
        return "Up";
      }
      if (Math.abs(rotation.z-Math.PI*-0.5) < 0.01) {
        return "Left";
      }
      if (Math.abs(rotation.z-Math.PI*0.5) < 0.01) {
        return "Right";
      }
    }
    return "null"
  }

  private static getUp(rotation: Euler): string {
    if (rotation.x < 0.01 && rotation.z < 0.01) {
      return "Up";
    }
    if (Math.abs(rotation.x-Math.PI*1) < 0.01 && rotation.z < 0.01) {
      return "Down";
    }
    if (Math.abs(rotation.x-Math.PI*0.5) < 0.01) {
      if (rotation.y < 0.01) {
        return "Back";
      }
      if (Math.abs(rotation.y-Math.PI*0.5) < 0.01) {
        return "Right";
      }
      if (Math.abs(rotation.y-Math.PI*-0.5) < 0.01) {
        return "Left";
      }
    }
    if (Math.abs(rotation.x-Math.PI*-0.5) < 0.01) {
      if (rotation.y < 0.01) {
        return "Front";
      }
      if (Math.abs(rotation.y-Math.PI*0.5) < 0.01) {
        return "Right";
      }
      if (Math.abs(rotation.y-Math.PI*-0.5) < 0.01) {
        return "Left";
      }
    }
    return "null"
  }
}

export default BlueprintWriter;