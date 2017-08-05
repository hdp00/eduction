//by hdp 2017.05.25
//路由组件

import * as  React from 'react';
import {
    BrowserRouter as Router,
    Route, RouteProps, Link, Redirect,

} from 'react-router-dom'
import { Tool } from './data/tool'
import { Title } from './title/title'
import { Check } from './check/check'
import { Login } from './login/login'
import { Seat } from './seat/seat'
import { Student } from './student/student'
import { Homework } from './homework/homework'

const Tr = Tool.data.router;

//登录路由
class PrivateRoute extends Route {
    render() {
        const { component, ...rest } = this.props;

        if (Tool.data.user.hasLogin)
            return <Route {...this.props} />;
        return <Route {...rest} render={
            () => <Redirect to={Tr.login} />} />;
    }
}


export class EducationRouter extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Router>
            <div>
                <Route component={Title} />

                <Route exact path={Tr.root} render={
                    () => <Redirect to={Tr.login} />} />
                 <Route path={Tr.login} component={Login} /> 

                <PrivateRoute exact path={Tr.classroom} render={
                    () => <Redirect to={Tr.seat} />} />
                <PrivateRoute path={Tr.seat} component={Seat} />
                <PrivateRoute path={Tr.student} component={Student} />
                <PrivateRoute path={Tr.homework} component={Homework} />

                <PrivateRoute path={Tr.check} component={Check} />
            </div>
        </Router>
    }
}

