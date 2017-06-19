//by hdp 2017.05.25
//路由组件

import * as  React from 'react';
import {
    BrowserRouter as Router,
    Route, RouteProps, Link, Redirect,

} from 'react-router-dom'
import { Tool, DataUrl } from './data/tool'
import { Title } from './title/title'
import { Check } from './check/check'
import { Login } from './login/login'
import { Select } from './login/select'
import { Seat, seatComponent } from './seat/seat'

const Tr = Tool.router;




/*class Navigation extends React.Component<any, any>{

    constructor(props: any) {
        super(props);

        this.props.history.listen(this.onListen);
    }


    render() {
        return <div>navigation
            <button onClick={this.onStudent} >student</button>
            <button>homework</button>
        </div>;
    }

    private onStudent = () => {
        console.log(this.props.history.push('/classroom/student'));
    }
    private onListen(location: Location) {
        console.log(location.pathname);
    }
}*/


/*class Login extends React.Component<any, any>{
    render() {
        if (loginSign.isLogin) {
            return (
                <Redirect to='/select' />
            )
        }

        return <div>
            <button onClick={this.onClick}>login</button>
        </div>;
    }

    private onClick = () => {
        loginSign.login();
        this.forceUpdate();
    }
}*/

//登录路由
class PrivateRoute extends Route {
    render() {
        const { component, ...rest } = this.props;

        if (Tool.user.loggedin)
            return <Route {...this.props} />;
        return <Route {...rest} render={
            () => <Redirect to={Tr.login} />} />;
    }
}

// const Seat = () => (
//     <div>seat</div>
// )
const Statistics = () => (
    <div>statistics</div>
)
const Homework = () => (
    <div>homework</div>
)

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
                <PrivateRoute path={Tr.select} component={Select} />

                <PrivateRoute exact path={Tr.classroom} render={
                    () => <Redirect to={Tr.seat} />} />
                <PrivateRoute path={Tr.seat} render={() => seatComponent} />
                <PrivateRoute path={Tr.statistics} component={Statistics} />
                <PrivateRoute path={Tr.homework} component={Homework} />

                <PrivateRoute path={Tr.check} component={Check} />
            </div>
        </Router>
    }

}

