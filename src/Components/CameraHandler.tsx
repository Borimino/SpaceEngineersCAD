import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

function CameraHandler(props: {cameraPosition: THREE.Vector3}) {
  const [lerpOpposite, setLerpOpposite] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  useFrame((state) => {
    const currentPosition = state.camera.position.clone();
    if (lerpOpposite.distanceTo(currentPosition)/currentPosition.length() < 0.2) {
        setLerpOpposite(new THREE.Vector3(0, 0, 0));
    }
    if (!lerpOpposite.equals(new THREE.Vector3(0, 0, 0))) {
        state.camera.position.lerp(lerpOpposite, 0.05);
    } else {
        if (Math.sign(currentPosition.x) != Math.sign(props.cameraPosition.x) && Math.sign(currentPosition.z) != Math.sign(props.cameraPosition.z)) {
            const tmpPosition = props.cameraPosition.clone();
            tmpPosition.x = -1*tmpPosition.x;
            setLerpOpposite(tmpPosition);
            state.camera.position.lerp(tmpPosition, 0.05);
        } else {
            state.camera.position.lerp(props.cameraPosition, 0.05);
        }
    }
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix()
  })
  return (
    <>
    </>
  );
}

export default CameraHandler;
