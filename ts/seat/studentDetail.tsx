//by hdp 2017.06.12
//学生信息

import * as React from 'react'
import { Button, Rate, Select, Modal } from 'antd'
import { SeatManager } from './seatManager'
import { Tool, Type.SendType } from '../data/tool'

const Option = Select.Option;

interface StudentDetailProps {
    manager: SeatManager,
}

export class StudentDetail extends React.Component<StudentDetailProps, any>{
    private id: string;
    private name: string;
    private school: string;
    private class: string;
    private credit: number;
    private addCreditStatus: { credit: number, text: string };
    private reduceCreditStatus: { credit: number, text: string };

    private addCreditItems: string[] = [];
    private reduceCreditItems: string[] = [];

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
                <label style={{ fontSize: '18px' }}>积分：{this.credit}</label><br />
                <div>
                    <label>纪律加分</label>
                    <Rate disabled value={this.addCreditStatus.credit} /><br />
                    <label>纪律减分</label>
                    <Rate disabled value={this.reduceCreditStatus.credit} /><br />
                    <Button style={{ margin: '10px' }} type='primary' onClick={this.onBeginAddCredit}>加分</Button>
                    <Button style={{ margin: '10px' }} type='primary' onClick={this.onBeginReduceCredit}>减分</Button>
                </div>
            </div>;

            let addItems = [];
            for (let item of this.addCreditItems) {
                addItems.push(<Option key={item}>{item}</Option>);
            }
            const addCreditProps = {
                title: '纪律加分',
                visible: this.addVisible,
                onOk: this.onAddCreditOk,
                onCancel: this.onAddCreditCancel,
            };

            addCredit = <Modal width='260px' {...addCreditProps}>
                <label style={{marginRight:'10px'}}>分数</label>
                <Rate defaultValue={this.addCreditStatus.credit}
                    onChange={
                        (value: number) => { this.addCredit = value; }
                    } />
                <br />
                <label style={{marginRight:'10px'}}>选项</label>
                <Select defaultValue={this.addCreditStatus.text} style={{ width: 120 }}
                    onChange={
                        (value: string) => { this.addText = value; }
                    }>
                    {addItems}
                </Select>
            </Modal>;

            let reduceItems = [];
            for (let item of this.reduceCreditItems) {
                reduceItems.push(<Option key={item}>{item}</Option>);
            }
            const reduceCreditProps = {
                title: '纪律减分',
                visible: this.reduceVisible,
                onOk: this.onReduceCreditOk,
                onCancel: this.onReduceCreditCancel,
            };

            reduceCredit = <Modal width='260px' {...reduceCreditProps}>
                <label style={{marginRight:'10px'}}>分数</label>
                <Rate defaultValue={this.reduceCreditStatus.credit}
                    onChange={
                        (value: number) => { this.reduceCredit = value; }
                    } />
                <br />
                <label style={{marginRight:'10px'}}>选项</label>
                <Select defaultValue={this.reduceCreditStatus.text} style={{ width: 120 }}
                    onChange={
                        (value: string) => { this.reduceText = value; }
                    }>
                    {reduceItems}
                </Select>
            </Modal>;
        }

        const divProps = {

        };

        return <div className='seat-student-detail-div'>
            {detail}
            {credit}
            {addCredit}
            {reduceCredit}
        </div>;
    }
    componentDidMount() {
        Tool.back.sendData(Type.SendType.addCreditItem, undefined, this.onReceiveAddCreditItem);
        Tool.back.sendData(Type.SendType.reduceCreditItem, undefined, this.onReceiveReduceCreditItem);
    }
    private onReceiveAddCreditItem = (value: object) => {
        Tool.lib.fillData(value, this);
    }
    private onReceiveReduceCreditItem = (value: object) => {
        Tool.lib.fillData(value, this);
    }

    public update = () => {
        const id = this.props.manager.getCurrentId();
        this.id = id;

        if (this.id === undefined) {
            this.forceUpdate();
        }
        else
            Tool.back.sendData(Type.SendType.studentDetail, { id: id }, this.receiveDetail)
    }
    private receiveDetail = (value: object) => {
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
        Tool.back.sendData(Type.SendType.addCredit, {
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
        Tool.back.sendData(Type.SendType.reduceCredit, {
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
}