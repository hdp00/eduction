//by hdp 2017.05.26
//全局工具类

import * as $ from 'jquery'
import { SendType, NetType } from './define'
import { Lib } from './lib'
import { EducationData } from './educationData'

export * from './define'

//数据接收处理类
class ReceiveManager {
    private type: SendType;
    private sendData: object;
    private callback: (response: object, code?: number) => void;

    constructor(type: SendType, data?: object, callback?: (response: object, code?: number) => void) {
        this.type = type;
        this.sendData = data;
        this.callback = callback;

        this.send();
    }

    private send = () => {
        const data = this.converSendData();
        const netType = Tool.data.back.getNetType(this.type);
        const url = Tool.data.back.getUrl(this.type);

        if (netType === NetType.Get)
            $.get(url, data, this.receive);
        else
            $.post(url, data, this.receive);
    }
    private receive = (response?: string) => {
        if (this.callback === undefined)
            return;

        const [data, code] = this.convertReceiveData(response);

        switch (this.type) {
            case SendType.Login:
            case SendType.Password:
                break;
            default:
                if (code !== 0)
                    return;
                break;
        }

        this.callback(data, code);
    }
    //发送数据格式转换
    private converSendData() {
        if (this.sendData === undefined)
            this.sendData = {};

        switch (this.type) {
            case SendType.StudentContainer:
                this.sendData['roomId'] = '0';
                break;
            case SendType.StudentSelector:
                this.sendData['filterSigninStatus'] = 2;
                this.sendData['pageIndex'] = 0;
                this.sendData['pageSize'] = 100;
                this.sendData['orderby'] = 'stdNo';
                break;
            case SendType.Signin:
                const row = Tool.data.seat.row;
                const col = Tool.data.seat.col;

                for (let s of this.sendData['students']) {
                    s['stdId'] = s['id'];
                    s['row'] = Math.floor(s['index'] / col) + 1;
                    s['col'] = s['index'] % col + 1;
                }

                this.sendData = {
                    roomId: 0,
                    props: this.sendData['students']
                }
                break;
            case SendType.Signout:
                this.sendData['stdId'] = this.sendData['id'];
                this.sendData['parentDictId'] = this.sendData['parentId'];
                break;
            case SendType.ParentData:
                this.sendData['category'] = 'family_relation';
                break;
            case SendType.StudentDetail:
                this.sendData['stdId'] = this.sendData['studentId'];
                break;
            case SendType.Homework:
                this.sendData['stdId'] = this.sendData['studentId'];
                break;

            case SendType.Students:
                this.sendData['filterSigninStatus'] = 0;
                this.sendData['pageIndex'] = 0;
                this.sendData['pageSize'] = 100;
                this.sendData['orderby'] = 'stdNo';
                break;
            case SendType.AddCreditItem:
                this.sendData['filterType'] = 1;
                break;
            case SendType.ReduceCreditItem:
                this.sendData['filterType'] = 2;
                break;
            case SendType.Credit:
                this.sendData['stdId'] = this.sendData['studentId'];

            case SendType.AddCredit:
                // {
                //     let s = studentMap[this.sendData['id']];
                //     s['credit'] = s['credit'] + this.sendData['credit'];
                //     s['addCreditStatus'] = {
                //         credit: this.sendData['credit'],
                //         text: this.sendData['text'],
                //     };
                // }
                break;
            case SendType.ReduceCredit:
                // {
                //     let s = studentMap[this.sendData['id']];
                //     s['credit'] = s['credit'] - this.sendData['credit'];
                //     s['reduceCreditStatus'] = {
                //         credit: this.sendData['credit'],
                //         text: this.sendData['text'],
                //     };
                // }
                break;
            case SendType.ChangeHomeworkStatus:
                // {
                //     setHomeworStatus(this.sendData['homeworkId'], this.sendData['status']);
                // }
                break;
            case SendType.UploadPapers:
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
            case SendType.AddGrade:
                {
                    //set{id:string,
                    //grades:{date:Date, grade:{subjectId:string, score:number}[]}}
                }
                break;
            default:
                break;
        }

        if (this.type !== SendType.Login) {
            this.sendData['userId'] = Tool.data.user.userId;
            this.sendData['token'] = Tool.data.user.token;
        }

        if (Tool.data.back.getNetType(this.type) === NetType.Get)
            return this.sendData;

        return JSON.stringify(this.sendData);
    }
    private convertReceiveData(response: string) {
        const value = JSON.parse(response);
        let data = value['data'];
        let code = value['code'];

        this.showError(value);
        if (data != undefined) {
            switch (this.type) {
                case SendType.Login:
                    data['pages'] = data['perms'];
                    break;

                case SendType.StudentContainer:
                    {
                        const row = data['roomInfo']['row'];
                        const col = data['roomInfo']['column'];
                        Tool.data.seat.row = row;
                        Tool.data.seat.col = col;

                        data['row'] = row;
                        data['col'] = col;
                        for (let s of data['studentList']) {
                            s['studentId'] = s['stdId'];
                            s['index'] = col * (s['row'] - 1) + (s['col'] - 1);
                            s['taskText'] = s['taskDoneCount'] + '/' + s['taskTotalCount'];
                        }
                        data['students'] = data['studentList'];
                    }
                    break;
                case SendType.StudentSelector:
                    for (let s of data['list']) {
                        s['studentId'] = s['stdId'];
                    }

                    data = { students: data['list'] };
                    break;
                case SendType.Signin:
                    {
                        const col = Tool.data.seat.col;

                        for (let s of data['list']) {
                            s['studentId'] = s['stdId'];
                            s['taskText'] = s['taskDoneCount'] + '/' + s['taskTotalCount'];
                            s['index'] = col * (s['row'] - 1) + (s['col'] - 1);
                        }

                        data = { students: data['list'] };
                    }
                    break;
                case SendType.ParentData:
                    for (let p of data['family_relation']) {
                        p['parentId'] = p['dictId'];
                    }

                    data = { parents: data['family_relation'] };
                    break;
                case SendType.StudentDetail:
                    data['class'] = data['clas'];
                    break;
                case SendType.Homework:
                    for (let h of data['list']) {
                        h['homeworkId'] = h['taskId'];
                        h['subjectId'] = h['sbjtId'];
                        h['bookId'] = h['txtbkId'];
                        h['childItemId'] = h['subItemId'];

                        h['book'] = h['textbook'];
                        h['childItem'] = h['subItem'];
                        h['range'] = h['scope'];
                        h['desc'] = h['des'];
                    }

                    data = { homeworks: data['list'] };
                    break;
                case SendType.AddCreditItem:
                    for (let c of data['list']) {
                        c['creditId'] = c['disciplineId'];
                    }
                    data = { addCreditItems: data['list'] };
                    break;
                case SendType.ReduceCreditItem:
                    for (let c of data['list']) {
                        c['creditId'] = c['disciplineId'];
                    }
                    data = { reduceCreditItems: data['list'] };
                    break;
                case SendType.Credit:
                    for (let c of data['list']) {
                        c['creditId'] = c['logId'];
                        c['name'] = c['reason'];
                    }
                    data['credits'] = data['list'];
                    data = { creditData: data };
                    break;

                case SendType.Students:
                    for (let s of data['list']) {
                        s.studentId = s.stdId;
                        s.studnetNo = s.stdNo;
                        s.class = s.clas;
                    }

                    data = { students: data['list'] };
                    break;


                default:
                    break;
            }
        }


        return [data, code];
    }
    private showError(value: any) {
        if (!Tool.data.isValidData(value))
            console.log('Error:' + value.comment);
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
    public sendData = (type: SendType, request?: object, callback?: (response: object, code?: number) => void) => {
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
