//by hdp 2017.05.26
//全局工具类

import * as $ from 'jquery'
import { PaperState, UserType } from '../define'
import { imageTrue, imageFalse, imageQuestion, image0, image2, image3 } from '../image'

//工具库
class Lib {
    //填充数据
    fillData = (componet, value) => {
        const keys = Object.keys(value);
        for (let key of keys)
            componet[key] = value[key];
    }
}

//数据接收处理类
class ReceiveManager {
    private type: SendType;
    private sendData: any;
    private callback: (response: object) => void;

    constructor(type: SendType, data?: object, callback?: (response: object) => void) {
        this.type = type;
        this.sendData = data;
        this.callback = callback;

        this.send();
    }

    private send = () => {
        let data = this.converSendData();
        //post
        setTimeout(this.receive, 200);
    }
    private receive = (response?: string) => {
        let receiveData = this.convertReceiveData(response);
        if (this.callback !== undefined)
            this.callback(receiveData);
    }
    //数据格式转换
    //临时在这里写入数据
    private converSendData() {
        if (this.sendData === undefined)
            return undefined;

        switch (this.type) {
            case SendType.Signin:
                {
                    for (let s of this.sendData) {
                        let id = s['id'];
                        let seatIndex = s['index'];
                        studentMap[id]['hasSigned'] = true;
                        studentMap[id]['seatIndex'] = seatIndex;
                    }
                }
                break;
            case SendType.Signout:
                {
                    let id = this.sendData['id'];
                    studentMap[id]['hasSigned'] = false;
                }
                break;
            case SendType.addCredit:
                {
                    let s = studentMap[this.sendData['id']];
                    s['credit'] = s['credit'] + this.sendData['credit'];
                    s['addCreditStatus'] = {
                        credit: this.sendData['credit'],
                        text: this.sendData['text'],
                    };

                    console.log(s);
                }
                break;
            case SendType.reduceCredit:
                {
                    let s = studentMap[this.sendData['id']];
                    s['credit'] = s['credit'] - this.sendData['credit'];
                    s['reduceCreditStatus'] = {
                        credit: this.sendData['credit'],
                        text: this.sendData['text'],
                    };
                }
                break;
            case SendType.changeHomeworkStatus:
                {
                    setHomeworStatus(this.sendData['homeworkId'], this.sendData['status']);
                    console.log(students[0].homeworks);
                }
                break;
            default:
                break;
        }

        return '';
    }
    private convertReceiveData(response: string) {
        //return JSON.parse(response);
        let data: object;

        switch (this.type) {
            case SendType.StudentSelector:
                return this.getStudentSelector(data);
            case SendType.StudentSeat:
                return this.getStudentSeat(data);
            case SendType.StudentContainer:
                return this.getStudentContainer(data);
            case SendType.addCreditItem:
                return this.getAddCreditItem(data);
            case SendType.reduceCreditItem:
                return this.getReduceCreditItem(data);
            case SendType.studentDetail:
                return this.getStudentDetail(data);
            case SendType.homework:
                return this.getHomework(data);
            default:
                break;
        }

        return new Object();
    }
    private showMessage(value: any) {
        if (value.code !== 0)
            console.log(value.comment);
    }
    private getStudentSelector(value: object) {
        let data = [];
        for (let s of students) {
            if (!s.hasSigned)
                data.push({
                    id: s.id,
                    name: s.name,
                });
        }

        return { students: data };
    }
    private getStudentSeat(value: object) {
        let id = this.sendData['id'];
        let s = studentMap[id];
        return {
            name: s.name,
            taskText: getHomeworkText(s),
            taskStatus: getHomeworkStatus(s),
        };
    }
    private getStudentContainer(value: object) {
        let data = [];
        for (let s of students) {
            if (s.hasSigned)
                data.push({
                    id: s.id,
                    name: s.name,
                    index: s.seatIndex,
                    taskText: getHomeworkText(s),
                    taskStatus: getHomeworkStatus(s),
                });
        }

        return {
            row: row,
            col: col,
            students: data,
        }
    }
    private getAddCreditItem(value: object) {
        return { addCreditItems: addItems };
    }
    private getReduceCreditItem(value: object) {
        return { reduceCreditItems: reduceItems };
    }
    private getStudentDetail(value: object) {
        let id = this.sendData['id'];
        let s = studentMap[id];
        return {
            name: s.name,
            school: s.school,
            class: s.class,
            credit: s.credit,
            addCreditStatus: s.addCreditStatus,
            reduceCreditStatus: s.reduceCreditStatus,
        };
    }
    private getHomework(value: object) {
        let id = this.sendData['studentId'];
        let s: StudentData = studentMap[id];

        return { homeworks: s.homeworks };
    }
}

//后台url列表
export const DataUrl = {
    checkItemList: '/check/checkItemList',
    paperList: '/check/paperList',

    login: '/login',
    logout: '/logout',
    checkLogin: '/checkLogin',
}

let data = {};
data[DataUrl.checkItemList] = [{
    image: 0,
    text: 'a',
    score: 1,
},
{
    image: 0,
    text: 'b',
    score: 1,
},
{
    image: 0,
    text: 'c',
    score: 1,
},
{
    image: 1,
    text: 'd',
    score: 1,
},
{
    image: 1,
    text: 'e',
    score: 1,
}];
data[DataUrl.paperList] = [{
    id: '0',
    images: [
        image0,
        image2,
        image3
    ],
    text: 'aaa',
    state: PaperState.New,
},
{
    id: '1',
    images: [
        image3,
        image2,
        image0
    ],
    text: 'bbb',
    state: PaperState.New,
}];
data[DataUrl.login] = {
    code: 0,
    comment: '',
    data: {
        userId: 'aaa',
        token: 'bbb',
        roles: [UserType.Teacher, UserType.Checker],
    },
};
data[DataUrl.logout] = {
    code: 0,
    comment: '',
}
data[DataUrl.checkLogin] = {
    code: 0,
    comment: '',
};

