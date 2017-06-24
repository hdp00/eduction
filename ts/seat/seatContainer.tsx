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
    public row: number = 0;
    //座位列数
    public col: number = 0;

    render() {
        const row = this.row;
        const col = this.col;

        let items = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                const key = i * row + j;
                const studentProps = {
                    manager: this.props.manager,
                    index: key,
                    key: key,
                    ref: key.toString(),
                };

                let item = <StudentSeat {...studentProps} />;
                items.push(item);
            }
            const brkey = i + 'br';
            items.push(<br key={brkey} style={{ clear: 'both' }} />);
        }

        const divProps = {
            style: {
                float: 'left',
                border: '1px solid blue',
            },
        }
        const selectProps = {
            defaultValue: this.delayMinute.toString(),
            style: {
                width: '120',
            },
            onChange: this.onChangeDelayTime,
        };

        return <div {...divProps}>
            {items}
            <div>
                <Button onClick={this.onSigninAll}>全体签到</Button>
                <Button onClick={this.onSignout}>签退</Button>
                <div>
                    <Button onClick={this.onDelay}>计时</Button>
                    <Select {...selectProps}>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                        <Option value="30">30</Option>
                    </Select>
                </div>
            </div>
        </div>;
    }
    componentDidMount() {
        Tool.back.sendData(SendType.StudentContainer, undefined, this.receiveStudents);
    }
    private receiveStudents(value: object) {
        this.row = value['row'];
        this.col = value['col'];

        let students:object[] = value['students']; 
        for(let s of students){
            
        }

        this.forceUpdate();
    }


    private onSigninAll() {

    }
    private onSignout = () => {
        const id = this.props.manager.getCurrentId();
        if (id === undefined)
            return;

        Tool.back.sendData(SendType.Signout);
        let index = this.props.manager.currentIndex;
        this.props.manager.seatIds[index] = undefined;
        (this.refs[index] as StudentSeat).setId(undefined);

        //updat others
        console.log();
    }
    private onDelay = () => {

    }
    private onChangeDelayTime = (value: string) => {

    }


    //当前座位发生变化
    private onSelect = (index: number) => {
        let preIndex = this.props.manager.currentIndex;
        this.props.manager.currentIndex = index;
        //notify others
        console.log();

        (this.refs[index.toString()] as StudentSeat).forceUpdate();
        (this.refs[preIndex.toString()] as StudentSeat).forceUpdate();
    }
}
