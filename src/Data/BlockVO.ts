import * as THREE from 'three'

class BlockVO {
    position: THREE.Vector3;
    key: number;
    hovering: number = -1;
    actuallyHovering: boolean = false;

    public constructor(position: THREE.Vector3, key: number) {
        this.position = position;
        this.key = key;
    }
}

export default BlockVO;