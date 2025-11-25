var express = require('express');
var app = express();
var session = require('express-session');

app.use(express.static('public'));
app.use(session({
  secret: 'MySecretCode',
  saveUninitialized: true,
  resave: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

app.get('/', function (req, res) {
  res.render('pages/index', {});
});

app.get('/dj/home', function (req, res) {
  res.render('dj-pages/djHome', {});
});

app.get('/dj/playlist', function (req, res) {
  res.render('dj-pages/djPlaylist', {});
});

app.get('/dj/add-song', function (req, res) {
  res.render('dj-pages/djAddSong', {});
});

app.listen(8080);
console.log('Server is listening on port 8080');
