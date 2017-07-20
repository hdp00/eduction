//by hdp 2017.07.17
//学生列表

import * as React from 'react'
import { HomeworkManager } from './homeworkManager'

interface StudentListProps {
    manager: HomeworkManager,
}

export class StudentList extends React.Component<any, any>{
    render() {


        return <div>

        </div>;
    }

    componentDidMount() {
        Tool.back.sendData(SendType.students, undefined, this.receiveStudents);
    }
    private receiveStudents = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

}