//Fetch the timeslot data from the backend API
async function loadTimeSlotData() {
  const promise = await fetch('/api/timeslots');
  const jsonData = await promise.json();
  console.log(jsonData[0]);

  return jsonData[0];
}

//Fetch the timeslot data from the backend API by ID
async function loadTimeSlotDataByID(id) {
  const promise = await fetch('/api/timeslots');
  const jsonData = await promise.json();

  const timeslot = jsonData[0].timeslot.find(
    (d) => d.date == sessionStorage.getItem('date')
  );

  const data = timeslot.timeslots.find((t) => t.timeslotID == id);

  console.log(data);

  return data;
}
//Fetch the playlist data from the backend API
async function loadPlayListData(id) {
  const promise = await fetch(`/api/playlists/${id}`);
  const jsonData = await promise.json();

  const playlist = jsonData.playlists.find((p) => p.playlistID == id);

  console.log(playlist);

  return playlist;
}

//Fetch the song data from the backend API
async function loadSongData(id) {
  const promise = await fetch(`/api/songs/${id}`);
  const jsonData = await promise.json();

  const songs = jsonData.Songs.find((s) => s.songID == id);

  console.log(songs);

  return songs;
}

//Fetch the entire song database from the backend API
async function loadSongDatabase() {
  const promise = await fetch(`/api/songs`);
  const jsonData = await promise.json();

  console.log(jsonData[0]);

  return jsonData[0];
}

//OLD CODE FOR FETCHING JSON DATA
/*
//Fetch the currently temporary JSON data for timeslots
async function loadTimeSlotData() {
  const promise = await fetch('/data/timeslotData.json');
  const jsonData = await promise.json();
  console.log(jsonData);

  return jsonData;
}

//Fetch the currently temporary JSON data for timeslots
async function loadTimeSlotDataByID(id) {
  const promise = await fetch('/data/timeslotData.json');
  const jsonData = await promise.json();

  const timeslot = jsonData.timeslot.find(
    (d) => d.date == sessionStorage.getItem('date')
  );

  const data = timeslot.timeslots.find((t) => t.timeslotID == id);

  console.log(data);

  return data;
}

//Fetch the currently temporary JSON data for playlists
async function loadPlayListData(id) {
  const promise = await fetch('/data/playlistData.json');
  const jsonData = await promise.json();

  const playlist = jsonData.playlists.find((p) => p.playlistID == id);

  console.log(playlist);

  return playlist;
}

//Fetch the currently temporary JSON data for playlists
async function loadSongData(id) {
  const promise = await fetch('/data/songData.json');
  const jsonData = await promise.json();

  const songs = jsonData.Songs.find((s) => s.songID == id);

  console.log(songs);

  return songs;
}*/

export {
  loadPlayListData,
  loadTimeSlotDataByID,
  loadTimeSlotData,
  loadSongData,
  loadSongDatabase,
};
