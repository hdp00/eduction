//by hdp 2017.06.11
//座位页面

import * as React from 'react'
import { StudentData } from '../data/studentData'
import { StudentSelector } from './studentSelector'
import { SeatContainer } from './seatContainer'
import { StudentDetail } from './studentDetail'
import { HomeworkContainer } from './homeworkContainer'
import '../css/seat.css'
//temp
let datas: StudentData[] = [];
for (let i = 0; i < 30; i++) {
    let s = new StudentData();
    s.name = s.name + i;
    datas.push(s);
}
// datas[4].hasSigned = true;
// datas[5].hasSigned = true;
// datas[6].hasSigned = true;
let row = 6;
let col = 6;

export class Seat extends React.Component<any, any>{
    private count = 0;

    render() {
        

        const containerProps = {
            data: {
                students: datas,
                row: row,
                col: col,
                showSelector: this.showSelector,
            },
            ref: 'container',
        };
        const selectorProps = {
            students: datas,
            ref: 'selector',
        };
        const studentProps = {
            ref: 'student',
        };
        const homeworkProps = {
            ref: 'homework',
        };

        return <div>
            <SeatContainer {...containerProps} />
            <div style={{ float: 'left' }}>
                <StudentDetail {...studentProps} />
                <HomeworkContainer {...homeworkProps} />
            </div>
            <StudentSelector {...selectorProps}></StudentSelector>
        </div>;
    }
    componentDidMount() {
        console.log(this.count++);
        //绑定学生变化事件
        const student = (this.refs['student'] as StudentDetail);
        const homework = (this.refs['homework'] as HomeworkContainer);
        const container = (this.refs['container'] as SeatContainer);
        container.addChangedNotify(student.update);
        container.addChangedNotify(homework.update);
    }

    private showSelector = (type: number, callback: (students: StudentData[]) => void) => {
        (this.refs['selector'] as StudentSelector).show(type, callback);
    }
}