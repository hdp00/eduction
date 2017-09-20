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
            case SendType.CheckLogin:
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
            case SendType.HomeworkConfig:
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
            case SendType.AddCredit:
                this.sendData['stdId'] = this.sendData['studentId'];
                this.sendData['disciplineId'] = this.sendData['creditId'];
                this.sendData['text'] = this.sendData['name'];
                break;
            case SendType.CancelCredit:
                this.sendData['logId'] = this.sendData['creditId'];
                break;

            case SendType.DeleteHomework:
                this.sendData['detailIds'] = [this.sendData['homeworkId']];
                break;
            case SendType.Book:
                this.sendData['sbjtId'] = this.sendData['subjectId'];
                this.sendData['pageIndex'] = 0;
                this.sendData['pageSize'] = 100;
                break;
            case SendType.ModifyHomework:
                this.sendData['detailId'] = this.sendData['homeworkId'];
                this.sendData['sbjtId'] = this.sendData['subjectId'];
                this.sendData['txtbkId'] = this.sendData['bookId'];
                this.sendData['scope'] = this.sendData['range'];
                this.sendData['des'] = this.sendData['desc'];
                if (this.sendData['childItemId'] !== undefined)
                    this.sendData['itemId'] = this.sendData['childItemId'];

                this.sendData = {
                    props: [{
                        detailId: this.sendData['detailId'],
                        sbjtId: this.sendData['sbjtId'],
                        itemId: this.sendData['itemId'],
                        txtbkId: this.sendData['txtbkId'],

                        remark: this.sendData['remark'],
                        des: this.sendData['des'],
                        isNeedSign: this.sendData['isNeedSign'],
                        times: this.sendData['times'],
                        scope: this.sendData['scope']
                    }],
                    stdIds: this.sendData['students']
                };

                break;

            case SendType.ChangeHomeworkStatus:
                this.sendData['taskId'] = this.sendData['homeworkId'];
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

        this.showError(value, this.type);
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
                        h['bookId'] = h['txtbkId'].toString();
                        h['childItemId'] = h['subItemId'];

                        h['book'] = h['textbook'];
                        h['childItem'] = h['subItem'];
                        h['range'] = h['scope'];
                        h['desc'] = h['des'];

                        if (h.stdList !== undefined) {
                            for (let s of h.stdList) {
                                s.studentId = s.stdId;
                            }
                            h.students = h.stdList;
                        }
                    }

                    data = { homeworks: data['list'] };
                    break;
                case SendType.HomeworkConfig:
                    for (let h of data['list']) {
                        h['homeworkId'] = h['detailId'];
                        h['subjectId'] = h['sbjtId'];
                        h['bookId'] = h['txtbkId'].toString();
                        h['childItemId'] = h['subItemId'];

                        h['book'] = h['textbook'];
                        h['childItem'] = h['subItem'];
                        h['range'] = h['scope'];
                        h['desc'] = h['des'];

                        let students = [];
                        if (h.stdList !== undefined) {
                            for (let s of h.stdList) {
                                students.push(s.stdId);
                            }
                            h.students = students;
                        }
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
                case SendType.AddCredit:
                case SendType.CancelCredit:
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

                case SendType.HomeworkOptions:
                    for (let subject of data['list']) {
                        subject.value = subject.sbjtId
                        subject.label = subject.name;
                        subject.children = subject.items;
                        for (let item of subject.items) {
                            item.value = item.itemId;
                            item.label = item.name;
                            item.childItemId = item.subItems;
                            for (let subItem of item.subItems) {
                                subItem.value = subItem.itemId;
                                subItem.label = subItem.name;
                            }
                        }
                    }

                    data = { homeworkOptions: data['list'] };
                    console.log(data);
                    break;
                case SendType.Book:
                    let books = [];
                    for (let b of data) {
                        let newBook = {
                            bookId: b['txtbkId'].toString(),
                            book: b['name'],
                        };
                        books.push(newBook);
                    }
                    data = { books: books };
                    break;
                default:
                    break;
            }
        }


        return [data, code];
    }
    private showError(value: any, type: SendType) {
        if (!Tool.data.isValidData(value))
            console.log('Error:' + value.comment + '  ' + SendType[type]);
    }


    private getHomeworkPaper(value: object) {
        //return homeworkPaper;
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
