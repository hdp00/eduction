//by hdp 2017.07.05
//学生卡

import * as React from 'react'
import { Card } from 'antd'

interface StudentCardProps {
    student: object;
    /*id: string;
    name: string;
    school: string;
    class: string;
    sex: string;*/
    manager: object;/*currentIndex:number */
    score:object;//{date:Date, scores:{subject:string, score:number}[]}
    
    index: number;
    showScore: boolean;
    onSelect: (index: number) => void;
}

export class StudentCard extends React.Component<StudentCardProps, any>{
    render() {
        const isSelect = (this.props.index === this.props.manager.currentHomeworkIndex);
        

        const cardProps = {
            title: this.props.student['name'],
            className: isSelect ? 'component-select' : 'component-normal',
            style: {
                float: 'left',
                width: '200px',
                margin: '5px'
            }
        };

        return <Card {...cardProps}>
            <div>
                <div>{this.props.student['school']} {this.props}</div>
            </div>
        </Card>;
    }

    private onSelect = () => {
        this.props.onSelect(this.props.index);
    }

}
