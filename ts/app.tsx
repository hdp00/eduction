import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import { Button } from 'antd';
import './css/antd.css';
import { imageFalse } from './image';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// import { Modal, Button, Table, Icon } from 'antd';

// import { IPaper, PaperState } from './define'
// import { CorrectComponent } from './paper/correctCompnent';
// import { PaperListComponent, PaperComponent } from './paper/paperListComponent';
// import { CanvasComponent } from './paper/canvasComponent';
// import * as test from './test'



/*const canvasProps = {
    paper: {
        id: '0',
        corrects: [{
            page: 0,
            x: 100,
            y: 100,
            type: {
                image: './images/true.png',
                text: '正确',
                score: 1,
            }
        }],
        image: './images/0.png',
        text: '试卷',
        state: PaperState.New,
    },

    currentCorrectItem: () => {
        return {
            image: './images/false.png',
            text: 'wrong',
            score: 1,
        }
    },
    onCorrect: (data: IPaper) =>{},
};

ReactDOM.render(<div >
    <CanvasComponent {...canvasProps} />
</div>,
    document.getElementById('root'));*/




/*ReactDOM.render(<div >
    <button style={{width:'100px', height:'100px'}}/>
    <PaperComponent />
</div>,
    document.getElementById('root'));*/



// const correctProps = {
//     items: [{
//         image: './images/true.png',
//         text: 'a'
//     },
//     {
//         image: './images/true.png',
//         text: 'b'
//     },
//     {
//         image: './images/true.png',
//         text: 'c'
//     },
//     {
//         image: './images/false.png',
//         text: 'd'
//     },
//     {
//         image: './images/false.png',
//         text: 'e'
//     }],
//     onChange: (index) => { console.log(index); }
// };

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

class BasicExample extends React.Component<any, any>{
    render() {
        return <Router>
            <div>
                <Link to="/">Home</Link>
                <ul>
                    
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                    <a rel="friend" href="/about">w3c</a>
                </ul>

                <hr />

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </div>
        </Router>
    }
}

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

export class App {
    run() {
        ReactDOM.render(<div>
            <label>long long ago </label>
            <BasicExample />
        </div>,
            document.getElementById('root'));
    }
}






