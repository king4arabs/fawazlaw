// routes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// GET /articles - Fetch all articles
router.get('/', articleController.index);

// POST /articles - Create a new article
router.post('/', articleController.store);

// GET /articles/:id - Fetch a single article by ID
router.get('/:id', articleController.show);

// PUT /articles/:id - Update an existing article by ID
router.put('/:id', articleController.update);

router.delete('/:id', articleController.destroy);

module.exports = router;
