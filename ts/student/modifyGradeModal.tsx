//by hdp 2017.07.11
//成绩修改

import * as React from 'react'
import * as moment from 'moment'
import * as $ from 'jquery'
import { Modal, InputNumber, DatePicker, Button } from 'antd'
import { Tool, Type.SendType } from '../data/tool'

interface ModifyGradeModalProps {
    onModifyGrade: (value: object[]) => void;
}

export class ModifyGradeModal extends React.Component<ModifyGradeModalProps, any>{
    private grades: { date: Date, grade: { score: number }[] }[] = [];
    private visible = false;
    private id: string;

    render() {
        const modalProps = {
            visible: this.visible,
            title: '成绩修改',
            maskClosable: false,
            width: 600,
            onOk: this.onModifyGrade,
            onCancel: this.onCancel,
        };
        const datePickerProps = {
            allowClear: false,
        };
        const inputNumerProps = {
            min: 0,
            max: 100,
        };
        const buttonProps = {
            icon: 'close-circle',
        };

        let items = [];
        let index = 0;
        for (let g of this.grades) {
            const i = index;
            let item = <tr key={index}>
                <td><DatePicker onChange={
                    (moment) => { this.grades[i].date = moment.toDate(); this.forceUpdate(); }}
                    value={moment(g.date)} {...datePickerProps} /></td>
                <td><InputNumber onChange={
                    (value: number) => { this.grades[i].grade[0].score = value; this.forceUpdate(); }}
                    value={g.grade[0].score} {...inputNumerProps} /></td>
                <td><InputNumber onChange={
                    (value: number) => { this.grades[i].grade[1].score = value; this.forceUpdate(); }}
                    value={g.grade[1].score} {...inputNumerProps} /></td>
                <td><InputNumber onChange={
                    (value: number) => { this.grades[i].grade[2].score = value; this.forceUpdate(); }}
                    value={g.grade[2].score} {...inputNumerProps} /></td>
                <td><InputNumber onChange={
                    (value: number) => { this.grades[i].grade[3].score = value; this.forceUpdate(); }}
                    value={g.grade[3].score} {...inputNumerProps} /></td>
                <td><InputNumber onChange={
                    (value: number) => { this.grades[i].grade[4].score = value; this.forceUpdate(); }}
                    value={g.grade[4].score} {...inputNumerProps} /></td>
                <td><Button onClick={
                    () => this.onDeleteGrade(i)}
                    type='dashed' {...buttonProps} /></td>
            </tr>;

            items.push(item);
            index++;
        }

        return <Modal {...modalProps}>
            <table>
                <tbody>
                    <tr>
                        <th>日期</th>
                        <th>语文</th>
                        <th>数学</th>
                        <th>英语</th>
                        <th>物理</th>
                        <th>化学</th>
                    </tr>
                    {items}
                </tbody>
            </table>
        </Modal>;
    }

    public setVisible = (value: boolean, id: string, grades: object[]) => {
        this.visible = value;
        this.id = id;
        this.grades = $.extend(true, [], grades);
        this.initGrades();

        this.forceUpdate();
    }

    private onModifyGrade = () => {
        Tool.back.sendData(Type.SendType.modifyGrade, { id: this.id, grades: this.grades });
        this.props.onModifyGrade(this.grades);

        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.forceUpdate();
    }
    private onDeleteGrade = (index: number) => {
        this.grades.splice(index, 1);
        this.forceUpdate();
    }

    //预防有些科目成绩不存在
    private initGrades = () => {
        for (let g of this.grades) {
            while(g.grade.length < 5)
                g.grade.push({ score: 0 })
        }
    }
}