class User {
    constructor() {
        this.userId = localStorage.userId;
        this.token = localStorage.token;
        this.currentRole = localStorage.currentRole;
    }

    public userId: string = '';
    public token: string = '';
    public loggedin: boolean = false;
    private _currentRole: UserType = UserType.None;
    public set currentRole(value: any) {
        let v = parseInt(value);
        if (isNaN(v))
            this.currentRole = UserType.None;
        this._currentRole = v;
        localStorage.currentRole = this.currentRole;
    }
    public get currentRole() {
        return this._currentRole;
    }
    public roles: UserType[] = [];

    public login = (data: any) => {
        this.loggedin = true;
        if (data !== undefined) {
            localStorage.userId = this.userId = data.userId;
            localStorage.token = this.token = data.token;
            localStorage.currentRole = this.currentRole = data.currentRole;
            this.roles = data.roles;
        }

        //没有用户组的情况下，用户不能为空
        if (this.roles === undefined || this.roles.length === 0) {
            if (this.currentRole === UserType.None)
                this.currentRole = UserType.Teacher;
        }
    }
    public logout = () => {
        this.loggedin = false;
        this.userId = '';
        this.token = '';
        this.roles = [];
        this.currentRole = UserType.None;
        localStorage.clear();
    }
}

class EducationTool {
    constructor() {
        this.imageTrue.src = imageTrue;
        this.imageFalse.src = imageFalse;
        this.imageQuestion.src = imageQuestion;
    }

    imageTrue: HTMLImageElement = new Image();
    imageFalse: HTMLImageElement = new Image();
    imageQuestion: HTMLImageElement = new Image();
    //批改页数据
    public check = {
        //错误项图标
        imageItem: {
            0: this.imageFalse,
            1: this.imageQuestion,
        },
        currentIndex: 0,
    };

    //用户
    public user: User = new User();

    public router = {
        root: '/',

        select: '/select',
        login: '/login',
        logout: '/logout',
        password: '/password',

        check: '/check',

        classroom: '/classroom',
        seat: '/classroom/seat',
        statistics: '/classroom/statistics',
        homework: '/classroom/homework',
    };

    //后台数据
    public back = {
        // get: (url: string, request?: object, callback?: (response: string) => void) => {

        // },
        postLogin(url: string, request: object, callback: (response: string) => void) {
            //let c = new ReceiveManager(callback);
            //$.post(url, request, c.run);

            //c.run(data[url]);
        },
        post: (url: string, request?: object, callback?: (response: string) => void) => {
            // let data:object = {
            //     ...this.user.id,
            //     ...request
            // }
            // if (request === undefined)
            //     $.post(url, callback);
            //  else
            //     $.post(url, data, callback);

            // if (callback === undefined)
            //     return;
            // let c = new ReceiveManager(callback);
            // c.run(data[url]);
        },
        sendData: (type: SendType, request?: object, callback?: (response: object) => void) => {
            new ReceiveManager(type, request, callback);
        },

        //sse连接
        addEventSource: (url: string, callback: (event: any) => void) => {
            // let e:EventSource = new EventSource(url);
            // e.onmessage = callback;

            // let c = new ReceiveManager(callback);
            // c.run(data[url]);
        },
    }

    //需要访问的组件
    public component = {
        //标题页面
        title: {},
    }

    public lib: Lib = new Lib();


}

export enum SendType {
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

    //set{homeworId:string, status:number}
    changeHomeworkStatus,

    //set{studentId:string}
    //get {homeworks:
    //{id: string,status: number,subject: string,item: string,childItem: string,
    //    book: string,range: string,times: string,desc: string,remark: string,isNeedSign:boolean,}[]}
    homework,
}

export const Tool = new EducationTool();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//temp data

import { StudentData } from './studentData'
import { HomeworkData } from './homeworkData'
let studentMap = {};
let students: StudentData[] = [];
for (let i = 0; i < 30; i++) {
    let s = new StudentData();
    s.id = s.name = s.name + i;
    students.push(s);
    studentMap[s.id] = s;
}
students[4].hasSigned = true;
students[5].hasSigned = true;
students[6].hasSigned = true;
students[4].seatIndex = 12;
students[5].seatIndex = 15;
students[6].seatIndex = 16;
students[0].homeworks[0].id = '作业A';
students[0].homeworks[1].id = '作业B';
students[0].homeworks[2].id = '作业C';
students[0].homeworks[3].id = '作业D';
let row = 6;
let col = 8;

function getHomeworkText(s: StudentData) {
    let count = s.homeworks.length;
    let fininshedCount = 0;
    for (let t of s.homeworks) {
        if (t.status === PaperState.Finished)
            fininshedCount++;
    }

    return fininshedCount + '/' + count;
}
function getHomeworkStatus(s: StudentData) {
    return PaperState.New;
}
function setHomeworStatus(id: string, status: number) {
    let s = students[0];
    for (let homework of s.homeworks) {
        if (homework.id === id) {
            homework.status = status;
            return;
        }
    }
}

const addItems = ['纪律好A', '纪律好B', '纪律好C'];
const reduceItems = ['纪律差A', '纪律差B', '纪律差C'];

