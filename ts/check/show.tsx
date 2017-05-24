//by hdp 2017.05.18
//试卷显示组件

import * as React from 'react';
import { PaperState, IPaper, ICorrectData, ICheckItem } from '../define';

//批改管理
class CorrectManager {
    //图标大小
    private static imageWidth: number = 48;
    private static imageHeight: number = 48;
    public static imageMap: object = {};

    private width: number;
    private height: number;
    //图标和文本之间间隔
    private interval: number = 10;
    private get image(): HTMLImageElement {
        return CorrectManager.imageMap[this.data.type.image];
    }

    data: ICorrectData;

    constructor(data: ICorrectData, onImageLoad?: () => void) {
        this.data = data;
        const imageSrc: string = this.data.type.image;
        if (CorrectManager.imageMap[imageSrc] == undefined) {
            const image: HTMLImageElement = new Image();
            if(onImageLoad != undefined)
                image.onload = onImageLoad;
            image.src = imageSrc;
            CorrectManager.imageMap[imageSrc] = image;
        }
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

        ctx.drawImage(this.image, x, y);
        ctx.fillText(this.data.type.text, textX, y + CorrectManager.imageHeight / 2);
    }
}

interface ShowProps {
    paper: IPaper;
    currentCorrectItem: () => ICheckItem;
    onCorrect: (data: IPaper) => void;
}

export class Show extends React.Component<ShowProps, any>{
    private ctx: CanvasRenderingContext2D;
    private managers: CorrectManager[] = [];
    private imagePaper: HTMLImageElement = new Image();

    constructor(props: ShowProps) {
        super(props);

        for (let correct of this.props.paper.corrects) {
            this.managers.push(new CorrectManager(correct));
        }
    }
    render() {
        const canvasProps = {
            width: 800,
            height: 1000,
            style: {
                border: '1px solid black'
            },
            ref: 'canvas',
            onClick: this.addCorrect,
            onDoubleClick: this.deleteCorrect,
        }

        return <div>
            <canvas {...canvasProps} />
        </div>;
    }
    componentDidMount() {
        let canvas: HTMLCanvasElement = this.refs['canvas'] as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d');
        const ctx: CanvasRenderingContext2D = this.ctx;
        ctx.textBaseline = 'middle';

        for (let m of this.managers)
            m.calculateSize(ctx);

        this.imagePaper.src = this.props.paper.image as string;
        this.imagePaper.onload = this.draw;
    }

    private addCorrect = (event) => {
        const x: number = event.pageX - event.target.offsetLeft;
        const y: number = event.pageY - event.target.offsetTop;
        const ctx: CanvasRenderingContext2D = this.ctx;

        const index: number = this.findCheckIndex(x, y);
        if (index > -1)
            return;

        const item:ICheckItem = this.props.currentCorrectItem();
        const correctData = {
            page: 0,
            x: x,
            y: y,
            type: item,
        };

        const needLoad = (CorrectManager.imageMap[item.image] == undefined);
        let manager:CorrectManager;
        if(needLoad)
            manager = new CorrectManager(correctData, () => {this.draw();})
        else
            manager = new CorrectManager(correctData);
        manager.calculateSize(this.ctx);
        this.managers.push(manager);

        if(!needLoad)
            this.draw();
    }
    private deleteCorrect = (event) => {
        const x: number = event.pageX - event.target.offsetLeft;
        const y: number = event.pageY - event.target.offsetTop;

        const index: number = this.findCheckIndex(x, y);
        if (index == -1)
            return;

        this.managers.splice(index, 1);

        this.draw();
    }
    private draw = () => {
        const ctx: CanvasRenderingContext2D = this.ctx;
        ctx.clearRect(0, 0, 1920, 1080);

        ctx.drawImage(this.imagePaper, 0, 0);
        for (let manager of this.managers)
            manager.draw(ctx);
    }
    private findCheckIndex(x: number, y: number): number {
        const count = this.managers.length;
        for (let i = 0; i < count; i++) {
            const index = count - i - 1;
            if (this.managers[index].isVisible(x, y))
                return index;
        }

        return -1;
    }
}