//by hdp 2017.06.07
//学生座位

import * as React from 'react'
import { Button } from 'antd'
import { PaperState } from '../define'
import { StudentData } from '../data/studentData'
import { StudentSelector } from './studentSelector'

interface StudentSeatProps {
    data: {
        showSelector: (type: number, callback: (students: StudentData[]) => void) => void;
        setCurrentSeat: (value: object) => void;
        getCurrentSeat: () => object;
        updateCurrentStudent: (data: StudentData) => void;
    }
}

export class StudentSeat extends React.Component<StudentSeatProps, any>{
    private _student: StudentData;
    get student() {
        return this._student;
    }

    render() {
        const isCurrent = (this === this.props.data.getCurrentSeat());
        const selectClass = isCurrent ? 'seat-select' : '';
        const hasSigned = (this._student !== undefined);

        const name = hasSigned ? this._student.name : undefined;
        const homework = hasSigned ? this.homeworkState() : undefined;

        const buttonLabel = hasSigned ? '签退' : '签到';
        const buttonProps = {
            onClick: this.onSign,
        };

        const divProps = {
            className: 'seat-student-seat-div' + ' ' + selectClass,
            onClick: this.onSelect,
            style: {
                float: 'left'
            }
        }

        return <div {...divProps}>
            <label>{name}</label>
            <br />
            <label>{homework}</label>
            <br />
            <Button {...buttonProps}>{buttonLabel}</Button>
        </div>;
    }

    public receiveStudent = (students: StudentData[]) => {
        this._student = students[0];
        this._student.hasSigned = true;
        this._student.seatComponent = this;
        this.forceUpdate();

        const isCurrent = (this === this.props.data.getCurrentSeat());
        if(isCurrent)
            this.props.data.updateCurrentStudent(this._student);
    }

    private onSelect = () => {
        this.props.data.setCurrentSeat(this);
        this.forceUpdate();
    }

    private onSign = () => {
        const hasSigned = (this._student !== undefined);
        if (hasSigned) {
            this._student.seatComponent = undefined;
            this._student.hasSigned = false;
            this._student = undefined;
            this.forceUpdate();
        } else {
            this.props.data.showSelector(1, this.receiveStudent);
        }
    }

    private homeworkState() {
        let homeworks = this._student.homeworks;
        let count = homeworks.length;
        let finished = 0;
        for (let h of homeworks) {
            if (h.status === PaperState.Finished)
                finished++;
        }

        return finished + '/' + count;
    }
}