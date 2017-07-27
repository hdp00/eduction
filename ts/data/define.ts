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
    Checker,        //批改
    Teacher,        //老师
    Manager,        //管理
}

