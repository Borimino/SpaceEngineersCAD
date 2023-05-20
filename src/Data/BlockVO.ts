import * as THREE from 'three'
import { Vector3, Euler } from 'three'
import BlockTypeVO from './BlockTypeVO'

class BlockVO {
    position: Vector3;
    key: number;
    hovering: number = -1;
    actuallyHovering: boolean = false;
    removable: boolean = true;
    blockType: BlockTypeVO;
    rotation: Euler = new THREE.Euler();

    public constructor(position: Vector3, key: number, blockType: BlockTypeVO, rotation: Euler = new Euler()) {
        this.position = position;
        this.key = key;
        this.blockType = blockType;
        this.rotation = rotation;
    }

    public connectsTo(other: BlockVO): boolean {
      let connectionFound = false;
      this.blockType.connectivityPoints.forEach(point1 => {
        const thisPoint = point1.clone().multiplyScalar(0.5).applyEuler(this.rotation).add(this.position);
        other.blockType.connectivityPoints.forEach(point2 => {
          const otherPoint = point2.clone().multiplyScalar(0.5).applyEuler(other.rotation).add(other.position);
          if ( thisPoint.distanceTo(otherPoint) < 0.01 ) {
            connectionFound = true;
            return;
          }
        })
      })
      return connectionFound;
    }
}

export default BlockVO;