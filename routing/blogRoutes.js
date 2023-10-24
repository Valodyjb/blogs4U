const express = require('express');
const blogController = require('../controllers/blogController')
const eRoutes = express.Router();


eRoutes.get('/create', blogController.blog_create_get)
eRoutes.get('/', blogController.blog_index);
eRoutes.get('/:id', blogController.blog_details);
eRoutes.post('/', blogController.blog_create_post)
eRoutes.delete('/:id', blogController.blog_delete);


module.exports = eRoutes;