const addSongForm = document.querySelector('.dj-add-song-form');

document.addEventListener('DOMContentLoaded', () => {
  addSongForm.addEventListener('submit', (event) => {
    const fields = addSongForm.querySelectorAll(
      "input:not([type='button']):not([type='submit']):not([type='reset'])"
    );

    const atLeastOneFilled = Array.from(fields).some(
      (field) => field.value.trim() != ''
    );

    if (!atLeastOneFilled) {
      event.preventDefault();
      alert('Please fill out at least one field before searching.');
    }
  });
});
