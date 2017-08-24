//by hdp 2017.06.07
//作业数据

import { PaperState } from './define'

export class HomeworkData {
    public homeworkId: string;
    public statusId: PaperState = PaperState.New;
    public subjectId:string;
    public itemId:string;
    public childItemId:string;
    public bookId:string;

    public subject: string = '语文';
    public item: string = '复习';
    public childItem: string = '阅读';
    public book: string = '一课一练';
    public range: string = '10-15页';
    public times: string = '5遍';
    public desc: string = '具体描述';
    public remark: string = '备注';
    public isNeedSign: boolean = true;
    public studentIds: string[] = [];
}

