//by hdp 2017.06.07
//学生座位

import * as React from 'react'
import { Button } from 'antd'
import { Tool, SendType } from '../data/tool'
import { SeatManager } from './seatManager'

interface StudentSeatProps {
    manager: SeatManager;
}

export class StudentSeat extends React.Component<StudentSeatProps, any>{
    //学生id
    private id: string;
    //座位索引
    private index: number = 0;
    //学生名字
    private name: string;
    //作业文本
    private homeworkText: string;
    //作业状态
    private homeworkState: number;
    //定时器
    private timer;

    render() {
        const isSelect = (this.props.manager.currentIndex === this.index);
        const selectClass = isSelect ? 'seat-select' : '';
        const hasSigned = (this.id !== undefined);

        let items = [];
        if (hasSigned) {
            items.push(<label>{this.name}</label>);
            items.push(<br />);
            items.push(<label>{this.homeworkText}</label>);
            items.push(<br />);
        }
        else {
            items.push(<Button onClick={this.onSign}>签到</Button>)
        }

        const divProps = {
            className: 'seat-student-seat-div' + ' ' + selectClass,
            onClick: this.onSelect,
            style: {
                float: 'left'
            }
        }

        return <div {...divProps}>
            {items}
        </div>;
    }

    //value{id:string}
    public receiveData = (value: object) => {
        Tool.lib.fillData(this, value);

        Tool.back.sendData(SendType)
    }
    //value{name:string, homework:string}
    private receiveStudent = (value: object) => {

    }
    private load() {

    }

    public initStudent = (student: StudentData) => {
        this._student = student;
        this._student.seatComponent = this;
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
}