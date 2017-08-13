//by hdp 2017.08.11
//密码修改

import * as $ from 'jquery'
import * as React from 'react';
import { Icon, Input, Button } from 'antd';
import { Tool, SendType } from '../data/tool'
import '../css/education.css'

export class Password extends React.Component<any, any> {
    private comment: string = ' ';

    render() {
        return <div className='total-div' style={{ height: '900px', border: '1px solid rgba(0,255,0,0.03)' }}>
            <div style={{ marginTop: '200px' }}>
                <div style={{ margin: 'auto', width: '300px' }}>
                    <label>旧密码</label>
                    <Input type='password' id='old' />
                    <label>新密码</label>
                    <Input type='password' id='new' />
                    <label>重复新密码</label>
                    <Input type='password' id='newRepeat' />
                    <div style={{ height: '30px' }}>{this.comment}</div>
                    <Button style={{ width: '300px' }} onClick={this.onClick} type='primary' >修改密码</Button>
                </div>
            </div>
        </div>;
    }

    private onClick = (e) => {
        this.comment = ' ';

        const old = $('#old').val();
        const newP = $('#new').val();
        const newRepeat = $('#newRepeat').val();

        const valid = (old.length !== 0 && newP.length !== 0 && newRepeat.length !== 0)
            && (newP === newRepeat);
        if (valid)
            Tool.back.sendData(SendType.Password, { oldPasswd: old, newPasswd: newP }, this.onReceiveData);
        else {
            this.comment = '无效的密码';
            this.forceUpdate();
        }
    }
    private onReceiveData = (data: object, code: number) => {
        if (code === 0)
            alert('密码修改成功');
        else {
            this.comment = '密码错误';
        }

        this.forceUpdate();
    }
}



