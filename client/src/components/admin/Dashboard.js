import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../custom.scss';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardTitle,
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
    NavLink,
    Row
} from 'reactstrap';


class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

        this.state = {
            isOpen: false,
            loggedIn: false,
            visible: true,
            username: '',
            datetime: ''
        };
    }

    onDismiss() {
        this.setState({
            visible: false
        });
    }

    componentDidMount() {
        document.body.classList.toggle('bg-dark');

        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        const currentDate = new Date();
        const day = days[currentDate.getDay()];
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        const date = currentDate.getDate();

        const fullDate = (day + ' ' + date + ' ' + month + ' ' + year + ' @ ' + hours + ':' + minutes + ' ' + (hours < 12 ? 'AM' : 'PM'));

        this.setState({
            datetime: fullDate
        });

        if (localStorage.getItem('logged-in')) {
            this.setState({
                loggedIn: true
            });
        };
        
        localStorage.removeItem('logged-in');

        if (localStorage.getItem('username')) {
            const username = localStorage.getItem('username');
            this.setState({
                username: username || 'User'
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
                        { this.state.loggedIn && 
                            <Alert color="success" isOpen={this.state.visible} fade={true} toggle={this.onDismiss} className="margin-bottom-20">
                                <p className="margin-bottom-0">
                                    You have logged in!
                                </p>
                            </Alert>
                        }
                        <h1 className="text-white margin-bottom-20">
                            Welcome,  { this.state.username }
                        </h1>

                        <Row>
                            <Col md="4">
                                <Card className="height-100-pc">
                                    <CardTitle className="text-center margin-top-10">
                                        Users
                                    </CardTitle>

                                    <CardBody>
                                        <ul>
                                            <li>
                                                <a href="/admin/users">View all users</a>
                                            </li>

                                            <li>
                                                <a href="/admin/user/create">Add a new user</a>
                                            </li>
                                        </ul>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md="4">
                                <Card className="height-100-pc">
                                    <CardTitle className="text-center margin-top-10">
                                        Date / time
                                    </CardTitle>

                                    <CardBody>
                                        <p>
                                            The date and time is { this.state.datetime }                                            
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md="4">
                                <Card className="height-100-pc">
                                    <CardTitle className="text-center margin-top-10">
                                        Credits
                                    </CardTitle>

                                    <CardBody>
                                        <p>
                                            User Subscribe API was made by Arun Sahadeo, and leverages the following technologies:
                                        </p>

                                        <ul>
                                            <li>
                                                ReactJS
                                            </li>

                                            <li>
                                                NodeJS
                                            </li>

                                            <li>
                                                Bootstrap
                                            </li>
                                        </ul>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

            </React.Fragment>
        )
    }
}

export default AdminDashboard;
