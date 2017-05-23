import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import * as $ from 'jquery';
import { Button } from 'antd';
import './css/antd.css';
import { imageFalse } from './image';

class TestComponent extends React.Component<any, any>{

    render() {
        let aaa = '';
        const a = { value: 7 }
        const b = {};
        $.extend(b, a);

        return <div>
            <Button type='primary' >test</Button>
            <label>ttt</label>
            <img src={imageFalse} />
        </div>;
    }
}

export class App {
    run() {
        ReactDOM.render(<TestComponent />, document.getElementById('root'));
    }
}




