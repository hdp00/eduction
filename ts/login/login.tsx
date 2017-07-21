//by hdp 2017.05.25
//登录页面

import * as  React from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Tool, SendType } from '../data/tool'
import '../css/login.css';

const FormItem = Form.Item;
const Tr = Tool.router;

class LoginForm extends React.Component<any, any> {
    private comment: string = '';

    render() {
        console.log('login');

        if (Tool.user.loggedin)
            return <Redirect to={Tr.select} />;

        const { getFieldDecorator } = this.props.form;
        return (<Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名' }],
                })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                    )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
            </FormItem>
            <FormItem>
                <label>{this.comment}</label>
            </FormItem>

            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                    </Button>
            </FormItem>
        </Form>
        );
    }

    private handleSubmit = (e) => {
        e.preventDefault();
        this.comment = '';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Tool.back.sendData(SendType.Login, values, this.onLogin);
            }
        });
    }

    private onLogin = (data: any) => {
        if (true) {
            this.props.form.resetFields();
            this.props.history.replace(Tr.select);
        } else {
            this.comment = data.comment;
            this.forceUpdate();
        }
    }
}

export const Login = Form.create()(LoginForm);

