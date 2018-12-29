import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../custom.scss';
import {
    Alert,
    Button,
    Col,
    Collapse,
    Container,
    Input,
    Form,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Row,
    Table
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

library.add([
    faEdit,
    faTrash
]);

class UserList extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

        this.state = {
            isOpen: false,
            loading: false,
            visible: true,
            users: [],
            errors: [],
            userDeleted: false,
            userCreated: false,
            userModified: false
        };
    }

    onDismiss() {
        this.setState({
            visible: false
        });
    }

    componentDidMount() {
        document.body.classList.toggle('bg-dark');
        const self = this;

        this.setState({
            loading: true
        });

        if (localStorage.getItem('errors')) {
           let errors = JSON.parse(localStorage.getItem('errors')); 

            this.setState({
                errors: errors
            });

            localStorage.removeItem('errors');
        }

        if (localStorage.getItem('user-created')) {
            this.setState({
                userCreated: true
            });

            localStorage.removeItem('user-created');
        }

        if (localStorage.getItem('user-modified')) {
            this.setState({
                userModified: true
            });

            localStorage.removeItem('user-modified');
        }

        if (localStorage.getItem('user-deleted')) {
            this.setState({
                userDeleted: true
            });

            localStorage.removeItem('user-deleted');
        }

        fetch('/api/users')
            .then((resp) => {
                return resp.json();
            
            })
            .then(function (data) {
                return JSON.stringify(data);
            })
            .then(function (json) {
                self.setState({
                    users: JSON.parse(json),
                    loading: false
                });
            })
        ;

    }

    componentWillUnmount() {
        document.body.classList.toggle('bg-dark');
    }

    shouldComponentUpdate() {
        return true;
    }

    confirmDelete (e) {
        if (!window.confirm('Are you sure you wish to delete this user?')) {
            e.preventDefault();
        }
    }

    handleDelete (e) {
        e.preventDefault();

        const apiRoute = e.target.action;
        const self = this;

        fetch(apiRoute)
            .then( function(response) {
                return response.json();
            })
            .then( function(json) {
                return JSON.stringify(json);
            })
            .then( function(data) {
                const body = JSON.parse(data);
                const isSuccess = body.hasOwnProperty('success');

                if (isSuccess) {
                    localStorage.setItem('user-deleted', true);
                    window.location.reload(true);
                }
            })
        ;
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { users, loading, errors, userDeleted, userCreated, userModified } = this.state;

        if (loading) {
            return (
                <p>
                    Loading...
                </p>
            )
        }

        return (
            <React.Fragment>
                <Navbar color="light" light>
                    <NavbarBrand href="/">
                        User Subscribe API
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    href="/admin/dashboard"
                                >
                                    Dashboard
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

                <section className="padding-top-50">
                    <Container>
                        <h1 className="text-white margin-bottom-20">
                            Users
                        </h1>

                        { Object.keys(errors).length > 0 && 
                            <Alert color="danger" isOpen={this.state.visible} fade={true} toggle={this.onDismiss} className="margin-bottom-20">
                                <p className="margin-bottom-0">
                                    The specified user does not exist.
                                </p>
                            </Alert> 
                        }

                        { userDeleted && 
                            <Alert color="success" isOpen={this.state.visible} fade={true} toggle={this.onDismiss} className="margin-bottom-20">
                                <p className="margin-bottom-0">
                                    The specified user has been deleted.
                                </p>
                            </Alert> 
                        }

                        { userModified && 
                            <Alert color="success" isOpen={this.state.visible} fade={true} toggle={this.onDismiss} className="margin-bottom-20">
                                <p className="margin-bottom-0">
                                    The specified user has been modified.
                                </p>
                            </Alert> 
                        }

                        { userCreated && 
                            <Alert color="success" isOpen={this.state.visible} fade={true} toggle={this.onDismiss} className="margin-bottom-20">
                                <p className="margin-bottom-0">
                                    A new user has been created.
                                </p>
                            </Alert> 
                        }

                        <Table dark>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>

                                    <th>
                                        First Name
                                    </th>

                                    <th>
                                        Last Name
                                    </th>

                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => { 

                                        return (
                                            <tr>
                                                <td>
                                                    { user.id }
                                                </td>
                                                <td>
                                                    { user.first_name }
                                                </td>
                                                <td>
                                                    { user.last_name }
                                                </td>
                                                <td>
                                                    <ul className="no-list-style list-inline">
                                                        <li>
                                                            <Link to={'/admin/user/' + user.id + '/edit'}>
                                                                <FontAwesomeIcon icon="edit" />
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Form onSubmit={(e) => {this.handleDelete(e)}} action={`/api/user/${user.id}/delete`}>
                                                                <Button type="submit" className="bg-transparent border-0" onClick={(e) => {this.confirmDelete(e)}}>
                                                                    <FontAwesomeIcon icon="trash" />
                                                                </Button>
                                                            </Form>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>

                        <small class="small text-white margin-top-20">
                            <Link to="/admin/user/create">
                                Add a new user
                            </Link>
                        </small>
                    </Container>
                </section>

            </React.Fragment>
        )
    }
}

export default UserList;
