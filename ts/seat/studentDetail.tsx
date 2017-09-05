//by hdp 2017.06.12
//学生信息
import * as React from 'react'
import { Button, Rate, Select, Modal, Input, InputNumber, Row, Col } from 'antd'
import { SeatManager } from './seatManager'
import { Tool, SendType } from '../data/tool'

const Option = Select.Option;
const ButtonGroup = Button.Group;

interface StudentDetailProps {
    manager: SeatManager,
}

export class StudentDetail extends React.Component<StudentDetailProps, any>{
    private id: string;
    private name: string;
    private school: string;
    private class: string;
    private daily: { readingEndtime: string, readingStarttime: string };
    private creditData: object = {};//{availableCredit:number, credits:{creditId:string, name:string, score:number}[]}

    private addCreditItems: { creditId: string, name: string, score: number }[] = [];
    private reduceCreditItems: { creditId: string, name: string, score: number }[] = [];

    render() {
        let detail;
        let credit;
        let addCredit;
        let cancelCredit;
        let read;

        if (this.id !== undefined) {
            detail = <div style={{ marginBottom: '10px' }}>
                <label className='font-title'>{this.name}</label><br />
                <label style={{ fontSize: '18px' }}>{this.school}</label><br />
                <label style={{ fontSize: '18px' }}>{this.class}</label>
            </div>;

            credit = <div>
                <label style={{ fontSize: '18px', width: 80 }}>积分：{this.creditData['availableCredit']}    </label>
                <label style={{ fontSize: '18px', width: 80 }}>加分:{this.getCreditCount(true)}    </label>
                <label style={{ fontSize: '18px', width: 80 }}>减分:{this.getCreditCount(false)}</label>

                <ButtonGroup>
                    <Button onClick={() => this.onBeginAddCredit(true)}>加分</Button>
                    <Button onClick={() => this.onBeginCancelCredit(true)}>撤销加分</Button>
                    <Button onClick={() => this.onBeginAddCredit(false)}>减分</Button>
                    <Button onClick={() => this.onBeginCancelCredit(false)}>撤销减分</Button>
                </ButtonGroup>
                <div style={{ clear: 'both' }} />
            </div >;

            let creditItems = [];
            let defineItems = this.isAdd ? this.addCreditItems : this.reduceCreditItems;
            for (let item of defineItems)
                creditItems.push(<Option key={item.creditId}>{item.name}    {item.score}</Option>);

            const creditProps = {
                title: this.isAdd ? '加分' : '减分',
                visible: this.addCreditVisible,
                onOk: this.onAddCreditOk,
                onCancel: this.onAddCreditCancel,
            };

            addCredit = <Modal width='260px' {...creditProps}>
                <Select value={this.addCreditId} style={{ width: 230 }}
                    onChange={(value: string) => {
                        this.addCreditId = value;
                        this.otherVisible = (this.addCreditId === 'other') ? 'visible' : 'hidden';
                        this.forceUpdate();
                    }}>
                    {creditItems}
                </Select>
                <div style={{ visibility: this.otherVisible }}>
                    <label>描述</label><br />
                    <Input value={this.addCreditText}
                        onChange={(e) => {
                            this.addCreditText = e.currentTarget.value;
                            this.forceUpdate();
                        }} />
                    <br />
                    <label>分数</label><br />
                    <InputNumber value={this.addCreditScore} min={1} max={500} style={{ width: 230 }}
                        onChange={(value) => {
                            this.addCreditScore = value as number;
                            this.forceUpdate();
                        }} />
                </div>
            </Modal>;

            let cancelCreditItems = [];
            for (let item of this.creditData['credits']) {
                let score = item.score;
                if ((this.isAdd && score > 0) || (!this.isAdd && score < 0))
                    cancelCreditItems.push(<Option key={item.creditId}>{item.name}</Option>);
            }

            const cancelCreditProps = {
                title: this.isAdd ? '撤销加分' : '撤销减分',
                visible: this.cancelCreditVisible,
                onOk: this.onCancelCreditOk,
                onCancel: this.onCancelCreditCancel,
            };

            cancelCredit = <Modal width='260px' {...cancelCreditProps}>
                <Select style={{ width: 230 }} value={this.cancelCreditId}
                    onChange={(value: string) => {
                        this.cancelCreditId = value;
                        this.forceUpdate();
                    }}>
                    {cancelCreditItems}
                </Select>
            </Modal>;

            let readText;
            let readButtonText;
            let readButton;
            switch (this.readStatus) {
                case 0:
                    readButtonText = '开始阅读';
                    break;
                case 1:
                    readText = '阅读中';
                    readButtonText = '结束阅读';
                    break;
                case 2:
                    readText = '阅读结束';
                    break;
                default:
                    break;
            }
            if (this.readStatus !== 2)
                readButton = <Button style={{ margin: '5px' }}
                    onClick={this.onReadChange}>{readButtonText}</Button>;

            read = <div style={{ margin: 10 }}>
                <label>{readText}</label>
                {readButton}
            </div>;
            console.log(this.readStatus);
        }

        return <div className='seat-student-detail-div'>
            {detail}
            {credit}
            {addCredit}
            {cancelCredit}
            {read}
        </div>;
    }
    componentDidMount() {
        Tool.back.sendData(SendType.AddCreditItem, {}, this.onReceiveCreditItem);
        Tool.back.sendData(SendType.ReduceCreditItem, {}, this.onReceiveCreditItem);
    }
    private onReceiveCreditItem = (value: object) => {
        Tool.lib.fillData(value, this);

        console.log(value);
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

        if (this.daily.readingStarttime == null)
            this.readStatus = 0;
        else if (this.daily.readingEndtime == null)
            this.readStatus = 1;
        else
            this.readStatus = 2;

        Tool.back.sendData(SendType.Credit, { stdId: this.id }, this.receiveCredit);
    }
    private receiveCredit = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

