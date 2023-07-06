const db = require('../database');

class Computer {

    constructor(obj={}) {
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }

    static async findAll() {
      try {
        const { rows } = await db.query('SELECT computer.id, computer.name, computer.cpu, computer.gpu, computer.ram, "user".firstname AS attribued_to FROM computer LEFT JOIN "user" ON computer.attribued_to = "user".id');
        console.log(rows)
        if (rows) return rows.map((row) => new Computer(row));
        return null;
      } catch (error) {
        console.log(error);
        if (error.detail) {
          throw new Error(error.detail);
        }
        throw error;
      }
    }

    static async findOne(id) {
      try {
        const { rows } = await db.query('SELECT * FROM computer where id=$1', [
          id,
        ]);
        if (rows[0]) {
          return new Computer(rows[0]);
        }
        return null;
      } catch (error) {
        console.log(error);
        if (error.detail) {
          throw new Error(error.detail);
        }
        throw error;
      }
    }

    async create() {
      try {
        const { rows } = await db.query(
          'INSERT INTO "computer"(name, cpu, gpu, ram, attribued_to) VALUES($1, $2, $3, $4, $5) RETURNING id',
          [this.name, this.cpu, this.gpu, this.ram, this.attribued_to]
        );
        this.id = rows[0].id;
        return this;
      } catch (error) {
        console.log(error);
        if (error.detail) {
          throw new Error(error.detail);
        }
        throw error;
      }
    }

    async edit() {
      try {
        await db.query(
          'UPDATE "project" SET name = $1, cpu = $2, gpu = $3, ram = $4, attribued_to = $5 WHERE id = $6',
          [this.name, this.cpu, this.gpu, this.ram, this.attribued_to, this.id]
        );
        return;
      } catch (error) {
        console.log(error);
        if (error.detail) {
          throw new Error(error.detail);
        }
        throw error;
      }
    }

    async delete() {
      try {
        await db.query(
          'DELETE FROM "computer" WHERE id = $1',
          [this.id]
        );
        return;
      } catch (error) {
        console.log(error);
        if (error.detail) {
          throw new Error(error.detail);
        }
        throw error;
      }
    }


}

module.exports = Computer;