//by hdp 2017.05.26
//全局工具类

import * as $ from 'jquery'
import * as Type from './define'
import { Lib } from './lib'
import { EducationData } from './educationData'


//数据接收处理类
class ReceiveManager {
    private type: Type.SendType;
    private sendData: object;
    private callback: (response: object) => void;

    constructor(type: Type.SendType, data?: object, callback?: (response: object) => void) {
        this.type = type;
        this.sendData = data;
        this.callback = callback;

        this.send();
    }

    private send = () => {
        const data = this.converSendData();
        const netType = Tool.data.back.getNetType(this.type);
        const url = Tool.data.back.getUrl(this.type);

        if (netType === Type.NetType.Get)
            $.get(url, data, this.receive);
        else
            $.post(url, data, this.receive);
    }
    private receive = (response?: string) => {
        const data = this.convertReceiveData(response);

        if(this.callback === undefined)
            return;
        if(data['code'] === 0 && this.type !== Type.SendType.Login)
            return;

        this.callback(data);
    }
    //发送数据格式转换
    private converSendData() {
        if (this.sendData === undefined)
            this.sendData = {};

        if (this.type !== Type.SendType.Login) {
            this.sendData['userId'] = Tool.data.user.userId;
            this.sendData['token'] = Tool.data.user.token;
        }

        switch (this.type) {
            case Type.SendType.Signin:
                {
                    // for (let s of this.sendData) {
                    //     let id = s['id'];
                    //     let seatIndex = s['index'];
                    //     studentMap[id]['hasSigned'] = true;
                    //     studentMap[id]['seatIndex'] = seatIndex;
                    // }
                }
                break;
            case Type.SendType.Signout:
                // {
                //     let id = this.sendData['id'];
                //     studentMap[id]['hasSigned'] = false;
                // }
                break;
            case Type.SendType.addCredit:
                // {
                //     let s = studentMap[this.sendData['id']];
                //     s['credit'] = s['credit'] + this.sendData['credit'];
                //     s['addCreditStatus'] = {
                //         credit: this.sendData['credit'],
                //         text: this.sendData['text'],
                //     };
                // }
                break;
            case Type.SendType.reduceCredit:
                // {
                //     let s = studentMap[this.sendData['id']];
                //     s['credit'] = s['credit'] - this.sendData['credit'];
                //     s['reduceCreditStatus'] = {
                //         credit: this.sendData['credit'],
                //         text: this.sendData['text'],
                //     };
                // }
                break;
            case Type.SendType.changeHomeworkStatus:
                // {
                //     setHomeworStatus(this.sendData['homeworkId'], this.sendData['status']);
                // }
                break;
            case Type.SendType.uploadPapers:
                {
                    // let f = new FormData();
                    // let papers: object[] = this.sendData['papers'];
                    // for (let i = 0; i < papers.length; i++) {
                    //     f.append('paper' + i, papers[i]['data'], papers[i]['name']);
                    // }

                    // $.ajax({
                    //     url: '/api/upload',
                    //     type: 'POST',
                    //     data: data,
                    //     cache: false,
                    //     processData: false,
                    //     contentType: false,
                    //     success: () => { console.log('ok') },
                    //     error: () => { console.log('error') },
                    // });

                }
                break;
            case Type.SendType.addGrade:
                {
                    //set{id:string,
                    //grades:{date:Date, grade:{subjectId:string, score:number}[]}}
                }
                break;
            default:
                break;
        }

        return JSON.stringify(this.sendData);
    }
    private convertReceiveData(response: string) {
        let data = JSON.parse(response);
        this.showMessage(data);

        // switch (this.type) {
        //     case Type.SendType.StudentSelector:
        //         return this.getStudentSelector(data);
        //     case Type.SendType.StudentSeat:
        //         return this.getStudentSeat(data);
        //     case Type.SendType.StudentContainer:
        //         return this.getStudentContainer(data);
        //     case Type.SendType.addCreditItem:
        //         return this.getAddCreditItem(data);
        //     case Type.SendType.reduceCreditItem:
        //         return this.getReduceCreditItem(data);
        //     case Type.SendType.studentDetail:
        //         return this.getStudentDetail(data);
        //     case Type.SendType.homework:
        //         return this.getHomework(data);
        //     case Type.SendType.homeworkPaper:
        //         return this.getHomeworkPaper(data);
        //     case Type.SendType.students:
        //         return this.getStudents(data);
        //     case Type.SendType.checkItms:
        //         return this.getCheckItems(data);
        //     case Type.SendType.papers:
        //         return this.getPapers(data);
        //     case Type.SendType.homeworkOptions:
        //     //return HomeworkOptions;
        //     default:
        //         break;
        // }

        return data;
    }
    private showMessage(value: any) {
        if (value.code !== 0)
            console.log(value.comment);
    }
    private getStudentSelector(value: object) {
        let data = [];
        // for (let s of students) {
        //     if (!s.hasSigned)
        //         data.push({
        //             id: s.id,
        //             name: s.name,
        //         });
        // }

        return { students: data };
    }
    private getStudentSeat(value: object) {
        // let id = this.sendData['id'];
        // let s = studentMap[id];
        // return {
        //     name: s.name,
        //     taskText: getHomeworkText(s),
        //     taskStatus: getHomeworkStatus(s),
        // };
    }
    private getStudentContainer(value: object) {
        // let data = [];
        // for (let s of students) {
        //     if (s.hasSigned)
        //         data.push({
        //             id: s.id,
        //             name: s.name,
        //             index: s.seatIndex,
        //             taskText: getHomeworkText(s),
        //             taskStatus: getHomeworkStatus(s),
        //         });
        // }

        // return {
        //     row: row,
        //     col: col,
        //     students: data,
        // }
    }
    private getAddCreditItem(value: object) {
        //return { addCreditItems: addItems };
    }
    private getReduceCreditItem(value: object) {
        //return { reduceCreditItems: reduceItems };
    }
    private getStudentDetail(value: object) {
        // let id = this.sendData['id'];
        // let s = studentMap[id];
        // return {
        //     name: s.name,
        //     school: s.school,
        //     class: s.class,
        //     credit: s.credit,
        //     addCreditStatus: s.addCreditStatus,
        //     reduceCreditStatus: s.reduceCreditStatus,
        // };
    }
    private getHomework(value: object) {
        // let id = this.sendData['studentId'];
        // let s: StudentData = studentMap[id];

        // return { homeworks: s.homeworks };
    }
    private getHomeworkPaper(value: object) {
        //return homeworkPaper;
    }
    private getStudents(value: object) {
        //return { students: students };
    }
    private getCheckItems(value: object) {
        //return checkItemList;
    }
    private getPapers(value: object) {
        //return paperList;
    }
}

//后台数据
class Back {
    public sendData = (type: Type.SendType, request?: object, callback?: (response: object) => void) => {
        new ReceiveManager(type, request, callback);
    };

    // //sse连接
    // addEventSource: (url: string, callback: (event: any) => void) => {
    //     // let e:EventSource = new EventSource(url);
    //     // e.onmessage = callback;

    //     // let c = new ReceiveManager(callback);
    //     // c.run(data[url]);
    // },
    //     }
}

class EducationTool {
    public lib = new Lib();
    public data = new EducationData();
    public back = new Back();

    constructor() {
        this.data.init(this.lib);
    }


    // //需要访问的组件
    // public component = {
    //     //标题页面
    //     title: {},
    // }
}

export const Tool = new EducationTool();
