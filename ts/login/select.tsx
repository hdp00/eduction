//by hdp 2017.05.26
//用户选择页面

import * as  React from 'react'
import { Button } from 'antd'
import { UserType } from '../define'
import { Tool } from '../tool/tool'
import { Redirect } from 'react-router-dom'

const Tr = Tool.router;

export class Select extends React.Component<any, any>{
    render() {
        let currentRole = Tool.user.currentRole;
        let roles = Tool.user.roles;

        switch (currentRole) {
            case UserType.Teacher:
                return <Redirect to={Tr.classroom} />;
            case UserType.Checker:
                return <Redirect to={Tr.check} />
            case UserType.None:
            default:
                //需要和Usertype同步
                const texts = ['', '试卷批改', '教师', '后台管理'];
                const props = {
                    style: {
                        width: '200px',
                        height: '50px',
                        margin: '20px auto',
                    },
                    onClick: this.onClick,
                };
                let items = [];

                for (let r of roles) {
                    items.push(<Button key={texts[r]} type='primary' data-role={r} {...props}>{texts[r]}</Button>);
                    items.push(<br key={texts[r] + 'br'} />);
                }

                return <div style={{ textAlign: 'center' }}>{items}</div>;
        }
    }

    private onClick = (event) => {
        Tool.user.currentRole = parseInt(event.currentTarget.dataset.role);
        this.forceUpdate();
    }
}

