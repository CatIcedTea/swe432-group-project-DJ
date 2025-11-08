const playlistHeader = document.querySelector('section.dj-list-header');
const trackList = document.querySelector('section.dj-list');

import { loadPlayListData } from './dataManagement.js';

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
  durationElement.textContent = `Duration: ${this.duration}`;

  element.appendChild(titleElement);
  element.appendChild(artistElement);
  element.appendChild(albumElement);
  element.appendChild(yearElement);
  element.appendChild(durationElement);

  return element;
};

addEventListener('DOMContentLoaded', function () {
  displayTrack();
});

//Display each track
async function displayTrack() {
  trackList.textContent = '';
  const playlistData = await loadPlayListData(1);

  playlistData.playlist.forEach((p) => {
    const track = new Track(
      p.trackTitle,
      p.artistName,
      p.albumTitle,
      p.yearReleased,
      p.duration
    );

    trackList.appendChild(track.createTrackElement());
  });
}

//Display the timeslot's header
function displayPlaylistHeader() {
  const date = getSelectedDate();

  playlistHeader.textContent = '';
  const timeslotHeader = document.createElement('div');
  timeslotHeader.textContent = 'Timeslots: ' + getSelectedTimeslot();
  const dateHeader = document.createElement('div');
  dateHeader.textContent = date.toLocaleDateString();

  playlistHeader.appendChild(timeslotHeader);
  playlistHeader.appendChild(dateHeader);
}
