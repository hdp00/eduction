//by hdp 2017.05.26
//全局工具类

import * as $ from 'jquery'
import { imageTrue, imageFalse } from './image'

class EducationTool {
    constructor() {
        this.imageTrue.src = imageTrue;
        this.imageFalse.src = imageFalse;
    }

    imageTrue: HTMLImageElement = new Image();
    imageFalse: HTMLImageElement = new Image();
    //批改页数据
    public check = {
        //错误项图标
        imageItem: {
            0: this.imageTrue,
            1: this.imageFalse,
        },
        currentIndex: 0,
    };

    //用户
    public user = {
        userId: '',
        token: '',
    }

    //后台数据
    public back = {
        post: (request: object, callback: (response:string) => void) => {

        },
        postLogin: (request: object, callback: (response:string) => void) => {

        }
    }





    public value = 'test';
    private save() {

    }

}

export const Tool = new EducationTool();