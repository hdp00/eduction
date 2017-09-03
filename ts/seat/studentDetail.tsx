//by hdp 2017.06.12
//学生信息
import * as React from 'react'
import { Button, Rate, Select, Modal, Input, InputNumber } from 'antd'
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

    private addCreditItems: { creditId: string, name: string, score: number }[] = [];
    private reduceCreditItems: { creditId: string, name: string, score: number }[] = [];

    render() {
        let detail;
        let credit;
        let addCredit;
        let cancelCredit;

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
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginAddCredit(true)}>加分</Button>
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginCancelCredit(true)}>撤销加分</Button>
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginAddCredit(false)}>减分</Button>
                    <Button style={{ margin: '5px' }} type='primary' onClick={this.onBeginCancelCredit(false)}>撤销减分</Button>
                </div>
            </div>;

            let creditItems = [];
            let defineItems = this.isAdd ? this.addCreditItems : this.reduceCreditItems;
            for (let item of defineItems)
                creditItems.push(<Option key={item.creditId}>{item.name}</Option>);

            const creditProps = {
                title: this.isAdd ? '加分' : '减分',
                visible: this.addCreditVisible,
                onOk: this.onAddCreditOk,
                onCancel: this.onAddCreditCancel,
            };

            addCredit = <Modal width='260px' {...creditProps}>
                <label style={{ marginRight: '10px' }}>分数</label>
                <br />
                <label style={{ marginRight: '10px' }}>选项</label>
                <Select defaultValue={this.addCreditId} style={{ width: 120 }}
                    onChange={(value: string) => { this.addCreditId = value; }}>
                    {creditItems}
                </Select>
                <label>描述</label>
                <Input value={this.addCreditText}
                    onChange={(e) => {
                        this.addCreditText = e.currentTarget.value;
                        this.forceUpdate();
                    }} />
                <br />
                <label>分数</label>
                <InputNumber value={this.addCreditScore} min={1} max={500}
                    onChange={(value) => {
                        this.addCreditScore = value as number;
                        this.forceUpdate();
                    }} />
            </Modal>;

            let cancelCreditItems = [];
            for (let item of this.creditData['credits']) {
                let score = item.score;
                if ((this.isAdd && score > 0) || (!this.isAdd && score < 0))
                    creditItems.push(<Option key={item.creditId}>{item.name}</Option>);
            }

            const cancelCreditProps = {
                title: this.isAdd ? '撤销加分' : '撤销减分',
                visible: this.cancelCreditVisible,
                onOk: this.onCancleCreditOk,
                onCancel: this.onCancelCreditCancel,
            };

            let cancelCredit = <Modal width='260px' {...cancelCreditProps}>
                <Select defaultValue={this.addCreditId} style={{ width: 120 }}
                    onChange={(value: string) => { this.addCreditId = value; }}>
                    {creditItems}
                </Select>
            </Modal>;
        }

        return <div className='seat-student-detail-div'>
            {detail}
            {credit}
            {addCredit}
            {cancelCredit}
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
        Tool.back.sendData(SendType.AddCredit, { studentId: this.id }, this.receiveCredit);
    }
    private receiveCredit = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

    //modal
    private onBeginAddCredit = (isAdd: boolean) => {
        this.isAdd = isAdd;
        this.addCreditVisible = true;
        this.addCreditText = '';
        this.addCreditScore = 1;

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
        // this.onEndAddCredit();
        // this.onAddCreditCancel();
    }
    private onAddCreditCancel = () => {
        // this.addVisible = false;
        // this.forceUpdate();
    }

    private addCreditVisible = false;
    private addCreditText = '';
    private addCreditScore = 1;
    private isAdd = true;//add or reduce
    private addCreditId: string;
    private cancelCreditVisible = false;
    private cancelCreditId: string;

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