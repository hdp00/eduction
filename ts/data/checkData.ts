//by hdp 2017.09.27
//批改数据

import { PaperState } from './define'

export class CheckHomeworkData {
    public homeworkId: number;
    public studentName: string;
    public subject: string;
    public item: string;
    public book: string;
    public state: PaperState;
}

export class CheckItemData {
    public checkId: number;
    public score: number;
    public text: string;
    public image: any;
}