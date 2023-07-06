const Computer = require('../models/Computer');

module.exports = {

  async findAll(request, response) {
    try {
      const computers = await Computer.findAll();
      response.status(201).json(computers);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  async findOne(request, response) {
    try {
      const computer = await Computer.findOne();
      response.status(201).json(computer);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  async create(request, response, next) {
    try {
      const computer = await new Project(request.body).create();
      request.body.newComputer = computer;
      next();
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  async edit(request, response, next) {
    try {
      await new Computer(request.body).edit();
      next();
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },
};