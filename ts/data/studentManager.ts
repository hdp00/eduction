//by hdp 2017.06.17
//学生数据管理类

import { PaperState } from './define'
import { HomeworkData } from './homeworkData'
import { StudentData } from './studentData'

export class StudentManager {
    ///注意：除了原始学生数据以外，其他数组都以座位号为索引
    private row: number = 0;
    private col: number = 0;
    //选择学生的索引
    private selectIndex: number = -1;
    //原始学生数据
    private students: StudentData[] = [];
    //座位为索引的学生数据
    private seatStudents: StudentData[] = [];
    //座位组件
    private seatComponents: object[] = [];
    private studentMap:object = {};

    public setSeatComponents = (value: object[]) => {
        this.seatComponents = value;
    }

    constructor() {
        this.init();
    }
    public signIn = (id: string, index: number) => {
        this.studentMap[id].student.hasSigned = true;
    }
    public signInMulti = (ids: string[], indexs:number[]) => {

    }
    public signOut = () => {

    }
    public select = (index: number) => {

    }

    private init() {
        const studentCount = 30;
        this.row = 6;
        this.col = 6;
        const seatCount = this.row * this.col;

        let datas: StudentData[] = [];
        for (let i = 0; i < studentCount; i++) {
            let s = new StudentData();
            s.name = s.name + i;
            datas.push(s);
        }
        datas[4].hasSigned = true;
        datas[4].seatIndex = 5;
        datas[5].hasSigned = true;
        datas[5].seatIndex = 11;
        datas[6].hasSigned = true;
        datas[7].seatIndex = 19;
        this.students = datas;

        for (let i = 0; i < studentCount; i++) {
            const s = this.students[i];
            if (s.hasSigned)
                this.seatStudents[s.seatIndex] = s;
        }
    }
}

