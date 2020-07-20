const express = require('express');
const router = express.Router();
const blogController = require('../app/api/controllers/blogs');
router.get('/', blogController.getAll);
router.post('/', blogController.create);
router.get('/:blogId', blogController.getById);
router.put('/:blogId', blogController.updateById);
router.delete('/:blogId', blogController.deleteById);
module.exports = router;