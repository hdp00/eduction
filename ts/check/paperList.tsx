//by hdp 2017.05.17
//试卷列表

import * as React from 'react';
import * as $ from 'jquery';
import { Table, Badge } from 'antd';
import { PaperState } from '../data/define';
import { CheckHomeworkData } from '../data/checkData'

interface PaperListProps {
    onChange: (index: number) => void;
}

export class PaperList extends React.Component<PaperListProps, any>{
    //试卷列表
    private items: CheckHomeworkData[] = [];
    //选中项
    private selectKeys: string[] = [];

    render() {
        const columns = [{
            dataIndex: 'state',
            key: '0',
            width: '10px',
            render: this.stateRender,
        },
        {
            dataIndex: 'text',
            key: '1',
        }];

        let datas = [];
        let hasCheckedCount = 0;
        let noCheckedCount = 0;
        for (let i = 0; i < this.items.length; i++) {
            let paper = this.items[i];
            datas.push({
                key: i.toString(),
                state: paper.state,
                text: paper.studentName + '  ' + paper.subject + ' ' + paper.item,
            });

            switch (paper.state) {
                case PaperState.HasChecked:
                    hasCheckedCount++;
                    break;
                default:
                    break;
            }
        }
        noCheckedCount = this.items.length - hasCheckedCount;

        const type: 'checkbox' | 'radio' = 'radio';
        const size: 'default' | 'middle' | 'small' = 'small';
        const props = {
            pagination: false,
            showHeader: false,
            size: size,
            rowSelection: {
                type: type,
                selectedRowKeys: this.selectKeys,
                onChange: this.onRadioClick,
            },
            columns: columns,
            dataSource: datas,
            scroll: {
                y: 800,
            },
            className: 'check-paper-list',
            onRowClick: this.onRowClick,
        }

        return <div>
            <div style={{ textAlign: 'right' }}>
                <Badge count={noCheckedCount} style={{ backgroundColor: 'blue', margin: '5px' }} />
            </div>
            <Table {...props} />
        </div>;
    }

    //数据更新
    public update = (data: CheckHomeworkData[]) => {
        this.items = data;
        this.forceUpdate();
    }
    public updateSelect = (index: number) => {
        this.selectKeys = (index === -1) ? [] : [index.toString()];
        this.forceUpdate();
    }

    //根据状态显示
    private stateRender = (text, record, index): JSX.Element => {
        const color = (PaperState.HasChecked === parseInt(text)) ? 'green' : 'blue';
        const props = {
            style: {
                width: '15px',
                height: '15px',
                borderRadius: '50px',
                backgroundColor: color,
            }
        }

        return <div {...props} />
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
        this.props.onChange(index);
        this.updateSelect(index);
    }
}
