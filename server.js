if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
const indexRouter = require('./routes');
const methodOverride = require('method-override')

const mongoose = require('mongoose');
mongoose.connect(process.env.LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'))

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: false
}));

app.use(methodOverride('_method'))

/* app.get('/', (req, res) => {
    const articles = [{
            title: 'Test Article',
            createdAt: new Date,
            description: 'Test description'
        },
        {
            title: 'Test Article 2',
            createdAt: new Date,
            description: 'Test description 2'
        }
    ]
    res.render('articles/index', {
        articles: articles
    })
}) */

app.use('/', indexRouter)
app.use('/articles', articleRouter);

app.listen(3000)