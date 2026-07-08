document.addEventListener('DOMContentLoaded', () => {
  console.log('LCY3 Operations Hub started');
  const MAX_NOTE_LENGTH = 10000;

  const notes = document.getElementById('notes');
  const notesCount = document.getElementById('notes-count');
  if (notes) {
    const updateNotesCount = () => {
      if (notesCount) {
        notesCount.textContent = `${notes.value.length}/${MAX_NOTE_LENGTH} characters`;
      }
    };

    const storedNotes = localStorage.getItem('lcy3-notes') || '';
    let decodedNotes = '';
    try {
      decodedNotes = decodeURIComponent(storedNotes);
    } catch (error) {
      console.warn('Unable to decode stored notes; using raw value fallback.', error);
      decodedNotes = storedNotes;
    }
    notes.value = decodedNotes.slice(0, MAX_NOTE_LENGTH);
    updateNotesCount();
    notes.addEventListener('input', () => {
      const safeText = encodeURIComponent(notes.value.slice(0, MAX_NOTE_LENGTH));
      localStorage.setItem('lcy3-notes', safeText);
      if (notes.value.length > MAX_NOTE_LENGTH) {
        notes.value = notes.value.slice(0, MAX_NOTE_LENGTH);
      }
      updateNotesCount();
    });
  }

  const search = document.getElementById('search');
  const searchables = document.querySelectorAll('[data-searchable]');

  if (search) {
    search.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      searchables.forEach(el => {
        const text = (el.dataset.searchable + ' ' + el.textContent).toLowerCase();
        el.classList.toggle('hidden', q.length > 0 && !text.includes(q));
      });
    });
  }
});
