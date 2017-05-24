import * as  React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Login = () => (
    <div>Login</div>
)

const Header = () => (
    <div>Header</div>
)

export class TotalRouter extends React.Component<any, any>{
    render() {
        return <Router>
                <hr />
                <Route exact path="/" component={Login} />
                <Route path="/about" component={Header} />
        </Router>
    }
}

