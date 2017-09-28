//by hdp 2017.05.16
//批改选项

import * as React from 'react';
import { Table } from 'antd';
import { CheckItemData } from '../data/checkData';
import { CheckManager } from './checkManager'
import { Tool } from '../data/tool';
import { imageTrue, imageFalse, imageQuestion, image0, image2, image3 } from '../image'

interface CheckItemListProps {
    manager: CheckManager,
}

interface CheckItemListState {
    select: string[];
}

export class CheckItemList extends React.Component<CheckItemListProps, CheckItemListState>{
    items: CheckItemData[] = [];

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
            let item: CheckItemData = this.items[i];
            datas.push({
                key: i.toString(),
                image: item.image,
                text: item.text
            });
        }

        const type: 'checkbox' | 'radio' = 'radio';
        const size: 'default' | 'middle' | 'small' = 'small';
        const props = {
            pagination: false,
            showHeader: false,
            size: size,
            rowSelection: {
                type: type,
                selectedRowKeys: this.state.select,
                onChange: this.onRadioClick,
            },
            columns: columns,
            dataSource: datas,
            style: {
                width: '100%',
            },
            onRowClick: this.onRowClick,
        }

        return <Table {...props} />;
    }

    public update = (data: CheckItemData[]) => {
        this.items = data;
        this.forceUpdate();
    }

    private imageRender = (text: string): JSX.Element => {
        const index: number = parseInt(text);
        return <img src={imageFalse} />;
    }
    private onRowClick = (record, index) => {
        this.onRadioChange(index);
    }
    private onRadioClick = (selectedRowKeys, selectedRows) => {
        if (selectedRowKeys.length === 0)
            return;
        this.onRadioChange(parseInt(selectedRowKeys[0]));
    }
    private onRadioChange = (index: number) => {
        this.setState({ select: [index.toString()] });
        this.props.manager.checkItemIndex = index;
    }
}


