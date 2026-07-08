document.addEventListener('DOMContentLoaded', () => {
  console.log('LCY3 Operations Hub started');

  const notes = document.getElementById('notes');
  if (notes) {
    const storedNotes = localStorage.getItem('lcy3-notes');
    const normalizedNotes = typeof storedNotes === 'string'
      ? storedNotes.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 10000)
      : '';
    notes.value = normalizedNotes;
    notes.addEventListener('input', () => {
      localStorage.setItem('lcy3-notes', String(notes.value).slice(0, 10000));
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
