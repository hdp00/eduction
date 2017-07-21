//by hdp 2017.05.26
//批改页面

import * as $ from 'jquery'
import * as React from 'react'
import { Button } from 'antd'
import { PaperState, IPaper, ICheckItem } from '../define'
import { PaperView } from './paperView'
import { CheckItemList } from './checkItemList'
import { PaperList } from './paperList'
import { Tool, DataUrl } from '../data/tool'
import '../css/check.css'


export class Check extends React.Component<any, any>{
    //试卷列表
    papers: IPaper[] = [];
    paperIndex:number = -1;
    //错误项列表
    items: ICheckItem[] = [];

    render() {
        const paperViewProps = {
            currentCheckItem: this.getCurrentCheckItem,
            ref: 'view',
        };
        const checkItemListProps = {
            ref: 'items',
        };
        const paperProps = {
            ref: 'papers',
            onChange: this.onPaperChange,
        };
        const buttonProps = {
            onClick: this.nextPaper,
            style: {
                margin: '5px',
            }
        };

        return <div className='check-total-div'>
            <PaperView {...paperViewProps} />
            <div className='check-check-item-list' >
                <Button type='primary' {...buttonProps}>下一份试卷</Button>
                <CheckItemList {...checkItemListProps} />
            </div>
            <PaperList {...paperProps} />
        </div>;
    }
    componentDidMount() {
        console.log('bbbb');
        Tool.back.post(DataUrl.checkItemList, undefined, this.updateItems);
        Tool.back.addEventSource(DataUrl.paperList, this.updatePapers);
    }

    private updateItems = (response: any) => {
        this.items = response;
        (this.refs['items'] as CheckItemList).update(this.items);
    }
    private updatePapers = (response: any) => {
        const data:IPaper[] = response;
        this.mixPapersData(data);

        (this.refs['papers'] as PaperList).update(this.papers);
        if(this.paperIndex === -1)
            this.nextPaper();
    }
    //获取当前错误项
    private getCurrentCheckItem = () => {
        return this.items[Tool.check.currentIndex];
    }
    //下一张未批改试卷
    private nextPaper = () => {
        let count = this.papers.length;
        let index = this.paperIndex + 1;
        if(count === 0)
            return;

        for(let i = 0; i < (count - 1); i++){
            let j = index + i;
            j = (j >= count) ? j - count : j;
            if(this.papers[j].state !== PaperState.HasChecked){
                this.onPaperChange(j);
                (this.refs['papers'] as PaperList).updateSelect(this.paperIndex);
                return;
            }               
        }

        this.onPaperChange(-1);
    }
    //试卷切换
    private onPaperChange = (index:number) => {
        this.paperIndex = index;
        (this.refs['view'] as PaperView).update(this.papers[index]);
    }
    //数据不断更新，需要混合
    private paperMap = {};
    private mixPapersData(data:IPaper[]){
        if(this.papers.length === 0){
            this.papers = data;
            for(let p of this.papers)
                this.paperMap[p.id] = p;
            return;
        }

        for(let d of data){
            if(this.paperMap[d.id] === undefined){
                this.papers.push(d);
                this.paperMap[d.id] = d;
            }else{
                let p:IPaper = this.paperMap[d.id];
                $.extend(true, p, d);
            }
        }
    }
}
