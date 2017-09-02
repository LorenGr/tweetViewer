'use strict';

//Middleware: Allows cross-domain requests (CORS)
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var twitterProxyServer = require('twitter-proxy');
var twitterAPIKeys = require('./config.json');
twitterProxyServer(twitterAPIKeys);

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(allowCrossDomain);
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