import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../custom.scss';
import {
    Button,
    Col,
    Collapse,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import Auth from '../utilities/Auth.js';


class Login extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.auth = new Auth();

        this.state = {
            isOpen: false,
            username: '',
            password: '',
            authenticated: false
        };
    }

    componentDidMount() {
        document.body.classList.toggle('bg-dark');

        if (localStorage.getItem('user-authenticated')) {
            const userAuthenticated = localStorage.getItem('user-authenticated');
            this.setState({
                authenticated: userAuthenticated
            });
        }
    }

    componentWillUnmount() {
        document.body.classList.toggle('bg-dark');
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    verifyLogin(username, password) {
        this.auth.verifyLogin(username, password);
    }

    handleSubmit(event) {
        if (this.state.username && this.state.password) {
            this.verifyLogin(this.state.username, this.state.password);
        }

        event.preventDefault();
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({username: event.target.value})
            break;

            case 'password':
                this.setState({password: event.target.value})
            break;
        }
    }

    render() {
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
                                    href="/login"
                                >
                                    Login
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Container className="text-center position-center">
                    <h1 className="text-white">
                        Login
                    </h1>

                    <Form className="form" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label className="text-white d-block font-size-20">
                                    Username
                                </Label>

                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter username."
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className="text-white d-block font-size-20">
                                    Password
                                </Label>

                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="*************"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup className="margin-top-20">
                                <Button>
                                    Submit
                                </Button>
                            </FormGroup>
                    </Form>
                </Container>
                { this.state.authenticated &&
                    <Redirect to='/admin/dashboard' />
                }
            </React.Fragment>
        )
    }
}

export default Login;
