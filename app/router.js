const { Router } = require('express');
const computerController = require('./controllers/computerController');
const administratorController = require('./controllers/administratorController');
const userController = require('./controllers/userController');

const router = Router();

router.get('/computers', computerController.findAll);
router.post('/computers/add', computerController.create);
router.post('/computers/edit', computerController.edit);
router.post('/computers/delete', computerController.delete);

router.get('/users', userController.findAll);
router.post('/users/add', userController.create);
router.post('/users/edit', userController.edit);
router.post('/users/delete', userController.delete);

router.post('/administrator/subscribe', administratorController.subscribe);
router.post('/administrator/login', administratorController.login);

module.exports = router;