//by hdp 2017.06.11
//学生座位管理

import * as React from 'react'
import { StudentData } from '../data/studentData'
import { StudentSeat } from './studentSeat'

interface SeatContainerProps {
    data: {
        students: StudentData[];
        row: number;
        col: number;
        //学生选择对话框
        showSelector: (type: number, callback: (students: StudentData[]) => void) => void;
    }
}

export class SeatContainer extends React.Component<SeatContainerProps, any>{
    private _currentSeat: object;
    private setCurrentSeat = (value) => {
        let old = this._currentSeat;
        this._currentSeat = value;
        this.currentChanged(value.student);
        if (old != undefined)
            (old as StudentSeat).forceUpdate();
    }
    private getCurrentSeat = () => {
        return this._currentSeat;
    }

    render() {
        const row = this.props.data.row;
        const col = this.props.data.col;

        const studentData = {
            showSelector: this.props.data.showSelector,
            setCurrentSeat: this.setCurrentSeat,
            getCurrentSeat: this.getCurrentSeat,
            updateCurrentStudent: this.currentChanged,
        }

        let items = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                const key = i + ' ' + j;
                let item = <StudentSeat key={key} data={studentData} />;
                items.push(item);
            }
            const key = i + 'br';
            items.push(<br key={key} style={{ clear: 'both' }} />);
        }

        const divProps = {
            style:{
                float:'left', 
                border:'1px solid blue',
            },
        }

        return <div {...divProps}>
            {items}
        </div>;
    }


    //选择学生发生改变事件
    private studentChangedNotify: ((StudentData) => void)[] = [];
    private currentChanged = (student: StudentData) => {
        for (let f of this.studentChangedNotify)
            f(student);
    }
    public addChangedNotify = (fun: (StudentData) => void) => {
        this.studentChangedNotify.push(fun);
    }
}
