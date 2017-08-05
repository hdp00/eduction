//by hdp 2017.05.25
//登录页面

import * as  React from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd';
import { Tool, SendType } from '../data/tool'
import '../css/login.css';

const FormItem = Form.Item;
const Tr = Tool.data.router;
const User = Tool.data.user;

class LoginForm extends React.Component<any, any> {
    private comment: string = '';

    render() {
        if (User.hasLogin)
            return <Redirect to={Tool.data.getRoleDefaultUrl()} />;

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
    componentDidMount() {
        this.checkLogin();
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
        if (Tool.data.isValidData(data)) {
            User.login(data['data']);
            this.props.form.resetFields();
            this.props.history.replace(Tool.data.getRoleDefaultUrl());
        }
        // else {
        //     this.comment = data.comment;
        //     this.forceUpdate();
        // }
    }

    //检查是否已登录
    private checkLogin = () => {
        if (User.hasLogin)
            this.props.history.push(Tool.data.getRoleDefaultUrl());
    }
}

export const Login = Form.create()(LoginForm);