    //add modal
    private onBeginAddCredit = (isAdd: boolean) => {
        this.isAdd = isAdd;
        this.addCreditId = isAdd ? this.addCreditItems[0]['creditId'] : this.reduceCreditItems[0]['creditId'];
        this.addCreditId = this.addCreditId.toString();
        this.addCreditVisible = true;
        this.addCreditText = '';
        this.addCreditScore = 1;
        this.otherVisible = 'hidden';

        this.forceUpdate();
    }
    private onEndAddCredit = () => {
        let score = this.isAdd ? this.addCreditScore : -this.addCreditScore;

        Tool.back.sendData(SendType.AddCredit, {
            studentId: this.id,
            creditId: this.addCreditId,
            name: this.addCreditText,
            score: score,
        }, this.receiveCredit);

    }
    private onAddCreditOk = () => {
        if (this.addCreditId === 'other' && this.addCreditText.trim().length === 0)
            return;

        this.onEndAddCredit();
        this.onAddCreditCancel();
    }
    private onAddCreditCancel = () => {
        this.addCreditVisible = false;
        this.forceUpdate();
    }

    //cancel modal
    private onBeginCancelCredit = (isAdd: boolean) => {
        this.isAdd = isAdd;
        let score = this.getCreditCount(isAdd);
        if (score === 0)
            return;

        this.cancelCreditVisible = true;
        for (let item of this.creditData['credits']) {
            let score = item.score;
            if ((this.isAdd && score > 0) || (!this.isAdd && score < 0)) {
                this.cancelCreditId = item.creditId.toString();
                break;
            }
        }

        this.forceUpdate();
    }
    private onEndCancelCredit = () => {
        Tool.back.sendData(SendType.CancelCredit, {
            studentId: this.id,
            creditId: this.cancelCreditId,
        }, this.receiveCredit);
    }
    private onCancelCreditOk = () => {
        this.onEndCancelCredit();
        this.onCancelCreditCancel();
    }
    private onCancelCreditCancel = () => {
        this.cancelCreditVisible = false;
        this.forceUpdate();
    }

    private addCreditVisible = false;
    private addCreditText = '';
    private addCreditScore = 1;
    private isAdd = true;//add or reduce
    private addCreditId: string;
    private cancelCreditVisible = false;
    private cancelCreditId: string;
    private otherVisible = 'hidden';

    private getCreditCount(isAdd: boolean) {
        let count = 0;
        for (let c of this.creditData['credits'])
            if (isAdd && c.score > 0)
                count += c.score;
            else if (!isAdd && c.score < 0)
                count += c.score;

        return isAdd ? Math.abs(count) : -Math.abs(count);
    }

    ///read
    private readStatus = 0;//0 not read;1 reading;2read over
    private onReadChange = () => {
        if (this.readStatus === 0)
            Tool.back.sendData(SendType.BeginRead, { stdId: this.id });
        else {
            if (!window.confirm('是否结束阅读？'))
                return;

            Tool.back.sendData(SendType.EndRead, { stdId: this.id });
        }
        this.readStatus++;
        this.forceUpdate();
    }
}