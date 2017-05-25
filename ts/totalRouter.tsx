//by hdp 2017.05.25
//路由组件

import * as  React from 'react';
import {
    BrowserRouter as Router,
    Route, RouteProps, Link, Redirect,

} from 'react-router-dom'

class LoginSign {
    private _isLogin: boolean = false;

    get isLogin() {
        return this._isLogin;
    }

    login = () => {
        this._isLogin = true;
    }
    logout = () => {
        this._isLogin = false;
    }
}
const loginSign = new LoginSign();


class Navigation extends React.Component<any, any>{

    constructor(props:any){
        super(props);

        this.props.history.listen(this.onListen);
    }


    render(){
        return <div>navigation
            <button onClick={this.onStudent} >student</button>
            <button>homework</button>
        </div>;
    }

    private onStudent = () =>{
        console.log(this.props.history.push('/classroom/student'));
    }
    private onListen(location: Location){
        console.log(location.pathname);
    }
}


class Login extends React.Component<any, any>{
    render() {
        if (loginSign.isLogin)
        {
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
}

//登录路由
class PrivateRoute extends Route {
    render() {
        const { component, ...rest } = this.props;

        if (loginSign.isLogin)
            return <Route {...this.props} />;
        return <Route {...rest} render={
            () => <Redirect to='/login' />} />;
    }
}

class Select extends React.Component<any, any>{
    render() {
        return <div>select</div>;
    }
}

const Seat = () => (
    <div>seat</div>
)
const Student = () => (
    <div>student</div>
)
const Homework = () => (
    <div>homework</div>
)

const Check = () => (
    <div>check</div>
)

export class TotalRouter extends React.Component<any, any>{
    render() {
        return <Router>
            <div>
                <button onClick={this.clickHandle}>aaa</button>
                <ul>
                    <li><Link to='/classroom'>classroom</Link></li>
                    <li><Link to='/classroom/student'>student</Link></li>
                    <li><Link to='/classroom/homework'>homework</Link></li>
                    <li><Link to='/check'>check</Link></li>
                </ul>
                <hr />
                <Route component={Navigation} />

                <Route exact path='/' render={
                    () => <Redirect to='/select' />} />
                <Route path='/login' component={Login} />
                <PrivateRoute path='/select' component={Select} />

                <PrivateRoute exact path='/classroom' render={
                    () => <Redirect to='/classroom/seat' />} />
                <PrivateRoute path='/classroom/seat' component={Seat} />
                <PrivateRoute path='/classroom/student' component={Student} />
                <PrivateRoute path='/classroom/homework' component={Homework} />

                <PrivateRoute path='/check' component={Check} />
            </div>
        </Router>
    }

    private clickHandle = () => {
    }
}

