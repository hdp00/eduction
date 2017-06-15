//by hdp 2017.06.14
//作业信息管理

import * as React from 'react'
import { Button } from 'antd'
import { StudentData } from '../data/studentData'
import { HomeworkData } from '../data/homeworkData'
import { HomeworkDetail } from './homeworkDetail'


export class HomeworkContainer extends React.Component<any, any>{
    private student: StudentData;

    private _selectObject: object;
    private setSelectObject = (value: object) => {
        let old = this._selectObject;
        this._selectObject = value;
        (this._selectObject as HomeworkDetail).forceUpdate();
        if (old !== undefined)
            (old as HomeworkDetail).forceUpdate();
    }
    private getSelectObject = () => {
        return this._selectObject;
    }


    render() {
        const exist = (this.student !== undefined);

        let items = [];
        if (exist) {
            let i = 0;
            for (let data of this.student.homeworks) {
                const homeworkProps = {
                    data: data,
                    setSelectObject: this.setSelectObject,
                    getSelectObject: this.getSelectObject,
                    key: i++,
                };

                items.push(<HomeworkDetail {...homeworkProps} />);
            }
        }

        const divProps = {
            style: {
                height: '500px',
            }
        }

        return <div {...divProps}>
            {items}
            <div>
                <Button>拍摄作业</Button>
                <Button>查看作业</Button>
            </div>
        </div>;
    }

    public update = (data: StudentData) => {
        this.student = data;
        this._selectObject = undefined;
        this.forceUpdate();
    }
}

