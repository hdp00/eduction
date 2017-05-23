//by hdp 2017.05.17
//试卷列表

import * as React from 'react';
import * as $ from 'jquery';
import { Table } from 'antd';
import { PaperState, IPaper } from '../define';

interface PaperListComponentProps {
    items: IPaper[];
    onChange: (id: string) => void;
}

export class PaperListComponent extends React.Component<PaperListComponentProps, any>{
    private items: IPaper[] = [];
    //用于判断试卷是否存在
    private itemMap: object = {};

    constructor(props: PaperListComponentProps) {
        super(props);
        this.updateItem(this.props.items);
    }

    render() {
        const columns = [{
            dataIndex: 'state',
            key: '0',
            width: '50px',
            render: this.stateRender,
        },
        {
            dataIndex: 'text',
            key: '1',
        }];

        let datas = [];
        for (let item of this.items) {
            let paper: IPaper = item as IPaper;
            datas.push({
                key: paper.id,
                state: paper.state,
                text: paper.text,
            });
        }

        const props = {
            pagination: false,
            showHeader: false,
            columns: columns,
            dataSource: datas,
            scroll:{
                y:600,
            },
            style: {
                width: '400px',
                height:'600px',
            },
            onRowClick: this.onRowClick,
        }

        return <Table {...props} />;
    }

    //数据更新
    public updateItem = (items: IPaper[]) => {
        if (this.items.length == 0) {
            $.extend(this.items, items);
            for (let item of this.items)
                this.itemMap[item.id] = item;
            return;
        }

        for (let item of items) {
            let id: string = item.id as string;
            let newItem: IPaper = this.itemMap[id];
            if (newItem == undefined) {
                newItem = {} as IPaper;
                this.items.push($.extend(newItem, item));
                this.itemMap[id] = newItem;
            }
            else
                newItem.state = item.state;
        }

        this.forceUpdate();
    }

    //根据状态显示
    private stateRender = (text, record, index): JSX.Element => {
        const colors = ['yellow', 'green', 'red'];
        const color = colors[text];
        const props = {
            style: {
                width: '20px',
                height: '20px',
                borderRadius: '50px',
                backgroundColor: color,
            }
        }

        return <div {...props} />
    }
    private onRowClick = (record, index) => {
        this.props.onChange(record.key);
    }
}


export class PaperComponent extends React.Component<any, any>{
    render() {
        const paperProps = {
            items: [{
                id: '0',
                text: 'a',
                state: PaperState.New,
            }, {
                id: '1',
                text: 'b',
                state: PaperState.HasCorrected,
            }, {
                id: '2',
                text: 'c',
                state: PaperState.ReCorrect,
            }],
            onChange: (id) => { console.log(id); }
        };

        const buttonProps = {
            onClick: this.onClick,
            style: {
                width: '100px',
                height: '100px',
            }
        };


        return <div>
            <button {...buttonProps} />
            <PaperListComponent ref='paper' {...paperProps} />
        </div>;
    }

    index: number = 3;
    private onClick = () => {
        let c: PaperListComponent = this.refs['paper'] as PaperListComponent;
        let items = [{
            id: this.index.toString(),
            text: 'aaa',
            state: PaperState.New,
        }];

        c.updateItem(items);
        this.index++;
    }

}