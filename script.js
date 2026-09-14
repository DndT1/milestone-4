document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('metricSearch');
  const table = document.getElementById('metricTable');
  const rows = Array.from(document.querySelectorAll('#metricRows tr'));
  const sortSelect = document.getElementById('metricSort');

  function applyFilter() {
    const term = (searchInput.value || '').trim().toLowerCase();
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  }

  function applySort(type) {
    if (!table || rows.length < 2) return;

    const tbody = document.getElementById('metricRows');
    const sortedRows = rows
      .map((row) => ({ row, value: Number(row.querySelector('td:nth-child(2)')?.textContent.replace(/[^0-9.-]/g, '') || 0) }))
      .sort((a, b) => {
        if (type === 'value') return a.value - b.value;
        return a.row.cells[0].textContent.localeCompare(b.row.cells[0].textContent);
      });

    sortedRows.forEach(({ row }) => tbody.appendChild(row));
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => applySort(sortSelect.value));
  }

  const refreshButton = document.getElementById('refreshData');
  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      rows.forEach((row) => {
        row.style.display = '';
      });
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'metric';
      applySort('metric');
    });
  }
});
