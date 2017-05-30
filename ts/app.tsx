import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import { Button } from 'antd';
import './css/antd.css';

import { EducationRouter } from './educationRouter';
import { LoginForm } from './login/login'

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






import { Tool } from './tool';







export class App {



    run() {
        //temp
        let a = {a:1, b:2};
        let b = {c:3, ...a};
        console.log(b);

        ReactDOM.render(<div>
            {/*<TotalRouter />*/}
            <Check />


        </div>,
            document.getElementById('root'));
    }
}
