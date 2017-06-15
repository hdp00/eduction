//by hdp 2017.06.07
//学生数据

import { PaperState } from '../define'
import { HomeworkData } from './homeworkData'

export class StudentData {
    public id: string = 'student';
    public name: string = '黄道婆';
    public school: string = '闵行区第一小学';
    public grade: number = 3;
    public class: number = 1;
    public sex: string = '女';
    public hasSigned: boolean = false;
    public homeworks: HomeworkData[] = [
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
}
