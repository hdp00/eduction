//by hdp 2017.06.14
//作业信息管理

import * as React from 'react'
import { Button } from 'antd'
import { HomeworkDetail } from './homeworkDetail'
import { Tool, SendType } from '../data/tool'
import { SeatManager } from './seatManager'
import { UploadPaper } from './uploadPaper'
import { HomeworkData } from '../data/homeworkData'

interface HomeworkContainerProps {
    manager: SeatManager,
}

export class HomeworkContainer extends React.Component<HomeworkContainerProps, any>{
    private homeworks: HomeworkData[];

    render() {
        const exist = (this.homeworks !== undefined);

        let items = [];
        if (exist) {
            let i = 0;
            for (let h of this.homeworks) {
                const homeworkProps = {
                    manager: this.props.manager,
                    homework: h,
                    index: i,
                    key: i,
                    ref: i.toString(),
                    onSelect: this.onSelect,
                };

                items.push(<HomeworkDetail {...homeworkProps} />);
                i++;
            }
        }

        return <div className='seat-homework-container-div'>
            <div style={{ overflow: 'auto', height: '598px' }}>
                {items}
            </div>
            <div>
                <Button style={{ margin: '10px' }} type='primary' onClick={this.onUploadPaper}>上传作业</Button>
                <Button style={{ margin: '10px' }} type='primary' onClick={this.onViewPaper}>查看作业</Button>
            </div>
            <UploadPaper ref='upload' onFinish={this.onFinishUpload} />
        </div>;
    }

    public update = () => {
        const id = this.props.manager.getCurrentId();
        if (id === undefined) {
            this.homeworks = undefined;
            this.forceUpdate();
        }
        else
            Tool.back.sendData(SendType.Homework, { studentId: id }, this.receiveHomeworks);
    }
    private receiveHomeworks = (value: object) => {
        Tool.lib.fillData(value, this);
        this.forceUpdate();
    }

    private onSelect = (index: number) => {
        let preIndex = this.props.manager.currentHomeworkIndex;
        this.props.manager.currentHomeworkIndex = index;

        let preHomework = (this.refs[preIndex] as HomeworkDetail);
        if (preHomework !== undefined)
            preHomework.forceUpdate();
        const homework = (this.refs[index] as HomeworkDetail);
        homework.forceUpdate();
    }
    private onUploadPaper = () => {
        if (this.homeworks === undefined)
            return;
        const h: HomeworkData = this.homeworks[this.props.manager.currentHomeworkIndex];
        if (h === undefined)
            return;

        const upload = (this.refs['upload'] as UploadPaper);
        upload.setVisible(true, h.homeworkId, h.uploadPath);
    }
    private onViewPaper = () => {

    }

    private onFinishUpload = () => {
        this.update();
    }
}

