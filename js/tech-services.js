/**
 * Tech Services & Engineering Rate Card Controller (Menu Style)
 * Handles menu item selections, live total calculator, category filtering, and prefilled inquiry link.
 */

document.addEventListener('DOMContentLoaded', () => {
  initServicesMenu();
});

let selectedItems = [];

function initServicesMenu() {
  const itemRows = document.querySelectorAll('.menu-item-row');
  const catButtons = document.querySelectorAll('.menu-cat-btn');

  // Row selection handler
  itemRows.forEach(row => {
    const checkbox = row.querySelector('.item-checkbox');
    const id = row.dataset.id;
    const name = row.dataset.name;
    const price = parseInt(row.dataset.price, 10) || 0;
    const turnaround = row.dataset.turnaround || '1 week';

    // Click anywhere on row to toggle
    row.addEventListener('click', (e) => {
      // Avoid double toggling when directly clicking checkbox
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      
      toggleItemSelection(id, name, price, turnaround, checkbox.checked, row);
    });

    checkbox.addEventListener('change', () => {
      toggleItemSelection(id, name, price, turnaround, checkbox.checked, row);
    });
  });

  // Category filter tabs
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCat = btn.dataset.category;
      const categoryCards = document.querySelectorAll('.menu-category-card');

      categoryCards.forEach(card => {
        if (targetCat === 'all' || card.dataset.category === targetCat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Initial render
  updateEstimateTray();
}

function toggleItemSelection(id, name, price, turnaround, isSelected, rowElement) {
  if (isSelected) {
    rowElement.classList.add('selected');
    if (!selectedItems.some(item => item.id === id)) {
      selectedItems.push({ id, name, price, turnaround });
    }
  } else {
    rowElement.classList.remove('selected');
    selectedItems = selectedItems.filter(item => item.id !== id);
  }

  updateEstimateTray();
}

function updateEstimateTray() {
  const listContainer = document.getElementById('tray-selected-list');
  const totalValElement = document.getElementById('tray-total-val');
  const countElement = document.getElementById('tray-selected-count');
  const ctaBtn = document.getElementById('tray-cta-btn');

  if (!listContainer || !totalValElement) return;

  if (selectedItems.length === 0) {
    listContainer.innerHTML = '<li class="tray-empty-hint">Click any service from the menu to build your custom project estimate.</li>';
    totalValElement.textContent = '$0';
    if (countElement) countElement.textContent = '0 items selected';
  } else {
    let total = 0;
    let listHtml = '';

    selectedItems.forEach(item => {
      total += item.price;
      listHtml += `
        <li class="tray-item">
          <span class="tray-item-name" title="${item.name}">${item.name}</span>
          <span class="tray-item-price">$${item.price.toLocaleString()}</span>
        </li>
      `;
    });

    listContainer.innerHTML = listHtml;
    totalValElement.textContent = `$${total.toLocaleString()}`;
    if (countElement) countElement.textContent = `${selectedItems.length} service${selectedItems.length > 1 ? 's' : ''} selected`;
  }

  // Update Google Form Link
  if (ctaBtn) {
    const baseFormUrl = "https://forms.gle/mCDfRyrq2ioGYq2R8";
    ctaBtn.href = baseFormUrl;
  }
}
