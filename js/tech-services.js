/**
 * Tech Services & Custom Engineering Controller
 * Powers the interactive project scope & architecture configurator
 */

document.addEventListener('DOMContentLoaded', () => {
  initScopeConfigurator();
});

const PLATFORM_DATA = {
  web: {
    name: 'Custom Web Platform / SaaS',
    baseSprintWeeks: 3,
    coreTech: ['TypeScript', 'FastAPI / Node.js', 'PostgreSQL', 'Tailwind / Vanilla CSS', 'Redis Cache'],
    archType: 'Single Page App / SSR + Microservices API'
  },
  mobile: {
    name: 'Cross-Platform Mobile App (iOS & Android)',
    baseSprintWeeks: 4,
    coreTech: ['React Native / Flutter', 'FastAPI Backend', 'Supabase / Postgres', 'Offline Sync (SQLite)'],
    archType: 'Native Binary Build + Push Notification Mesh'
  },
  software: {
    name: 'Backend Program & Automation Daemon',
    baseSprintWeeks: 2,
    coreTech: ['Python 3.12 / Go', 'Docker Containers', 'Celery / Redis Queue', 'OpenTelemetry Tracing'],
    archType: 'Headless Service + Event-Driven Workers'
  },
  enterprise: {
    name: 'Full-Stack Enterprise Digital Suite',
    baseSprintWeeks: 6,
    coreTech: ['Full React/Vue Web App', 'iOS/Android App', 'Distributed API Mesh', 'Snowflake / BigQuery DWH'],
    archType: 'Unified Multi-Interface Ecosystem'
  }
};

const FEATURE_DATA = {
  auth: {
    name: 'Auth & RBAC Matrix',
    addedDays: 3,
    techSnippet: 'OAuth2 + JWT Claims + Multi-Tenant Row Level Security'
  },
  realtime: {
    name: 'Real-Time Database Sync & WebSockets',
    addedDays: 4,
    techSnippet: 'Postgres CDC (Change-Data-Capture) + WebSocket Bus'
  },
  ai: {
    name: 'AI Agent & LLM Intelligence Pipeline',
    addedDays: 5,
    techSnippet: 'Gemini 2.5 Pro Multimodal Pipeline + Qdrant Vector Search'
  },
  billing: {
    name: 'Automated Billing & E-Signature Desk',
    addedDays: 4,
    techSnippet: 'Stripe Billing Webhooks + PandaDoc/DocuSign API'
  },
  mobile_offline: {
    name: 'Offline-First Local Storage Engine',
    addedDays: 4,
    techSnippet: 'Client-Side SQLite Cache + Bi-directional Replay Sync'
  }
};

let currentPlatform = 'web';
let activeFeatures = ['auth', 'realtime', 'ai'];

function initScopeConfigurator() {
  const platformButtons = document.querySelectorAll('.platform-btn');
  const featureCheckboxes = document.querySelectorAll('.feature-checkbox-input');

  platformButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      platformButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPlatform = btn.dataset.platform;
      renderBlueprint();
    });
  });

  featureCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const label = cb.closest('.feature-checkbox-label');
      if (cb.checked) {
        label.classList.add('checked');
        if (!activeFeatures.includes(cb.value)) activeFeatures.push(cb.value);
      } else {
        label.classList.remove('checked');
        activeFeatures = activeFeatures.filter(f => f !== cb.value);
      }
      renderBlueprint();
    });
  });

  renderBlueprint();
}

function renderBlueprint() {
  const platform = PLATFORM_DATA[currentPlatform] || PLATFORM_DATA.web;
  const screen = document.getElementById('blueprint-screen');
  const timelineBadge = document.getElementById('timeline-badge');
  const ctaParamsBtn = document.getElementById('configurator-cta-btn');

  if (!screen || !timelineBadge) return;

  let totalDays = (platform.baseSprintWeeks * 5);
  const activeFeatureObjects = [];

  activeFeatures.forEach(key => {
    if (FEATURE_DATA[key]) {
      totalDays += FEATURE_DATA[key].addedDays;
      activeFeatureObjects.push(FEATURE_DATA[key]);
    }
  });

  const estimatedWeeks = Math.ceil(totalDays / 5);
  timelineBadge.textContent = `⏱️ Estimated Turnaround: ~${estimatedWeeks} Weeks`;

  // Build generated architecture text
  let outputHtml = `
<span class="bp-green">// ========================================================</span>
<span class="bp-green">// WISER WORKFLOWS CUSTOM ARCHITECTURE SYNTHESIZER</span>
<span class="bp-green">// ========================================================</span>

<span class="bp-highlight">[PLATFORM TARGET]</span>  ${platform.name}
<span class="bp-highlight">[TOPOLOGY]</span>        ${platform.archType}
<span class="bp-highlight">[CORE STACK]</span>       ${platform.coreTech.join(' • ')}

<span class="bp-highlight">[SELECTED CAPABILITY MODULES]</span> (${activeFeatureObjects.length} Active):
`;

  if (activeFeatureObjects.length === 0) {
    outputHtml += `  <span class="bp-amber">> Core baseline build without additional add-on modules.</span>\n`;
  } else {
    activeFeatureObjects.forEach((feat, idx) => {
      outputHtml += `  ${idx + 1}. <span class="bp-highlight">${feat.name}</span>\n     ↳ <span style="color: #cbd5e1;">${feat.techSnippet}</span>\n`;
    });
  }

  outputHtml += `
<span class="bp-green">// ========================================================</span>
<span class="bp-green">// DETERMINISTIC ENGINEERING GUARANTEE</span>
<span class="bp-green">// ========================================================</span>
✓ 100% Bespoke Codebase (Zero Generic Website Builders)
✓ Fixed-Fee Milestone Agreements with Clear Payback
✓ Direct Engineering Access to Wesley Barnes & Austin/East Texas HQ
✓ Sub-second latency guarantees & CI/CD pipeline Included
`;

  screen.innerHTML = outputHtml;

  // Update CTA link with prefilled parameters
  if (ctaParamsBtn) {
    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLScOvz77fx-dA_HrH4h12tHVjQHaUHKuuSvNea_mDgTngeCFjQ/viewform?usp=dialog";
    ctaParamsBtn.href = baseUrl;
  }
}
