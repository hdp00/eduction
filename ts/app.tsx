import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import './css/antd.css';
import './css/education.css'

import { EducationRouter } from './educationRouter';


// import { Title } from './title/title'
// import { Login } from './login/login'
// import { Seat } from './seat/seat'


// class Long extends React.Component<any, any>{

//     index: number = 0;
//     text: string = '';

//     render() {
//         return <div>
//             {/*<div style={{wordBreak:'break-word', width:'50px'}}>dgdflhkgophnkgfpogkr;hkgpfogkdpohktropyihkpofkf;dlgkfpobk,ewrpogkf</div>
//             <label>__________</label>*/}
//             <Button onClick={this.onClickB}>bbb</Button>
//             {/* <Button ref='button' onClick={this.onClickC}>{this.index}</Button>} */}
//             {/*<div style={{backgroundColor:'rgba(0,0,255,1)'}}>aaa</div>*/}
//             <Student />
//             <Input value={this.text} onChange={this.onChange} />
//         </div>;
//     }
//     private onClick = () => {
//     }
//     private onClickB = () => {
//         (this.refs['test'] as ModifyGradeModal).setVisible(true, 'test', grades);

//     }
//     private onClickC = (a, b) => {
//         console.log(a['_d']);
//         console.log(b);
//     }
//     private onChange = (event) => {
//         console.log(event.currentTarget.value);
//         this.text = event.currentTarget.value;
//         this.forceUpdate();
//     }

// }

//let ddd = {userId: "1", token: "test", roomId: 0, props: [{stdId: 0, col: 1, row: 1}]};
let ddd = {token: "test", "roomId":0,"props":[{"id":2,"index":1,"stdId":2,"row":1,"col":2}]};
let data = JSON.stringify(ddd);
let url = 'https://116.62.137.199/jd_app/student/sign_in';
$.post(url, data, undefined);




export class App {
    run() {
        ReactDOM.render(<div>
            <EducationRouter />
        </div>,
            document.getElementById('root'));
    }
}
