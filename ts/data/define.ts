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

//网络类型
export enum NetType {
    Get,
    Post
}

//发送数据类型
export enum SendType {
    //user

    //set {userName:string, password:string}
    //get LoginData
    Login,

    //set undefined
    //get undefined
    Logout,

    //seat

    //set undefined
    //get {id:string, name:string}[]
    StudentSelector,

    //set{id:string,index:number}[]
    //get undefined
    Signin,

    //set{id:string}
    //get undefined
    Signout,

    //set {id:string}
    //get {name:string, taskText:string, taskStatus:number}
    StudentSeat,

    //set undefined
    //get {col:number, row:number
    //  students:{id:string, index:number, name:string, taskText:string, taskStatus:number}[]    
    //}
    StudentContainer,

    //set undefined
    //get {addCreditItems:string[]}
    addCreditItem,

    //set undefined
    //get {reduceCreditItems:string[]}
    reduceCreditItem,

    //set {id:string, credit:number, text:string}
    //get undefined
    addCredit,

    //set {id:string, credit:number, text:string}
    //get undefined
    reduceCredit,

    //set{id:string}
    //get{name:string, school:string, class:number, credit:number
    //  addCreditStatus:{credit:number, text:string}
    //  reduceCreditStatus:{credit:number, text:string}
    //}
    studentDetail,

    //set{homeworkId:string, status:number}
    changeHomeworkStatus,

    //set{studentId:string}
    //get {homeworks:homeworkData[]}
    homework,

    //set{homeworkId:string, papers:{name:string, data:base64}[])
    uploadPapers,

    //set{homeworkId:string}
    //get{homeworkId:string, subject: string, book: string, papers: string[]}
    homeworkPaper,

    //set undefined
    //get {students:{id:string, name:string, school:string, class:number, sex:stirng,
    //grades:{date:Date, grade:{subjectId:string, score:number}[]}}[]}
    students,

    //set{id:string,
    //grade:{date:Date, grade:{subject:string, score:number}[]}}
    //get undefined
    addGrade,

    //set{id:string,
    //grades:{date:Date, grade:{subjectId:string, score:number}[]}[]}
    //get undfined
    modifyGrade,

    //homework

    //set HomeworkData
    //get undefined
    modifyHomework,

    //set{id:string}
    //get undefined
    deleteHomework,

    //set undefined
    //get homeworkOptions
    homeworkOptions,

    //check

    //set undefined
    //get checkItemList
    checkItms,

    //set undefined
    //get paperList
    papers,
}

