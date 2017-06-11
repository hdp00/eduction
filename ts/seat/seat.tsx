//by hdp 2017.06.11
//座位页面

import * as React from 'react'
import { StudentData } from '../data/studentData'
import { StudentSelector } from './studentSelector'

let datas: StudentData[] = [];
for (let i = 0; i < 30; i++) {
    let s = new StudentData();
    s.name = s.name + i;
    datas.push(s);
}
datas[4].hasSigned = true;
datas[5].hasSigned = true;
datas[6].hasSigned = true;

export class Seat extends React.Component<any, any>{
    render() {
        return <div>
            <button onClick={this.onClick}>click</button>
            <StudentSelector {...this.selectorProps}></StudentSelector>
        </div>;
    }

    private test = 0;
    private onClick = () => {
        (this.refs['selector'] as StudentSelector).show(this.test);
        this.test++;
        if(this.test >2)
            this.test = 0;
    }
    private onSelectStudent = (datas) => {
        for (let d of datas)
            console.log(d.name);
    }

    private selectorProps = {
        students: datas,
        onSelectStudent: this.onSelectStudent,
        ref: 'selector',
    };
}