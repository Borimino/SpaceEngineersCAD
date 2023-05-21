import * as THREE from 'three'
import { Vector3, Euler } from 'three'
import {ComponentType, FC} from 'react'
import ModelProps from './ModelProps'
import LargeBlockArmorBlock from './../Resources/LargeBlockArmorBlock'
import LargeBlockArmorSlope from './../Resources/LargeBlockArmorSlope'
import LargeBlockArmorCorner from './../Resources/LargeBlockArmorCorner'
import LargeBlockArmorCornerInv from './../Resources/LargeBlockArmorCornerInv'
import LargeBlockArmorCornerSquare from './../Resources/LargeBlockArmorCornerSquare'
import LargeBlockArmorCornerSquareInverted from './../Resources/LargeBlockArmorCornerSquareInverted'
import LargeBlockArmorRoundSlope from './../Resources/LargeBlockArmorRoundSlope'
import LargeBlockArmorRoundCorner from './../Resources/LargeBlockArmorRoundCorner'
import LargeBlockArmorRoundCornerInv from './../Resources/LargeBlockArmorRoundCornerInv'
import LargeBlockArmorSlope2Base from './../Resources/LargeBlockArmorSlope2Base'
import LargeBlockArmorSlope2Tip from './../Resources/LargeBlockArmorSlope2Tip'
import LargeHalfArmorBlock from './../Resources/LargeHalfArmorBlock'
import LargeHalfSlopeArmorBlock from './../Resources/LargeHalfSlopeArmorBlock'
import LargeBlockArmorHalfSlopeCorner from './../Resources/LargeBlockArmorHalfSlopeCorner'
import LargeBlockArmorHalfCorner from './../Resources/LargeBlockArmorHalfCorner'
import LargeBlockArmorHalfSlopedCorner from './../Resources/LargeBlockArmorHalfSlopedCorner'
import LargeBlockArmorCorner2Base from './../Resources/LargeBlockArmorCorner2Base'
import LargeBlockArmorCorner2Tip from './../Resources/LargeBlockArmorCorner2Tip'
import LargeBlockArmorInvCorner2Base from './../Resources/LargeBlockArmorInvCorner2Base'
import LargeBlockArmorInvCorner2Tip from './../Resources/LargeBlockArmorInvCorner2Tip'
import LargeBlockArmorHalfSlopeCornerInverted from './../Resources/LargeBlockArmorHalfSlopeCornerInverted'
import LargeBlockArmorHalfSlopeInverted from './../Resources/LargeBlockArmorHalfSlopeInverted'

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
    private static cornerX(xCoord: number, yNot: number, zNot: number): Array<Vector3> {
      const result = new Array<Vector3>();
      if (yNot > 0 && zNot > 0) {
        result.push(new Vector3(xCoord, -0.5, -0.9))
        result.push(new Vector3(xCoord, -0.9, -0.5))
        result.push(new Vector3(xCoord, -0.5, -0.1))
        result.push(new Vector3(xCoord, -0.1, -0.5))
      }
      if (yNot < 0 && zNot > 0) {
        result.push(new Vector3(xCoord, 0.5, -0.9))
        result.push(new Vector3(xCoord, 0.9, -0.5))
        result.push(new Vector3(xCoord, 0.5, -0.1))
        result.push(new Vector3(xCoord, 0.1, -0.5))
      }
      if (yNot > 0 && zNot < 0) {
        result.push(new Vector3(xCoord, -0.5, 0.9))
        result.push(new Vector3(xCoord, -0.9, 0.5))
        result.push(new Vector3(xCoord, -0.5, 0.1))
        result.push(new Vector3(xCoord, -0.1, 0.5))
      }
      if (yNot < 0 && zNot < 0) {
        result.push(new Vector3(xCoord, 0.5, 0.9))
        result.push(new Vector3(xCoord, 0.9, 0.5))
        result.push(new Vector3(xCoord, 0.5, 0.1))
        result.push(new Vector3(xCoord, 0.1, 0.5))
      }
      return result;
    }
    private static cornerY(yCoord: number, xNot: number, zNot: number): Array<Vector3> {
      const result = new Array<Vector3>();
      if (xNot > 0 && zNot > 0) {
        result.push(new Vector3(-0.5, yCoord, -0.9))
        result.push(new Vector3(-0.9, yCoord, -0.5))
        result.push(new Vector3(-0.5, yCoord, -0.1))
        result.push(new Vector3(-0.1, yCoord, -0.5))
      }
      if (xNot < 0 && zNot > 0) {
        result.push(new Vector3(0.5, yCoord, -0.9))
        result.push(new Vector3(0.9, yCoord, -0.5))
        result.push(new Vector3(0.5, yCoord, -0.1))
        result.push(new Vector3(0.1, yCoord, -0.5))
      }
      if (xNot > 0 && zNot < 0) {
        result.push(new Vector3(-0.5, yCoord, 0.9))
        result.push(new Vector3(-0.9, yCoord, 0.5))
        result.push(new Vector3(-0.5, yCoord, 0.1))
        result.push(new Vector3(-0.1, yCoord, 0.5))
      }
      if (xNot < 0 && zNot < 0) {
        result.push(new Vector3(0.5, yCoord, 0.9))
        result.push(new Vector3(0.9, yCoord, 0.5))
        result.push(new Vector3(0.5, yCoord, 0.1))
        result.push(new Vector3(0.1, yCoord, 0.5))
      }
      return result;
    }
    private static cornerZ(zCoord: number, xNot: number, yNot: number): Array<Vector3> {
      const result = new Array<Vector3>();
      if (xNot > 0 && yNot > 0) {
        result.push(new Vector3(-0.5, -0.9, zCoord))
        result.push(new Vector3(-0.9, -0.5, zCoord))
        result.push(new Vector3(-0.5, -0.1, zCoord))
        result.push(new Vector3(-0.1, -0.5, zCoord))
      }
      if (xNot < 0 && yNot > 0) {
        result.push(new Vector3(0.5, -0.9, zCoord))
        result.push(new Vector3(0.9, -0.5, zCoord))
        result.push(new Vector3(0.5, -0.1, zCoord))
        result.push(new Vector3(0.1, -0.5, zCoord))
      }
      if (xNot > 0 && yNot < 0) {
        result.push(new Vector3(-0.5, 0.9, zCoord))
        result.push(new Vector3(-0.9, 0.5, zCoord))
        result.push(new Vector3(-0.5, 0.1, zCoord))
        result.push(new Vector3(-0.1, 0.5, zCoord))
      }
      if (xNot < 0 && yNot < 0) {
        result.push(new Vector3(0.5, 0.9, zCoord))
        result.push(new Vector3(0.9, 0.5, zCoord))
        result.push(new Vector3(0.5, 0.1, zCoord))
        result.push(new Vector3(0.1, 0.5, zCoord))
      }
      return result;
    }
    public static allBlockTypes: Array<BlockTypeVO> = [
      new BlockTypeVO(0, 'Light Armor Block', 'LargeBlockArmorBlock', LargeBlockArmorBlock,
        BlockTypeVO.defaultFullFace. // X Positive
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0)))).  // Z Positive
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*-0.5, 0)))). // Z Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0)))). // X Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*0.5)))). // Y Positive
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5)))) // Y Negative
        , true),
      new BlockTypeVO(1, 'Light Armor Slope', 'LargeBlockArmorSlope', LargeBlockArmorSlope,
        BlockTypeVO.cornerX(1, 1, 1).
        concat(BlockTypeVO.cornerX(-1, 1, 1)).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5))))
        ),
      new BlockTypeVO(2, 'Light Armor Corner', 'LargeBlockArmorCorner', LargeBlockArmorCorner,
        BlockTypeVO.cornerX(1, 1, 1).
        concat(BlockTypeVO.cornerY(-1, -1, 1)).
        concat(BlockTypeVO.cornerZ(-1, -1, 1))
        ),
      new BlockTypeVO(3, 'Light Armor Corner Inverted', 'LargeBlockArmorCornerInv', LargeBlockArmorCornerInv,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*-0.5, 0))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*0.5)))).
        concat(BlockTypeVO.cornerX(1, -1, -1)).
        concat(BlockTypeVO.cornerY(-1, 1, -1)).
        concat(BlockTypeVO.cornerZ(-1, 1, -1))
        ),
      new BlockTypeVO(4, 'Light Armor Corner Square', 'LargeBlockArmorCornerSquare', LargeBlockArmorCornerSquare,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5))).
        concat(BlockTypeVO.cornerX(-1, 1, 1)).
        concat(BlockTypeVO.cornerZ(-1, 1, 1))
        ),
      new BlockTypeVO(5, 'Light Armor Corner Square Inverted', 'LargeBlockArmorCornerSquareInverted', LargeBlockArmorCornerSquareInverted,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0))). // X Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0)))). // Z Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5)))). // Y Negative
        concat(BlockTypeVO.cornerX(1, 1, 1)).
        concat(BlockTypeVO.cornerY(1, 1, 1)).
        concat(BlockTypeVO.cornerZ(1, 1, 1))
        ),
      new BlockTypeVO(6, 'Round Armor Slope', 'LargeBlockArmorRoundSlope', LargeBlockArmorRoundSlope,
        BlockTypeVO.cornerX(1, 1, 1).
        concat(BlockTypeVO.cornerX(-1, 1, 1)).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5))))
        ),
      new BlockTypeVO(7, 'Round Armor Corner', 'LargeBlockArmorRoundCorner', LargeBlockArmorRoundCorner,
        BlockTypeVO.cornerX(1, 1, 1).
        concat(BlockTypeVO.cornerY(-1, 1, -1)).
        concat(BlockTypeVO.cornerZ(-1, 1, -1))
        ),
      new BlockTypeVO(8, 'Round Armor Inv. Corner', 'LargeBlockArmorRoundCornerInv', LargeBlockArmorRoundCornerInv,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*-0.5, 0))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0)))).
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*0.5)))).
        concat(BlockTypeVO.cornerX(1, -1, -1)).
        concat(BlockTypeVO.cornerY(-1, -1, 1)).
        concat(BlockTypeVO.cornerZ(-1, -1, 1))
        ),
      new BlockTypeVO(9, 'Light Armor Slope 2x1x1 Base', 'LargeBlockArmorSlope2Base', LargeBlockArmorSlope2Base,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0))). // Z Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5)))). // Y Negative
        concat(BlockTypeVO.cornerX(1, 1, 1)).
        concat(BlockTypeVO.cornerX(-1, 1, 1)).
        concat([
        new Vector3(0.9, -0.5, 1), new Vector3(-0.9, -0.5, 1), new Vector3(0.5, -0.9, 1), new Vector3(-0.5, -0.9, 1),
        new Vector3(0.1, -0.5, 1), new Vector3(-0.1, -0.5, 1), new Vector3(0.5, -0.1, 1), new Vector3(-0.5, -0.1, 1),
        ])
        ),
      new BlockTypeVO(10, 'Light Armor Slope 2x1x1 Tip', 'LargeBlockArmorSlope2Tip', LargeBlockArmorSlope2Tip,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5))). // Y Negative
        concat([
        new Vector3(1, -0.5, -0.9), new Vector3(1, -0.9, 0.5), new Vector3(1, -0.9, -0.5),
        new Vector3(1, -0.5, 0.1), new Vector3(1, -0.5, -0.1), new Vector3(1, -0.1, -0.5),
        new Vector3(-1, -0.5, -0.9), new Vector3(-1, -0.9, 0.5), new Vector3(-1, -0.9, -0.5),
        new Vector3(-1, -0.5, 0.1), new Vector3(-1, -0.5, -0.1), new Vector3(-1, -0.1, -0.5),
        new Vector3(0.9, -0.5, -1), new Vector3(-0.9, -0.5, -1), new Vector3(0.5, -0.9, -1), new Vector3(-0.5, -0.9, -1),
        new Vector3(0.1, -0.5, -1), new Vector3(-0.1, -0.5, -1), new Vector3(0.5, -0.1, -1), new Vector3(-0.5, -0.1, -1),
        ])
        ),
      new BlockTypeVO(11, 'Half Light Armor Block', 'LargeHalfArmorBlock', LargeHalfArmorBlock,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*0.5, 0))). // Z Negative
        concat([
        new Vector3(1, 0.9, -0.5), new Vector3(1, -0.9, -0.5), new Vector3(1, 0.5, -0.9), new Vector3(1, -0.5, -0.9),
        new Vector3(1, 0.1, -0.5), new Vector3(1, -0.1, -0.5), new Vector3(1, 0.5, -0.1), new Vector3(1, -0.5, -0.1),
        new Vector3(-1, 0.9, -0.5), new Vector3(-1, -0.9, -0.5), new Vector3(-1, 0.5, -0.9), new Vector3(-1, -0.5, -0.9),
        new Vector3(-1, 0.1, -0.5), new Vector3(-1, -0.1, -0.5), new Vector3(-1, 0.5, -0.1), new Vector3(-1, -0.5, -0.1),
        new Vector3(0.9, 1, -0.5), new Vector3(-0.9, 1, -0.5), new Vector3(0.5, 1, -0.9), new Vector3(-0.5, 1, -0.9),
        new Vector3(0.1, 1, -0.5), new Vector3(-0.1, 1, -0.5), new Vector3(0.5, 1, -0.1), new Vector3(-0.5, 1, -0.1),
        new Vector3(0.9, -1, -0.5), new Vector3(-0.9, -1, -0.5), new Vector3(0.5, -1, -0.9), new Vector3(-0.5, -1, -0.9),
        new Vector3(0.1, -1, -0.5), new Vector3(-0.1, -1, -0.5), new Vector3(0.5, -1, -0.1), new Vector3(-0.5, -1, -0.1),
        ])
        ),
      new BlockTypeVO(12, 'Half Slope Light Armor Block', 'LargeHalfSlopeArmorBlock', LargeHalfSlopeArmorBlock,
        [
        new Vector3(1, -0.9, -0.5), new Vector3(1, -0.5, -0.9),
        new Vector3(1, -0.1, -0.5), new Vector3(1, -0.5, -0.1),
        new Vector3(-1, -0.9, -0.5), new Vector3(-1, -0.5, -0.9),
        new Vector3(-1, -0.1, -0.5), new Vector3(-1, -0.5, -0.1),
        new Vector3(0.9, -1, -0.5), new Vector3(-0.9, -1, -0.5), new Vector3(0.5, -1, -0.9), new Vector3(-0.5, -1, -0.9),
        new Vector3(0.1, -1, -0.5), new Vector3(-0.1, -1, -0.5), new Vector3(0.5, -1, -0.1), new Vector3(-0.5, -1, -0.1),
        new Vector3(0.9, -0.5, -1), new Vector3(-0.9, -0.5, -1), new Vector3(0.5, -0.9, -1), new Vector3(-0.5, -0.9, -1),
        new Vector3(0.1, -0.5, -1), new Vector3(-0.1, -0.5, -1), new Vector3(0.5, -0.1, -1), new Vector3(-0.5, -0.1, -1),
        ]
        ),
      new BlockTypeVO(13, 'Half Slope Corner Light Armor', 'LargeBlockArmorHalfSlopeCorner', LargeBlockArmorHalfSlopeCorner,
        [
        new Vector3(1, -0.9, 0.5), new Vector3(1, -0.5, 0.9),
        new Vector3(1, -0.1, 0.5), new Vector3(1, -0.5, 0.1),
        new Vector3(0.9, -0.5, 1), new Vector3(0.5, -0.9, 1),
        new Vector3(0.1, -0.5, 1), new Vector3(0.5, -0.1, 1),
        new Vector3(0.9, -1, 0.5), new Vector3(0.5, -1, 0.9),
        new Vector3(0.1, -1, 0.5), new Vector3(0.5, -1, 0.1),
        ]
        ),
      new BlockTypeVO(14, 'Light Armor Half Corner Block', 'LargeBlockArmorHalfCorner', LargeBlockArmorHalfCorner,
        [
        new Vector3(-1, -0.9, 0.5), new Vector3(-1, -0.9, -0.5), new Vector3(-1, -0.5, 0.9), new Vector3(-1, -0.5, -0.9),
        new Vector3(-1, -0.1, 0.5), new Vector3(-1, -0.1, -0.5), new Vector3(-1, -0.5, 0.1), new Vector3(-1, -0.5, -0.1),
        new Vector3(0.9, -0.5, -1), new Vector3(-0.9, -0.5, -1), new Vector3(0.5, -0.9, -1), new Vector3(-0.5, -0.9, -1),
        new Vector3(0.1, -0.5, -1), new Vector3(-0.1, -0.5, -1), new Vector3(0.5, -0.1, -1), new Vector3(-0.5, -0.1, -1),
        ].
        concat(BlockTypeVO.cornerY(-1, 1, 1))
        ),
      new BlockTypeVO(15, 'Light Armor Half Sloped Corner', 'LargeBlockArmorHalfSlopedCorner', LargeBlockArmorHalfSlopedCorner,
        BlockTypeVO.cornerX(-1, 1, 1).
        concat(BlockTypeVO.cornerY(-1, 1, 1)).
        concat(BlockTypeVO.cornerZ(-1, 1, 1))
        ),
      new BlockTypeVO(16, 'Light Armor Corner 2x1x1 Base', 'LargeBlockArmorCorner2Base', LargeBlockArmorCorner2Base,
        BlockTypeVO.cornerX(-1, 1, 1).
        concat(BlockTypeVO.cornerY(-1, 1, 1)).
        concat(BlockTypeVO.cornerZ(-1, 1, 1)).
        concat([
        new Vector3(1, -0.9, -0.5), new Vector3(1, -0.5, -0.9),
        new Vector3(1, -0.1, -0.5), new Vector3(1, -0.5, -0.1),
        ])
        ),
      new BlockTypeVO(17, 'Light Armor Corner 2x1x1 Tip', 'LargeBlockArmorCorner2Tip', LargeBlockArmorCorner2Tip,
        [
        new Vector3(1, -0.5, -0.9), new Vector3(1, -0.9, 0.5), new Vector3(1, -0.9, -0.5),
        new Vector3(1, -0.5, 0.1), new Vector3(1, -0.5, -0.1), new Vector3(1, -0.1, -0.5),
        new Vector3(0.5, -1, -0.9), new Vector3(0.9, -1, 0.5), new Vector3(0.9, -1, -0.5),
        new Vector3(0.5, -1, 0.1), new Vector3(0.5, -1, -0.1), new Vector3(0.1, -1, -0.5),
        new Vector3(-0.9, -0.5, -1), new Vector3(-0.5, -0.9, -1),
        new Vector3(-0.1, -0.5, -1), new Vector3(-0.5, -0.1, -1),
        ]
        ),
      new BlockTypeVO(18, 'Light Armor Inv. Corner 2x1x1 Base', 'LargeBlockArmorInvCorner2Base', LargeBlockArmorInvCorner2Base,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0))). // X Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*-0.5, 0)))).  // Z Positive
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*0.5)))). // Y Positive
        concat(BlockTypeVO.cornerX(1, -1, -1)).
        concat(BlockTypeVO.cornerY(-1, 1, -1)).
        concat(BlockTypeVO.cornerZ(-1, 1, -1))
        ),
      new BlockTypeVO(19, 'Light Armor Inv. Corner 2x1x1 Tip', 'LargeBlockArmorInvCorner2Tip', LargeBlockArmorInvCorner2Tip,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0))). // X Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*0.5)))). // Y Positive
        concat(BlockTypeVO.cornerZ(-1, 1, -1)).
        concat(BlockTypeVO.cornerZ(1, 1, -1)).
        concat(BlockTypeVO.cornerX(1, -1, -1)).
        concat(BlockTypeVO.cornerY(-1, 1, -1))
        ),
      new BlockTypeVO(20, 'Half Slope Corner Inv. Light Armor', 'LargeBlockArmorHalfSlopeCornerInverted', LargeBlockArmorHalfSlopeCornerInverted,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, 0))). // X Positive
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5)))). // Y Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*-0.5, 0)))).  // Z Positive
        concat(BlockTypeVO.cornerX(-1, 1, -1)).
        concat(BlockTypeVO.cornerY(1, -1, -1)).
        concat(BlockTypeVO.cornerZ(-1, -1, 1))
        ),
      new BlockTypeVO(21, 'Half Slope Inv. Light Armor', 'LargeBlockArmorHalfSlopeInverted', LargeBlockArmorHalfSlopeInverted,
        BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, Math.PI*1, 0))). // X Negative
        concat(BlockTypeVO.defaultFullFace.map(vector3 => vector3.clone().applyEuler(new Euler(0, 0, Math.PI*-0.5)))). // Y Negative
        concat(BlockTypeVO.cornerZ(1, 1, 1)).
        concat(BlockTypeVO.cornerZ(-1, 1, 1)).
        concat([
        new Vector3(1, -0.9, 0.5), new Vector3(1, -0.9, -0.5), new Vector3(1, -0.5, 0.9), new Vector3(1, -0.5, -0.9),
        new Vector3(1, -0.1, 0.5), new Vector3(1, -0.1, -0.5), new Vector3(1, -0.5, 0.1), new Vector3(1, -0.5, -0.1),
        new Vector3(0.9, 1, 0.5), new Vector3(0.9, 1, -0.5), new Vector3(0.5, 1, 0.9), new Vector3(0.5, 1, -0.9),
        new Vector3(0.1, 1, 0.5), new Vector3(0.1, 1, -0.5), new Vector3(0.5, 1, 0.1), new Vector3(0.5, 1, -0.1),
        ])
        ),
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
