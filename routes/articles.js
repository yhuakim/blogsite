const express = require('express');
const Article = require('./../models/article');
const article = require('./../models/article');
const router = express.Router();

router.get('/new2', (req, res) => {
    res.render('articles/new2', {
        article: new Article()
    });
})

router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            markdown
        } = req.body;

        let article = new Article({
            title,
            description,
            markdown
        })

        await article.save();

        res.redirect('/')

    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);
        res.render('articles/show', {
            article
        })
    } catch (error) {
        console.error(error);
        res.redirect('/')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);

        if (!article) {
            res.status(404).send('Not Found')
            res.redirect('/')
        }

        res.render('articles/edit', {
            article
        })

    } catch (error) {
        console.error(error);

    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        req.article = await Article.findById(req.params.id)
        next();


    } catch (error) {
        console.error(error);
    }

}, saveArticleAndRedirect('edit'))

router.delete('/delete/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        await article.remove();
        res.redirect('/')

    } catch (error) {
        console.error(error);
    }
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown

        try {
            article = await article.save()
            res.redirect(`/articles/:${article.id}`);
        } catch (error) {
            console.error(error);
            res.render(`articles/${path}`, {
                article: article
            })
        }
    }
}

module.exports = router;