//by hdp 2017.06.13
//作业信息

import * as React from 'react'
import { Select, Icon } from 'antd'
import { Tool, SendType } from '../data/tool'
import { SeatManager } from './seatManager'
import { HomeworkData } from '../data/homeworkData'

const Option = Select.Option;

const PaperStateName = [
    '新建',
    '已批改',
    '需要重批',
    '完成',
];

interface HomeworkDetailProps {
    manager: SeatManager,
    index: number;
    homework: HomeworkData;
    onSelect: (index: number) => void;
}

export class HomeworkDetail extends React.Component<HomeworkDetailProps, any>{
    render() {
        const isSelect = (this.props.index === this.props.manager.currentHomeworkIndex);
        const selectValue = PaperStateName[this.props.homework.statusId];
        let needSign;
        if (this.props.homework.isNeedSign)
            needSign = <span><Icon type='check-square' />签字</span>;
        let hasPaper;
        hasPaper = <span><Icon type='book' />作业</span>

        const options = [];
        let statusIndex = 0;
        for (let n of PaperStateName) {
            options.push(<Option key={statusIndex++} >{n}</Option>);
        }

        const divProps = {
            className: isSelect ? 'component-select' : 'component-normal',
            onClick: this.onSelect,
            style: {
                margin: '5px',
            }
        };

        return <div {...divProps}>
            <div style={{ fontSize: '18px' }}>{this.props.homework.subject} {this.props.homework.item} {this.props.homework.childItem}</div>
            <div>{this.props.homework.book} {this.props.homework.range} {this.props.homework.times}</div>
            <div>{this.props.homework.desc} {this.props.homework.remark}</div>
            <div>{needSign} {hasPaper}</div>
            <Select value={selectValue} style={{ width: 100 }} onChange={this.onChange}>
                {options}
            </Select>
        </div>;
    }

    private onSelect = () => {
        this.props.onSelect(this.props.index);
    }
    private onChange = (value) => {
        const statusIndex = parseInt(value);
        Tool.back.sendData(SendType.ChangeHomeworkStatus,
            { homeworkId: this.props.homework.homeworkId, status: statusIndex });
    }
}