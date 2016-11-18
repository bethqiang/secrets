const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const morgan = require('morgan');

const models = require('../db/models');

const app = express();

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/secrets', require('./secrets-subrouter'));

app.get('/', function (req, res) {
    res.redirect('/secrets');
});

models.Secret.sync()
    .then(function () {
        return models.Comment.sync();
    })
    .then(function () {
        app.listen(3001, function () {
            console.log('Server listening on 3001!');
        });
    })
    .catch(console.error);

app.use('/', function(err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});
