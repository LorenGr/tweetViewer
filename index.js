'use strict';

var twitterProxyServer = require('twitter-proxy');
var twitterAPIKeys = require('./config.json');
twitterProxyServer(twitterAPIKeys);

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.get('/', (request, response) => {
    response.render('public/index');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});