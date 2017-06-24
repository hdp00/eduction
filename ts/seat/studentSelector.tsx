//by hdp 2017.06.08
//学生选择

import * as React from 'react'
import { Modal, Button, Radio, Checkbox } from 'antd'
import { Tool, SendType } from '../data/tool'

const CheckboxGroup = Checkbox.Group;

interface StudentSelectorProps {
    onSelect:(index: number, ids: string[]) => void;
}

export class StudentSelector extends React.Component<StudentSelectorProps, any>{
    private checkedAll: boolean = false;
    private indeterminate: boolean = false;
    private checks: string[] = [];

    private visible: boolean = false;
    //调用本组件时的座位号,-1代表全部
    private seatIndex = -1;
    //{id,name}
    private students: object[] = [];

    render() {
        const students = this.students;

        let items = [];
        let index = 0;
        for (let s of students) {
            const checkProps = {
                value: s['id'],
                key: s['id'],
                style: {
                    width: '100px',
                },
            }

            items.push(<Checkbox {...checkProps}>{s['name']}</Checkbox>);
        }
        const groupProps = {
            value:this.checks,
            onChange: this.onCheckChanged,
        };
        const group = <CheckboxGroup {...groupProps}>
            {items}
        </CheckboxGroup>;

        const titleProps = {
            indeterminate: this.indeterminate,
            checked: this.checkedAll,
            onChange: this.onCheckAll,
        }
        const title = <Checkbox {...titleProps}>全选</Checkbox>;

        const modalProps = {
            title: title,
            visible: this.visible,
            onOk: this.onOk,
            onCancel: this.onCancel,
        };

        return <Modal {...modalProps}>
            {group}
        </Modal>;
    }

    public setVisible = (visible:boolean, seatIndex:number = -1) =>{
        this.visible = visible;
        this.seatIndex = seatIndex;

        if (this.visible) {
            Tool.back.sendData(SendType.StudentSelector, undefined, this.receiveStudent);
            return;
        }

        this.forceUpdate();
    }
    private receiveStudent = (value: object) => {
        Tool.lib.fillData(this, value);
        if (this.students.length === 0)
            this.visible = false;

        this.forceUpdate();
    }

    private onOk = () => {
        this.select(this.seatIndex, this.checks);
        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.checkedAll = false;
        this.indeterminate = false;
        this.checks = [];

        this.forceUpdate();
    }
    private onCheckChanged = (checkeds) => {
        const selectCount = checkeds.length;
        const count = this.students.length;
        this.indeterminate = (selectCount > 0)
            && (selectCount < count);
        this.checkedAll = (selectCount === count);
        this.checks = checkeds;

        this.forceUpdate();
    }
    private onCheckAll = (e) => {
        const checked = e.target.checked;
        this.indeterminate = false;
        this.checkedAll = checked;
        let items = [];
        if (checked) {
            for (let s of this.students)
                items.push(s['id']);
        }
        this.checks = items;

        this.forceUpdate();
    }

    private select = (index: number, ids: string[]) => {
        if(ids.length === 0)
            return;
        this.props.onSelect(index, ids);
    }
}