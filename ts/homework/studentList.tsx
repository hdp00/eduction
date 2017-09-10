//by hdp 2017.07.17
//学生列表

import * as React from 'react'
import { HomeworkManager } from './homeworkManager'

interface StudentListProps {
    students: { studentId: string, name: string }[],
    manager: HomeworkManager,
    onSelect: (index: number) => void;
}

export class StudentList extends React.Component<StudentListProps, any>{
    render() {
        let overflow: "auto" | "hidden" | "scroll" | "visible" = 'auto';
        let items = [];
        let i = 0;
        for (let studnet of this.props.students) {
            const isSelect = (i === this.props.manager.studentIndex);
            const props = {
                className: isSelect ? 'component-select' : 'component-normal',
                style: {
                    margin: '2px',
                    fontSize: '20px',
                },
                key: i.toString(),
                onClick: this.onSelect,
            }

            items.push(<div data-index={i} {...props}>
                {studnet.name}
            </div>);
            i++;
        }

        const divProps = {

            style: {
                width: '200px',
                height: '800px',
                border: '1px solid black',
                float: 'left',
                overflow: overflow,
            }
        }

        return <div {...divProps}>
            {items}
        </div>;
    }

    private onSelect = (event) => {
        const index = parseInt(event.currentTarget.dataset.index);
        if (this.props.manager.studentIndex === index)
            return;
        this.props.manager.studentIndex = index;
        this.props.onSelect(index);
        this.forceUpdate();
    }
}
