//by hdp 2017.06.17
//试卷拍摄

import * as React from 'react'

export class Camera extends React.Component<any, any>{
    render() {
        const vedioProps = {
            ref: 'video',
            style: {
                width: '640px',
                height: '480px',
                border:'1px solid red',
            }
        };
        const canvasProps = {
            ref: 'canvas',
            width: '640',
            height: '480',
            style:{
                border:'1px solid red',
            }
        };

        return <div>
            <video {...vedioProps}></video>
            <canvas {...canvasProps}></canvas>
        </div>;
    }
    componentDidMount() {
        const video: HTMLVideoElement = this.refs['video'] as HTMLVideoElement;
        //const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        //const ctx = canvas.getContext('2d');
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        navigator.getUserMedia({ video: true }, (stream) => {
            alert('aaa');
            video.src = URL.createObjectURL(stream);
            video.play();
        },
            (aaa) => { alert(aaa); });
    }
}