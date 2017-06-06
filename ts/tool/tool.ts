//by hdp 2017.05.26
//全局工具类

import * as $ from 'jquery'
import { PaperState, UserType } from '../define'
import { imageTrue, imageFalse, imageQuestion, image0, image2, image3 } from '../image'

//回调函数处理类
class CallbackContainer {
    constructor(callback: (response: string) => void) {
        this.callback = callback;
    }

    private callback: (response: string) => void;

    public run = (response: string) => {
        let data = this.convertData(response);
        this.showMessage(data);
        this.callback(data);
    }

    private convertData = (response: any) => {
        //return JSON.parse(response);
        return response;
    }
    private showMessage(data: any) {
        if (data.code !== 0)
            console.log(data.comment);
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
        this.currentRole = parseInt(localStorage.currentRole);
        if (isNaN(this.currentRole))
            this.currentRole = UserType.None;
    }

    public userId: string = '';
    public token: string = '';
    public loggedin: boolean = false;
    public currentRole: UserType = UserType.None;
    public roles: UserType[] = [];

    public login = (data: any) => {
        this.loggedin = true;
        if (data !== undefined) {
            if(data.currentRole === undefined)
                data.currentRole = UserType.None;

            localStorage.userId = this.userId = data.userId;
            localStorage.token = this.token = data.token;
            localStorage.currentRole = this.currentRole = data.currentRole;
            this.roles = data.roles;
        }

        //没有用户组的情况下，用户不能为空
        if(this.roles === undefined || this.roles.length === 0){
            if(this.currentRole === UserType.None)
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
            let c = new CallbackContainer(callback);
            //$.post(url, request, c.run);

            c.run(data[url]);
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

            if (callback === undefined)
                return;
            let c = new CallbackContainer(callback);
            c.run(data[url]);
        },



        //sse连接
        addEventSource: (url: string, callback: (event: any) => void) => {
            // let e:EventSource = new EventSource(url);
            // e.onmessage = callback;

            let c = new CallbackContainer(callback);
            c.run(data[url]);
        },
    }

    //需要访问的组件
    public component = {
        //标题页面
        title:{},
    }
}

export const Tool = new EducationTool();