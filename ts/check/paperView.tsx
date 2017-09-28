//by hdp 2017.05.18
//试卷显示

import * as React from 'react';
import { Button, Icon } from 'antd';
import { PaperState, IPaper, ICorrectData, ICheckItem } from '../data/checkData';
import { Tool } from '../data/tool';

//批改管理
class CorrectManager {
    //图标大小
    private static imageWidth: number = 24;
    private static imageHeight: number = 24;

    private width: number;
    private height: number;
    //图标和文本之间间隔
    private interval: number = 10;

    public data: ICorrectData;

    constructor(data: ICorrectData) {
        this.data = data;
    }

    public calculateSize(ctx: CanvasRenderingContext2D) {
        const textWidth: number = ctx.measureText(this.data.type.text).width;
        this.width = textWidth + CorrectManager.imageWidth + this.interval;
        this.height = CorrectManager.imageHeight;
    }
    public isVisible(x: number, y: number) {
        const offset: number = 10;
        const left = this.data.x;
        const top = this.data.y;

        if ((x >= (left - offset) && x <= (left + this.width + offset))
            && (y >= (top - offset) && y <= (top + this.height + offset)))
            return true;

        return false;
    }
    public draw(ctx: CanvasRenderingContext2D) {
        const x = this.data.x;
        const y = this.data.y;
        const textX = x + CorrectManager.imageWidth + this.interval;
        const image = Tool.check.imageItem[this.data.type.image];

        ctx.drawImage(image, x, y);
        ctx.fillText(this.data.type.text, textX, y + CorrectManager.imageHeight / 2);
    }
}

interface PaperViewProps {
    currentCheckItem: () => ICheckItem;
}

export class PaperView extends React.Component<PaperViewProps, any>{
    private ctx: CanvasRenderingContext2D;
    private managers: CorrectManager[] = [];
    private imagePaper: HTMLImageElement[] = [];
    private page: number = 0;
    private paper: IPaper;
    private canvasScale: number = 1;

    render() {
        const exist = (this.paper !== undefined);
        const sum = this.imagePaper.length;
        const index = this.page;
        const scale = this.canvasScale;

        const prevProps = {
            onClick: exist ? this.prev : undefined,
        };
        const nextProps = {
            onClick: exist ? this.next : undefined,
        };
        const titleProps = {
            style: {
                margin: '5px auto',
                textAlign: 'center',
            }
        };
        const totalProps = {
            className: 'check-paper-view',
        }

        const canvasProps = {
            width: 640 * scale,
            height: 480 * scale,
            className: 'check-canvas',

            ref: 'canvas',
            onClick: exist ? this.addCorrect : undefined,
            onDoubleClick: exist ? this.deleteCorrect : undefined,
            onWheel: exist ? this.scaleCanvas : undefined,
        };

        return <div {...totalProps}>
            <div {...titleProps}>
                <Button type='primary'{...prevProps}><Icon type="left" />上一页</Button>
                <label className='check-label'>{(index + 1) + '/' + sum}</label>
                <Button type='primary' {...nextProps}>下一页<Icon type="right" /></Button>
            </div>
            <div className='chekc-canvas-div'>
                <canvas {...canvasProps}/>
            </div>
        </div>;
    }
    componentDidMount() {
        let canvas: HTMLCanvasElement = this.refs['canvas'] as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d');
        const ctx: CanvasRenderingContext2D = this.ctx;
        ctx.textBaseline = 'middle';
    }
    componentDidUpdate(prevProps: any, prevState: any, prevContext: any){
        this.draw();
    }

    private addCorrect = (event) => {
        const scale = this.canvasScale;
        const x: number = (event.pageX - event.target.offsetLeft) / scale;
        const y: number = (event.pageY - event.target.offsetTop) / scale;
        const ctx: CanvasRenderingContext2D = this.ctx;

        const index: number = this.findCheckIndex(x, y);
        if (index > -1)
            return;

        const item: ICheckItem = this.props.currentCheckItem();
        const correctData = {
            page: this.page,
            x: x,
            y: y,
            type: item
        };

        let manager: CorrectManager = new CorrectManager(correctData);
        manager.calculateSize(this.ctx);
        this.managers.push(manager);
        this.draw();
    }
    private deleteCorrect = (event) => {
        const scale = this.canvasScale;
        const x: number = (event.pageX - event.target.offsetLeft) / scale;
        const y: number = (event.pageY - event.target.offsetTop) / scale;

        const index: number = this.findCheckIndex(x, y);
        if (index === -1)
            return;

        this.managers.splice(index, 1);
        this.draw();
    }
    aaa:number = 0;
    private draw = () => {
        if (this.ctx === undefined)
            return;

        const ctx: CanvasRenderingContext2D = this.ctx;
        const scale = this.canvasScale;
        ctx.save();
        ctx.scale(scale, scale);
        ctx.clearRect(0, 0, 1920, 1080);

        ctx.drawImage(this.imagePaper[this.page], 0, 0);
        for (let m of this.managers) {
            if (m.data.page === this.page)
                m.draw(ctx);
        }

        ctx.restore();
    }
    private findCheckIndex(x: number, y: number): number {
        const count = this.managers.length;

        for (let i = 0; i < count; i++) {
            const index = count - i - 1;
            const m = this.managers[index];
            if ((m.data.page === this.page) && m.isVisible(x, y))
                return index;
        }

        return -1;
    }
    private prev = () => {
        if (this.page <= 0)
            return;

        this.page--;
        this.forceUpdate();
    }
    private next = () => {
        if (this.page >= (this.imagePaper.length - 1))
            return;

        this.page++;
        this.forceUpdate();
    }
    private scaleCanvas = (event) => {
        const e: WheelEvent = event as WheelEvent;
        if (!e.altKey)
            return;
        e.preventDefault();

        const scales: number[] = [1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
        const len: number = scales.length;
        let index: number = 0;
        let scale: number = this.canvasScale;
        for (let i = 0; i < len; i++) {
            if (scale === scales[i]) {
                index = i;
                break;
            }
        }

        if (event.deltaY > 0) {
            index--;
            index = (index < 0) ? 0 : index;
        } else {
            index++;
            index = (index >= len) ? (len - 1) : index;
        }

        let newScale = scales[index];
        if (scale !== newScale) {
            this.canvasScale = newScale;
            this.forceUpdate();
        }     
    }

    //需要在componentDidMount之后调用
    public update = (data: IPaper) => {
        this.save();
        this.clear();

        this.paper = data;
        if (this.paper !== undefined && this.paper.images.length > 0) {
            if (this.paper.corrects !== undefined) {
                for (let c of this.paper.corrects) {
                    const m = new CorrectManager(c);
                    m.calculateSize(this.ctx);
                    this.managers.push(m);
                }
            }

            for (let src of this.paper.images) {
                let image: HTMLImageElement = new Image();
                if (this.imagePaper.length === 0)
                    image.onload = this.draw;
                image.src = src;
                this.imagePaper.push(image);
            }
        }

        this.forceUpdate();
    }
    private clear() {
        this.managers = [];
        this.imagePaper = [];
        this.page = 0;
    }
    private save() {
        if (this.paper === undefined)
            return;

        this.paper.corrects = [];
        for (let m of this.managers)
            this.paper.corrects.push(m.data);

        Tool.back.post('/check/sendCorrect', this.paper.corrects);
    }
}