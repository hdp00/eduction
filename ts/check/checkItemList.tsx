//by hdp 2017.05.16
//批改选项

import * as React from 'react';
import { Table } from 'antd';
import { ICheckItem } from '../define';
import {Tool} from '../tool';


interface CheckItemListState {
    select: string[];
}

export class CheckItemList extends React.Component<any, CheckItemListState>{
    items:ICheckItem[] = [];

    public state: CheckItemListState = {
        select: ['0']
    };

    render() {
        const columns = [{
            dataIndex: 'image',
            key: '0',
            width: '50px',
            render: this.imageRender,
        },
        {
            dataIndex: 'text',
            key: '1',
        }];

        let datas = [];
        for (let i = 0; i < this.items.length; i++) {
            let item: ICheckItem = this.items[i];
            datas.push({
                key: i.toString(),
                image: item.image,
                text: item.text
            });
        }

        const type:'checkbox' | 'radio' = 'radio';
        const size:'default' | 'middle' | 'small' = 'small';
        const props = {
            pagination: false,
            showHeader: false,
            size:size,
            rowSelection: {
                type: type,
                selectedRowKeys: this.state.select,
                onChange: this.onRadioClick,
            },
            columns: columns,
            dataSource: datas,
            style: {
                width:'100%',
            },
            onRowClick: this.onRowClick,
        }

        return <Table {...props} />;
    }

    public update = (data:ICheckItem[]) =>{
        this.items = data;
        this.forceUpdate();
    }

    private imageRender = (text: string): JSX.Element => {
        const index:number = parseInt(text);
        return <img src={Tool.check.imageItem[index].src} />;
    }
    private onRowClick = (record, index) => {
        this.onRadioChange(index);
    }
    private onRadioClick = (selectedRowKeys, selectedRows) => {
        if(selectedRowKeys.length === 0)
            return;
        this.onRadioChange(parseInt(selectedRowKeys[0]));
    }
    private onRadioChange = (index: number) => {
        this.setState({ select: [index.toString()]});
        Tool.check.currentIndex = index;
    }
}


