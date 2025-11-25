import { loadTimeSlotData } from './dataManagement.js';
import { getSelectedDate } from './calenderScript.js';
export { displayListHeader };

const djListHeader = document.querySelector('section.dj-list-header');
const djList = document.querySelector('section.dj-list');

//Timeslot prototype
function Timeslot(id, start, end, dj, playlist) {
  this.timeslotID = id;
  this.timeStart = start;
  this.timeEnd = end;
  this.assignedDJ = dj;
  this.playlistID = playlist;
}

//Creates and return a timeslot list item element
Timeslot.prototype.createTimeslotElement = function () {
  const element = document.createElement('div');
  element.classList.add('dj-list-item');

  const timeElement = document.createElement('div');
  timeElement.textContent = `Timeslot: ${this.timeStart} - ${this.timeEnd}`;
  const djElement = document.createElement('div');
  djElement.textContent = `Assigned DJ: ${this.assignedDJ}`;

  element.setAttribute('opened', false);
  element.setAttribute('timeslotID', this.timeslotID);
  element.setAttribute('playlistID', this.playlistID);

  element.appendChild(timeElement);
  element.appendChild(djElement);

  const preview = createPlaylistPreview();

  //Assigns on click event to create playlist preview
  element.addEventListener('click', (event) => {
    /*
    console.log(element.getAttribute('opened'));
    if (element.getAttribute('opened') == 'false') {
      element.setAttribute('opened', true);
      element.after(preview);
    } else {
      element.setAttribute('opened', false);
      preview.remove();
    }*/

    window.location = '/dj/playlist';
  });

  return element;
};

addEventListener('DOMContentLoaded', function () {
  displayListHeader();
  displayTimeslots();
});

//Display the timeslot's header
function displayListHeader() {
  const date = getSelectedDate();

  djListHeader.textContent = '';
  const timeslotHeader = document.createElement('div');
  timeslotHeader.textContent = 'Timeslots';
  const dateHeader = document.createElement('div');
  dateHeader.textContent = date.toLocaleDateString();

  djListHeader.appendChild(timeslotHeader);
  djListHeader.appendChild(dateHeader);
}

//Display each timeslots
async function displayTimeslots() {
  djList.textContent = '';
  const timeslotData = await loadTimeSlotData();

  timeslotData.timeslots.forEach((t) => {
    const timeslot = new Timeslot(
      t.timeslotID,
      t.timeStart,
      t.timeEnd,
      t.assignedDJ,
      t.playlistID
    );

    djList.appendChild(timeslot.createTimeslotElement());
  });
}

async function createPlaylistPreview() {
  const element = document.createElement('div');

  const table = document.createElement('table');
  const tableHead = document.createElement('tr');

  tableHead.appendChild(document.createElement('th'));

  tableHead.appendChild(createTableItems('Title'));
  tableHead.appendChild(createTableItems('Artist'));
  tableHead.appendChild(createTableItems('Album'));
  tableHead.appendChild(createTableItems('Year Released'));
  tableHead.appendChild(createTableItems('Duration'));

  //const playlist = await loadPlayListData(1);

  element.appendChild(table);

  return element;
}

function createTableItems(text) {
  const item = document.createElement('th');
  item.textContent = text;

  return item;
}
