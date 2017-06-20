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
    private sendData: object;
    private callback: (response: object) => void;

    constructor(type: SendType, data?: object, callback?: (response: object) => void) {
        this.type = type;
        this.sendData = data;
        this.callback = callback;

        this.send();
    }

    private send = () => {
        //post
        setTimeout(this.receive, 300);
    }
    private receive = (response?: string) => {
        let receiveData = this.convertData(response);
        if (this.callback !== undefined)
            this.callback(receiveData);
    }

    private convertData(response: string) {
        //return JSON.parse(response);
        let data: object;

        switch (this.type) {
            case SendType.SigninDialog:
                return this.getSigninDialog(data);
            case SendType.StudentSeat:
                return this.getStudentSeat(data);
        }

        return new Object();
    }
    private showMessage(value: any) {
        if (value.code !== 0)
            console.log(value.comment);
    }
    private getSigninDialog(value: object) {
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
            homeworkText:
        };


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
    SigninDialog,
    StudentSeat,
}

export const Tool = new EducationTool();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//temp data

import { StudentData } from './studentData'
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
let row = 6;
let col = 6;

function getHomeworkText() {

}
