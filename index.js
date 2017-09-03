'use strict';

//Twitter package
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.get('/', (request, response) => {
    response.render('public/index');
});

app.get('/tweets/:screen', (request, response) => {
    T.get('statuses/user_timeline', {
        count: request.query.count,
        'screen_name': request.params.screen
    }, (err, data, res) => {
        response.send(data);
    });
});


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});