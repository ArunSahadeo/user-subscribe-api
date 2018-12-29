import React, { Component } from 'react';
import '../custom.scss';
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Row
} from 'reactstrap';


class Home extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    componentDidMount() {
        document.body.classList.toggle('bg-dark')
    }

    componentWillUnmount() {
        document.body.classList.toggle('bg-dark')
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
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

                <section className="padding-top-50">
                    <Container>
                        <h1 className="text-white">
                            About
                        </h1>

                        <p className="text-white">
                            This is a basic example of a user CRUD API I have built in React with a Node backend for a technical test.
                        </p>

                        <h2 className="text-white h1">
                            This tool is expected to do the following:
                        </h2>

                        <Card className="margin-bottom-20">
                            <CardBody>
                                <ul className="margin-bottom-0">
                                    <li>
                                        Allow an authenticated user to view, add, edit and remove subscribers.
                                    </li>

                                    <li>
                                        Allow an authenticated user to access protected routes.
                                    </li>

                                    <li>
                                        Allow anyone, including non authenticated users, to subscribe to a list via a subscription form.
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>

                        <h2 className="text-white h1">
                            What should I do next?
                        </h2>

                        <Card className="margin-bottom-20">
                            <CardBody>
                                <ul className="margin-bottom-0">
                                    <li>
                                        Add yourself as a subscriber via the <a href="/subscribe-form">public subscription form</a>. 
                                    </li>

                                    <li>
                                        Authenticate yourself using the <a href="/login">Login</a> route so that you can access all routes, including protected ones.
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Container>
                </section>
            </React.Fragment>
        )
    }
}

export default Home;
