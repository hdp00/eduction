//by hdp 2017.05.26
//全局工具类，哪里都能用

import { imageTrue, imageFalse } from './image'

class EducationTool {
    public image: {
        'true': imageTrue,
        'false': imageFalse,
    }
    public user:{
        
    }

}

const Tool: EducationTool = new EducationTool();
export { Tool }
