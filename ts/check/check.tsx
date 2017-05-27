//by hdp 2017.05.26
//批改页面

import * as React from 'react';
import { PaperState } from '../define';
import { PaperView } from './paperView';
import { CheckItemList } from './checkItemList';
import { image0, image2, image3 } from '../image';


export class Check extends React.Component<any, any>{
    paper = {
        id: '0',
        images: [
            image0,
            image2,
            image3
        ],
        text: '试卷',
        state: PaperState.New,
    };

    render() {
        const paperViewProps = {
            currentCorrectItem: () => {
                return {
                    image: 0,
                    text: 'wrong',
                    score: 1,
                }
            },
            ref: 'paper',
        };

        const checkItemListProps = {
            items: [{
                image: 0,
                text: 'a',
                score:1,
            },
            {
                image: 0,
                text: 'b',
                score:1,
            },
            {
                image: 0,
                text: 'c',
                score:1,
            },
            {
                image: 1,
                text: 'd',
                score:1,
            },
            {
                image: 1,
                text: 'e',
                score:1,
            }],
            onChange: (index) => { console.log(index); }
        };

        return <div>
            <button>test</button>
            <PaperView  {...paperViewProps} />
            <CheckItemList {...checkItemListProps}/>
        </div>;
    }
    componentDidMount() {
        (this.refs['paper'] as PaperView).updatePaper(this.paper);
    }
}


