//by hdp 2017.05.16
//批改选项

import * as React from 'react';
import { Table } from 'antd';
import { ICheckItem } from '../define';

interface CheckItemListProps {
    items: ICheckItem[];
    onChange: (index: number) => void;
}
interface CheckItemListState {
    select: string[];
}

export class CheckItemList extends React.Component<CheckItemListProps, CheckItemListState>{
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
        for (let i = 0; i < this.props.items.length; i++) {
            let item: ICheckItem = this.props.items[i];
            datas.push({
                key: i.toString(),
                image: item.image,
                text: item.text
            });
        }

        const type:'checkbox' | 'radio' = 'radio';
        const props = {
            pagination: false,
            showHeader: false,
            rowSelection: {
                type: type,
                selectedRowKeys: this.state.select,
                onChange: this.onRadioClick,
            },
            columns: columns,
            dataSource: datas,
            style: {
                width: '400px',
            },
            onRowClick: this.onRowClick,
        }

        return <Table {...props} />;
    }

    private imageRender = (text: string): JSX.Element => {
        return <img src={text} />;
    }
    private onRowClick = (record, index) => {
        this.onRadioChange(index);
    }
    private onRadioClick = (selectedRowKeys, selectedRows) => {
        if(selectedRowKeys.length == 0)
            return;
        this.onRadioChange(parseInt(selectedRowKeys[0]));
    }
    private onRadioChange = (index: number) => {
        this.setState({ select: [index.toString()]});
        this.props.onChange(index);
    }
}


