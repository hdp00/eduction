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

export class App {
    run() {

        ReactDOM.render(<div>
            <Button onClick={onClick}>aaa</Button>

            <CheckboxGroup  onChange={onChange}>
                <Checkbox className='longlongaog' style={style} disabled value='b1' >a1</Checkbox>
                <Checkbox className='longlongaog' style={style} checked={true} value='b2' >a2333</Checkbox>
                <Checkbox className='longlongaog' style={style} value={3} >a3</Checkbox>
            </CheckboxGroup>

        </div>,
            document.getElementById('root'));
    }
}
