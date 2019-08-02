const fs = require('fs');
const path = require('path');
const db = require('./db/users');

class UsersController {
    constructor() {
    }

    init() {
        this.users = [...db];
    }

    addUser(user) {
        const newUser = {
            id: this.users[this.users.length - 1].id + 1,
            ...user
        };
        this.users.push(newUser);
        this.saveData();
    }

    editUser(user) {
        const index = this.users.findIndex(({id}) => user.id === id);
        this.users[index] = {
            ...user
        };
        this.saveData();
    }

    deleteUser(userLogin) {
        const index = this.users.findIndex((user) => userLogin === user.login);
        this.users.splice(index, 1);
        this.saveData();
    }

    getAllUsers() {
        return this.users;
    }

    getUser(login) {
        return this.users.find((user) => user.login === login);
    }

    saveData() {
        const json = JSON.stringify(this.users);
        fs.writeFile( path.join(__dirname, './db/users.json'), json, 'utf8', (err, res) => {
            if (err) {
                console.log("Error", err);
            }
        })
    }
}

module.exports = {
    UsersController
};
