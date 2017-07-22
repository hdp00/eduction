//by hdp 2017.07.17
//作业信息

import * as React from 'react'
import { Button, Icon } from 'antd'
import { HomeworkManager } from './homeworkManager'
import { Tool, SendType } from '../data/tool'

interface SingleHomeworkProps {
    homework: object;//homeworkData
    onUpdate: () => void;
    onEdit: (id: string) => void;
}

export class SingleHomework extends React.Component<SingleHomeworkProps, any>{
    render() {
        let needSign;
        if (this.props.homework['isNeedSign'])
            needSign = <span><Icon type='check-square' />签字</span>;
        let hasPaper;
        hasPaper = <span><Icon type='book' />作业</span>

        const divProps = {
            style: {
                margin: '5px',
            }
        };

        return <div {...divProps}>
            <div style={{ fontSize: '18px' }}>{this.props.homework['subject']} {this.props.homework['item']} {this.props.homework['childItem']}</div>
            <div>{this.props.homework['book']} {this.props.homework['range']} {this.props.homework['times']}</div>
            <div>{this.props.homework['desc']} {this.props.homework['remark']}</div>
            <div>{needSign} {hasPaper}</div>
            <div>
                <Button onClick={this.onEdit}>编辑作业</Button>
                <Button onClick={this.onDelete}>删除作业</Button>
            </div>
        </div>;
    }

    private onEdit = () => {
        this.props.onEdit(this.props.homework['id']);
    }
    private onDelete = () => {
        Tool.back.sendData(SendType.deleteHomework,
            { id: this.props.homework['id'] }, this.props.onUpdate);
    }
}