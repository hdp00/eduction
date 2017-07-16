//by hdp 2017.07.08
//学生统计页面

import * as React from 'react'
import * as $ from 'jquery'
import { Button, Switch } from 'antd'
import { StudentCard } from './studentCard'
import { StudentManager } from './studentManager'
import { AddGradeModal } from './addGradeModal'
import { ModifyGradeModal } from './modifyGradeModal'
import { Tool, SendType } from '../data/tool'
import '../css/gradeTable.css'

export class Student extends React.Component<any, any>{
    private addModalVisible: boolean = false;
    private modifyModalVisible: boolean = false;
    private gradeVisible: boolean = false;
    private students: object[] = [];
    //{id:string, name:string, school:string, class:number, sex:stirng,
    //grades:{date:Date, grade:{subjectId:string, score:number}[]}}[]
    private manager: StudentManager = new StudentManager();

    render() {
        const addButtonProps = {
            style: {
                margin: '5px',
                float: 'right',
                visibility: this.gradeVisible ? 'visible' : 'hidden',
            },
            onClick: this.onOpenAddModal,
        };
        const modifyButtonProps = {
            style: {
                margin: '5px',
                float: 'right',
                visibility: this.gradeVisible ? 'visible' : 'hidden',
            },
            onClick: this.onOpenModifyModal,
        }
        const switchProps = {
            style: {
                margin: '8px',
                float: 'right',
            },
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

        return <div style={{ textAlign: 'center' }} >
            <div className='student-total-div' style={{ textAlign: 'left' }}>
                <Switch {...switchProps} />
                <Button type='primary' {...modifyButtonProps}>成绩修改</Button>
                <Button type='primary' {...addButtonProps}>成绩输入</Button>
                <div style={{ clear: 'both'}}>
                    {items}
                    <div style={{ clear: 'both' }} />
                </div>
                <AddGradeModal ref='addModal' onAddGrade={this.onAddGrade} />
                <ModifyGradeModal ref='modifyModal' onModifyGrade={this.onModifyGrade} />
            </div>
        </div>;
    }

    componentDidMount() {
        Tool.back.sendData(SendType.students, undefined, this.receiveStudents);
    }
    private receiveStudents = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

    private onOpenAddModal = () => {
        const index = this.manager.currentIndex;
        if (index >= this.students.length)
            return;
        const id = this.students[index]['id'];

        (this.refs['addModal'] as AddGradeModal).setVisible(true, id);
    }
    private onOpenModifyModal = () => {
        const index = this.manager.currentIndex;
        if (index >= this.students.length)
            return;
        const id = this.students[index]['id'];
        const student = this.students[index];

        (this.refs['modifyModal'] as ModifyGradeModal).setVisible(true, id, student['grades']);
    }
    private onAddGrade = (value: object) => {
        const index = this.manager.currentIndex;
        const student = this.students[index];
        const grade = $.extend(true, {}, value);
        student['grades'].push(grade);
        this.forceUpdate();
    }
    private onModifyGrade = (value: object[]) => {
        const index = this.manager.currentIndex;
        const student = this.students[index];
        student['grades'] = $.extend(true, [], value);
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
}
