/**
 * WISER WORKFLOWS - Main UI Controller & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initHeroPipelineDemo();
  initAuditModal();
});

// ---------------------------------------------------------------------------
// 1. Header Scroll Effects
// ---------------------------------------------------------------------------
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ---------------------------------------------------------------------------
// 2. Mobile Menu Toggle
// ---------------------------------------------------------------------------
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking nav links
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// ---------------------------------------------------------------------------
// 3. Hero Visual Pipeline Live Simulation
// ---------------------------------------------------------------------------
function initHeroPipelineDemo() {
  const nodes = document.querySelectorAll('.workflow-pipeline .pipe-node');
  if (!nodes || nodes.length === 0) return;

  let activeIndex = 0;

  function cyclePipeline() {
    nodes.forEach(node => node.classList.remove('active'));
    nodes[activeIndex].classList.add('active');
    activeIndex = (activeIndex + 1) % nodes.length;
  }

  // Initial activate and interval
  cyclePipeline();
  setInterval(cyclePipeline, 2200);
}

// ---------------------------------------------------------------------------
// 4. Audit Consultation Booking Modal & Lead Capture
// ---------------------------------------------------------------------------
function initAuditModal() {
  const modal = document.getElementById('audit-modal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('[data-open-modal="audit-modal"]');
  const closeBtn = modal.querySelector('.modal-close-btn');
  const form = document.getElementById('audit-form');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Generating Architecture Blueprint...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal();
        form.reset();
        
        showToast('Audit Request Received! Our workflow architect will reach out within 2 hours with your tailored blueprint.');
      }, 1200);
    });
  }
}

// ---------------------------------------------------------------------------
// 5. Toast Notification System
// ---------------------------------------------------------------------------
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" style="color: var(--accent-emerald); flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <div style="font-size: 0.9rem; line-height: 1.4;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
