import * as  React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Login = () => (
    <div>Login</div>
)

const Title = () => (
    <div>
        <h2>Title</h2>
    </div>
)

class TotalRouter extends React.Component<any, any>{
    render() {
        return <Router>
                <hr />
                <Route exact path="/" component={Login} />
                <Route path="/about" component={Title} />
        </Router>
    }
}

