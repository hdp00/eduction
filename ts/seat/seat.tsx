//by hdp 2017.06.11
//座位页面

import * as React from 'react'
import { StudentData } from '../data/studentData'
import { StudentSelector } from './studentSelector'
import { SeatContainer } from './seatContainer'
import { StudentDetail } from './studentDetail'
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
        const detailProps = {
            ref: 'detail',
        }

        return <div>
            <SeatContainer {...containerProps} />
            <div style={{ float: 'left' }}>
                <StudentDetail {...detailProps} />
            </div>
            <StudentSelector {...selectorProps}></StudentSelector>
        </div>;
    }
    componentDidMount() {
        //绑定学生变化事件
        let detail = (this.refs['detail'] as StudentDetail);
        let container = (this.refs['container'] as SeatContainer);
        container.addChangedNotify(detail.update);
    }

    private showSelector = (type: number, callback: (students: StudentData[]) => void) => {
        (this.refs['selector'] as StudentSelector).show(type, callback);
    }
}