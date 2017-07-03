//by hdp 2017.06.17
//试卷拍摄

import * as React from 'react'
import { Modal, Button } from 'antd'
import { Tool, SendType } from '../data/tool'

interface UploadControlProps {
    homeworkId: string;
    subject: string;
    book: string;

    onTakePicture: (paper: object) => void;
    onSelectPaper: (paper: object) => void;
    onExit: () => void;
}

export class UploadControl extends React.Component<UploadControlProps, any>{
    index: number = -1;
    papers: object[] = [];//{name:string, data:base64, hasUpload}
    isUploading: boolean = false;

    render() {
        const controlProps = {
            style: {
                border: '1px solid gray',
                float: 'left',
                margin: '2px',
            }
        };

        let items = [];
        let i = 0;
        for (let p of this.papers) {
            const isSelect = (this.index == i);
            const paperProps = {
                key: i,
                className: isSelect ? 'component-select' : 'component-normal',
                onClick: this.onSelectPaper,
                style: {
                    margin: '5px',
                }
            };

            items.push(<div data-index={i} {...paperProps}>{p['name']}</div>);
            i++;
        }

        const buttonProps = {
            style: {
                margin: '5px',
            },

        }

        return <div {...controlProps}>
            <div >
                <Button type='primary' icon='camera' {...buttonProps} onClick={this.onTakePicture}>拍摄</Button>
                <Button type='primary' icon='upload' {...buttonProps} onClick={this.onUpload} loading={this.isUploading}>上传</Button>
                <div>
                    <Button type='primary' icon='up' {...buttonProps} onClick={this.onMoveUp} />
                    <Button type='primary' icon='down' {...buttonProps} onClick={this.onMoveDown} />
                    <Button type='primary' icon='close' {...buttonProps} onClick={this.onDelete} />
                </div>
                <div style={{ overflow: 'auto', height: '363px' }}>
                    {items}
                </div>
            </div>
            <Button type='primary' style={{ margin: '5px 55px' }}   onClick={this.onExit}>退出</Button>
        </div>;
    }
    public setPapers(papers: object[]) {
        this.isUploading = false;
        this.index = -1;
        this.papers = papers;
        this.forceUpdate();
    }

    private onTakePicture = () => {
        if (this.isUploading)
            return;

        const name = this.props.homeworkId + '_' + (new Date().getTime());
        let paper = { name: name, data: undefined, hasUpload: false };
        this.papers.push(paper);
        this.index = this.papers.length - 1;

        this.props.onTakePicture(paper);
        this.forceUpdate();
    }
    private onUpload = () => {
        if (this.isUploading)
            return;

        let sendPapers = [];
        for (let p of this.papers) {
            let data = p['hasUpload'] ? undefined : p['data'];
            sendPapers.push({ name: p['name'], data: data });
        }
        const datas = { homeworkId: this.props.homeworkId, papers: sendPapers };

        Tool.back.sendData(SendType.uploadPapers, datas, this.uploadFinished);
        this.isUploading = true;
        this.forceUpdate();
    }
    private onMoveUp = () => {
        if(this.isUploading)
            return;

        const index = this.index;
        if (index <= 0 || index > (this.papers.length - 1))
            return;

        [this.papers[index - 1], this.papers[index]] = [this.papers[index], this.papers[index - 1]];

        this.index--;
        this.forceUpdate();
    }
    private onMoveDown = () => {
        if(this.isUploading)
            return;

        const index = this.index;
        if (index < 0 || index >= (this.papers.length - 1))
            return;

        [this.papers[index + 1], this.papers[index]] = [this.papers[index], this.papers[index + 1]];

        this.index++;
        this.forceUpdate();
    }
    private onDelete = () => {
        if(this.isUploading)
            return;

        const index = this.index;
        if (index < 0 || index > (this.papers.length - 1))
            return;

        Modal.confirm({
            content: '删除试卷？',
            onOk: () => {
                let papers = [];
                for (let i = 0; i < this.papers.length; i++) {
                    if (i == index)
                        continue;
                    papers.push(this.papers[i]);
                }
                this.papers = papers;

                if (index > (this.papers.length - 1))
                    this.index = this.papers.length - 1;

                this.props.onSelectPaper(this.papers[this.index]);
                this.forceUpdate();
            }
        });
    }
    private onExit = () => {
        if(this.isUploading)
            return;

        this.props.onExit();
    }
    private onSelectPaper = (event) => {
        let index = parseInt(event.currentTarget.dataset.index);
        if (this.index === index)
            return;
        this.index = index;
        this.props.onSelectPaper(this.papers[this.index]);

        this.forceUpdate();
    }

    private uploadFinished = () => {
        for (let p of this.papers) {
            p['hasUpload'] = true;
        }

        this.isUploading = false;
        this.forceUpdate();
    }
}