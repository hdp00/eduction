//by hdp 2017.06.11
//座位页面

import * as React from 'react'
import { StudentData } from '../data/studentData'
import { StudentSelector } from './studentSelector'
import { SeatContainer } from './seatContainer'
import '../css/seat.css'

let datas: StudentData[] = [];
for (let i = 0; i < 30; i++) {
    let s = new StudentData();
    s.name = s.name + i;
    datas.push(s);
}
datas[4].hasSigned = true;
datas[5].hasSigned = true;
datas[6].hasSigned = true;
let row = 6;
let col = 6;

export class Seat extends React.Component<any, any>{
    render() {
        const containerProps = {
            data:{
                students:datas,
                row:row,
                col:col,
                showSelector:this.showSelector,
            }
        };

        return <div>
            <SeatContainer {...containerProps} />
            <button onClick={this.onClick}>click</button>
            <StudentSelector {...this.selectorProps}></StudentSelector>
        </div>;
    }

    private test = 0;
    private onClick = () => {
    }
    private onSelectStudent = (datas) => {
        this.selectCallBack(datas);
    }

    private selectorProps = {
        students: datas,
        onSelectStudent: this.onSelectStudent,
        ref: 'selector',
    };

    private selectCallBack:(students: StudentData[]) => void;
    private showSelector = (type: number, callback: (students: StudentData[]) => void) =>{
        this.selectCallBack = callback;
        (this.refs['selector'] as StudentSelector).show(type);
    }
}