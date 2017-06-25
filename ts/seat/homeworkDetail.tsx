//by hdp 2017.06.13
//作业信息

import * as React from 'react'
import { Select } from 'antd'
import { Tool, SendType } from '../data/tool'
import { SeatManager } from './seatManager'

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
    homework: object;
    //   { id: string,
    //     status: number,
    //     subject: string,
    //     item: string,
    //     childItem: string,
    //     book: string,
    //     range: string,
    //     times: string,
    //     desc: string,
    //     remark: string,
    //     isNeedSign: boolean,}
    onSelect: (index: number) => void;

}

export class HomeworkDetail extends React.Component<HomeworkDetailProps, any>{
    render() {
        const isSelect = (this.props.index === this.props.manager.currentHomeworkIndex);
        const selectValue = PaperStateName[this.props.homework['status']];
        let needSign;
        if (this.props.homework['isNeedSign'])
            needSign = <label>需要签字</label>;

        const options = [];
        let statusIndex = 0;
        for (let n of PaperStateName) {
            options.push(<Option key={statusIndex++} >{n}</Option>);
        }

        const divProps = {
            className: isSelect ? 'seat-select' : '',
            onClick: this.onSelect,
            style: {
                margin: '5px',
                border: '1px solid gray',
            }
        };

        return <div {...divProps}>
            <label>{this.props.homework['subject']} {this.props.homework['item']} {this.props.homework['childItem']}</label><br />
            <label>{this.props.homework['book']}</label><br />
            <label>{this.props.homework['range']}</label><br />
            <label>{this.props.homework['times']}</label><br />
            <label>{this.props.homework['desc']}</label><br />
            <label>{this.props.homework['remark']}</label><br />
            {needSign}<br />

            <Select value={selectValue} style={{ width: 120 }} onChange={this.onChange}>
                {options}
            </Select>
        </div>;
    }

    private onSelect = () => {
        this.props.onSelect(this.props.index);
    }
    private onChange = (value) => {
        const statusIndex = parseInt(value);
        Tool.back.sendData(SendType.changeHomeworkStatus,
            { homeworkId: this.props.homework['id'], status: statusIndex });
    }
}