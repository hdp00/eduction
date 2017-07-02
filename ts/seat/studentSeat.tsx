//by hdp 2017.06.07
//学生座位

import * as React from 'react'
import { Button } from 'antd'
import { Tool, SendType } from '../data/tool'
import { SeatManager } from './seatManager'

interface StudentSeatProps {
    manager: SeatManager,
    index: number,
    onSignin: (index: number) => void;
    onSelect: (index: number) => void;
}

export class StudentSeat extends React.Component<StudentSeatProps, any>{
    //学生id
    private id: string;
    //学生名字
    private name: string;
    //作业文本
    private taskText: string;
    //作业状态
    private taskStatus: number;
    //定时结束时间
    private delayTime: Date;
    //刷新定时器id
    private timerId: number;
    //计时文本
    private delayText: string;

    render() {
        const isSelect = (this.props.manager.currentIndex === this.props.index);
        const selectClass = isSelect ? 'component-select' : '';
        const hasSigned = (this.id !== undefined);
        const hasTimer = (this.delayTime !== undefined);
        const timerIsOver = (this.timerId === undefined);

        let timer;
        if (hasTimer) {
            let component = timerIsOver ?
                <Button onClick={this.finishDelay}>计时完成</Button> :
                <label>{this.delayText}</label>;
            timer = <div>
                {component}
            </div>;
        }

        let item;
        if (hasSigned) {
            item = <div>
                <label>{this.taskText}</label>
                <br />
                <label>{this.name}</label>
                <br />
                {timer}
            </div>;
        }
        else {
            item = <Button onClick={this.onSign}>签到</Button>
        }

        const divProps = {
            className: 'seat-student-seat-div' + ' ' + selectClass,
            onClick: this.onSelect,
            style: {
                float: 'left',
            }
        }

        return <div {...divProps}>
            {item}
        </div>;
    }

    public setId = (id: string) => {
        this.id = id;

        if (this.id !== undefined) {
            Tool.back.sendData(SendType.StudentSeat, { id: this.id }, this.receiveStudent);
            return;
        } else {
            this.clearDelay();
        }

        this.forceUpdate();
    }
    public receiveStudent = (value: object) => {
        Tool.lib.fillData(this, value);

        let d = localStorage[this.id + '_delay'];
        this.setDelayTime(new Date(d));

        this.forceUpdate();
    }

    public setDelayTime = (delayTime: Date) => {
        if (this.id === undefined || delayTime === undefined)
            return;
        if (isNaN(delayTime.getTime()))
            return;
        this.clearDelay();

        this.delayTime = delayTime;
        localStorage[this.id + '_delay'] = delayTime;

        if (this.delayInterval())
            this.timerId = setInterval(this.delayInterval, 1000);
    }
    private delayInterval = () => {
        const now = new Date().getTime() / 1000;
        const delay = this.delayTime.getTime() / 1000;
        const interval = delay - now;
        //超时太长，取消
        if (Math.abs(interval) > 2 * 3600) {
            this.clearDelay();
            return false;
        }

        if (interval < 0) {
            clearInterval(this.timerId);
            this.timerId = undefined;
            this.forceUpdate();
            return false;
        }

        let minute = Math.floor(interval / 60).toString();
        minute = (minute.length < 2) ? '0' + minute : minute;
        let second = Math.floor(interval % 60).toString();
        second = (second.length < 2) ? '0' + second : second;
        this.delayText = minute + ':' + second;

        this.forceUpdate();
        return true;
    }
    private clearDelay = () => {
        clearInterval(this.timerId);
        this.delayTime = undefined;
        this.timerId = undefined;
        localStorage.removeItem(this.id + '_delay');
    }
    private finishDelay = () => {
        this.clearDelay();
        this.forceUpdate();
    }

    private onSelect = () => {
        if (this.props.manager.currentIndex === this.props.index)
            return;

        this.props.onSelect(this.props.index);
    }
    private onSign = () => {
        this.props.onSignin(this.props.index);
    }
}