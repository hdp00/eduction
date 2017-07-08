//by hdp 2017.07.08
//学生统计页面

import * as React from 'react'
import { Button, Switch, Modal, InputNumber } from 'antd'
import { StudentCard } from './studentCard'
import { StudentManager } from './studentManager'
import { Tool, SendType } from '../data/tool'

export class Student extends React.Component<any, any>{
    private modalVisible: boolean = false;
    private gradeVisible: boolean = false;
    private students: object[] = [];
    //{id:string, name:string, school:string, class:number, sex:stirng,
    //grade:{date:Date, grade:{subject:string, score:number}[]}}[]
    private manager: StudentManager = new StudentManager();

    render() {
        const buttonProps = {
            onClick: this.onOpenModal,
        }
        const switchProps = {
            checked: this.gradeVisible,
            checkedChildren: '成绩',
            unCheckedChildren: '成绩',
            onChange: this.onChangeGradeVisible,
        };

        let items = [];
        for (let i = 0; i < this.students.length; i++) {
            const s = this.students[i];
            const itemProps = {
                student: s,
                manager: this.manager,
                index: i,
                gradeVisible: this.gradeVisible,
                onSelect: this.onSelectStudent,
                key: i,
                ref: i.toString(),
            };

            items.push(<StudentCard {...itemProps} />);
        }
        const modalProps = {
            visible: this.modalVisible,
            title: '添加成绩',
            maskClosable: false,
            onOk: this.onAddGrade,
        };
        const inputNumerProps = {
            min: 0,
            max: 100,
            value: 0,
        }

        return <div>
            <Button {...buttonProps}>添加成绩</Button>
            <Switch {...switchProps} />
            <div>
                {items}
            </div>
            <Modal {...modalProps}>
                <label>语文</label>
                <InputNumber onChange={(value: number) => { this.newGrade[0].score = value }} /><br />
                <label>数学</label>
                <InputNumber onChange={(value: number) => { this.newGrade[1].score = value }} {...inputNumerProps} /><br />
                <label>英语</label>
                <InputNumber onChange={(value: number) => { this.newGrade[2].score = value }} {...inputNumerProps} /><br />
                <label>物理</label>
                <InputNumber onChange={(value: number) => { this.newGrade[3].score = value }} {...inputNumerProps} /><br />
                <label>化学</label>
                <InputNumber onChange={(value: number) => { this.newGrade[4].score = value }} {...inputNumerProps} /><br />
            </Modal>
        </div>;
    }

    componentDidMount() {
        Tool.back.sendData(SendType.students, undefined, this.receiveStudents);
    }
    private receiveStudents = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

    private onOpenModal = () => {
        const index = this.manager.currentIndex;
        if (index < 0 || index >= this.students.length)
            return;

        for (let g of this.newGrade)
            g.score = 0;

        this.modalVisible = true;
        this.forceUpdate();
    }
    private onChangeGradeVisible = (value: boolean) => {
        this.gradeVisible = value;
        this.forceUpdate();
    }
    private onSelectStudent = (index: number) => {
        let preIndex = this.manager.currentIndex;
        this.manager.currentIndex = index;

        let preStudentCard = (this.refs[preIndex.toString()] as StudentCard);
        if (preStudentCard !== undefined)
            preStudentCard.forceUpdate();
        const studentCard = (this.refs[index.toString()] as StudentCard);
        studentCard.forceUpdate();
    }

    private newGrade = [
        { subject: '语文', score: 0 },
        { subject: '数学', score: 0 },
        { subject: '英语', score: 0 },
        { subject: '物理', score: 0 },
        { subject: '化学', score: 0 },];
    private onAddGrade = () => {
        const index = this.manager.currentIndex;
        const id = this.students[index]['id'];
        const grade = {
            date: new Date(),
            grade: this.newGrade,
        };

        Tool.back.sendData(SendType.addGrade, {id: id, grade:grade});

        (this.students[index]['grade'] as object[]).push(grade);
        const studentCard = (this.refs[index] as StudentCard);
        studentCard.forceUpdate();
    }
}
