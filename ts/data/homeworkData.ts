//by hdp 2017.06.07
//作业数据

import {IPaper, PaperState} from '../define'

export class HomeworkData {
    public subject: string = '语文';
    public status: PaperState = PaperState.New;
    public type: string = '阅读';
    public id: string = 'aaa';
    public paper: IPaper;
}
