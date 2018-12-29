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


class NotFound extends Component {
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

                <section className="position-center">
                    <Container>
                        <h1 className="text-white">
                            Not found
                        </h1>

                        <p className="text-white">
                            We are sorry, but the following page could not be found.
                        </p>

                    </Container>
                </section>
            </React.Fragment>
        )
    }
}

export default NotFound;
