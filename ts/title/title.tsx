//by hdp 2017.06.02
//标题页面

import * as React from 'react'
import {
    BrowserRouter as Router,
    Route, RouteProps, Link, Redirect,
} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { Tool, SendType, PageType } from '../data/tool'

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
        let defaultSelectedKeys = [];
        let items = [];
        let pageItems = [];
        pageItems[PageType.Classroom] = <Item key={PageType[PageType.Classroom]}>
            <Link to={Tr.seat}><Icon type='team' />座位表</Link>
        </Item>;
        pageItems[PageType.Student] = <Item key={PageType[PageType.Student]}>
            <Link to={Tr.student}><Icon type='bars' />学生统计</Link>
        </Item>;
        pageItems[PageType.Homework] = <Item key={PageType[PageType.Homework]}>
            <Link to={Tr.homework}><Icon type='book' />作业录入</Link>
        </Item>;
        pageItems[PageType.Check] = <Item key={PageType[PageType.Check]}>
            <Link to={Tr.check}><Icon type='check-square-o' />批改</Link>
        </Item>

        for (let page of User.pages) {
            items.push(pageItems[page]);
        }
        
        let userMenu;
        if (User.hasLogin) {
            userMenu = <SubMenu key='user' title={<span><Icon type='user' />用户</span>}>
                <Item key='password'><Link to={Tr.password}><Icon type='setting' />修改密码</Link></Item>
                <Item key='logout'><Icon type='poweroff' />退出</Item>
            </SubMenu>;
        }

        items.push(userMenu);

        defaultSelectedKeys = [PageType[User.pages[0]]];

        return <div style={{ textAlign: 'center' }}>
            <div className='title-total-div'>
                <label style={{ fontSize: '28px', float: 'left' }}>君德教育</label>
                <Menu className='menu-background-color' onClick={this.onClick} mode='horizontal'
                    style={{ float: 'left' }} defaultSelectedKeys={defaultSelectedKeys} >
                    {items}
                </Menu>
                <div style={{ clear: 'both' }} />
            </div>
        </div >;
    }

    private onClick = ({ item, key, keyPath }) => {
        switch (key) {
            case 'logout':
                this.logout();
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
}
