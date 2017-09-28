import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import './css/antd.css';
import './css/education.css'

import { EducationRouter } from './educationRouter';


// import { Title } from './title/title'
// import { Login } from './login/login'
// import { Seat } from './seat/seat'


export class App {
    run() {
        ReactDOM.render(<div>
            <EducationRouter />
        </div >,
            document.getElementById('root'));
    }
}
