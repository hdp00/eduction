//by hdp 2017.05.26
//全局工具类

import { imageTrue, imageFalse } from './image'

class EducationTool {
    imageTrue:HTMLImageElement = new Image();
    imageFalse:HTMLImageElement = new Image();

    constructor(){
        this.imageTrue.src = imageTrue;
        this.imageFalse.src = imageFalse;
    }

    //错误项图标
    public imageCheckItem = {
        0: this.imageTrue,
        1: this.imageFalse,
    }
    public checkItemIndex:number = 0;
    public user = {
        
    }
    public value = 'test';


    private save(){
        
    }

}

export const Tool = new EducationTool();