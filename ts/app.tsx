import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import { Button, Alert } from 'antd';
import './css/antd.css';

import { EducationRouter } from './educationRouter';

// import { Modal, Button, Table, Icon } from 'antd';

// import { IPaper, PaperState } from './define'
import { Check } from './check/check';




/*ReactDOM.render(<div >
    <button style={{width:'100px', height:'100px'}}/>
    <PaperComponent />
</div>,
    document.getElementById('root'));*/





// const buttonProps = {

//     type: 'primary',
//     style: {
//         width: '300px',
//         margin:'1px',
//     }
// };
// const divProps = {
//     style: {
//         height: '300px',
//         overflow: 'auto',
//     }
// };

/*ReactDOM.render(<div >
    <CorrectComponent {...correctProps} />

</div>,
    document.getElementById('root'));*/






import { Tool } from './tool/tool';
import {Title} from './title/title'




export class App {
    run() {

        ReactDOM.render(<div>
            <EducationRouter />
        </div>,
            document.getElementById('root'));
    }
}
