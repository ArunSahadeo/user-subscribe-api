import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Home, Login, AdminDashboard, UserList, UserCreate, UserEdit} from './utilities/RouteComponents';
import logo from './logo.svg';
import './App.css';

const isAuthenticated = localStorage.getItem('user-authenticated') || false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
        isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/login' />
  )} />
)

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <PrivateRoute exact path="/admin/users" component={UserList} />
                <PrivateRoute exact path="/admin/user/:id(\d+)/edit" component={UserEdit} />
                <PrivateRoute exact path="/admin/user/create" component={UserCreate} />
            </div>
        </Router>
    );
  }
}

export default App;
