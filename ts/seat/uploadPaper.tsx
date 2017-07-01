//by hdp 2017.06.17
//试卷拍摄

import * as React from 'react'
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
            homeworkId: this.props.homeworkId,
            subject: this.props.subject,
            book: this.props.book,

            onTakePicture: this.onTakePicture,
            onSelectPaper: this.onSelectPaper,
            onExit: this.onExit,
        }

        return <div>
            <video {...vedioProps}></video>
            <UploadControl {...controlProps} />
            <canvas {...canvasProps}></canvas>
        </div>;
    }
    componentDidMount() {
        this.video = this.refs['video'] as HTMLVideoElement;
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator['webkitGetUserMedia'] ||
            navigator['mozGetUserMedia'] ||
            navigator['msGetUserMedia'];

        navigator.getUserMedia({ video: true }, (stream) => {
            this.video.src = URL.createObjectURL(stream);
            this.video.play();
        }, (value) => { console.log(value) });
    }
    public setVisible = (visible: boolean, homeworkId: string) => {
        this.visible = visible;
        this.homeworkId = homeworkId;
        Tool.back.sendData(SendType.homeworkPaper, { homeworkId: this.homeworkId }, this.receiveHomeworkPaper);
    }
    private receiveHomeworkPaper = (value: object) => {
        Tool.lib.fillData(this, value);

        this.forceUpdate();
    }

    private onTakePicture = (paper: object) => {
        this.ctx.drawImage(this.video, 0, 0);
        paper['data'] = this.canvas.toDataURL();
    }
    private onSelectPaper = (paper: object) => {
        this.showCanvas(paper);
    }
    private onExit = () => {
        this.visible = false;
        this.forceUpdate();
    }

    private showCanvas = (paper: object) => {
        let image: HTMLImageElement = new Image();
        image.src = paper['data'];
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0, 640, 480);
        }
    }
}