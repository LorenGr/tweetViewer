var twitterProxyServer = require('twitter-proxy');
var twitterAPIKeys = require('./config.json');
twitterProxyServer(twitterAPIKeys);

console.log('Server running on http://localhost:8080');
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=appdirect');