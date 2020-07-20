const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/:userId', userController.getById);
router.get('/', userController.getAll);
router.put('/:userId', userController.updateById);
router.delete('/:userId', userController.deleteById);

module.exports = router;