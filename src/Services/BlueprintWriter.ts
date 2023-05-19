import JSZip from 'jszip'
import BlockVO from './../Data/BlockVO'
import {text as blockXmlTemplate} from './../Resources/blockTemplate'
import {text as bpXmlTemplate} from './../Resources/bpTemplate'

class BlueprintWriter {
  public static writeBlueprint(blocks: Array<BlockVO>, gridName: string) {
    const blockXmls = blocks.map((block) => {
      return blockXmlTemplate.
        replace('(?BLOCK_NAME?)', 'LargeBlockArmorBlock').
        replace('(?X?)', String(block.position.x)).
        replace('(?Y?)', String(block.position.y)).
        replace('(?Z?)', String(block.position.z));
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
}

export default BlueprintWriter;