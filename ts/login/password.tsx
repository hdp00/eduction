//by hdp 2017.08.11
//密码修改

import * as  React from 'react';
import { Icon, Input, Button } from 'antd';
import { Tool, SendType } from '../data/tool'
import '../css/login.css';

class LoginForm extends React.Component<any, any> {
    private comment: string = '';

    render() {
        return <div>
            <div>
                <label>旧密码</label>
                <input type='password' id='old' />
            </div>
            <div>
                <label>新密码</label>
                <input type='password' id='new' />
            </div>
            <div>
                <label>重复新密码</label>
                <input type='password' id='newRepeat' />
            </div>
            <div>{this.comment}</div>
            <Button onClick={this.onClick} type='primary' >修改密码</Button>
        </div>;
    }

    private onClick = (e) => {
        this.comment = '';

        const old = $('old').val;
        const newP = $('new').val;
        const newRepeat = $('newRepeat').val;

        const valid = (old.length === 0 || newP.length === 0 || newRepeat.length === 0)
            || (newP !== newRepeat);
        if (valid)
            Tool.back.sendData();
            
        else
            this.comment = '无效数据'


        this.forceUpdate();
    }
    private receiveData = (data:object, code:number) => {
    this.comment = '密码错误';

    if ()

    }
}



