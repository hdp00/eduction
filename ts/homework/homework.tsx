//by hdp 2017.07.22
//作业页面

import * as React from 'react'
import { Tool, SendType } from '../data/tool'
import { HomeworkManager } from './homeworkManager'
import { StudentList } from './studentList'
import { HomeowrkOperator } from './homeworkOperator'
import '../css/homework.css'

export class Homework extends React.Component<any, any>{
    private manager: HomeworkManager = new HomeworkManager();
    private students: { studentId: string, name: string }[] = [];

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

        return <div style={{ textAlign: 'center' }} >
            <div className='homework-total-div'>
                <StudentList {...studentProps} />
                <HomeowrkOperator {...homeworkProps} />
                <div style={{ clear: 'both' }} />
            </div>
        </div>;
    }

    componentDidMount() {
        Tool.back.sendData(SendType.Students, {}, this.receiveStudents);
    }
    private receiveStudents = (value: object) => {
        Tool.lib.fillData(value, this);
        this.onSelect(0);
        this.forceUpdate();
    }

    private onSelect = (index: number) => {
        const id = this.students[index].studentId;
        (this.refs['homework'] as HomeowrkOperator).update(id);
    }
}