//by hdp 2017.05.26
//批改页面

import * as React from 'react'
import { Button } from 'antd'
import { PaperState } from '../define'
import { PaperView } from './paperView'
import { CheckItemList } from './checkItemList'
import { PaperList } from './paperList'
import { Tool } from '../tool'
import { image0, image2, image3 } from '../image'
import '../css/check.css';

export class Check extends React.Component<any, any>{
    papers = [{
        id: '0',
        images: [
            image0,
            image2,
            image3
        ],
        text: 'aaa',
        state: PaperState.New,
    },
    {
        id: '1',
        images: [
            image3,
            image2,
            image0
        ],
        text: 'bbb',
        state: PaperState.New,
    }];

    items = [{
        image: 0,
        text: 'a',
        score: 1,
    },
    {
        image: 0,
        text: 'b',
        score: 1,
    },
    {
        image: 0,
        text: 'c',
        score: 1,
    },
    {
        image: 1,
        text: 'd',
        score: 1,
    },
    {
        image: 1,
        text: 'e',
        score: 1,
    }];

    render() {
        const paperViewProps = {
            currentCheckItem: this.getCurrentCheckItem,
            ref: 'view',
        };

        const checkItemListProps = {
            items: this.items,
        };

        const paperProps = {
            items: this.papers,
            onChange: (id) => { console.log(id); },
        };
        const buttonProps = {
            onClick:this.nextPaper,
            style:{
                margin:'5px',
            }
        };

        return <div className='check-total-div'>
            <PaperView {...paperViewProps} />
            <div className = 'check-check-item-list' >
                <Button type='primary' {...buttonProps}>下一份试卷</Button>
                <CheckItemList {...checkItemListProps} />
            </div>
            <PaperList {...paperProps} />
        </div>;
    }
    componentDidMount() {
        (this.refs['view'] as PaperView).updatePaper(this.papers[0]);
    }

    private getCurrentCheckItem = () => {
        return this.items[Tool.check.currentIndex];
    }

    private nextPaper = () => {

    }
}


