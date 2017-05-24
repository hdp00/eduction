import * as  React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Login = () => (
    <div>Login</div>
)

const Teacher = () => (
    <div>Teacher</div>
)
const Seat = () => (
    <div>Seat</div>
)
const Student = () => (
    <div>Student</div>
)
const Homework = () => (
    <div>Homework</div>
)

export class TotalRouter extends React.Component<any, any>{
    render() {
        return <Router>
            <div>
                <label>aaa</label>
                <hr />
                <Route exact path="/login" component={Login} />
                <Route exact path="/teacher" component={Teacher}>
                    <Route path="/student" component={Student} />
                </Route>
                
                </div>
        </Router>
    }
}

