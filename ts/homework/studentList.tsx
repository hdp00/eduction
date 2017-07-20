//by hdp 2017.07.17
//学生列表

import * as React from 'react'
import { HomeworkManager } from './homeworkManager'

interface StudentListProps {
    students: { id: string, name: string }[],
    manager: HomeworkManager,
    onSelect: (index: number) => void;
}

export class StudentList extends React.Component<StudentListProps, any>{
    render() {
        let items = [];
        let i = 0;
        for (let studnet of this.props.students) {
            const isSelect = (i === this.props.manager.studentIndex);
            const props = {
                className: isSelect ? 'component-select' : 'component-normal',
                key: i.toString(),
                onClick: this.onSelect,
            }

            items.push(<div data-index={i}>
                {studnet.name}
            </div>);
        }

        const divProps = {
            style: {
                width: '200px',
            }
        }

        return <div {...divProps}>
            <div>学生</div>
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
