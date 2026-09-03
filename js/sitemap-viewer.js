/**
 * WISER WORKFLOWS - Interactive Site Map Viewer Engine
 * Handles rendering tree graphs, grid views, filtering, search, and deep-dive drawer inspection.
 */

document.addEventListener('DOMContentLoaded', () => {
  const sitemapContainer = document.getElementById('sitemap-render-area');
  if (!sitemapContainer || typeof SITE_MAP_DATA === 'undefined') return;

  let currentView = 'tree'; // 'tree' or 'grid'
  let currentCategory = 'all';
  let currentStatus = 'all';
  let searchQuery = '';
  let drawerBackdrop = null;

  // Initialize UI controls & drawer first
  initDrawer();
  initControls();
  renderSitemap();

  function initControls() {
    // View Switcher Buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        renderSitemap();
      });
    });

    // Category & Status Filters
    const filterButtons = document.querySelectorAll('.sitemap-filters .filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category || 'all';
        currentStatus = btn.dataset.status || 'all';
        renderSitemap();
      });
    });

    // Search Input
    const searchInput = document.getElementById('sitemap-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderSitemap();
      });
    }
  }

  function getFilteredNodes() {
    return SITE_MAP_DATA.nodes.filter(node => {
      const matchCategory = currentCategory === 'all' || node.category === currentCategory;
      const matchStatus = currentStatus === 'all' || node.status === currentStatus;
      const matchSearch = !searchQuery || 
        node.title.toLowerCase().includes(searchQuery) ||
        node.description.toLowerCase().includes(searchQuery) ||
        node.route.toLowerCase().includes(searchQuery);

      return matchCategory && matchStatus && matchSearch;
    });
  }

  function renderSitemap() {
    sitemapContainer.innerHTML = '';
    const filteredNodes = getFilteredNodes();

    if (filteredNodes.length === 0) {
      sitemapContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <svg style="width: 48px; height: 48px; margin: 0 auto 1rem; color: var(--text-dim);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h4 style="color: #fff; margin-bottom: 0.5rem;">No Site Map Pages Found</h4>
          <p style="font-size: 0.9rem;">Try adjusting your filters or search keywords.</p>
        </div>
      `;
      return;
    }

    if (currentView === 'tree') {
      renderTreeView(filteredNodes);
    } else {
      renderGridView(filteredNodes);
    }
  }

  function renderTreeView(nodes) {
    const treeWrapper = document.createElement('div');
    treeWrapper.className = 'sitemap-tree-container';

    // Group nodes by hierarchy level
    const level1 = nodes.filter(n => n.level === 1);
    const level2 = nodes.filter(n => n.level === 2);
    const level3 = nodes.filter(n => n.level === 3);

    // Level 1 (Root Home)
    if (level1.length > 0) {
      const row1 = document.createElement('div');
      row1.className = 'tree-level tree-root-level';
      level1.forEach(node => row1.appendChild(createNodeCard(node)));
      treeWrapper.appendChild(row1);
    }

    // Level 2 (Primary Navigation & Hubs)
    if (level2.length > 0) {
      const row2 = document.createElement('div');
      row2.className = 'tree-level';
      level2.forEach(node => row2.appendChild(createNodeCard(node)));
      treeWrapper.appendChild(row2);
    }

    // Level 3 (Deep Blueprints & Special Modules)
    if (level3.length > 0) {
      const row3 = document.createElement('div');
      row3.className = 'tree-level';
      level3.forEach(node => row3.appendChild(createNodeCard(node)));
      treeWrapper.appendChild(row3);
    }

    sitemapContainer.appendChild(treeWrapper);
  }

  function renderGridView(nodes) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'sitemap-grid-container';

    // Group by category
    SITE_MAP_DATA.categories.forEach(category => {
      const categoryNodes = nodes.filter(n => n.category === category.id);
      if (categoryNodes.length === 0) return;

      const groupWrap = document.createElement('div');
      groupWrap.className = 'category-group';
      groupWrap.style.gridColumn = '1 / -1';

      groupWrap.innerHTML = `
        <div class="category-group-header">
          <h3 style="font-size: 1.3rem; color: #fff;">${category.name}</h3>
          <span class="category-badge-count">${categoryNodes.length} pages</span>
        </div>
        <div class="sitemap-grid-container"></div>
      `;

      const innerGrid = groupWrap.querySelector('.sitemap-grid-container');
      categoryNodes.forEach(node => {
        innerGrid.appendChild(createNodeCard(node));
      });

      gridContainer.appendChild(groupWrap);
    });

    sitemapContainer.appendChild(gridContainer);
  }

  function createNodeCard(node) {
    const card = document.createElement('div');
    card.className = 'sitemap-node-card';
    card.dataset.id = node.id;

    let badgeClass = 'badge-live';
    if (node.status === 'planned') badgeClass = 'badge-planned';
    if (node.status === 'expansion') badgeClass = 'badge-expansion';

    card.innerHTML = `
      <div class="node-card-header">
        <div class="node-icon-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${getNodeIconSvg(node.icon)}
          </svg>
        </div>
        <span class="badge ${badgeClass}">${node.status}</span>
      </div>
      <div class="node-card-title">${node.title}</div>
      <div class="node-card-route">${node.route}</div>
      <div class="node-card-desc">${node.description}</div>
      <div class="node-card-footer">
        <span>Level ${node.level} Node</span>
        <div class="node-explore-hint">
          Inspect
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openNodeDrawer(node));
    return card;
  }

  function getNodeIconSvg(iconName) {
    switch (iconName) {
      case 'layout':
      case 'home':
        return '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>';
      case 'git-branch':
        return '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>';
      case 'bot':
        return '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>';
      case 'users':
        return '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>';
      case 'refresh-cw':
        return '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>';
      case 'database':
        return '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>';
      case 'calculator':
        return '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>';
      case 'shield-check':
        return '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>';
      default:
        return '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>';
    }
  }

  // -------------------------------------------------------------------------
  // Deep-Dive Drawer Modal Handler
  // -------------------------------------------------------------------------
  function initDrawer() {
    drawerBackdrop = document.createElement('div');
    drawerBackdrop.className = 'sitemap-drawer-backdrop';
    drawerBackdrop.innerHTML = `
      <div class="sitemap-drawer">
        <div class="drawer-header">
          <div>
            <span id="drawer-node-badge" class="badge badge-live">Live</span>
            <h3 id="drawer-node-title" style="color: #fff; margin-top: 0.5rem; font-size: 1.45rem;"></h3>
            <span id="drawer-node-route" style="font-family: var(--font-mono); color: var(--accent-cyan); font-size: 0.85rem;"></span>
          </div>
          <button class="modal-close-btn" id="drawer-close-btn" aria-label="Close Drawer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="drawer-content">
          <div>
            <div class="drawer-section-title">Overview & Purpose</div>
            <p id="drawer-node-desc" style="color: #cbd5e1; font-size: 0.95rem;"></p>
          </div>

          <div>
            <div class="drawer-section-title">Target Audience</div>
            <p id="drawer-node-audience" style="color: #94a3b8; font-size: 0.9rem;"></p>
          </div>

          <div>
            <div class="drawer-section-title">Primary Conversion Goal</div>
            <div id="drawer-node-goal" style="background: rgba(0, 240, 255, 0.08); border-left: 3px solid var(--accent-cyan); padding: 0.75rem 1rem; border-radius: 4px; color: #e2e8f0; font-size: 0.9rem;"></div>
          </div>

          <div>
            <div class="drawer-section-title">Key Page Components</div>
            <ul id="drawer-node-components" style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; color: #cbd5e1; font-size: 0.88rem;"></ul>
          </div>

          <div>
            <div class="drawer-section-title">Tech Stack & Tools</div>
            <div id="drawer-node-tech" class="feature-tag-list"></div>
          </div>

          <div>
            <div class="drawer-section-title">Target SEO Keywords</div>
            <div id="drawer-node-seo" class="feature-tag-list"></div>
          </div>
        </div>
        <div class="drawer-footer">
          <a href="https://forms.gle/mCDfRyrq2ioGYq2R8" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="drawer-audit-btn" style="flex: 1;">Request Blueprint for This Page</a>
        </div>
      </div>
    `;

    document.body.appendChild(drawerBackdrop);

    const closeBtn = drawerBackdrop.querySelector('#drawer-close-btn');
    closeBtn.addEventListener('click', closeNodeDrawer);

    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeNodeDrawer();
    });

    const auditBtn = drawerBackdrop.querySelector('#drawer-audit-btn');
    auditBtn.addEventListener('click', () => {
      closeNodeDrawer();
    });
  }

  function openNodeDrawer(node) {
    if (!drawerBackdrop) return;

    const badge = drawerBackdrop.querySelector('#drawer-node-badge');
    badge.className = `badge badge-${node.status}`;
    badge.textContent = node.status.toUpperCase();

    drawerBackdrop.querySelector('#drawer-node-title').textContent = node.title;
    drawerBackdrop.querySelector('#drawer-node-route').textContent = node.route;
    drawerBackdrop.querySelector('#drawer-node-desc').textContent = node.description;
    drawerBackdrop.querySelector('#drawer-node-audience').textContent = node.audience || 'General visitors and clients';
    drawerBackdrop.querySelector('#drawer-node-goal').textContent = node.conversionGoal || 'Direct inquiry';

    // Components List
    const compList = drawerBackdrop.querySelector('#drawer-node-components');
    compList.innerHTML = (node.keyComponents || []).map(item => `
      <li style="display: flex; align-items: center; gap: 0.5rem;">
        <svg width="14" height="14" style="color: var(--accent-emerald);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${item}</span>
      </li>
    `).join('');

    // Tech Tags
    const techContainer = drawerBackdrop.querySelector('#drawer-node-tech');
    techContainer.innerHTML = (node.techStack || []).map(t => `<span class="feature-tag">${t}</span>`).join('');

    // SEO Keywords
    const seoContainer = drawerBackdrop.querySelector('#drawer-node-seo');
    seoContainer.innerHTML = (node.seoKeywords || []).map(k => `<span class="feature-tag" style="background: rgba(99, 102, 241, 0.1); border-color: rgba(99, 102, 241, 0.25); color: #c7d2fe;">#${k}</span>`).join('');

    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNodeDrawer() {
    if (!drawerBackdrop) return;
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
});
