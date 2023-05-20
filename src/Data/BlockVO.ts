import * as THREE from 'three'
import BlockTypeVO from './BlockTypeVO'

class BlockVO {
    position: THREE.Vector3;
    key: number;
    hovering: number = -1;
    actuallyHovering: boolean = false;
    removable: boolean = true;
    blockType: BlockTypeVO;
    rotation: THREE.Euler = new THREE.Euler();

    public constructor(position: THREE.Vector3, key: number, blockType: BlockTypeVO, rotation: THREE.Euler = new THREE.Euler()) {
        this.position = position;
        this.key = key;
        this.blockType = blockType;
        this.rotation = rotation;
    }
}

export default BlockVO;