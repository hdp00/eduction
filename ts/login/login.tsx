//by hdp 2017.05.25
//登录页面

import * as  React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../css/login.css';
const FormItem = Form.Item;

class LoginForm extends React.Component<any, any> {
    private comment: string = '';

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form ref='form' onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
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
                this.onError({comment:'error'});
            }
        });
    }

    private onSuccess(){
        this.props.form.resetFields();
        //this.props.history.replace('/select');
    }
    private onError(response){
        this.comment = response.comment;
        this.forceUpdate();  
    }
}

export const Login = Form.create()(LoginForm);

