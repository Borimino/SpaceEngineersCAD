import * as THREE from 'three'
import BlockTypeVO from './BlockTypeVO'

class BlockVO {
    position: THREE.Vector3;
    key: number;
    hovering: number = -1;
    actuallyHovering: boolean = false;
    removable: boolean = true;
    blockType: BlockTypeVO;

    public constructor(position: THREE.Vector3, key: number, blockType: BlockTypeVO) {
        this.position = position;
        this.key = key;
        this.blockType = blockType;
    }
}

export default BlockVO;