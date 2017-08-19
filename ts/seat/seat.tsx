//by hdp 2017.06.11
//座位页面

import * as React from 'react'
import { SeatContainer } from './seatContainer'
import { StudentDetail } from './studentDetail'
import { HomeworkContainer } from './homeworkContainer'
import { SeatManager } from './seatManager'
import '../css/seat.css'

export class Seat extends React.Component<any, any>{
    private manager: SeatManager = new SeatManager();

    constructor(props: any) {
        super(props);
        //绑定学生变化事件
        this.manager.onCurrentStudentChange = this.onCurrentStudentChange;
    }

    render() {
        const SeatProps = {
            manager: this.manager,
        };
        const studentProps = {
            manager: this.manager,
            ref: 'student',
        };
        const homeworkProps = {
            manager: this.manager,
            ref: 'homework',
        };

        return <div style={{ textAlign: 'center' }} >
            <div className='seat-total-div'>
                <SeatContainer {...SeatProps} />
                <div className='seat-single-student-div'>
                    <StudentDetail {...studentProps} />
                    {/* <HomeworkContainer {...homeworkProps} /> */}
                </div>
                <div style={{ clear: 'both' }} />
            </div>
        </div>;
    }

    private onCurrentStudentChange = () => {
        (this.refs['student'] as StudentDetail).update();
        //(this.refs['homework'] as HomeworkContainer).update();
    };
}
