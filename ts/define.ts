//by hdp 2017.05.16
//接口定义

//批改项
interface ICorrectItem {
    image: string;
    text: string;
    score:number;
}

//批改信息
interface ICorrectData {
    page:number;    //第几页
    x: number;
    y: number;
    type: ICorrectItem;
}

//试卷批改状态
enum PaperState {
    New,            //新建
    HasCorrected,   //已批改
    ReCorrect       //需要重新批改
}

//试卷信息
interface IPaper {
    id: string;
    corrects?: ICorrectData[];
    image?: string | string[];
    text?: string;
    state: PaperState;
}

export { PaperState, ICorrectItem, ICorrectData, IPaper }
