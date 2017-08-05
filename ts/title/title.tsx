//by hdp 2017.06.02
//标题页面

import * as React from 'react'
import {
    BrowserRouter as Router,
    Route, RouteProps, Link, Redirect,
} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { Tool, UserType, SendType } from '../data/tool'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Item = Menu.Item;
const Tr = Tool.data.router;
const User = Tool.data.user;

export class Title extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.props.history.listen(this.onHistoryChanged);
    }

    render() {
        //多用户
        let roleSwitch;
        let roleItems = [];
        if (User.roles.length > 1) {
            let roleComponents = [];
            roleComponents[UserType.Teacher] = <Menu.Item key='teacher'>教师</Menu.Item>;
            roleComponents[UserType.Checker] = <Menu.Item key='checker'>批卷老师</Menu.Item>

            for (let role of User.roles) {
                roleItems.push(roleComponents[role])
            }

            roleSwitch = <MenuItemGroup title='用户切换'>
                {roleItems}
            </MenuItemGroup>;
        }

        let userMenu;
        if (User.hasLogin) {
            userMenu = <SubMenu key='user' title={<span><Icon type='user' />用户</span>}>
                {roleSwitch}
                <Item key='password'><Link to={Tr.password}><Icon type='setting' />修改密码</Link></Item>
                <Item key='logout'><Icon type='poweroff' />退出</Item>
            </SubMenu>;
        }

        let defaultSelectedKeys = [];
        let items = [];

        switch (User.currentRole) {
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

                defaultSelectedKeys = ['seat'];
                break;
            case UserType.Checker:
                items.push(<Item key='check'>
                    <Link to={Tr.check}><Icon type='check-square-o' />批改</Link>
                </Item>);
                defaultSelectedKeys = ['check'];
                break;
            default:
                break;
        }
        items.push(userMenu);

        return <div>
            <label style={{ fontSize: '28px', float: 'left' }}>君德教育</label>
            <Menu onClick={this.onClick} mode='horizontal' style={{ float: 'left' }} defaultSelectedKeys={defaultSelectedKeys} >
                {items}
            </Menu>
            <div style={{ clear: 'both' }} />
        </div>;
    }

    private onClick = ({ item, key, keyPath }) => {
        switch (key) {
            case 'logout':
                this.logout();
                break;
            case 'teacher':
                this.switchRole(UserType.Teacher);
                break;
            case 'checker':
                this.switchRole(UserType.Teacher);
                break;
            default:
                break;
        }
    }

    private onHistoryChanged = (location, action) => {
        this.forceUpdate();
    }

    //退出登录
    public logout = () => {
        Tool.back.sendData(SendType.Logout, {}, this.onLogout);
    }
    private onLogout = (response: any) => {
        User.logout();
        this.props.history.push(Tr.login);
    }
    private switchRole = (type: UserType) => {
        User.currentRole = type;

        switch (type) {
            case UserType.Teacher:
                this.props.history.push(Tr.classroom);
                break;
            case UserType.Checker:
                this.props.history.push(Tr.check);
                break;
        }

    }


}




