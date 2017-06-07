//by hdp 2017.06.07
//学生数据

import { HomeworkData } from './homeworkData'

export class StudentData {
    public id: string = 'student';
    public name: string = '黄道婆';
    public school: string = '闵行区第一小学';
    public grade: number = 3;
    public class: number = 1;
    public sex: string = '女';
    public homeworks: HomeworkData[] = [];
}
