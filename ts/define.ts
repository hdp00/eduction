//by hdp 2017.05.16
//接口定义

//试卷批改状态
export enum PaperState {
    New,          //新建
    HasChecked,   //已批改
    ReCheck,      //需要重新批改
    Finished,     //已完成
}

//用户类型
export enum UserType {
    None,           //无
    Checker,        //批改
    Teacher,        //老师
    Manager,        //管理
}

//批改项
export interface ICheckItem {
    image: number;
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

//试卷信息
export interface IPaper {
    id: string;
    corrects?: ICorrectData[];
    images?: string[];
    text?: string;
    state: PaperState;
}
