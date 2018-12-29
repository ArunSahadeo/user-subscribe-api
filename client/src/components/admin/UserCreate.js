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


class UserCreate extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isOpen: false,
            errors: [],
            visible: true,
            firstName: '',
            lastName: '',
            email: '',
            optIn: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const self = this;

        const params = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            opt_in: this.state.optIn
        };

        const request = fetch('/api/user/create', {
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
                    if (response.status === 201) {
                        localStorage.setItem('user-created', true);
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
        const { firstName, lastName, email, userModified, errors } = this.state;

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
                            Create user
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
                                            required
                                            value={firstName}
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
                                            required
                                            placeholder="Please enter a last name."
                                            value={lastName}
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
                                            required
                                            placeholder="Please enter an email."
                                            value={email}
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

export default UserCreate;
