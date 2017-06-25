//by hdp 2017.06.07
//学生数据

import { PaperState } from '../define'
import { TaskData } from './TaskData'

export class StudentData {
    public id: string = '测试';
    public name: string = '测试';
    public school: string = '闵行区第一小学';
    public class: string = '三年级二班';
    public sex: string = '女';
    public hasSigned: boolean = false;
    public Tasks: TaskData[] = [
        {
            subject: '语文',
            status: PaperState.New,
            type: '阅读',
            id: '0',
            paper: null,
        },
        {
            subject: '英语',
            status: PaperState.New,
            type: '默写',
            id: '1',
            paper: null,
        },
        {
            subject: '数学',
            status: PaperState.New,
            type: '练习',
            id: '2',
            paper: null,
        },
    ];

    public seatComponent: object;
    public seatIndex: number = 0;
    public credit: number = 1000;

    addCreditStatus = {
        credit: 4,
        text: '纪律好C',
    };
    reduceCreditStatus = {
        credit: 5,
        text: '纪律差B',
    };
}
