//by hdp 2017.07.17
//作业修改

import * as React from 'react'
import * as $ from 'jquery'
import { Modal, Button, Checkbox, Input, Cascader } from 'antd'
import { Tool, SendType } from '../data/tool'

const CheckboxGroup = Checkbox.Group;

interface ModifyHomeworkModalProps {
    homeworkItem: object;//homeworkItem
    //{id,name}
    students: object[];
    onModify: () => void;
}

export class ModifyHomeworkModal extends React.Component<ModifyHomeworkModalProps, any>{
    private visible = false;
    private studentId: string;
    private homeworkId: string;
    private homeworkData: object = {};//homeworkData
    private checks: string[] = [];

    render() {
        const isAdd = (this.homeworkId === undefined);

        const modalProps = {
            visible: this.visible,
            title: isAdd ? '添加作业' : '修改作业',
            maskClosable: false,
            width: 600,
            onOk: this.onModifyHomework,
            onCancel: this.onCancel,
        };
        const options = this.props.homeworkItem['subjects'];
        const cascaderProps = {
            options: options,
            value: [this.homeworkData['subject'], this.homeworkData['item'], this.homeworkData['childItem']],
            onChange: this.onSelectItem,
        };

        const students = this.props.students;
        let items = [];
        for (let s of students) {
            const checkProps = {
                value: s['id'],
                key: s['id'],
                disabled: (this.studentId === s['id']) ? true : false,
                style: {
                    width: '100px',
                },
            }

            items.push(<Checkbox {...checkProps}>{s['name']}</Checkbox>);
        }
        const groupProps = {
            value: this.checks,
            onChange: this.onStudentCheckChange,
        };

        return <Modal {...modalProps}>
            <div style={{ float: 'left' }}>
                <label>项目</label>
                <Cascader expandTrigger='hover' {...cascaderProps} /><br />
                <label>课本</label>
                <Input value={this.homeworkData['book']} onChange={(event) => this.onTextChange(event, 'book')} /><br />
                <label>范围</label>
                <Input value={this.homeworkData['range']} onChange={(event) => this.onTextChange(event, 'range')} /><br />
                <label>次数</label>
                <Input value={this.homeworkData['times']} onChange={(event) => this.onTextChange(event, 'times')} /><br />
                <label>描述</label>
                <Input value={this.homeworkData['desc']} onChange={(event) => this.onTextChange(event, 'desc')} /><br />
                <label>备注</label>
                <Input value={this.homeworkData['remark']} onChange={(event) => this.onTextChange(event, 'remark')} /><br />
                <Checkbox value={this.homeworkData['isNeedSign']} onChange={this.onCheckChange}>签名</Checkbox>
            </div>
            <div style={{ float: 'left' }}>
                <CheckboxGroup {...groupProps}>
                    {items}
                </CheckboxGroup>
            </div>
        </Modal>;
    }

    public setVisible = (value: boolean, studentId: string, homewokId: string = undefined, homeworkData: object = {}) => {
        this.visible = value;
        this.studentId = studentId;
        this.homeworkId = homewokId;
        this.homeworkData = homeworkData;
        this.checks = [studentId];

        this.forceUpdate();
    }

    private onModifyHomework = () => {
        Tool.back.sendData(SendType.modifyHomework, this.homeworkData, this.props.onModify);
        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.forceUpdate();
    }
    private onSelectItem = (value) => {
        //temp
        this.forceUpdate();
    }
    private onTextChange = (event, type: string) => {
        this.homeworkData[type] = event.currentTarget.value;
        this.forceUpdate();
    }
    private onCheckChange = (event) => {
        this.homeworkData['isNeedSign'] = event.currentTarget.value;
        this.forceUpdate();
    }

    private onStudentCheckChange = (checkeds) => {
        this.checks = checkeds;
        this.forceUpdate();
    }
}