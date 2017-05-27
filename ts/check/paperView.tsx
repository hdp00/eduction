//by hdp 2017.05.18
//试卷显示

import * as React from 'react';
import { PaperState, IPaper, ICorrectData, ICheckItem } from '../define';
import { Tool } from '../tool'


//批改管理
class CorrectManager {
    //图标大小
    private static imageWidth: number = 48;
    private static imageHeight: number = 48;

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
        const image = Tool.imageCheckItem[this.data.type.image];

        ctx.drawImage(image, x, y);
        ctx.fillText(this.data.type.text, textX, y + CorrectManager.imageHeight / 2);
    }
}

interface PaperViewProps {
    currentCorrectItem: () => ICheckItem;
}

export class PaperView extends React.Component<PaperViewProps, any>{
    private ctx: CanvasRenderingContext2D;
    private managers: CorrectManager[] = [];
    private imagePaper: HTMLImageElement[] = [];
    private page: number = 0;
    private paper: IPaper;

    constructor(props: PaperViewProps) {
        super(props);
    }
    render() {
        const sum = this.imagePaper.length;
        const index = this.page;

        const canvasProps = {
            width: 800,
            height: 800,
            style: {
                border: '1px solid black'
            },
            ref: 'canvas',
            onClick: this.addCorrect,
            onDoubleClick: this.deleteCorrect,
        }

        return <div>
            <div>
                <button onClick={this.prev}>上一页</button>
                <label>{(index + 1) + '/' + sum}</label>
                <button onClick={this.next}>下一页</button>
            </div>
            <div>
                <canvas {...canvasProps} />
            </div>
        </div>;
    }
    componentDidMount() {
        let canvas: HTMLCanvasElement = this.refs['canvas'] as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d');
        const ctx: CanvasRenderingContext2D = this.ctx;
        ctx.textBaseline = 'middle';
    }

    private addCorrect = (event) => {
        const x: number = event.pageX - event.target.offsetLeft;
        const y: number = event.pageY - event.target.offsetTop;
        const ctx: CanvasRenderingContext2D = this.ctx;

        const index: number = this.findCheckIndex(x, y);
        if (index > -1)
            return;

        const item: ICheckItem = this.props.currentCorrectItem();
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
        const x: number = event.pageX - event.target.offsetLeft;
        const y: number = event.pageY - event.target.offsetTop;

        const index: number = this.findCheckIndex(x, y);
        if (index === -1)
            return;

        this.managers.splice(index, 1);
        this.draw();
    }
    private draw = () => {
        if (this.ctx === undefined)
            return;

        const ctx: CanvasRenderingContext2D = this.ctx;
        ctx.clearRect(0, 0, 1920, 1080);

        let aaa = Tool;

        ctx.drawImage(this.imagePaper[this.page], 0, 0);
        for (let m of this.managers) {
            if (m.data.page === this.page)
                m.draw(ctx);
        }
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
        this.draw();
        this.forceUpdate();
    }
    private next = () => {
        if (this.page >= (this.imagePaper.length - 1))
            return;

        this.page++;
        this.draw();
        this.forceUpdate();
    }

    //需要在componentDidMount之后调用
    public updatePaper = (data: IPaper) => {
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
        else {
            this.draw();
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
    }
}