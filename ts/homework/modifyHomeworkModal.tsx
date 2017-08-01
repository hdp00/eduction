//by hdp 2017.07.17
//作业修改

import * as React from 'react'
import * as $ from 'jquery'
import { Modal, Button, Checkbox, Input, Cascader } from 'antd'
import { Tool, Type.SendType } from '../data/tool'

const CheckboxGroup = Checkbox.Group;

interface ModifyHomeworkModalProps {
    homeworkOptions: object;//homeworkOptions
    //{id,name}
    students: object[];
    onUpdate: () => void;
}

export class ModifyHomeworkModal extends React.Component<ModifyHomeworkModalProps, any>{
    private visible = false;
    private studentId: string;
    private homeworkId: string;
    private homeworkData: object = {};//homeworkData

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
            value: this.homeworkData['studentIds'],
            onChange: this.onStudentCheckChange,
        };

        return <Modal {...modalProps}>
            <div style={{ float: 'left', margin:'5px' }}>
                <label>项目</label><br/>
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
                <Checkbox checked={this.homeworkData['isNeedSign']} onChange={this.onCheckChange}>签名</Checkbox>
            </div>
            <div style={{ float: 'left',width:'400px', margin:'5px' }}>
                <CheckboxGroup {...groupProps}>
                    {items}
                </CheckboxGroup>
            </div>
            <div style={{clear:'both'}} />
        </Modal>;
    }

    public setVisible = (value: boolean, studentId: string, homeworkData: object = {}) => {
        this.visible = value;
        this.studentId = studentId;
        this.homeworkData = $.extend(true, {}, homeworkData);
        if (this.homeworkData['studentIds'] === undefined)
            this.homeworkData['studentIds'] = [studentId];

        console.log(homeworkData['isNeedSign']);
        console.log(this.homeworkData['isNeedSign']);


        this.forceUpdate();
    }

    private onModifyHomework = () => {
        Tool.back.sendData(Type.SendType.modifyHomework, this.homeworkData, this.props.onUpdate);
        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.forceUpdate();
    }
    private onSelectItem = (value) => {
        this.homeworkData['subject'] = value[0];
        this.homeworkData['item'] = value[1];
        this.homeworkData['childItem'] = value[2];

        this.forceUpdate();
    }
    private onTextChange = (event, type: string) => {
        this.homeworkData[type] = event.currentTarget.value;
        this.forceUpdate();
    }
    private onCheckChange = (event) => {
        this.homeworkData['isNeedSign'] = event.target.checked;
        this.forceUpdate();
    }

    private onStudentCheckChange = (checkeds) => {
        this.homeworkData['studentIds'] = checkeds;
        this.forceUpdate();
    }
}