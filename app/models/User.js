const db = require('../database');

class User {

    constructor(obj={}) {
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }

    static async findAll() {
      try {
        const { rows } = await db.query('SELECT * FROM "user"');
        if (rows) return rows.map((row) => new User(row));
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
        const { rows } = await db.query('SELECT * FROM "user" where id=$1', [
          id,
        ]);
        if (rows[0]) {
          return new User(rows[0]);
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
          'INSERT INTO "user"(firstname, lastname, birth_date) VALUES($1, $2, $3) RETURNING id',
          [this.firstname, this.lastname, this.date]
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
          'UPDATE "user" SET firstname = $1, lastname = $2, birth_date = $3 WHERE id = $4',
          [this.firstname, this.lastname, this.birth_date, this.id]
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

    

    // static async findAllPerCategory(categoryId) {
    //   try {
    //       const { rows } = await db.query('SELECT * FROM project where category_id=$1', [
    //         categoryId,
    //       ]);
    //       if (rows) {
    //         return rows.map((row) => new Project(row));;
    //       }
    //       return null;
    //   } catch (error) {
    //       console.log(error);
    //       if (error.detail) {
    //         throw new Error(error.detail);
    //       }
    //       throw error;
    //   }
    // }

    // static async findOneBySlug(projectSlug) {
    //   try {
    //       const { rows } = await db.query('SELECT * FROM project where slug=$1', [
    //         projectSlug,
    //       ]);
    //       if (rows[0]) {
    //         return new Project(rows[0]);
    //       }
    //       return null;
    //   } catch (error) {
    //       console.log(error);
    //       if (error.detail) {
    //         throw new Error(error.detail);
    //       }
    //       throw error;
    //   }
    // }

    
}

module.exports = User;