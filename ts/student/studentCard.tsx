//by hdp 2017.07.05
//学生卡

import * as React from 'react'
import { StudentData } from '../data/studentData'

interface StudentCardProps {
    student: StudentData;
    manager: object;/*currentIndex:number */
    index: number;
    gradeVisible: boolean;
    onSelect: (index: number) => void;
}

export class StudentCard extends React.Component<StudentCardProps, any>{
    render() {
        const isSelect = (this.props.index === this.props.manager['currentIndex']);
        const cardProps = {
            className: (isSelect ? 'component-select' : '') + ' ' + 'component-normal',
            style: {
                float: 'left',
                width: '240px',
                margin: '5px'
            },
            onClick: this.onSelect,
        };

        let grades;
        if (this.props.gradeVisible)
            grades = this.getGradeComponent();

        return <div {...cardProps}>
            <div className='font-title'>{this.props.student['name']}</div>
            <div>
                <div>{this.props.student['school']} {this.props.student['class']}</div>
                <div>{this.props.student['sex']}</div>
            </div>
            {grades}
        </div>;
    }

    private onSelect = () => {
        this.props.onSelect(this.props.index);
    }

    private getGradeComponent = (): JSX.Element => {
        const header = <tr>
            <th>日期</th>
            <th>语文</th>
            <th>数学</th>
            <th>英语</th>
            <th>物理</th>
            <th>化学</th>
        </tr>;

        let items = [];
        let key = 0;
        for (let g of this.props.student['grades']) {
            const d = g['date'] as Date;
            const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            const grade = g['grade'] as object[];

            const chinese = this.getScore(grade, 0);
            const math = this.getScore(grade, 1);
            const english = this.getScore(grade, 2);
            const physics = this.getScore(grade, 3);
            const chemistry = this.getScore(grade, 4);

            items.push(<tr key={key++}>
                <td>{date}</td>
                <td>{chinese}</td>
                <td>{math}</td>
                <td>{english}</td>
                <td>{physics}</td>
                <td>{chemistry}</td>
            </tr>);
        }

        return <div style={{ overflow: 'auto', height: '108px' }}>
            <table className='bordered'>
                <tbody>
                    {header}
                    {items}
                </tbody>
            </table>
        </div>;
    }

    private getScore = (grade: object[], index: number) => {
        if (grade[index] === undefined)
            return undefined;
        let score = grade[index]['score'];
        if (score === 0)
            return undefined;

        return score;
    }
}
