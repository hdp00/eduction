//by hdp 2017.05.16
//接口定义

//试卷批改状态
export enum PaperState {
    New,          //新建
    Waste1,
    Waste2,
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

    //set {oldPasswd, newPasswd}
    //get undefined
    Password,

    //set undefined
    //get {hasLogin:boolean}
    CheckLogin,

    //seat

    //set undefined
    //get {students:{studentId:string, name:string}[]}
    StudentSelector,

    //set studnets:{id:string,index:number}[]
    //get students:{studentId:string,index:number, name:string, taskText:string, taskStatus:PaperState}[]
    Signin,

    //set{id:string, parentDictId:string}
    //get undefined
    Signout,

    //set {id:string}
    //get {name:string, taskText:string, taskStatus:number}
    StudentSeat,

    //set undefined
    //get {col:number, row:number
    //  students:{studentId:string, index:number, name:string, taskText:string, taskStatus:number}[]    
    //}
    StudentContainer,

    //set undefined
    //get parents:{parentId:string, name:string}[]
    ParentData,

    //set undefined
    //get addCreditItems:{creditId:string, name:string, score:number}[]
    AddCreditItem,

    //set undefined
    //get reduceCreditItems:{creditId:string, name:string, score:number}[]
    ReduceCreditItem,

    //set {studentId:string, creditId:string, name:string, score:string}
    //get creditData:{availableCredit:number, credits:{creditId:string, name:string, score:number}[]}
    AddCredit,

    //set {creditId:string, score:number, name:string}
    //get creditData:{availableCredit:number, credits:{creditId:string, name:string, score:number}[]}
    CancelCredit,

    //set{stdId}
    //get creditData:{availableCredit:number, credits:{creditId:string, name:string, score:number}[]}
    Credit,

    //set{stdId}
    //get{undefine}
    BeginRead,
    EndRead,

    //set{studentId:string}
    //get{name:string, school:string, class:string}
    StudentDetail,

    //set{homeworkId:string, statusId:number}
    ChangeHomeworkStatus,

    //set{homeworkId:string, papers:PaperData[])
    UploadPapers,

    //set{paperIds:number[]}
    DeletePapers,

    //set{studentId:string}
    //get {homeworks:homeworkData[]}
    Homework,

    //set{homeworkId:string}
    //get{homeworkId:string, subject: string, book: string, papers: string[]}
    HomeworkPaper,

    //set undefined
    //get {students:studentData[]}
    Students,

    //set{studentids:string[]}
    //get {grades:gradeData[]}
    StudentGrades,

    //set{id:string,
    //grade:{date:Date, grade:{subject:string, score:number}[]}}
    //get undefined
    AddGrade,

    //set{id:string,
    //grades:{date:Date, grade:{subjectId:string, score:number}[]}[]}
    //get undfined
    ModifyGrade,

    //homework

    //set HomeworkData
    //get undefined
    ModifyHomework,

    //set{homeworkId}
    //get undefined
    DeleteHomework,

    //set undefined
    //get {homeworkOptions: {value, lable, children}[]}
    HomeworkOptions,

    //set{studentId}
    //get{homeworks:homeworkData[]}
    HomeworkConfig,

    //set{subjectId}
    //get{books:{bookId, book}[]}
    Book,

    //check

    //set undefined
    //get checkItemList
    CheckItms,

    //set undefined
    //get paperList
    Papers,
}

//显示的网页页面
export enum PageType {
    Classroom,
    Student,
    Homework,
    Check,
    StudentSetting,
    TeacherSetting
}

