import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../custom.scss';
import {
    Alert,
    Button,
    Col,
    Collapse,
    Container,
    CustomInput,
    Form,
    FormGroup,
    Input,
    Label,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Row
} from 'reactstrap';


class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isOpen: false,
            loading: false,
            user: [],
            errors: [],
            userID: this.props.match.params.id,
            visible: true,
            firstName: '',
            lastName: '',
            email: '',
            optIn: false
        };
    }

    onDismiss() {
        this.setState({
            visible: false
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const self = this;

        const userID = this.state.userID;

        const params = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            opt_in: this.state.optIn
        };

        const request = fetch(`/api/user/${userID}/edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        request
            .then(
                function(response) {
                    if (response.status === 200) {
                        localStorage.setItem('user-modified', true);
                        window.location = '/admin/users';
                    } else if (response.status === 404) {

                        const error = {
                            "error": "Route does not exist!"
                        };

                        self.setState({
                            errors: JSON.parse(JSON.stringify(error))
                        });
                    } else {
                        return response.json();
                    }
                }
            )
        ;

        request.catch(function (error) {
            return new Error(error);
        });


    }

    componentDidMount() {
        document.body.classList.toggle('bg-dark');
        const self = this;

        this.setState({
            loading: true
        });

        fetch(`/api/user/${this.state.userID}`)
            .then((resp) => {
                return resp.json();
            
            })
            .then(function (data) {
                return JSON.stringify(data);
            })
            .then(function (json) {
                const userData = JSON.parse(json);

                if (userData['error']) {
                    let errors = [];
                    errors[0] = 'The specified user does not exist';

                    localStorage.setItem('errors', JSON.stringify(errors));
                    self.props.history.push('/admin/users');
                    return;
                }

                self.setState({
                    user: userData,
                    loading: false,
                    optIn: JSON.parse(userData.opt_in),
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    email: userData.email
                });
            })
        ;

    }

    componentWillUnmount() {
        document.body.classList.toggle('bg-dark');
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { loading, firstName, lastName, email, userModified, errors } = this.state;

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
                            Edit user
                        </h1>

                        {Object.keys(errors).length > 0 && 
                            <Alert color="danger" isOpen={this.state.visible} fade={true} toggle={this.onDismiss} className="margin-bottom-20">
                                <ul>
                                {
                                    Object.keys(errors).map((error) => {
                                        const errorMsg = errors[error]
                                        return (
                                        <li>
                                            { errorMsg }
                                        </li>
                                        )
                                    })
                                }
                                </ul>
                            </Alert> 
                        }

                        {userModified && 
                            <Alert color="success" isOpen={this.state.visible} fade={true} toggle={this.onDismiss} className="margin-bottom-20">
                                <p className="margin-bottom-0">
                                    User has been modified.
                                </p>
                            </Alert>
                        }

                        <Form onSubmit={this.handleSubmit} className="form">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>
                                            First Name
                                        </Label>

                                        <Input 
                                            type="text"
                                            name="first_name"
                                            id="firstName"
                                            placeholder="Please enter a first name."
                                            defaultValue={firstName}
                                            onChange={e => this.setState({ firstName: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6">
                                    <FormGroup>
                                        <Label>
                                            Last Name
                                        </Label>

                                        <Input 
                                            type="text"
                                            name="last_name"
                                            id="lastName"
                                            placeholder="Please enter a last name."
                                            defaultValue={lastName}
                                            onChange={e => this.setState({ lastName: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>
                                            Email
                                        </Label>

                                        <Input 
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Please enter an email."
                                            defaultValue={email}
                                            onChange={e => this.setState({ email: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6">
                                    <FormGroup>
                                        <Label
                                            for="optIn"
                                        >
                                            Opt in?
                                        </Label>

                                        <CustomInput 
                                            type="checkbox"
                                            name="opt_in"
                                            id="optIn"
                                            className="height-100-pc bottom-20"
                                            onChange={e => this.setState({ optIn: e.target.checked })}
                                            defaultChecked={this.state.optIn}
                                            defaultValue={this.state.optIn}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4">
                                    <Button
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </section>

            </React.Fragment>
        )
    }
}

export default UserEdit;
