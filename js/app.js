document.addEventListener('DOMContentLoaded', () => {
  console.log('LCY3 Operations Hub started');

  // ── Notes: persist to localStorage ─────────────────────────
  const notes = document.getElementById('notes');
  notes.value = localStorage.getItem('lcy3-notes') || '';
  notes.addEventListener('input', () => {
    localStorage.setItem('lcy3-notes', notes.value);
  });

  // ── Live search: filter cards and links ─────────────────────
  const search = document.getElementById('search');
  const searchables = document.querySelectorAll('[data-searchable]');

  search.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    searchables.forEach(el => {
      const text = (el.dataset.searchable + ' ' + el.textContent).toLowerCase();
      el.classList.toggle('hidden', q.length > 0 && !text.includes(q));
    });
  });
});
