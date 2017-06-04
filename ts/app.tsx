import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import { Button, Alert } from 'antd';
import './css/antd.css';

import { EducationRouter } from './educationRouter';

// import { Modal, Button, Table, Icon } from 'antd';

// import { IPaper, PaperState } from './define'








import { Tool } from './tool/tool';
import {Title} from './title/title'
import {Login} from './login/login'




export class App {
    run() {

        ReactDOM.render(<div>
            <EducationRouter />
        </div>,
            document.getElementById('root'));
    }
}
