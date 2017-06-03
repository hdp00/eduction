//by hdp 2017.06.02
//标题页面

import * as React from 'react'
import {
    BrowserRouter as Router,
    Route, RouteProps, Link, Redirect,
} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { Tool } from '../tool'
import { UserType } from '../define'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Item = Menu.Item;
const Tr = Tool.router;

export class Title extends React.Component<any, any>{

    render() {
        const user = <SubMenu title={<span><Icon type='user' />用户</span>}>
            <Item><Link to={Tr.password}><Icon type='setting' />修改密码</Link></Item>
            <Item><Link to={Tr.logout}><Icon type='poweroff' />退出</Link></Item>
        </SubMenu>;

        let defaultSelectedKeys = [];
        let items = [];
        switch (Tool.user.role) {
            case UserType.Teacher:
                items.push(<Item key='seat'>
                    <Link to={Tr.seat}><Icon type='team' />座位表</Link>
                </Item>);
                items.push(<Item key='statistics'>
                    <Link to={Tr.statistics}><Icon type='bars' />学生统计</Link>
                </Item>);
                items.push(<Item key='homework'>
                    <Link to={Tr.homework}><Icon type='book' />作业录入</Link>
                </Item>);
                items.push(user);
                defaultSelectedKeys = ['seat'];
                break;
            case UserType.Checker:
                items.push(<Item key='check'>
                    <Link to={Tr.check}><Icon type='question-circle-o' />批改</Link>
                </Item>);
                items.push(user);
                defaultSelectedKeys = ['check'];
                break;
            case UserType.None:
            default:
                break;
        }

        return <div>
            <label style={{ float: 'left' }}>君德教育</label>
            <Router>
                <Menu mode='horizontal' style={{ float: 'left' }} defaultSelectedKeys={defaultSelectedKeys} >
                    {items}
                </Menu>
            </Router>
            <div style={{ clear: 'both' }} />
        </div>;
    }
}




