import * as THREE from 'three'
import { Vector3, Euler } from 'three'
import {ComponentType, FC} from 'react'
import ModelProps from './ModelProps'
import LargeBlockArmorBlock from './../Resources/LargeBlockArmorBlock'
import LargeBlockArmorSlope from './../Resources/LargeBlockArmorSlope'

class BlockTypeVO {
    key: number;
    displayName: string;
    xmlName: string;
    renderer: ComponentType<ModelProps>;
    active: boolean = false;
    connectivityPoints: Array<Vector3>;

    public constructor(key: number, displayName: string, xmlName: string, renderer: ComponentType<ModelProps>, connectivityPoints: Array<Vector3>, active: boolean = false) {
        this.key = key;
        this.displayName = displayName;
        this.xmlName = xmlName;
        this.renderer = renderer;
        this.active = active;
        this.connectivityPoints = connectivityPoints;
    }

    private static defaultFullFace: Array<Vector3> = [
        new Vector3(1, 0.5, 0.9), new Vector3(1, -0.5, 0.9), new Vector3(1, 0.9, 0.5), new Vector3(1, 0.9, -0.5), new Vector3(1, 0.5, -0.9), new Vector3(1, -0.5, -0.9), new Vector3(1, -0.9, 0.5), new Vector3(1, -0.9, -0.5),
        new Vector3(1, 0.5, 0.1), new Vector3(1, -0.5, 0.1), new Vector3(1, 0.1, 0.5), new Vector3(1, 0.1, -0.5), new Vector3(1, 0.5, -0.1), new Vector3(1, -0.5, -0.1), new Vector3(1, -0.1, 0.5), new Vector3(1, -0.1, -0.5)
    ];
    public static allBlockTypes: Array<BlockTypeVO> = [
      new BlockTypeVO(0, 'Light Armor Block', 'LargeBlockArmorBlock', LargeBlockArmorBlock,
        BlockTypeVO.defaultFullFace.
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*-0.5, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*0.5)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5))))
        , true),
      new BlockTypeVO(1, 'Light Armor Slope', 'LargeBlockArmorSlope', LargeBlockArmorSlope, [
        new Vector3(1, -0.5, 0.9), new Vector3(1, 0.9, -0.5), new Vector3(1, 0.5, -0.9), new Vector3(1, -0.5, -0.9), new Vector3(1, -0.9, 0.5), new Vector3(1, -0.9, -0.5),
        new Vector3(1, -0.5, 0.1), new Vector3(1, 0.1, -0.5), new Vector3(1, 0.5, -0.1), new Vector3(1, -0.5, -0.1), new Vector3(1, -0.1, 0.5), new Vector3(1, -0.1, -0.5),
        new Vector3(-1, -0.5, 0.9), new Vector3(-1, 0.9, -0.5), new Vector3(-1, 0.5, -0.9), new Vector3(-1, -0.5, -0.9), new Vector3(-1, -0.9, 0.5), new Vector3(-1, -0.9, -0.5),
        new Vector3(-1, -0.5, 0.1), new Vector3(-1, 0.1, -0.5), new Vector3(-1, 0.5, -0.1), new Vector3(-1, -0.5, -0.1), new Vector3(-1, -0.1, 0.5), new Vector3(-1, -0.1, -0.5)].
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5))))
        )
    ]

    public static getBlockTypeByXmlName(xmlName: string): BlockTypeVO {
      const maybeBlockTypes = BlockTypeVO.allBlockTypes.filter(blockType => blockType.xmlName === xmlName);
      if (maybeBlockTypes.length > 0) {
        return maybeBlockTypes[0];
      }
      return BlockTypeVO.allBlockTypes[0];
    }
}

export default BlockTypeVO;
