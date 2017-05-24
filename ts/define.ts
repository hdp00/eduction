//by hdp 2017.05.16
//接口定义

//批改项
export interface ICheckItem {
    image: string;
    text: string;
    score: number;
}

//错误信息
export interface ICorrectData {
    page: number;    //第几页
    x: number;
    y: number;
    type: ICheckItem;
}

//试卷批改状态
export enum PaperState {
    New,          //新建
    HasChecked,   //已批改
    ReCheck,      //需要重新批改
}

//试卷信息
export interface IPaper {
    id: string;
    corrects?: ICorrectData[];
    image?: string | string[];
    text?: string;
    state: PaperState;
}
