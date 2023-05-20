import * as THREE from 'three'
import {ComponentType, FC} from 'react'
import ModelProps from './ModelProps'

class BlockTypeVO {
    key: number;
    displayName: string;
    xmlName: string;
    renderer: ComponentType<ModelProps>;
    active: boolean = false;

    public constructor(key: number, displayName: string, xmlName: string, renderer: ComponentType<ModelProps>, active: boolean = false) {
        this.key = key;
        this.displayName = displayName;
        this.xmlName = xmlName;
        this.renderer = renderer;
        this.active = active;
    }
}

export default BlockTypeVO;
