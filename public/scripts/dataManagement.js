//Fetch the currently temporary JSON data for timeslots (WILL NEED LIVE SERVER)
async function loadTimeSlotData() {
  const promise = await fetch('/data/timeslotData.json');
  const jsonData = await promise.json();
  console.log(jsonData);

  return jsonData;
}

//Fetch the currently temporary JSON data for playlists (WILL NEED LIVE SERVER)
async function loadPlayListData(id) {
  const promise = await fetch('/data/playlistData.json');
  const jsonData = await promise.json();

  const playlist = jsonData.playlists.find((p) => p.playlistID == id);

  console.log(playlist);

  return playlist;
}

export { loadPlayListData, loadTimeSlotData };
