const User = require('../models/User');

module.exports = {

  async findAll(request, response) {
    try {
      const users = await User.findAll();
      response.status(201).json(users);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  async findOne(request, response) {
    try {
      const user = await User.findOne();
      response.status(201).json(user);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  async create(request, response, next) {
    try {
      const user = await new User(request.body).create();
      request.body.newUser = user;
      next();
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  async edit(request, response, next) {
    try {
      await new User(request.body).edit();
      next();
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  // async findAllPerCategory(request, response) {
  //   try {
  //     const allProjectsPerCategory = await Project.findAllPerCategory(Number(request.params.categoryId));
  //     response.status(201).json(allProjectsPerCategory);
  //   } catch (error) {
  //     console.log(error);
  //     response.status(500).json(error.message);
  //   }
  // },

  // async findOneBySlug(request, response) {
  //   try {
  //     const project = await Project.findOneBySlug((request.params.slug));
  //     response.status(201).json(project);
  //   } catch (error) {
  //     console.log(error);
  //     response.status(500).json(error.message);
  //   }
  // },

  
};