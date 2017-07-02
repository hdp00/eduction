//by hdp 2017.06.14
//作业信息管理

import * as React from 'react'
import { Button } from 'antd'
import { HomeworkDetail } from './homeworkDetail'
import { Tool, SendType } from '../data/tool'
import { SeatManager } from './seatManager'
import { UploadPaper } from './uploadPaper'

interface HomeworkContainerProps {
    manager: SeatManager,
}

export class HomeworkContainer extends React.Component<HomeworkContainerProps, any>{
    private homeworks: object[];
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

        const containerProps = {
            style: {
                border: '1px solid gray',
            },
        }

        return <div {...containerProps}>
            <div style={{ overflow: 'auto', height: '500px' }}>
                {items}
            </div>
            <div>
                <Button onClick={this.onUploadPaper}>上传作业</Button>
                <Button onClick={this.onViewPaper}>查看作业</Button>
            </div>
            <UploadPaper ref='upload'/>
        </div>;
    }

    public update = () => {
        const id = this.props.manager.getCurrentId();
        if (id === undefined) {
            this.homeworks = undefined;
            this.forceUpdate();
        }
        else
            Tool.back.sendData(SendType.homework, { studentId: id }, this.receiveHomeworks);
    }
    private receiveHomeworks = (value: object) => {
        Tool.lib.fillData(this, value);
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
        if(this.homeworks === undefined)
            return;
        const h:object = this.homeworks[this.props.manager.currentHomeworkIndex];
        if(h === undefined)
            return;
            
        const upload = (this.refs['upload'] as UploadPaper);
        upload.setVisible(true, h['id']);
    }
    private onViewPaper = () => {

    }
}

