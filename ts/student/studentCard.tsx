//by hdp 2017.07.05
//学生卡

import * as React from 'react'

interface StudentCardProps {
    student: object;
    /*id: string;
    name: string;
    school: string;
    class: string;
    sex: string;
    grade:{date:Date, grade:{subject:string, score:number}[]
    */
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
                width: '200px',
                margin: '5px'
            },
            onClick: this.onSelect,
        };

        let grade;
        if (this.props.gradeVisible)
            grade = this.getGradeComponent();

        return <div {...cardProps}>
            <div>{this.props.student['name']}</div>
            <div>
                <div>{this.props.student['school']} {this.props.student['class']}</div>
                <div>{this.props.student['sex']}</div>
            </div>
            {grade}
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
        for (let g of this.props.student['grade']) {
            const d = g['date'] as Date;
            const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay();
            const grade = g['grade'] as object[];

            let chinese;
            let math;
            let english;
            let physics;
            let chemistry;

            for (let o of grade) {
                const subject = o['subject'] as string;
                const score = o['score'] as number;

                if (subject === '语文')
                    chinese = score;
                else if (subject === '数学')
                    math = score;
                else if (subject === '英语')
                    english = score;
                else if (subject === '物理')
                    physics = score;
                else if (subject === '化学')
                    chemistry = score;
            }

            items.push(<tr key={key++}>
                <td>{date}</td>
                <td>{chinese}</td>
                <td>{math}</td>
                <td>{english}</td>
                <td>{physics}</td>
                <td>{chemistry}</td>
            </tr>);
        }

        return <table>
            <tbody>
                {header}
                {items}
            </tbody>
        </table>;
    }
}
