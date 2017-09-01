//by hdp 2017.06.12
//学生信息
import * as React from 'react'
import { Button, Rate, Select, Modal } from 'antd'
import { SeatManager } from './seatManager'
import { Tool, SendType } from '../data/tool'

const Option = Select.Option;

interface StudentDetailProps {
    manager: SeatManager,
}

export class StudentDetail extends React.Component<StudentDetailProps, any>{
    private id: string;
    private name: string;
    private school: string;
    private class: string;
    private creditData: object = {};//{availableCredit:number, credits:{creditId:string, name:string, score:number}[]}
    private addCreditStatus: { credit: number, text: string } = { credit: 0, text: '' };
    private reduceCreditStatus: { credit: number, text: string } = { credit: 0, text: '' };

    private addCreditItems: { creditId: string, name: string, score: number }[] = [];
    private reduceCreditItems: { creditId: string, name: string, score: number }[] = [];

    render() {
        let detail;
        let credit;
        let addCredit;
        let reduceCredit;

        if (this.id !== undefined) {
            detail = <div style={{ marginBottom: '10px' }}>
                <label className='font-title'>{this.name}</label><br />
                <label style={{ fontSize: '18px' }}>{this.school}</label><br />
                <label style={{ fontSize: '18px' }}>{this.class}</label>
            </div>;

            credit = <div>
                <label style={{ fontSize: '18px' }}>积分：{this.creditData['availableCredit']}</label><br />
                <div>
                    <label>加分:{this.getCreditCount(true)}</label>
                    <label>减分:{this.getCreditCount(false)}</label>
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginAddCredit}>加分</Button>
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginAddCredit}>撤销加分</Button>
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginReduceCredit}>减分</Button>
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginReduceCredit}>撤销减分</Button>
                </div>
            </div>;

            let addItems = [];
            for (let item of this.addCreditItems) {
                addItems.push(<Option key={item.creditId}>{item.name}</Option>);
            }
            const addCreditProps = {
                title: '加分',
                visible: this.addVisible,
                onOk: this.onAddCreditOk,
                onCancel: this.onAddCreditCancel,
            };

            addCredit = <Modal width='260px' {...addCreditProps}>
                <label style={{ marginRight: '10px' }}>分数</label>
                <br />
                <label style={{ marginRight: '10px' }}>选项</label>
                <Select defaultValue={this.addCreditStatus.text} style={{ width: 120 }}
                    onChange={
                        (value: string) => { this.addText = value; }
                    }>
                    {addItems}
                </Select>
                <br />
                <label>分数</label>
                <label>描述</label>
            </Modal>;

            let reduceItems = [];
            for (let item of this.reduceCreditItems) {
                reduceItems.push(<Option key={item.creditId}>{item.name}</Option>);
            }
            const reduceCreditProps = {
                title: '减分',
                visible: this.reduceVisible,
                onOk: this.onReduceCreditOk,
                onCancel: this.onReduceCreditCancel,
            };

            reduceCredit = <Modal width='260px' {...reduceCreditProps}>
                <label style={{ marginRight: '10px' }}>分数</label>
                <Rate defaultValue={this.reduceCreditStatus.credit}
                    onChange={
                        (value: number) => { this.reduceCredit = value; }
                    } />
                <br />
                <label style={{ marginRight: '10px' }}>选项</label>
                <Select defaultValue={this.reduceCreditStatus.text} style={{ width: 120 }}
                    onChange={
                        (value: string) => { this.reduceText = value; }
                    }>
                    {reduceItems}
                </Select>
            </Modal>;
        }

        return <div className='seat-student-detail-div'>
            {detail}
            {credit}
            {addCredit}
            {reduceCredit}
        </div>;
    }
    componentDidMount() {
        Tool.back.sendData(SendType.AddCreditItem, {}, this.onReceiveCreditItem);
        Tool.back.sendData(SendType.ReduceCreditItem, {}, this.onReceiveCreditItem);
    }
    private onReceiveCreditItem = (value: object) => {
        Tool.lib.fillData(value, this);
    }

    public update = () => {
        const id = this.props.manager.getCurrentId();
        this.id = id;

        if (this.id === undefined) {
            this.forceUpdate();
        }
        else {
            Tool.back.sendData(SendType.StudentDetail, { studentId: id }, this.receiveDetail);
        }

    }
    private receiveDetail = (value: object) => {
        Tool.lib.fillData(value, this);
        Tool.back.sendData(SendType.Credit, { studentId: this.id }, this.receiveCredit);
    }
    private receiveCredit = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }
    
    //modal
    private onBeginAddCredit = () => {
        this.addVisible = true;
        this.addCredit = this.addCreditStatus.credit;
        this.addText = this.addCreditStatus.text;
        this.forceUpdate();
    }
    private onEndAddCredit = () => {
        this.addCreditStatus = {
            credit: this.addCredit,
            text: this.addText,
        }
        Tool.back.sendData(SendType.AddCredit, {
            id: this.id,
            credit: this.addCreditStatus.credit,
            text: this.addCreditStatus.text,
        });
        this.update();
    }
    private onAddCreditOk = () => {
        this.onEndAddCredit();
        this.onAddCreditCancel();
    }
    private onAddCreditCancel = () => {
        this.addVisible = false;
        this.forceUpdate();
    }
    //reduce
    private onBeginReduceCredit = () => {
        this.reduceVisible = true;
        this.reduceCredit = this.reduceCreditStatus.credit;
        this.reduceText = this.reduceCreditStatus.text;
        this.forceUpdate();
    }
    private onEndReduceCredit = () => {
        this.reduceCreditStatus = {
            credit: this.reduceCredit,
            text: this.reduceText,
        }
        Tool.back.sendData(SendType.ReduceCredit, {
            id: this.id,
            credit: this.reduceCreditStatus.credit,
            text: this.reduceCreditStatus.text,
        });

        this.update();
    }
    private onReduceCreditOk = () => {
        this.onEndReduceCredit();
        this.onReduceCreditCancel();
    }
    private onReduceCreditCancel = () => {
        this.reduceVisible = false;
        this.forceUpdate();
    }

    private addText: string;
    private addCredit: number;
    private addVisible = false;
    private reduceText: string;
    private reduceCredit: number;
    private reduceVisible = false;

    private getCreditCount(isAdd: boolean) {
        let count = 0;
        for (let c of this.creditData['credits'])
            if (isAdd && c.score > 0)
                count += c.score;
            else if (!isAdd && c.score < 0)
                count += c.score;

        return Math.abs(count);
    }
}