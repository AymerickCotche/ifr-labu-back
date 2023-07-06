const db = require('../database');
const bcrypt = require('bcrypt');

class Administrator {

    constructor(obj={}) {
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }

    async save() {
        try {

            const password = await bcrypt.hash(this.password, 10)
            const {rows} = await db.query('INSERT INTO "administrator"(email, password, firstname, lastname) VALUES($1, $2, $3, $4) RETURNING id', [this.email, password, this.firstname, this.lastname]);
            this.id = rows[0].id;
            this.password = "";
            return this;

        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            }
            throw error
        }
    }

    async doLogin() {
        try {
          console.log(this)
            const {rows} = await db.query('SELECT * FROM "administrator" WHERE email=$1', [this.email]);
            if (!rows[0]) {
                throw new Error('Identification failed');
            }
            const isPwdValid = await bcrypt.compare(this.password, rows[0].password);
            if (!isPwdValid) {
                throw new Error('Identification failed');
            }
            this.id = rows[0].id;
            this.firstname = rows[0].firstname; 
            this.lastname = rows[0].lastname;
            this.password = "";
            return this;

        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            }
            throw error
        }
    }
}

module.exports = Administrator;