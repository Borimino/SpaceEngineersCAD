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
    const bpXml = bpXmlTemplate.replaceAll('(?GRID_NAME?)', gridName).replace('(?BLOCKS?)', blockXmls.join(""))
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

  private static isAngle(angle: number, near: number): boolean {
    return Math.abs(angle - Math.PI*near) < 0.01;
  }

  public static getForward(rotation: Euler): string {
    if (BlueprintWriter.isAngle(rotation.x, 0)) {
      if (BlueprintWriter.isAngle(rotation.y, 0)) {
        return "Forward";
      } else if (BlueprintWriter.isAngle(rotation.y, -0.5)) {
        return "Left";
      } else if (BlueprintWriter.isAngle(rotation.y, 0.5)) {
        return "Right";
      } else if (BlueprintWriter.isAngle(rotation.y, 1)) {
        return "Backward";
      }
    }
    if (BlueprintWriter.isAngle(rotation.x, 1) || BlueprintWriter.isAngle(rotation.x, -1)) {
      if (BlueprintWriter.isAngle(rotation.y, 0)) {
        return "Backward";
      } else if (BlueprintWriter.isAngle(rotation.y, -0.5)) {
        return "Right";
      } else if (BlueprintWriter.isAngle(rotation.y, 0.5)) {
        return "Left";
      } else if (BlueprintWriter.isAngle(rotation.y, 1) || BlueprintWriter.isAngle(rotation.y, -1)) {
        return "Forward";
      }
    }
    if (BlueprintWriter.isAngle(rotation.x, 0.5)) {
      if (BlueprintWriter.isAngle(rotation.z, 0)) {
        return "Up";
      }
      if (BlueprintWriter.isAngle(rotation.z, 1) || BlueprintWriter.isAngle(rotation.z, -1)) {
        return "Down";
      }
      if (BlueprintWriter.isAngle(rotation.z, -0.5)) {
        return "Right";
      }
      if (BlueprintWriter.isAngle(rotation.z, 0.5)) {
        return "Left";
      }
    }
    if (BlueprintWriter.isAngle(rotation.x, -0.5)) {
      if (BlueprintWriter.isAngle(rotation.z, 0)) {
        return "Down";
      }
      if (BlueprintWriter.isAngle(rotation.z, 1) || BlueprintWriter.isAngle(rotation.z, -1)) {
        return "Up";
      }
      if (BlueprintWriter.isAngle(rotation.z, -0.5)) {
        return "Left";
      }
      if (BlueprintWriter.isAngle(rotation.z, 0.5)) {
        return "Right";
      }
    }
    return "null"
  }

  public static getUp(rotation: Euler): string {
    if (BlueprintWriter.isAngle(rotation.x, 0)) {
      if (BlueprintWriter.isAngle(rotation.z, 0)) {
        return "Up";
      } else if (BlueprintWriter.isAngle(rotation.z, 1) || BlueprintWriter.isAngle(rotation.z, -1)) {
        return "Down";
      } else if (BlueprintWriter.isAngle(rotation.z, 0.5)) {
        return "Left";
      } else if (BlueprintWriter.isAngle(rotation.z, -0.5)) {
        return "Right";
      }
    }
    if (BlueprintWriter.isAngle(rotation.x, 1) || BlueprintWriter.isAngle(rotation.x, -1)) {
      if (BlueprintWriter.isAngle(rotation.z, 0)) {
        return "Down";
      } else if (BlueprintWriter.isAngle(rotation.z, 1) || BlueprintWriter.isAngle(rotation.z, -1)) {
        return "Up";
      } else if (BlueprintWriter.isAngle(rotation.z, 0.5)) {
        return "Right";
      } else if (BlueprintWriter.isAngle(rotation.z, -0.5)) {
        return "Left";
      }
    }
    if (BlueprintWriter.isAngle(rotation.x, 0.5)) {
      if (BlueprintWriter.isAngle(rotation.y, 0)) {
        return "Back";
      }
      if (BlueprintWriter.isAngle(rotation.y, 0.5)) {
        return "Left";
      }
      if (BlueprintWriter.isAngle(rotation.y, -0.5)) {
        return "Right";
      }
    }
    if (BlueprintWriter.isAngle(rotation.x, -0.5)) {
      if (BlueprintWriter.isAngle(rotation.y, 0)) {
        return "Front";
      }
      if (BlueprintWriter.isAngle(rotation.y, 0.5)) {
        return "Right";
      }
      if (BlueprintWriter.isAngle(rotation.y, -0.5)) {
        return "Left";
      }
    }
    return "null"
  }
}

export default BlueprintWriter;