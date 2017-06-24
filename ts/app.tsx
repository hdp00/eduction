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

class Long extends React.Component<any, any>{
    manager: SeatManager = new SeatManager();

    render() {
        return <div>
            <Button onClick={this.onClick}>aaa</Button>
            <Button onClick={this.onClickB}>bbb</Button>
            <Button onClick={this.onClickC}>ccc</Button>
            <StudentSeat manager={this.manager} ref='com' />
        </div>;
    }
    private onClick = () => {
        (this.refs['com'] as StudentSeat).setId('测试5');

    }
    private onClickB = () => {
        let d = new Date();
        d.setTime(d.getTime() + 1000 * 3);
        (this.refs['com'] as StudentSeat).setDelayTime(d);
    }
    private onClickC = () => {
        window.localStorage.removeItem('测试5_delay');
    }

}



export class App {
    run() {
        ReactDOM.render(<div style={{ border: '1px solid blue' }}>
            <Long />
        </div>,
            document.getElementById('root'));
    }


}
