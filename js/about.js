/**
 * WISER WORKFLOWS - About the Founder & AI Partnership Interactive Controller
 * Powers the Synergy Matrix and Co-Pilot Terminal Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initSynergyMatrix();
  initTerminalSimulator();
  initToastSupport();
});

// ===========================================================================
// 1. INTERACTIVE SYNERGY MATRIX CONTROLLER
// ===========================================================================
const SYNERGY_MODES = {
  human: [
    {
      title: '🧠 Domain Strategy & Architecture',
      desc: 'Formulating high-level systems design, identifying critical business bottlenecks, and defining business logic that software must obey.'
    },
    {
      title: '⚖️ Commercial Risk & Nuance Calibration',
      desc: 'Setting risk boundaries, determining financial discrepancy thresholds, and arbitrating ambiguous contracts with executive judgment.'
    },
    {
      title: '🤝 Client Empathy & Problem Solving',
      desc: 'Translating complex executive frustrations into practical, high-ROI software automation blueprints that teams love using.'
    }
  ],

  ai: [
    {
      title: '⚡ Multimodal Document & Vision Parsing',
      desc: 'Parsing unstructured engineering schematics, invoices, and handwritten logs in sub-second latency with zero hallucination.'
    },
    {
      title: '🛡️ 24/7 Event Stream & Telemetry Monitoring',
      desc: 'Inspecting millions of webhook events, detecting rate-limit spikes (HTTP 429), and executing autonomous exponential backoff.'
    },
    {
      title: '🔄 Universal Schema Normalization',
      desc: 'Instantly transforming messy vendor JSON into strict Pydantic/Zod schemas and compiling optimized dbt analytical marts.'
    }
  ],

  combined: [
    {
      title: '🚀 10x Velocity Without Headcount Bloat',
      desc: 'Delivering enterprise-scale software architecture in weeks rather than quarters, saving clients hundreds of thousands in agency fees.'
    },
    {
      title: '🛡️ Zero-Drift & Deterministic Reliability',
      desc: 'Human governance sets strict guardrails while Gemini AI models continuously enforce validation, deduplication, and zero-loss DLQ buffers.'
    },
    {
      title: '📈 Turnkey Lead-to-Cash Acceleration',
      desc: 'From inbound lead capture to auto-generated SOWs and cash collection, human vision and AI automation execute in minutes.'
    }
  ]
};

function initSynergyMatrix() {
  const tabButtons = document.querySelectorAll('.synergy-tab-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (!mode || !SYNERGY_MODES[mode]) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSynergyContent(mode);
    });
  });

  renderSynergyContent('combined');
}

function renderSynergyContent(mode) {
  const container = document.getElementById('synergy-grid-container');
  if (!container) return;

  const items = SYNERGY_MODES[mode];
  container.innerHTML = items.map(item => `
    <div class="synergy-item-card">
      <div class="synergy-item-title">${item.title}</div>
      <div class="synergy-item-desc">${item.desc}</div>
    </div>
  `).join('');
}

// ===========================================================================
// 2. CO-PILOT TERMINAL SIMULATOR
// ===========================================================================
let isTerminalSimRunning = false;

function initTerminalSimulator() {
  const simBtn = document.getElementById('run-copilot-sim-btn');
  if (!simBtn) return;

  simBtn.addEventListener('click', () => {
    if (isTerminalSimRunning) return;
    runTerminalSimulation();
  });
}

function runTerminalSimulation() {
  isTerminalSimRunning = true;
  const simBtn = document.getElementById('run-copilot-sim-btn');
  const terminalBody = document.getElementById('copilot-terminal-body');

  if (simBtn) {
    simBtn.disabled = true;
    simBtn.innerHTML = `
      <svg class="spin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      </svg>
      <span>Reasoning in Progress...</span>
    `;
  }

  if (terminalBody) {
    terminalBody.innerHTML = `
      <div class="prompt-line">&gt; wesley: "Engineer an asynchronous self-healing webhook listener for Stripe with 429 backoff and Redis DLQ fallback."</div>
    `;
  }

  setTimeout(() => {
    appendTerminalLine(terminalBody, `
      <div class="reasoning-block">
        [Gemini 2.5 Pro Co-Pilot]: Analyzing requirements...<br>
        • Validating SHA-256 signature against endpoint secret<br>
        • Building FastAPI async handler with tenacity exponential jitter<br>
        • Constructing Redis Dead-Letter-Queue quarantine pipeline
      </div>
    `);
  }, 600);

  setTimeout(() => {
    appendTerminalLine(terminalBody, `
      <div class="output-code">
        [Code Synthesized & Verified]:<br>
        @router.post("/webhooks/stripe")<br>
        async def stripe_webhook(request: Request, background_tasks: BackgroundTasks):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;payload = await request.body()<br>
        &nbsp;&nbsp;&nbsp;&nbsp;sig_header = request.headers.get("Stripe-Signature")<br>
        &nbsp;&nbsp;&nbsp;&nbsp;event = verify_stripe_checksum(payload, sig_header)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;await execute_with_backoff_retry(event, dlq_fallback=redis_dlq)
      </div>
    `);
  }, 1600);

  setTimeout(() => {
    appendTerminalLine(terminalBody, `
      <div style="color: #38bdf8; font-weight: 700; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.5rem;">
        ✓ [Wesley Approved]: Tests compiled 100% PASS • Deployed to production cluster in 1.4s.
      </div>
    `);

    if (simBtn) {
      simBtn.disabled = false;
      simBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Run Co-Pilot Cycle</span>
      `;
    }
    isTerminalSimRunning = false;
    showToast('✓ Co-Pilot cycle completed: Code verified & production-ready!');
  }, 2500);
}

function appendTerminalLine(container, html) {
  if (!container) return;
  const line = document.createElement('div');
  line.innerHTML = html;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

// ===========================================================================
// 3. TOAST NOTIFICATION SUPPORT
// ===========================================================================
function initToastSupport() {
  if (!document.getElementById('toast-container')) {
    const toastBox = document.createElement('div');
    toastBox.id = 'toast-container';
    toastBox.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `;
    document.body.appendChild(toastBox);
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #0f172a;
    color: #ffffff;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
    border-left: 4px solid var(--accent-indigo);
    pointer-events: auto;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.25s ease;
  `;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
