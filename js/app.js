document.addEventListener('DOMContentLoaded', () => {
  console.log('LCY3 Operations Hub started');
  const MAX_NOTE_LENGTH = 10000;

  const notes = document.getElementById('notes');
  if (notes) {
    const storedNotes = localStorage.getItem('lcy3-notes') || '';
    let decodedNotes = '';
    try {
      decodedNotes = decodeURIComponent(storedNotes);
    } catch {
      decodedNotes = storedNotes;
    }
    notes.value = String(decodedNotes).slice(0, MAX_NOTE_LENGTH);
    notes.addEventListener('input', () => {
      const safeText = encodeURIComponent(String(notes.value).slice(0, MAX_NOTE_LENGTH));
      localStorage.setItem('lcy3-notes', safeText);
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
