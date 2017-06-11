//by hdp 2017.06.08
//学生选择

import * as React from 'react'
import * as $ from 'jquery'
import { Modal, Button, Radio, Checkbox } from 'antd'
import { StudentData } from '../data/studentData'

const CheckboxGroup = Checkbox.Group;

//选择哪些学生
enum SelectType {
    Signed,
    NotSigned,
    Both,
}

interface StudentSelectorProps {
    students: StudentData[];
    onSelectStudent: (Array) => void;
}

export class StudentSelector extends React.Component<StudentSelectorProps, any>{
    private visible: boolean = false;
    private checkedAll: boolean = false;
    private indeterminate: boolean = false;
    private enables: string[] = [];
    private disableCheckeds: string[] = [];
    private checks: string[] = [];
    private selectType: SelectType = 0;

    render() {
        const students = this.props.students;
        const selectType = this.selectType;

        let items = [];
        let index = 0;
        for (let s of students) {
            const checked = s.hasSigned;
            const disabled = (selectType === SelectType.Signed && !s.hasSigned)
                || (selectType === SelectType.NotSigned && s.hasSigned);

            let strIndex = this.getIndexString(index++);
            const checkProps = {
                disabled: disabled,
                checked: checked,
                value: strIndex,
                key:strIndex,
                style: {
                    width: '100px',
                },
            }

            items.push(<Checkbox {...checkProps}>{s.name}</Checkbox>);
        }
        const groupProps = {
            value: this.checks,
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

    public show = (type:SelectType) => {
        this.selectType = type;
        this.visible = true;
        this.initData();

        this.forceUpdate();
    }

    private onOk = () => {
        this.sendData();
        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.forceUpdate();
    }
    private onCheckChanged = (checkeds) => {
        const disableCheckedCount = this.disableCheckeds.length;
        const selectCount = checkeds.length;
        const totalCount = this.enables.length + disableCheckedCount;

        this.indeterminate = (selectCount > disableCheckedCount)
            && (selectCount < totalCount);
        this.checkedAll = (selectCount === totalCount);
        this.checks = checkeds;

        this.forceUpdate();
    }
    private onCheckAll = (e) => {
        const checked = e.target.checked;
        this.indeterminate = false;
        this.checkedAll = checked;
        this.checks = checked ? [...this.enables, ...this.disableCheckeds] : this.disableCheckeds;

        this.forceUpdate();
    }

    private initData() {
        const students = this.props.students;
        const selectType = this.selectType;

        this.enables = [];
        this.disableCheckeds = [];
        this.checks = [];

        let index = 0;
        for (let s of students) {
            const checked = s.hasSigned;
            const disabled = (selectType === SelectType.Signed && !s.hasSigned)
                || (selectType === SelectType.NotSigned && s.hasSigned);

            let strIndex = this.getIndexString(index++);
            if (disabled) {
                if (checked)
                    this.disableCheckeds.push(strIndex);
            }
            else
                this.enables.push(strIndex);
        }

        this.checkedAll = false;
        this.indeterminate = false;
        this.checks = [...this.disableCheckeds];
    }
    private getIndexString(index: number) {
        let str = index.toString();
        if (str.length == 1)
            str = '0' + str;
        return str;
    }
    private sendData() {
        const students = this.props.students;
        const selectType = this.selectType;

        this.checks.sort();
        let selects = [];
        for (let c of this.checks) {
            let s = this.props.students[parseInt(c)];
            const disabled = (selectType === SelectType.Signed && !s.hasSigned)
                || (selectType === SelectType.NotSigned && s.hasSigned);

            if (disabled)
                continue;

            selects.push(s);
        }

        this.props.onSelectStudent(selects);
    }
}