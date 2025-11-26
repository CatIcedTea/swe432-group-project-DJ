import { loadSongDatabase } from './dataManagement.js';

const addSongForm = document.querySelector('.dj-add-song-form');
const resultList = document.querySelector('.dj-list');

const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const albumTitle = document.getElementById('albumTitle');
const yearReleased = document.getElementById('yearReleased');
const minDuration = document.getElementById('trackDurationMin');
const maxDuration = document.getElementById('trackDurationMax');

const addSongButton = document.getElementById('addSongButton');

let selectedSong;
let selectedElement;

addSongButton.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  addSongButton.addEventListener('click', () => {
    addSelectedSongToPlaylist();
  });

  addSongForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fields = addSongForm.querySelectorAll(
      "input:not([type='button']):not([type='submit']):not([type='reset'])"
    );

    const atLeastOneFilled = Array.from(fields).some(
      (field) => field.value.trim() !== ''
    );

    if (atLeastOneFilled) {
      addSongButton.style.display = 'none';

      const track = trackTitle.value.trim();
      const artist = artistName.value.trim();
      const album = albumTitle.value.trim();
      const year = yearReleased.value.trim();
      const minDur = parseInt(minDuration.value);
      const maxDur = parseInt(maxDuration.value);

      const songDatabase = await loadSongDatabase();

      let filteredSongs = songDatabase.Songs;

      if (track) {
        filteredSongs = filteredSongs.filter((song) =>
          song.trackTitle.toLowerCase().includes(track.toLowerCase())
        );
      }
      if (artist) {
        filteredSongs = filteredSongs.filter((song) =>
          song.artistName.toLowerCase().includes(artist.toLowerCase())
        );
      }
      if (album) {
        filteredSongs = filteredSongs.filter((song) =>
          song.albumTitle.toLowerCase().includes(album.toLowerCase())
        );
      }
      if (year) {
        filteredSongs = filteredSongs.filter(
          (song) => song.yearReleased == year
        );
      }
      if (minDur) {
        filteredSongs = filteredSongs.filter((song) => song.duration >= minDur);
      }
      if (maxDur) {
        filteredSongs = filteredSongs.filter((song) => song.duration <= maxDur);
      }

      console.log(filteredSongs);

      displayResults(filteredSongs);
    } else {
      alert('Please fill out at least one field before searching.');
    }
  });
});

function displayResults(songs) {
  resultList.textContent = '';

  songs.forEach((song) => {
    const listItem = document.createElement('div');
    listItem.classList.add('dj-list-item');

    const titleElement = document.createElement('div');
    titleElement.textContent = `Title: ${song.trackTitle}`;
    const artistElement = document.createElement('div');
    artistElement.textContent = `Artist: ${song.artistName}`;
    const albumElement = document.createElement('div');
    albumElement.textContent = `Album: ${song.albumTitle}`;
    const yearElement = document.createElement('div');
    yearElement.textContent = `Year Released: ${song.yearReleased}`;
    const durationElement = document.createElement('div');
    durationElement.textContent = `Duration: ${Math.floor(
      song.duration / 60
    )}:${(song.duration % 60).toString().padStart(2, '0')}`;

    listItem.appendChild(titleElement);
    listItem.appendChild(artistElement);
    listItem.appendChild(albumElement);
    listItem.appendChild(yearElement);
    listItem.appendChild(durationElement);

    listItem.addEventListener('click', () => {
      if (addSongButton.style.display === 'none') {
        addSongButton.style.display = 'block';
      }

      if (selectedElement) {
        selectedElement.classList.remove('dj-list-item-selected');
      }

      selectedSong = song;
      selectedElement = listItem;

      listItem.classList.add('dj-list-item-selected');
    });

    resultList.appendChild(listItem);
  });
}

async function addSelectedSongToPlaylist() {
  if (!selectedSong) {
    alert('No song selected');
    return;
  }

  const response = await fetch(
    `/api/playlists/${sessionStorage.getItem('playlistID')}/add-song`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songID: selectedSong.songID }),
    }
  );

  const result = await response.json();

  if (result.success) {
    alert('Song added to playlist');
  } else {
    alert('Failed to add song');
  }
}
