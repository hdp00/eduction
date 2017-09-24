//by hdp 2017.06.07
//作业数据

import { PaperState } from './define'

export class PaperData {
    public paperId: number;
    public path: string;
    public data: string;
    public hasUpload: boolean = false;
    public name: string;
}

export class HomeworkData {
    public homeworkId: string;
    public statusId: PaperState = PaperState.New;
    public subjectId: string = '';
    public itemId: string = '';
    public childItemId: string = '';
    public bookId: string = '';

    public subject: string = '';
    public item: string = '';
    public childItem: string = '';
    public book: string = '';
    public range: string = '';
    public times: string = '0';
    public desc: string = '';
    public remark: string = '';
    public isNeedSign: boolean = false;
    public students: string[] = [];
    public uploadPath: PaperData[] = [];
}

