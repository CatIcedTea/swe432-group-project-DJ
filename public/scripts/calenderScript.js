import { displayListHeader, displayTimeslots } from './timeslotScript.js';
export { getSelectedDate };

const calenderDates = document.getElementById('calenderDates');
const calenderMonthYear = document.getElementById('calenderMonthYear');

let selectedDate;

document.addEventListener('DOMContentLoaded', function () {
  //Display initial calender with current date
  const currentDate = new Date();
  selectedDate = currentDate;
  displayCalender(currentDate);
});

function displayCalender(date) {
  console.log(date);
  if (date == 'Invalid Date') return;

  selectedDate = date;

  //Update the calender with the specified date
  calenderMonthYear.textContent = '';
  const monthElement = document.createElement('div');
  monthElement.textContent = parseMonth(date.getMonth());
  const yearElement = document.createElement('div');
  yearElement.textContent += date.getFullYear();

  calenderMonthYear.appendChild(monthElement);
  calenderMonthYear.appendChild(document.createElement('br'));
  calenderMonthYear.appendChild(yearElement);

  //Appends each date
  calenderDates.textContent = '';

  let totalDaysInMonth = getDaysInMonth(date);
  let firstDayWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  //Pad with empty dates to align to the first day's day of the week
  for (let days = 0; days < firstDayWeek; days++) {
    const day = document.createElement('div');
    day.classList.add('date');

    calenderDates.appendChild(day);
  }

  //Appends each date
  for (let days = 1; days < totalDaysInMonth; days++) {
    const day = document.createElement('div');
    if (days == date.getDate()) {
      day.classList.add('date-selected');
    } else {
      day.classList.add('date');
    }

    day.addEventListener('click', (event) => {
      displayCalender(new Date(date.getFullYear(), date.getMonth(), days));
    });
    day.textContent = days;

    calenderDates.appendChild(day);
  }

  displayListHeader();
  displayTimeslots();
}
//Exposes to html
window.displayCalender = displayCalender;

//Parse the month index given from Date to a string
function parseMonth(monthIndex) {
  switch (monthIndex) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
}

//Get how many total days are in the given month
function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

function getSelectedDate() {
  return selectedDate;
}
