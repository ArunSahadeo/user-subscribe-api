const express = require('express');
const url = require('url');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 5000;
const config = require('./config/config.js');
const environment = process.env.NODE == 'production' ? config.production : config.development;
const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const AdminModel = require('./models/admin');
const sequelize = new Sequelize(environment.database, environment.username, environment.password, {
    host: environment.host,
    dialect: environment.dialect,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

/*
    Define model instances
*/

const User = UserModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
    res.type('application/json');

    try {
        User.findAll().then(function (results) {
            res.send(results);            
        });
    } catch (error) {
        res.send({ 'error': error });
    }
});

app.get('/api/superuser', (req, res) => {
    res.type('application/json');

    const query = url.parse(req.url, true).query;

    if (query == undefined || query['username'].length < 1 || query['password'].length < 1) {
        return;
    }

    try {
        const admin = Admin.findOne({
            where: {
                username: query['username'],
            }
        });

        admin.then(function (result) {
            const hash = result['password'];
            bcrypt.compare(query['password'], hash, function (err, resp) {
                res.send(resp ? admin : false);
            });
        });

    } catch (error) {
        res.send({ 'error': error });
    }
});

app.get('/api/user/:userID', function (req, res) {
    res.type('application/json');

    const userID = parseInt(req.params.userID);

    if (!Number.isInteger(userID)) {
        res.send(false);
        return;
    }

    try {
        const user = User.findById(userID);

        user.then(function (result) {
            if (!result) {
                error = {
                    error: 'User does not exist!'
                };

                res.send(JSON.stringify(error));
                return;
            }

            res.send(result);
        });

    } catch (error) {
        res.send({ 'error': error });
    }
    

});

app.post('/api/user/create', function (req, res) {
    res.type('application/json');

    const body = req.body;

    try {
        const user = User.build(body);

        user.save().then(() => {
            if (!user.id) {
                res.status(403);

                res.send({
                    error: 'Could not create user'
                });

                return;
            }

            res.status(201);
            res.send({
                success: 'User created'
            });
        });
    } catch (error) {
        res.send({ 'error': error });
    }
    

});

app.post('/api/user/:userID/edit', function (req, res) {
    res.type('application/json');

    const userID = parseInt(req.params.userID);

    if (!Number.isInteger(userID)) {
        res.status(403);

        res.send({
            error: 'The requested user does not exist!'
        });

        return;
    }

    const body = req.body;

    try {
        const user = User.findById(userID);

        user.then(function (user) {
            if (!user) {
                error = {
                    error: 'User does not exist!'
                };

                res.send(JSON.stringify(error));
                return;
            }

            user.update(body);

            res.send({
                success: 'User modified'
            });

        });

    } catch (error) {
        res.send({ 'error': error });
    }
    

});

app.get('/api/user/:userID/delete', function (req, res) {
    res.type('application/json');

    console.log('PIKA PIKA');

    const userID = parseInt(req.params.userID);

    if (!Number.isInteger(userID)) {
        res.status(400);

        res.send({
            error: 'The requested user does not exist!'
        });
        return;
    }

    const body = req.body;

    try {
        const user = User.findById(userID);

        user.then(function (user) {
            if (!user) {
                error = {
                    error: 'User does not exist!'
                };

                res.send(JSON.stringify(error));
                return;
            }

            user.destroy();

            res.status(202);

            res.send({
                success: 'User deleted'
            });

        });

    } catch (error) {
        res.send({ 'error': error });
    }
    

});

app.listen(port, () => console.log(`Listening on port ${port}`));
