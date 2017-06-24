//by hdp 2017.06.12
//学生信息

import * as React from 'react'
import { SeatManager } from './seatManager'

interface StudentDetailProps {
    manager: SeatManager,
}

export class StudentDetail extends React.Component<StudentDetailProps, any>{
    render() {
        const id: string = this.props.manager.getCurrentId();
        let detail;
        let credit;
        let addCredit;
        let reduceCredit;

        if (id !== undefined) {

            detail = <div>
                <label>{name}</label><br />
                <label>{school}</label><br />
            </div>;
        }

        const divProps = {
            style: {
                border: '1px solid gray',
                height: '300px',
            },
        };

        return <div {...divProps}>
            {detail}
            {credit}
            {addCredit}
            {reduceCredit}
        </div>;
    }
    componentDidMount(){
        
    }

    public update = () => {

    }
    private receiveDetail = () => {

    }
}