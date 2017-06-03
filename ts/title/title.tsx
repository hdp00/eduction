//by hdp 2017.06.02
//标题页面

import * as React from 'react'
import { Menu, Icon } from 'antd'
import { Tool } from '../tool'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


export class Title extends React.Component<any, any>{

    render() {
        return <div>
            <label style={{ float: 'left' }}>君德教育</label>


            <Menu mode="horizontal" style={{ float: 'left' }} >
                <Menu.Item key="seat" >
                    <Icon type="team" />座位图
                </Menu.Item>
                <Menu.Item key="student">
                    <Icon type="database" />学生统计
                </Menu.Item>
                <Menu.Item key="homework">
                    <Icon type="book" />作业录入
                </Menu.Item>

                <SubMenu title={<span><Icon type="setting" />用户</span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>






        </div>;
    }

}




