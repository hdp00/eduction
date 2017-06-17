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

export class App {
    run() {

        ReactDOM.render(<div style={{border:'1px solid blue'}}>
            <EducationRouter />
        </div>,
            document.getElementById('root'));
    }
}
