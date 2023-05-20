import * as THREE from 'three'
import BlockVO from './../Data/BlockVO'

class DeleteChecker {
    private static directions = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 0, -1)]

    public static checkIfBlockIsDeletable(blockToCheck: BlockVO, blocks: Array<BlockVO>): boolean {
        const tmpBlocks = blocks.filter((block) => !block.position.equals(blockToCheck.position));
        const initialNeighbors = DeleteChecker.getNeighbors(blockToCheck, tmpBlocks);
        if (initialNeighbors.length <= 1) {
            return true;
        }
        for (let neighbor1 of initialNeighbors) {
            for (let neighbor2 of initialNeighbors) {
                if (neighbor1.position.equals(neighbor2.position)) {
                    continue;
                }
                if (!DeleteChecker.anyPathBetween(neighbor1, neighbor2, tmpBlocks)) {
                    return false;
                }
            }
        }
        return true;
    }

    private static anyPathBetween(start: BlockVO, end: BlockVO, blocks: Array<BlockVO>): boolean {
        let openSet: Array<BlockVO> = [start];

        const gScore: Map<BlockVO, number> = new Map();
        gScore.set(start, 0);

        const fScore: Map<BlockVO, number> = new Map();
        fScore.set(start, start.position.manhattanDistanceTo(end.position));

        while (openSet.length > 0) {
            const current = openSet.reduce((acc, cur) => {
                const fScoreAcc = fScore.get(acc)
                const fScoreCur = fScore.get(cur)
                if (fScoreAcc === undefined) {
                    return cur;
                } else if (fScoreCur === undefined) {
                    return acc;
                } else if (fScoreAcc < fScoreCur) {
                    return acc;
                } else {
                    return cur;
                }
            })
            if (current.position.equals(end.position)) {
                return true;
            }

            openSet = openSet.filter((block) => !block.position.equals(current.position));
            for (let neighbor of DeleteChecker.getNeighbors(current, blocks)) {
                const tentative_gScore = gScore.get(current)! + current.position.manhattanDistanceTo(neighbor.position)
                let gScoreNeighbor = gScore.get(neighbor);
                if (gScoreNeighbor === undefined) {
                    gScoreNeighbor = 4294967296;
                }
                if (tentative_gScore < gScoreNeighbor) {
                    gScore.set(neighbor, tentative_gScore);
                    fScore.set(neighbor, tentative_gScore + neighbor.position.manhattanDistanceTo(end.position))
                    if (!openSet.some((block) => block.position.equals(neighbor.position))) {
                        openSet.push(neighbor)
                    }
                }
            }
        }

        return false;
    }

    private static getNeighbors(current: BlockVO, blocks: Array<BlockVO>): Array<BlockVO> {
      const result = new Array<BlockVO>();
      DeleteChecker.directions.forEach((direction) => {
        const tmpDirection = direction.clone().add(current.position);
        const maybeBlocks = blocks.filter((block) => block.position.equals(tmpDirection));
        if (maybeBlocks.length >= 1) {
          if (current.connectsTo(maybeBlocks[0])) {
            result.push(maybeBlocks[0]);
          }
        }
      })
      return result;
    }
}

export default DeleteChecker;
