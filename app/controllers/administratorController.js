const Administrator = require('../models/Administrator');
const jwt = require('../services/jwt');
// const dbCache = require('../services/cache');

module.exports = {
  async subscribe (request, response) {
    try {
      const administrator = await new Administrator(request.body).save();
      const token = jwt.makeToken(administrator.id);
      response.setHeader('Authorization', token);
      response.status(201).json(administrator);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message)
    }
  },

  async login (request, response) {
    try {
      const administrator = await new Administrator(request.body).doLogin();
      const token = jwt.makeToken(administrator.id);
      response.setHeader('Authorization', token);
      response.status(200).json(administrator);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message)
    }
  }
}