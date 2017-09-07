//by hdp 2017.07.17
//作业修改

import * as React from 'react'
import * as $ from 'jquery'
import { Modal, Button, Checkbox, Input, Cascader } from 'antd'
import { Tool, SendType } from '../data/tool'
import { HomeworkData } from '../data/homeworkData'

const CheckboxGroup = Checkbox.Group;

interface ModifyHomeworkModalProps {
    homeworkOptions: object;//homeworkOptions
    students: object[];//{studentId,name}
    onUpdate: () => void;
}

export class ModifyHomeworkModal extends React.Component<ModifyHomeworkModalProps, any>{
    private visible = false;
    private studentId: string;
    private homeworkId: string;
    private data: HomeworkData = new HomeworkData();

    render() {
        const isAdd = (this.homeworkId === undefined);

        const modalProps = {
            visible: this.visible,
            title: isAdd ? '添加作业' : '修改作业',
            maskClosable: false,
            width: 640,
            onOk: this.onModifyHomework,
            onCancel: this.onCancel,
        };
        const options = this.props.homeworkOptions['subjects'];
        const cascaderProps = {
            options: options,
            value: [this.data['subject'], this.data['item'], this.data['childItem']],
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
            value: this.data['students'],
            onChange: this.onStudentCheckChange,
        };

        return <Modal {...modalProps}>
            <div style={{ float: 'left', margin: '5px' }}>
                <label>项目</label><br />
                <Cascader expandTrigger='hover' {...cascaderProps} /><br />
                <label>课本</label>
                <Input value={this.data['book']} onChange={(event) => this.onTextChange(event, 'book')} /><br />
                <label>范围</label>
                <Input value={this.data['range']} onChange={(event) => this.onTextChange(event, 'range')} /><br />
                <label>次数</label>
                <Input value={this.data['times']} onChange={(event) => this.onTextChange(event, 'times')} /><br />
                <label>描述</label>
                <Input value={this.data['desc']} onChange={(event) => this.onTextChange(event, 'desc')} /><br />
                <label>备注</label>
                <Input value={this.data['remark']} onChange={(event) => this.onTextChange(event, 'remark')} /><br />
                <Checkbox checked={this.data['isNeedSign']} onChange={this.onCheckChange}>签名</Checkbox>
            </div>
            <div style={{ float: 'left', width: '400px', margin: '5px' }}>
                <CheckboxGroup {...groupProps}>
                    {items}
                </CheckboxGroup>
            </div>
            <div style={{ clear: 'both' }} />
        </Modal>;
    }

    public setVisible = (value: boolean, studentId: string, homeworkData: object = {}) => {
        this.visible = value;
        this.studentId = studentId;
        this.data = $.extend(true, {}, homeworkData);
        if (this.data['students'] === undefined)
            this.data['students'] = [studentId];

        console.log(homeworkData['isNeedSign']);
        console.log(this.data['isNeedSign']);

        this.forceUpdate();
    }

    private onModifyHomework = () => {
        Tool.back.sendData(SendType.ModifyHomework, this.data, this.props.onUpdate);
        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.forceUpdate();
    }
    private onSelectItem = (value) => {
        this.data['subject'] = value[0];
        this.data['item'] = value[1];
        this.data['childItem'] = value[2];

        this.forceUpdate();
    }
    private onTextChange = (event, type: string) => {
        this.data[type] = event.currentTarget.value;
        this.forceUpdate();
    }
    private onCheckChange = (event) => {
        this.data['isNeedSign'] = event.target.checked;
        this.forceUpdate();
    }

    private onStudentCheckChange = (checkeds) => {
        this.data['students'] = checkeds;
        this.forceUpdate();
    }
}