//by hdp 2017.06.17
//试卷拍摄

import * as React from 'react'
import { Button } from 'antd'
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
            }
        };

        let items = [];
        let i = 0;
        for (let p of this.papers) {
            const isSelect = (this.index == i);
            const paperProps = {
                className: isSelect ? 'seat-select' : 'seat-component',
                onClick: this.onSelectPaper,
                style: {
                    margin: '5px',
                }
            };

            items.push(<div data-index={i} {...paperProps}>{p['name']}</div>);
        }

        const buttonProps = {
            style: {
                disabled: this.isUploading,
            }
        }

        return <div>
            <div {...controlProps}>
                <Button {...buttonProps} onClick={this.onTakePicture}>拍摄</Button>
                <Button {...buttonProps} onClick={this.onUpload}>上传</Button>
                <div>
                    <Button {...buttonProps} onClick={this.onMoveUp}>上移</Button>
                    <Button {...buttonProps} onClick={this.onMoveDown}>下移</Button>
                    <Button {...buttonProps} onClick={this.onDelete}>删除</Button>
                    {items}
                </div>
            </div>
            <Button onClick={this.onExit}>退出</Button>
        </div>;
    }
    public setPapers(papers: object[]) {
        this.index = -1;
        this.papers = papers;
        this.forceUpdate();
    }

    private onTakePicture = () => {
        const name = this.props.homeworkId + '_' + (new Date().getTime);
        let paper = { name: name, data: undefined, hasUpload: false };
        this.papers.push(paper);
        this.index = this.papers.length - 1;

        this.props.onTakePicture(paper);
        this.forceUpdate();
    }
    private onUpload = () => {
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
        const index = this.index;
        if (index <= 0 || index > (this.papers.length - 1))
            return;

        [this.papers[index - 1], this.papers[index]] = [this.papers[index], this.papers[index - 1]];

        this.index--;
        this.forceUpdate();
    }
    private onMoveDown = () => {
        const index = this.index;
        if (index < 0 || index >= (this.papers.length - 1))
            return;

        [this.papers[index + 1], this.papers[index]] = [this.papers[index], this.papers[index + 1]];

        this.index++;
        this.forceUpdate();
    }
    private onDelete = () => {
        const index = this.index;
        if (index < 0 || index > (this.papers.length - 1))
            return;

        let papers = [];
        for (let i = 0; i < this.papers.length; i++) {
            if (i == index)
                continue;
            papers.push(this.papers[i]);
        }
        this.papers = papers;

        if (index > (this.papers.length - 1))
            this.index = this.papers.length - 1;

        this.props.onSelectPaper(this.papers[index]);
        this.forceUpdate();
    }
    private onExit = () => {
        this.props.onExit();
    }
    private onSelectPaper = (event) => {
        let index = event.currentTarget.dataset.index;
        this.props.onSelectPaper(this.papers[index]);

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