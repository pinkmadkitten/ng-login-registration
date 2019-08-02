const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { UsersController } = require('./users.controller');

const userCtrl = new UsersController();
userCtrl.init();

router.get('/', (req, res) => {
  const pathToFile  = path.join(__dirname, '../dist/index.html');
  const stream = fs.createReadStream(pathToFile);
  stream.pipe(res);
});
router.post('/login', (req, res) => {
    const { body } = req;
    const user = userCtrl.getUser(body.login);
    const authorized = user ? user.password === body.password : false;
    res.send({ authorized });
});


router.route('/users')
    .get((req, res) => res.json(userCtrl.getAllUsers()))
    .post(function (req, res) {
        const user = req.body;
        if (userCtrl.getUser(user.login)) {
          res.status(405).send({message: "User already exists!"});
        } else {
          userCtrl.addUser(user);
          res.status(200).send({message: "Success!"});
        }
    });

router.param('user_login', function (req, res, next, user_login) {
    // sample user, would actually fetch from DB, etc...
    req.user = userCtrl.getUser(user_login);
    next()
});

router.route('/users/:user_login')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next()
    })
    .get(function (req, res, next) {
        res.json(req.user)
    })
    .put(function (req, res, next) {
        const user = {
            ...req.user,
            ...req.body
        };
        userCtrl.editUser(user);
        res.json(user);
    })
    .post(function (req, res, next) {
        next(new Error('not implemented'))
    })
    .delete(function (req, res, next) {
        userCtrl.deleteUser(req.user.login);
        res.status(200).send({message: "Deleted successfully"});
    });

router.get('*', (req, res) => {
  const pathToFile  = path.join(__dirname, '../dist/index.html');
  const stream = fs.createReadStream(pathToFile);
  stream.pipe(res);
});

module.exports = {
    router
};
