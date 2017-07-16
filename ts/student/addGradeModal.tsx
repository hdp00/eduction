//by hdp 2017.07.09
//成绩输入

import * as React from 'react'
import { Modal, InputNumber } from 'antd'
import { Tool, SendType } from '../data/tool'

interface AddGradeModalProps {
    onAddGrade: (value: object) => void;
}

export class AddGradeModal extends React.Component<AddGradeModalProps, any>{
    private newGrade = [
        { subjectId: '语文', score: 0 },
        { subjectId: '数学', score: 0 },
        { subjectId: '英语', score: 0 },
        { subjectId: '物理', score: 0 },
        { subjectId: '化学', score: 0 },];
    private visible = false;
    private id: string;

    render() {
        const modalProps = {
            visible: this.visible,
            title: '成绩输入',
            maskClosable: false,
            width: 180,
            onOk: this.onAddGrade,
            onCancel: this.onCancel,
        };
        const labelProps = {
            style: {
                width: '40px',
                display: 'inline-block',
            }
        };
        const inputNumerProps = {
            min: 0,
            max: 100,
        };

        return < Modal {...modalProps }>
            <label {...labelProps}>语文</label>
            <InputNumber value={this.newGrade[0].score}
                onChange={(value: number) => { this.setScore(0, value) }} {...inputNumerProps} /> <br />
            <label {...labelProps}>数学</label>
            <InputNumber value={this.newGrade[1].score}
                onChange={(value: number) => { this.setScore(1, value) }} {...inputNumerProps} /> <br />
            <label {...labelProps}>英语</label>
            <InputNumber value={this.newGrade[2].score}
                onChange={(value: number) => { this.setScore(2, value) }} {...inputNumerProps} /> <br />
            <label {...labelProps}>物理</label>
            <InputNumber value={this.newGrade[3].score}
                onChange={(value: number) => { this.setScore(3, value) }} {...inputNumerProps} /> <br />
            <label {...labelProps}>化学</label>
            <InputNumber value={this.newGrade[4].score}
                onChange={(value: number) => { this.setScore(4, value) }} {...inputNumerProps} /> <br />
        </Modal >;
    }

    public setVisible = (value: boolean, id: string) => {
        this.visible = value;
        this.id = id;

        for (let g of this.newGrade) {
            g.score = 0;
        }

        this.forceUpdate();
    }

    private onAddGrade = () => {
        const grade = {
            date: new Date(),
            grade: this.newGrade,
        };

        Tool.back.sendData(SendType.addGrade, { id: this.id, grade: grade });
        this.props.onAddGrade(grade);

        this.onCancel();
    }
    private onCancel = () => {
        this.visible = false;
        this.forceUpdate();
    }

    private setScore = (index: number, value: number) => {
        this.newGrade[index].score = value;
        this.forceUpdate();
    }
}