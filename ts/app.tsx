import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import { Alert } from 'antd';
import './css/antd.css';

import { EducationRouter } from './educationRouter';

// import { Modal, Button, Table, Icon } from 'antd';

// import { IPaper, PaperState } from './define'









import { Title } from './title/title'
import { Login } from './login/login'
import { Radio, Checkbox, Button, Modal } from 'antd'
import { Seat } from './seat/seat'

const CheckboxGroup = Checkbox.Group;

function onChange(checkeds) {
    console.log(checkeds);
}
function onClick() {
    $("input:[type='checkbox']:checked").val();
}

const style = {
    width: '100px',
}
let aaa = [];
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

function bbb(value?: number) {
    console.log(value);
}
bbb();

import { StudentSelector } from './seat/studentSelector'
import { StudentSeat } from './seat/studentSeat'
import { SeatManager } from './seat/seatManager'
import { SeatContainer } from './seat/seatContainer'
import { StudentDetail } from './seat/studentDetail'
import { HomeworkContainer } from './seat/homeworkContainer'
import './css/seat.css'

class Long extends React.Component<any, any>{
    manager: SeatManager = new SeatManager();

    render() {
        return <div>
            <Button onClick={this.onClick}>aaa</Button>
            <Button onClick={this.onClickB}>bbb</Button>
            <Button onClick={this.onClickC}>ccc</Button>
            <HomeworkContainer ref='detail' manager={this.manager} />
        </div>;
    }
    private onClick = () => {
        this.manager.currentIndex = 0;
        this.manager.seatIds[0] = '测试0';
        (this.refs['detail'] as HomeworkContainer).update();
    }
    private onClickB = () => {

    }
    private onClickC = () => {

    }

}

export class App {
    run() {
        ReactDOM.render(<div>
            <Long />
        </div>,
            document.getElementById('root'));
    }


}
