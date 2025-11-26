var express = require('express');
var session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

var app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(
  session({
    secret: 'MySecretCode',
    saveUninitialized: true,
    resave: true,
  })
);

mongoose.connect('mongodb://localhost:27017/group');

const timeslotSchema = new mongoose.Schema({}, { strict: false });
const Timeslot = mongoose.model('Timeslot', timeslotSchema, 'timeslotDatabase');

const playlistSchema = new mongoose.Schema({}, { strict: false });
const Playlist = mongoose.model('Playlist', playlistSchema, 'playlistDatabase');

const songSchema = new mongoose.Schema({}, { strict: false });
const Song = mongoose.model('Song', songSchema, 'songDatabase');

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.get('/', function (req, res) {
  sessionStorage.clear();
  res.render('pages/index', {});
});

app.get('/dj/home', function (req, res) {
  const welcomeMessage = 'Welcome to the DJ Homepage!';
  res.render('dj-pages/djHome', { welcomeMessage: welcomeMessage });
});

app.get('/dj/playlist', function (req, res) {
  res.render('dj-pages/djPlaylist', {});
});

app.get('/dj/add-song', function (req, res) {
  res.render('dj-pages/djAddSong', {});
});

//API routes
app.get('/api/timeslots', async (req, res) => {
  const timeslot = await Timeslot.find();
  res.json(timeslot);
});

app.get('/api/playlists', async (req, res) => {
  const playlist = await Playlist.find();
  res.json(playlist);
});

app.get('/api/songs', async (req, res) => {
  const song = await Song.find();
  res.json(song);
});

app.get('/api/timeslots/:id', async (req, res) => {
  const timeslot = await Timeslot.findOne(
    { 'timeslot.timeslots.timeslotID': parseInt(req.params.id) },
    { 'timeslot.timeslots.$': 1 }
  );
  res.json(timeslot);
});

app.get('/api/playlists/:id', async (req, res) => {
  const playlist = await Playlist.findOne(
    { 'playlists.playlistID': parseInt(req.params.id) },
    { 'playlists.$': 1 }
  );
  res.json(playlist);
});

app.get('/api/songs/:id', async (req, res) => {
  const song = await Song.findOne(
    { 'Songs.songID': parseInt(req.params.id) },
    { 'Songs.$': 1 }
  );
  res.json(song);
});

app.post('/api/playlists/:id/add-song', async (req, res) => {
  const updated = await Playlist.updateOne(
    { 'playlists.playlistID': parseInt(req.params.id) },
    { $push: { 'playlists.$.playlist': req.body } }
  );

  res.json({ success: true, updated });
});

app.listen(8080);
console.log('Server is listening on port 8080');
