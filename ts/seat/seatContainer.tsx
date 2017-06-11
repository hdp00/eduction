//by hdp 2017.06.11
//学生座位管理

import * as React from 'react'
import { StudentData } from '../data/studentData'
import { StudentSeat } from './studentSeat'

interface SeatContainerProps{
    students:StudentData[];
    row:number;
    col:number;
}

class SeatContainer extends React.Component<SeatContainerProps, any>{
    render() {
        return <div>
        </div>;
    }

    public update = () => {

    }
}