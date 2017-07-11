//by hdp 2017.07.08
//学生统计页面

import * as React from 'react'
import { Button, Switch } from 'antd'
import { StudentCard } from './studentCard'
import { StudentManager } from './studentManager'
import { AddGradeModal } from './addGradeModal'
import { Tool, SendType } from '../data/tool'

export class Student extends React.Component<any, any>{
    private addModalVisible: boolean = false;
    private modifyModalVisible: boolean = false;
    private gradeVisible: boolean = false;
    private students: object[] = [];
    //{id:string, name:string, school:string, class:number, sex:stirng,
    //grade:{date:Date, grade:{subject:string, score:number}[]}}[]
    private manager: StudentManager = new StudentManager();

    render() {
        const addModalProps = {
            onClick: this.onOpenAddModal,
        };

        const modifyModalProps = {
            onClick: this.onOpenModifyModal,
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


        return <div>
            <Button {...buttonProps}>成绩输入</Button>
            <Button {...buttonProps}>成绩修改</Button>
            <Switch {...switchProps} />
            <div>
                {items}
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

        this.addModalVisible = true;
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
