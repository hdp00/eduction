//by hdp 2017.07.22
//作业容器

import * as React from 'react'
import { Button } from 'antd'
import { HomeworkManager } from './homeworkManager'
import { SingleHomework } from './singleHomework'
import { ModifyHomeworkModal } from './modifyHomeworkModal'
import { Tool, SendType } from '../data/tool'
import { HomeworkData } from '../data/HomeworkData'

interface HomeowrkOperatorProps {
    students: object[];//{studnetId,name}
}

export class HomeowrkOperator extends React.Component<HomeowrkOperatorProps, any>{
    private homeworks: HomeworkData[] = [];
    private homeworkOptions: object = {};//HomeworkOptions 
    private studentId: string;

    render() {
        let i = 0;
        let items = [];
        for (let h of this.homeworks) {
            const itemProps = {
                homework: h,
                onUpdate: this.onUpdate,
                onEdit: this.onEdit,
                key: i++,
            };

            items.push(<SingleHomework {...itemProps} />);
        }

        const modalProps = {
            homeworkOptions: this.homeworkOptions,
            students: this.props.students,
            onUpdate: this.onUpdate,
            ref: 'modal',
        };

        const divProps = {
            style: {
                float: 'left',
                width: '800px',
                height: '800px',
                border: '1px solid black',
            }
        };

        const addProps = {
            style: {
                margin: '5px',
                width: '200px',
                height: '100px',
                border: '1px solid black',
                float: 'left',
            }
        };


        return <div {...divProps}>
            {items}
            <div {...addProps}>
                <Button onClick={this.onAdd}>添加作业</Button>
            </div>
            <ModifyHomeworkModal {...modalProps} />
        </div>;
    }


    componentDidMount() {
        Tool.back.sendData(SendType.HomeworkOptions, {}, this.receiveHomeworkOptions);
    }
    private receiveHomeworkOptions = (value: object) => {
        Tool.lib.fillData(value, this);
    }

    public update = (studentId: string) => {
        if (studentId === this.studentId)
            return;
        this.studentId = studentId;
        Tool.back.sendData(SendType.Homework, { studentId: this.studentId }, this.rectiveHomeworks);
    }
    private rectiveHomeworks = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

    private onEdit = (homework: object) => {
        (this.refs['modal'] as ModifyHomeworkModal).setVisible(true, this.studentId, homework);
    }
    private onAdd = () => {
        (this.refs['modal'] as ModifyHomeworkModal).setVisible(true, this.studentId);
    }
    private onUpdate = () => {
        this.forceUpdate();
    }

}