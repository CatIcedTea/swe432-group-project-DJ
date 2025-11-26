const playlistHeader = document.querySelector('section.dj-list-header');
const trackList = document.querySelector('section.dj-list');

import {
  loadTimeSlotDataByID,
  loadPlayListData,
  loadSongData,
} from './dataManagement.js';

//Playlist prototype
function Track(title, name, album, year, duration) {
  this.trackTitle = title;
  this.artist = name;
  this.albumTitle = album;
  this.yearReleased = year;
  this.duration = duration;
}

//Creates and return a track list item element
Track.prototype.createTrackElement = function () {
  const element = document.createElement('div');
  element.classList.add('dj-list-item');

  const titleElement = document.createElement('div');
  titleElement.textContent = `Track Title: ${this.trackTitle}`;
  const artistElement = document.createElement('div');
  artistElement.textContent = `Artist: ${this.artist}`;
  const albumElement = document.createElement('div');
  albumElement.textContent = `Album: ${this.albumTitle}`;
  const yearElement = document.createElement('div');
  yearElement.textContent = `Year Released: ${this.yearReleased}`;
  const durationElement = document.createElement('div');
  durationElement.textContent = `Duration: ${Math.floor(this.duration / 60)}:${(
    this.duration % 60
  )
    .toString()
    .padStart(2, '0')}`;

  element.appendChild(titleElement);
  element.appendChild(artistElement);
  element.appendChild(albumElement);
  element.appendChild(yearElement);
  element.appendChild(durationElement);

  return element;
};

addEventListener('DOMContentLoaded', function () {
  displayHeader();
  displayTrack();
});

//Display the timeslot's header
async function displayHeader() {
  const timeslotData = await loadTimeSlotDataByID(
    sessionStorage.getItem('TimeslotID')
  );
  console.log(timeslotData);

  playlistHeader.textContent = '';

  if (timeslotData == null) return;

  const nameHeader = document.createElement('div');
  nameHeader.textContent = timeslotData.assignedDJ;
  const timeslotHeader = document.createElement('div');
  timeslotHeader.textContent = `Timeslot: ${timeslotData.timeStart}-${timeslotData.timeEnd}`;
  const dateHeader = document.createElement('div');
  dateHeader.textContent = sessionStorage.getItem('date');

  playlistHeader.appendChild(nameHeader);
  playlistHeader.appendChild(timeslotHeader);
  playlistHeader.appendChild(dateHeader);
}

//Display each track
async function displayTrack() {
  trackList.textContent = '';
  const playlistData = await loadPlayListData(
    sessionStorage.getItem('playlistID')
  );

  if (playlistData == null) return;

  playlistData.playlist.forEach(async (p) => {
    const song = await loadSongData(p.songID);

    const track = new Track(
      song.trackTitle,
      song.artistName,
      song.albumTitle,
      song.yearReleased,
      song.duration
    );

    trackList.appendChild(track.createTrackElement());
  });
}
