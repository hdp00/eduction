import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import './css/antd.css';

import { EducationRouter } from './educationRouter';




import { Title } from './title/title'
import { Login } from './login/login'
import { Seat } from './seat/seat'


function onChange(checkeds) {
}
function onClick() {
    $("input:[type='checkbox']:checked").val();
}

const style = {
    width: '100px',
}
let visible = false;

const props = {
    style: {
        width: '100px',
        height: '100px',
        border: '1px solid red',
        float: 'left',
    }
}

const a = {
    a: 1,
    b: 2,
}


import { StudentSelector } from './seat/studentSelector'
import { StudentSeat } from './seat/studentSeat'
import { SeatManager } from './seat/seatManager'
import { SeatContainer } from './seat/seatContainer'
import { StudentDetail } from './seat/studentDetail'
import { HomeworkContainer } from './seat/homeworkContainer'
import { UploadPaper } from './seat/uploadPaper'
import { StudentCard } from './student/studentCard'
import { Student } from './student/student'
import { InputNumber, Button, DatePicker, Input } from 'antd'
import * as moment from 'moment'
import './css/seat.css'
import './css/education.css'

let aaa = [{a:'a1'},{a:'a2'}];
let bbb = [{b:'b1'},{b:'b2'}];
aaa = $.extend(true, {}, bbb);


var formatTime = moment(Date.now());

import { ModifyGradeModal } from './student/modifyGradeModal'
let grades = [
    {
        date: new Date(),
        scores: [1, 22, 33, 44, 55],
    },
    {
        date: new Date(),
        scores: [2, 3, 7, 88, 99],
    },
    {
        date: new Date(),
        scores: [3, 22, 33, 44, 55],
    },
    {
        date: new Date(),
        scores: [4, 22, 55, 44, 55],
    },
];




class Long extends React.Component<any, any>{

    index: number = 0;
    text:string = '';

    render() {
        return <div>
            {/*<div style={{wordBreak:'break-word', width:'50px'}}>dgdflhkgophnkgfpogkr;hkgpfogkdpohktropyihkpofkf;dlgkfpobk,ewrpogkf</div>
            <label>__________</label>*/}
            <Button onClick={this.onClickB}>bbb</Button>
            {/* <Button ref='button' onClick={this.onClickC}>{this.index}</Button>} */}
            {/*<div style={{backgroundColor:'rgba(0,0,255,1)'}}>aaa</div>*/}
            <Student />
            <Input value={this.text} onChange={this.onChange} />
        </div>;
    }
    private onClick = () => {
    }
    private onClickB = () => {
        (this.refs['test'] as ModifyGradeModal).setVisible(true, 'test', grades);

    }
    private onClickC = (a, b) => {
        console.log(a['_d']);
        console.log(b);
    }
    private onChange = (event) =>{
        console.log(event.currentTarget.value);
        this.text = event.currentTarget.value;
        this.forceUpdate();
    }

}

export class App {
    run() {
        ReactDOM.render(<div>
            <EducationRouter />
        </div>,
            document.getElementById('root'));
    }


}
