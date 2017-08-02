//by hdp 2017.06.02
//标题页面

import * as React from 'react'
import {
    BrowserRouter as Router,
    Route, RouteProps, Link, Redirect,
} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { Tool, Type.SendType } from '../data/tool'
import { UserType } from '../data/define'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Item = Menu.Item;
const Tr = Tool.router;

export class Title extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

        Tool.component.title = this;
        this.props.history.listen(this.onHistoryChanged);
    }

    render() {
        const user = <SubMenu key='user' title={<span><Icon type='user' />用户</span>}>
            <Item key='password'><Link to={Tr.password}><Icon type='setting' />修改密码</Link></Item>
            <Item key='logout'><Icon type='poweroff' />退出</Item>
        </SubMenu>;

        let defaultSelectedKeys = [];
        let items = [];

        switch (Tool.user.currentRole) {
            case UserType.Teacher:
                items.push(<Item key='seat'>
                    <Link to={Tr.seat}><Icon type='team' />座位表</Link>
                </Item>);
                items.push(<Item key='student'>
                    <Link to={Tr.student}><Icon type='bars' />学生统计</Link>
                </Item>);
                items.push(<Item key='homework'>
                    <Link to={Tr.homework}><Icon type='book' />作业录入</Link>
                </Item>);
                items.push(user);
                defaultSelectedKeys = ['seat'];
                break;
            case UserType.Checker:
                items.push(<Item key='check'>
                    <Link to={Tr.check}><Icon type='check-square-o' />批改</Link>
                </Item>);
                items.push(user);
                defaultSelectedKeys = ['check'];
                break;
            default:
                break;
        }

        return <div>
            <label style={{ float: 'left' }}>君德教育</label>
            <Menu onClick={this.onClick} mode='horizontal' style={{ float: 'left' }} defaultSelectedKeys={defaultSelectedKeys} >
                {items}
            </Menu>
            <div style={{ clear: 'both' }} />
        </div>;
    }
    componentDidMount() {
        this.checkLogin();
    }

    //退出登录
    public logout = () => {
        Tool.back.post(Tr.logout, {}, this.onLogout);
        Tool.back.sendData(Type.SendType.Logout, {}, this.onLogout);
    }
    private onLogout = (response: any) => {
        this.props.history.push(Tr.login);
    }
    //检查是否已登录
    private checkLogin = () => {
        if(Tool.user.loggedin)
            this.props.history.push(Tr.select);
    }

    private onClick = ({ item, key, keyPath }) => {
        if (key === 'logout')
            this.logout();
    }
    private onHistoryChanged = (location, action) => {
        this.forceUpdate();
    }
}




