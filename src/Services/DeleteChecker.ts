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

    public static checkIfBlockIsDeletable(position: THREE.Vector3, blocks: Array<BlockVO>): boolean {
        const tmpBlocks = blocks.filter((block) => !block.position.equals(position));
        const initialNeighbors = DeleteChecker.getNeighbors(position, tmpBlocks);
        if (initialNeighbors.length <= 1) {
            return true;
        }
        for (let neighbor1 of initialNeighbors) {
            for (let neighbor2 of initialNeighbors) {
                if (neighbor1.equals(neighbor2)) {
                    continue;
                }
                if (!DeleteChecker.anyPathBetween(neighbor1, neighbor2, tmpBlocks)) {
                    return false;
                }
            }
        }
        return true;
    }

    private static anyPathBetween(start: THREE.Vector3, end: THREE.Vector3, blocks: Array<BlockVO>): boolean {
        let openSet: Array<THREE.Vector3> = [start];

        const gScore: Map<THREE.Vector3, number> = new Map();
        gScore.set(start, 0);

        const fScore: Map<THREE.Vector3, number> = new Map();
        fScore.set(start, start.manhattanDistanceTo(end));

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
            if (current.equals(end)) {
                return true;
            }

            openSet = openSet.filter((block) => !block.equals(current));
            for (let neighbor of DeleteChecker.getNeighbors(current, blocks)) {
                const tentative_gScore = gScore.get(current)! + current.manhattanDistanceTo(neighbor)
                let gScoreNeighbor = gScore.get(neighbor);
                if (gScoreNeighbor === undefined) {
                    gScoreNeighbor = 4294967296;
                }
                if (tentative_gScore < gScoreNeighbor) {
                    gScore.set(neighbor, tentative_gScore);
                    fScore.set(neighbor, tentative_gScore + neighbor.manhattanDistanceTo(end))
                    if (!openSet.some((block) => block.equals(neighbor))) {
                        openSet.push(neighbor)
                    }
                }
            }
        }

        return false;
    }

    private static getNeighbors(position: THREE.Vector3, blocks: Array<BlockVO>): Array<THREE.Vector3> {
        const result = new Array<THREE.Vector3>();
        DeleteChecker.directions.forEach((direction) => {
            const tmpDirection = direction.clone();
            tmpDirection.add(position);
            const maybeBlocks = blocks.filter((block) => block.position.equals(tmpDirection));
            if (maybeBlocks.length >= 1) {
                result.push(maybeBlocks[0].position);
            }
        })
        return result;
    }
}

export default DeleteChecker;
