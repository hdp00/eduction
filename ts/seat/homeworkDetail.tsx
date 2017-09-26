//by hdp 2017.06.13
//作业信息

import * as React from 'react'
import { Icon, Button } from 'antd'
import { Tool, SendType } from '../data/tool'
import { SeatManager } from './seatManager'
import { HomeworkData } from '../data/homeworkData'
import { PaperState } from '../data/define'

interface HomeworkDetailProps {
    manager: SeatManager,
    index: number;
    homework: HomeworkData;
    onSelect: (index: number) => void;
}

export class HomeworkDetail extends React.Component<HomeworkDetailProps, any>{
    render() {
        const isSelect = (this.props.index === this.props.manager.currentHomeworkIndex);
        let needSign;
        if (this.props.homework.isNeedSign)
            needSign = <span><Icon type='check-square' />需要签字</span>;
        let hasPaper;
        if(this.props.homework.uploadPath.length > 0)
            hasPaper = <span><Icon type='book' />作业</span>;
        let finishButton;
        if (this.props.homework.statusId !== PaperState.Finished)
            finishButton = <Button style={{ margin: '5px' }}
                onClick={this.onFinish}>完成作业</Button>;

        const divProps = {
            className: isSelect ? 'component-select' : 'component-normal',
            onClick: this.onSelect,
            style: {
                margin: '5px',
            }
        };
        const statusProps = {
            style: {
                height: '10px',
                backgroundColor: Tool.lib.getHomeworkStateColor(this.props.homework.statusId),
            }
        };

        return <div {...divProps}>
            <div {...statusProps} />
            <div style={{ fontSize: '18px' }}>{this.props.homework.subject} {this.props.homework.item} {this.props.homework.childItem}</div>
            <div>{this.props.homework.book} {this.props.homework.range} {this.props.homework.times}</div>
            <div>{this.props.homework.desc} {this.props.homework.remark}</div>
            <div>{needSign} {hasPaper}</div>
            {finishButton}
        </div>;
    }

    private onSelect = () => {
        this.props.onSelect(this.props.index);
    }
    private onFinish = () => {
        if (!window.confirm('确认完成作业？'))
            return;

        Tool.back.sendData(SendType.ChangeHomeworkStatus,
            { homeworkId: this.props.homework.homeworkId, statusId: PaperState.Finished });
    }
}