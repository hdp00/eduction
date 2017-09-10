//by hdp 2017.07.17
//作业修改

import * as React from 'react'
import * as $ from 'jquery'
import { Modal, Button, Checkbox, Input, Cascader, Select } from 'antd'
import { Tool, SendType } from '../data/tool'
import { HomeworkData } from '../data/homeworkData'

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

interface ModifyHomeworkModalProps {
    homeworkOptions: { value: string, label: string }[];//homeworkOptions
    students: object[];//{studentId,name}
    onUpdate: () => void;
}

export class ModifyHomeworkModal extends React.Component<ModifyHomeworkModalProps, any>{
    private visible = false;
    private studentId: string;
    private selectStudents: string[] = [];
    private homeworkData: HomeworkData = new HomeworkData();
    private books: { bookId: string, book: string }[] = [];

    render() {
        const isAdd = (this.homeworkData.homeworkId === undefined);

        const modalProps = {
            visible: this.visible,
            title: isAdd ? '添加作业' : '修改作业',
            maskClosable: false,
            width: 640,
            onOk: this.onModifyHomework,
            onCancel: this.onCancel,
        };
        const cascaderProps = {
            options: this.props.homeworkOptions,
            onChange: this.onSelectItem,
        };

        const students = this.props.students;
        let items = [];
        for (let s of students) {
            const checkProps = {
                value: s['studentId'],
                key: s['studentId'],
                disabled: (this.studentId === s['studentId']) ? true : false,
                style: {
                    width: '100px',
                },
            }

            items.push(<Checkbox {...checkProps}>{s['name']}</Checkbox>);
        }
        const groupProps = {
            value: this.selectStudents,
            onChange: this.onStudentCheckChange,
        };

        let bookOptions = [];
        for (let b of this.books) {
            bookOptions.push(
                <Option value={b.bookId} key={b.bookId}>{b.book}</Option>
            );
        }
        let books = <Select value={this.homeworkData.bookId} onChange={this.onBookChange}>
            {bookOptions}
        </Select>;

        return <Modal {...modalProps}>
            <div style={{ float: 'left', margin: '5px' }}>
                <label>项目</label><br />
                <Cascader expandTrigger={'hover'} {...cascaderProps} /><br />
                <label>课本</label>
                {books}<br />
                <label>范围</label>
                <Input value={this.homeworkData['range']} onChange={(event) => this.onTextChange(event, 'range')} /><br />
                <label>次数</label>
                <Input value={this.homeworkData['times']} onChange={(event) => this.onTextChange(event, 'times')} /><br />
                <label>描述</label>
                <Input value={this.homeworkData['desc']} onChange={(event) => this.onTextChange(event, 'desc')} /><br />
                <label>备注</label>
                <Input value={this.homeworkData['remark']} onChange={(event) => this.onTextChange(event, 'remark')} /><br />
                <Checkbox checked={this.homeworkData['isNeedSign']} onChange={this.onCheckChange}>需要签名</Checkbox>
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
        this.selectStudents = [studentId];
        this.homeworkData = $.extend(true, {}, homeworkData);

        if (this.homeworkData.subjectId !== undefined)
            Tool.back.sendData(SendType.Book, { subjectId: this.homeworkData.subjectId }, this.onReceiveBooks);

        this.forceUpdate();
    }

    private onModifyHomework = () => {
        Tool.back.sendData(SendType.ModifyHomework, this.homeworkData, this.props.onUpdate);
        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.studentId = undefined;
        this.selectStudents = [];
        this.homeworkData = new HomeworkData();
        this.books = [];
        
        this.forceUpdate();
    }
    private onSelectItem = (value) => {
        this.homeworkData['subject'] = value[0];
        this.homeworkData['item'] = value[1];
        this.homeworkData['childItem'] = value[2];

        Tool.back.sendData(SendType.Book, { subjectId: this.homeworkData.subjectId }, this.onReceiveBooks);

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
        this.selectStudents = checkeds;
        this.forceUpdate();
    }

    //book
    private onReceiveBooks = (value: object) => {
        Tool.lib.fillData(this, value);
        this.forceUpdate();
    }
    private onBookChange = (value: string) => {
        this.homeworkData.bookId = value;
    }
}