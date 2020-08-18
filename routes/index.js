const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/', async (req, res) => {
    let article = await Article.find();

    res.render('articles/index', {
        articles: article
    });
})


module.exports = router;