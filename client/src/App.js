import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {Home, SubscribeForm, Login, AdminDashboard, UserList, UserCreate, UserEdit, NotFound} from './utilities/RouteComponents';
import logo from './logo.svg';

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
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/subscribe-form" component={SubscribeForm} />
                <PrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <PrivateRoute exact path="/admin/users" component={UserList} />
                <PrivateRoute exact path="/admin/user/:id(\d+)/edit" component={UserEdit} />
                <PrivateRoute exact path="/admin/user/create" component={UserCreate} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
  }
}

export default App;
