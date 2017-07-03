//by hdp 2017.06.17
//试卷拍摄

import * as React from 'react'
import { Modal } from 'antd'
import { UploadControl } from './uploadControl'
import { Tool, SendType } from '../data/tool'

export class UploadPaper extends React.Component<any, any>{
    homeworkId: string;
    subject: string;
    book: string;
    defaultPapers: string[];

    papers: object[] = [];//{name:string, data:base64, hasUpload}
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
            book: this.book,

            onTakePicture: this.onTakePicture,
            onSelectPaper: this.onSelectPaper,
            onExit: this.onExit,
        }

        const modalProps = {
            title: '上传试卷',
            visible: this.visible,
            footer: null,
            width: '1500px',
            maskClosable:false,
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
    public setVisible = (visible: boolean, homeworkId: string) => {
        this.visible = visible;
        this.homeworkId = homeworkId;

        if(this.video === undefined)
            this.forceUpdate();
        else
            Tool.back.sendData(SendType.homeworkPaper, { homeworkId: this.homeworkId }, this.receiveHomeworkPaper);
    }
    private receiveHomeworkPaper = (value: object) => {
        Tool.lib.fillData(this, value);

        this.papers = [];
        this.control.setPapers(this.papers);

        this.video.play();

        this.forceUpdate();
    }

    private onTakePicture = (paper: object) => {
        //this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.drawImage(this.video, 0, 0);
        //this.ctx.fillText(paper['name'], 100, 100);
        paper['data'] = this.canvas.toDataURL();
    }
    private onSelectPaper = (paper: object) => {
        if(paper === undefined)
            return;

        this.showCanvas(paper);
    }
    private onExit = () => {
        this.visible = false;
        this.forceUpdate();

        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if(this.video.readyState !== 0)
            this.video.pause();
    }

    private showCanvas = (paper: object) => {
        this.image.src = paper['data'];
        this.image.onload = () => {
            //this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
        Tool.back.sendData(SendType.homeworkPaper, { homeworkId: this.homeworkId }, this.receiveHomeworkPaper);
    }
}