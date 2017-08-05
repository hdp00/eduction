//by hdp 2017.07.22
//作业页面

import * as React from 'react'
import { Tool, SendType } from '../data/tool'
import { HomeworkManager } from './homeworkManager'
import { StudentList } from './studentList'
import { HomeowrkOperator } from './homeworkOperator'

interface StudentListProps {
    students: { id: string, name: string }[],
    manager: HomeworkManager,
    onSelect: (index: number) => void;
}

export class Homework extends React.Component<any, any>{
    private manager: HomeworkManager = new HomeworkManager();
    private students: { id: string, name: string }[] = [];

    render() {
        const studentProps = {
            students: this.students,
            manager: this.manager,
            onSelect: this.onSelect,
        };
        const homeworkProps = {
            students: this.students,
            ref: 'homework',
        }

        return <div>
            <StudentList {...studentProps} />
            <HomeowrkOperator {...homeworkProps} />
        </div>;
    }

    componentDidMount() {
        Tool.back.sendData(SendType.students, undefined, this.receiveStudents);
    }
    private receiveStudents = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

    private onSelect = (index: number) => {
        const student = this.students[index].id;
        (this.refs['homework'] as HomeowrkOperator).update(student);
    }
}