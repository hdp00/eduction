//by hdp 2017.06.12
//学生信息

import * as React from 'react'
import { StudentData } from '../data/studentData'

export class StudentDetail extends React.Component<any, any>{
    private student: StudentData;

    render() {
        const exist = (this.student !== undefined);
        const name = exist ? this.student.name : undefined;
        const school = exist ? this.student.school : undefined;

        return <div>
            <label>{name}</label>
            <br />
            <label>{school}</label>
            <br />
        </div>;
    }

    public update(data:StudentData){
        this.student = data;
        this.forceUpdate();
    }
}