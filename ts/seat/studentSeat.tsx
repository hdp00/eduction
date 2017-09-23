//by hdp 2017.06.07
//学生座位

import * as React from 'react'
import { Button, Icon } from 'antd'
import { Tool, SendType, PaperState } from '../data/tool'
import { SeatManager } from './seatManager'

interface StudentSeatProps {
    manager: SeatManager,
    index: number,
    onSignin: (index: number) => void;
    onSelect: (index: number) => void;
}

export class StudentSeat extends React.Component<StudentSeatProps, any>{
    //学生id
    private studentId: string;
    //学生名字
    private name: string;
    //作业文本
    private taskText: string;
    //作业状态
    private taskStatus: PaperState;//PaperState 
    //定时结束时间
    private delayTime: Date;
    //刷新定时器id
    private timerId: number;
    //计时文本
    private delayText: string;

    render() {
        const isSelect = (this.props.manager.currentIndex === this.props.index);
        const selectClass = isSelect ? 'component-select' : '';
        const hasSigned = (this.studentId !== undefined);
        const hasTimer = (this.delayTime !== undefined);
        const timerIsOver = (this.timerId === undefined);

        let timer;
        if (hasTimer) {
            timer = timerIsOver ?
                <Button onClick={this.finishDelay}>计时完成</Button> :
                <div>
                    <Icon type='clock-circle' /><label>{this.delayText}</label>
                </div>;
        }

        let item;
        if (hasSigned) {
            item = <div style={{ paddingTop: '7px' }}>
                <div style={{ backgroundColor: Tool.lib.getHomeworkStateColor(this.taskStatus) }}>{this.taskText}</div>
                <label style={{ fontSize: '16px' }}>{this.name}</label>
                <br />
                {timer}
            </div>;
        }
        else {
            item = <Button style={{ marginTop: '7px', width: '60px', height: '60px' }}
                onClick={this.onSign}>签到</Button>;
        }

        const divProps = {
            className: 'seat-student-seat-div' + ' ' + selectClass,
            onClick: this.onSelect,
        }

        return <div {...divProps}>
            {item}
        </div>;
    }
    componentWillUnmount() {
        //销毁后停止延时器
        clearInterval(this.timerId);
        this.delayTime = undefined;
    }

    //value:{studentId, name, taskText, taskStatus}
    public setStudent = (value: object) => {
        if (value === undefined) {
            this.studentId = undefined;
            this.clearDelay();
        } else {
            Tool.lib.fillData(value, this);

            let delayData = {};
            Tool.lib.loadData('delay_' + this.studentId, delayData);
            this.setDelayTime(new Date(delayData['date']));
        }

        this.forceUpdate();
    }

    public setDelayTime = (delayTime: Date) => {
        if (this.studentId === undefined || delayTime === undefined)
            return;
        if (isNaN(delayTime.getTime()))
            return;
        this.clearDelay();

        this.delayTime = delayTime;
        Tool.lib.saveData('delay_' + this.studentId, { date: delayTime });

        if (this.delayInterval())
            this.timerId = window.setInterval(this.delayInterval, 1000);
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
        Tool.lib.saveData('delay_' + this.studentId, undefined);
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