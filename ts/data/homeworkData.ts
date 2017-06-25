//by hdp 2017.06.07
//作业数据

import { IPaper, PaperState } from '../define'

export class HomeworkData {
    public id: string = '作业';
    public status: PaperState = PaperState.New;
    public subject: string = '语文';
    public item: string = '复习';
    public childItem: string = '阅读';
    public book: string = '';
    public range: string = '10-15页';
    public times: string = '5遍';
    public desc: string = '具体描述';
    public remark: string = '备注';
    public isNeedSign:boolean = true;
}
