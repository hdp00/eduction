//by hdp 2017.06.17
//试卷拍摄

import * as React from 'react'
import { Modal } from 'antd'
import { UploadControl } from './uploadControl'
import { Tool, SendType } from '../data/tool'
import { PaperData } from '../data/homeworkData'

export class UploadPaper extends React.Component<any, any>{
    homeworkId: string;
    subject: string;
    item: string;

    papers: PaperData[] = [];
    visible: boolean = false;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    video: HTMLVideoElement;
    control: UploadControl;
    canvasWidth = 640;
    canvasHeight = 480;
    image: HTMLImageElement = new Image();

    render() {
        const vedioProps = {
            ref: 'video',
            style: {
                width: '640px',
                height: '480px',
                border: '1px solid gray',
                float: 'left',
            }
        };
        const canvasProps = {
            ref: 'canvas',
            width: '640',
            height: '480',
            style: {
                border: '1px solid gray',
                float: 'left',
            }
        };
        const controlProps = {
            ref: 'control',

            homeworkId: this.homeworkId,
            subject: this.subject,
            item: this.item,

            onTakePicture: this.onTakePicture,
            onSelectPaper: this.onSelectPaper,
            onExit: this.onExit,
        }

        const modalProps = {
            title: '上传试卷',
            visible: this.visible,
            footer: null,
            width: '1500px',
            maskClosable: false,
            closable: false,
            onCancel: this.onExit,
        };

        return <Modal {...modalProps}>
            <video {...vedioProps}></video>
            <UploadControl {...controlProps} />
            <canvas {...canvasProps}></canvas>
            <div style={{ clear: 'both' }} />
        </Modal>;
    }
    componentDidUpdate() {
        this.initComponent();
    }
    public setVisible = (visible: boolean, homeworkId: string, papers: PaperData[]) => {
        this.visible = visible;
        this.homeworkId = homeworkId;

        this.papers = [];
        for (let p of papers) {
            let factPaper = {
                path: p.path,
                paperId: p.paperId,
                hasUpload: true,
            };
            this.generatePaperName(factPaper);
            this.papers.push(factPaper);
        }

        if (this.video !== undefined)
            this.video.play();

        this.forceUpdate();
    }

    private onTakePicture = (paper: PaperData) => {
        //this.ctx.drawImage(this.video, 0, 0);
        console.log(this.refs['video'])

        this.ctx.drawImage(this.refs['video'] as HTMLImageElement, 0, 0);
        paper.data = this.canvas.toDataURL();
    }
    private onSelectPaper = (paper: PaperData) => {
        if (paper === undefined)
            return;

        this.showCanvas(paper);
    }
    private onExit = () => {
        this.visible = false;
        this.forceUpdate();

        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (this.video.readyState !== 0)
            this.video.pause();
    }

    private showCanvas = (paper: PaperData) => {
        this.image.src = (paper.data === undefined) ? paper.path : paper.data;
        this.image.onload = () => {
            this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
        }
    }
    private initComponent = () => {
        if (this.video !== undefined)
            return;
        this.video = this.refs['video'] as HTMLVideoElement;
        if (this.video === undefined)
            return;

        this.canvas = this.refs['canvas'] as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator['webkitGetUserMedia'] ||
            navigator['mozGetUserMedia'] ||
            navigator['msGetUserMedia'];

        navigator.getUserMedia({ video: true }, (stream) => {
            this.video.src = URL.createObjectURL(stream);
            this.video.play();
        }, (value) => { console.log(value) });

        this.control = (this.refs['control'] as UploadControl);
        if (this.visible)
            this.control.setPapers(this.papers);
    }

    private generatePaperName = (value: PaperData) => {
        const index = value.path.lastIndexOf('/');
        if (index != -1)
            value.name = value.path.slice(index + 1);
    }
}