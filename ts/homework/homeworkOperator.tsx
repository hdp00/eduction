//by hdp 2017.07.22
//作业容器

import * as React from 'react'
import { HomeworkManager } from './homeworkManager'
import { SingleHomework } from './singleHomework'
import { ModifyHomeworkModal } from './modifyHomeworkModal'
import { Tool, SendType } from '../data/tool'

homework: object;//homeworkData
onUpdate: () => void;
onEdit: (id: string) => void;

export class homeowrkOperator extends React.Component<any, any>{
    private homeworks: object[] = [];//homeworkData[]

    render() {
        let items = [];
        for (let h of this.homeworks) {
            

        }


        return <div>

        </div>;
    }

    componentDidMount() {

    }
    private receiveHomeworks = (value: object[]) => {

    }

}