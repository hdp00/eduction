//by hdp 2017.06.11
//学生座位管理

import * as React from 'react'
import { Button, Select } from 'antd'
import { StudentSeat } from './studentSeat'
import { StudentSelector } from './studentSelector'
import { SeatManager } from './seatManager'
import { Tool, SendType } from '../data/tool'

const Option = Select.Option;

interface SeatContainerProps {
    manager: SeatManager,
}

export class SeatContainer extends React.Component<SeatContainerProps, any>{
    //定时时间
    private delayMinute: number = 15;
    //座位行数
    private row: number = 0;
    //座位列数
    private col: number = 0;

    render() {
        const row = this.row;
        const col = this.col;

        let items = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                const key = i * col + j;
                const studentProps = {
                    manager: this.props.manager,
                    index: key,
                    key: key,
                    ref: key.toString(),
                    onSignin: this.onBeginSignin,
                    onSelect: this.onSelect,
                };

                let item = <StudentSeat {...studentProps} />;
                items.push(item);
            }
            const brkey = i + 'br';
            items.push(<div key={brkey} style={{ clear: 'both' }} />);
        }
        items.push(<div key={'end_br'} style={{ clear: 'both' }} />)

        const divProps = {
            className: 'seat-student-contain-div',
        }
        const timerProps = {
            style: {
                float: 'right',
                marginLeft: '4px',
                marginRight: '20px',
            },
            defaultValue: this.delayMinute.toString(),
            onChange: this.onChangeDelayTime,
        };

        const buttonAProps = {
            style: {
                float: 'left',
                marginLeft: '20px',
            }
        }
        const buttonBProps = {
            style: {
                float: 'right',
                marginLeft: '20px',
            }
        }

        //rely on css
        let width = (84 + 3 * 2) * col + 'px';
        return <div {...divProps}>
            <div style={{ width: width, margin: '0 auto' }}>
                {items}
            </div>
            <div style={{ margin: '20px' }}>
                <Button {...buttonAProps} size='large' type='primary' icon='login' onClick={this.onSigninAll}>全体签到</Button>
                <Button {...buttonAProps} size='large' type='primary' icon='logout' onClick={this.onSignout}>签退</Button>
                <Select {...timerProps} size='large'>
                    <Option value="5">5</Option>
                    <Option value="10">10</Option>
                    <Option value="15">15</Option>
                    <Option value="20">20</Option>
                    <Option value="30">30</Option>
                </Select>
                <Button {...buttonBProps} size='large' type='primary' icon='clock-circle-o' onClick={this.onDelay}>计时</Button>
            </div>
            <StudentSelector ref='selector' onSelect={this.onEndSignin} />
        </div>;
    }

    componentDidMount() {
        Tool.back.sendData(SendType.StudentContainer, {}, this.receiveStudents);
    }
    private receiveStudents = (value: object) => {
        this.row = value['row'];
        this.col = value['col'];

        //初始化索引数据
        let students: object[] = value['students'];
        for (let s of students) {
            let index = s['index'];
            this.props.manager.seatIds[index] = s['studentId'];
        }

        this.forceUpdate();

        //生成座位后，填充数据
        this.students = students;
        this.timerId = setInterval(this.initStudentSeat, 400);
    }

    private onBeginSignin = (index: number) => {
        let selector = this.refs['selector'] as StudentSelector;
        selector.setVisible(true, index);
    }
    private onEndSignin = (index: number, ids: string[]) => {
        //index为-1时选择全部
        if (index === -1) {
            let seatIndex = 0;
            for (let id of ids) {
                while (this.props.manager.seatIds[seatIndex] !== undefined) {
                    seatIndex++;
                }

                const seat = this.refs[seatIndex] as StudentSeat;
                if (seat === undefined)
                    return;

                Tool.back.sendData(SendType.Signin, [{ id: id, index: seatIndex }]);
                this.props.manager.seatIds[seatIndex] = id;
                seat.setId(id);
            }
        } else {
            const id = ids[0];
            const seat = this.refs[index] as StudentSeat;

            Tool.back.sendData(SendType.Signin, [{ id: id, index: index }]);
            this.props.manager.seatIds[index] = id;
            seat.setId(id);
        }

        this.props.manager.onCurrentStudentChange();
    }
    //当前座位发生变化
    private onSelect = (index: number) => {
        let preIndex = this.props.manager.currentIndex;
        this.props.manager.currentIndex = index;

        this.props.manager.onCurrentStudentChange();

        (this.refs[index] as StudentSeat).forceUpdate();
        const preSeat = (this.refs[preIndex] as StudentSeat);
        if (preSeat !== undefined)
            preSeat.forceUpdate();
    }

    private onSigninAll = () => {
        let selector = this.refs['selector'] as StudentSelector;
        selector.setVisible(true, -1);
    }
    private onSignout = () => {
        const id = this.props.manager.getCurrentId();
        if (id === undefined)
            return;

        Tool.back.sendData(SendType.Signout, { id: id });
        let index = this.props.manager.currentIndex;
        this.props.manager.seatIds[index] = undefined;
        (this.refs[index] as StudentSeat).setId(undefined);

        this.props.manager.onCurrentStudentChange();
    }
    private onDelay = () => {
        const index = this.props.manager.currentIndex;
        const seat = this.refs[index] as StudentSeat;
        if (seat === undefined)
            return;

        let timer: Date = new Date();
        timer.setTime(timer.getTime() + this.delayMinute * 60 * 1000);
        seat.setDelayTime(timer);
    }
    private onChangeDelayTime = (value: string) => {
        this.delayMinute = parseInt(value, 10);
    }

    //签到学生数据，临时保存，使用一次后应置空
    private students: object[];
    private timerId: number;
    //初始化座位数据
    private initStudentSeat = () => {
        if (this.students === undefined || this.row === 0 || this.col === 0) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
        let seat = this.refs['0']
        if (seat === undefined)
            return;

        for (let s of this.students) {
            let index = s['index'];
            let seat = this.refs[index] as StudentSeat;
            if (seat === undefined)
                continue;
            delete s['index'];
            seat.receiveStudent(s);
        }

        this.students = undefined;
        clearInterval(this.timerId);
        this.timerId = undefined;
    }

}
