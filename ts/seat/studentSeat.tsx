//by hdp 2017.06.07
//学生座位

import * as React from 'react'
import { Button } from 'antd'
import { PaperState } from '../define'
import { StudentData } from '../data/studentData'
import { StudentSelector } from './studentSelector'

interface StudentSeatProps {
    students: StudentData[];
    showSelector: (type: number, callback: (students: StudentData[]) => void) => void;
}

export class StudentSeat extends React.Component<StudentSeatProps, any>{
    private student: StudentData;
    private isSelected: boolean = false;

    render() {
        const hasSigned = (this.student !== undefined);

        const name = hasSigned ? this.student.name : undefined;
        const homework = hasSigned ? this.homeworkState() : undefined;

        const buttonLabel = hasSigned ? '签退' : '签到';
        const buttonProps = {
            onClick: this.onSign,
        };

        const divProps = {
            onClick: this.onSelect,
        }

        return <div {...divProps}>
            <span>{name}</span>
            <span>{homework}</span>
            <Button {...buttonProps}>{buttonLabel}</Button>
        </div>;
    }

    public receiveStudent = (students: StudentData[]) => {
        this.student = students[0];
        this.student.hasSigned = true;
        this.student.seatComponent = this;
        this.forceUpdate();
    }

    private onSelect = () => {
        this.isSelected = true;
        this.forceUpdate();
    }

    private onSign = () => {
        const hasSigned = (this.student !== undefined);
        if (hasSigned) {
            this.student.seatComponent = undefined;
            this.student.hasSigned = false;
            this.student = undefined;
            this.forceUpdate();
        } else {
            this.props.showSelector(0, this.receiveStudent);
        }
    }

    private homeworkState() {
        let homeworks = this.student.homeworks;
        let count = homeworks.length;
        let finished = 0;
        for (let h of homeworks) {
            if(h.status === PaperState.Finished)
                finished++;
        }

        return finished + '/' + count;
    }
}