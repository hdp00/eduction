//by hdp 2017.06.13
//作业信息

import * as React from 'react'
import { Select } from 'antd'
import { HomeworkData } from '../data/homeworkData'

const Option = Select.Option;

const PaperStateName = [
    '新建',
    '已批改',
    '需要重批',
    '完成',
];

interface HomeworkDetailProps {
    data: HomeworkData;
    index: number;
    setSelectObject: (value: object) => void;
    getSelectObject: () => object;
}

export class HomeworkDetail extends React.Component<HomeworkDetailProps, any>{
    render() {
        const isSelect = (this === this.props.getSelectObject());
        const data = this.props.data;
        const title = data.subject + '-' + data.type;
        const status = this.props.data.status;
        const selectValue = PaperStateName[status];
        const options = [];
        for (let n of PaperStateName) {
            options.push(<Option key={n} value={n}>{n}</Option>);
        }

        const divProps = {
            className: isSelect ? 'seat-select' : '',
            onClick: this.onSelect,
        };

        return <div {...divProps}>
            <label>{title}</label>
            <Select value={selectValue} style={{ width: 120 }} onChange={this.onChange}>
                {options}
            </Select>
        </div>;
    }

    public onSelect = () => {
        this.props.setSelectObject(this);
    }

    private onChange = (value) => {
        for (let i = 0; i < PaperStateName.length; i++) {
            if (PaperStateName[i] === value) {
                this.props.data.status = i;
                this.forceUpdate();
            }
        }
    }
}