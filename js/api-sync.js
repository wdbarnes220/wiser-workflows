/**
 * WISER WORKFLOWS - Cross-Platform API Sync Interactive Controller
 * Powers the Consistency Mesh, Self-Healing Pipeline & HITL Slack Alert System
 */

document.addEventListener('DOMContentLoaded', () => {
  initConsistencyMesh();
  initSelfHealingEngine();
  initHitlAlerts();
  initToastSupport();
});

// ===========================================================================
// 1. MULTI-INTERFACE CONSISTENCY MESH CONTROLLER
// ===========================================================================
const MESH_SCENARIOS = {
  payment: {
    name: '$12,500 Customer Payment in Stripe',
    latency: '284ms',
    checksum: 'sha256:7f8a9102c983',
    stripe: {
      metric1: '$154,200.00',
      label1: 'Net Balance',
      metric2: 'pi_3N8201a9 (Paid)',
      label2: 'Payment Intent',
      metric3: '100% Succeeded',
      label3: 'Event Status'
    },
    quickbooks: {
      metric1: 'INV-2026-9082',
      label1: 'Invoice Ref',
      metric2: '$12,500.00',
      label2: 'GL Account 1010',
      metric3: 'Reconciled',
      label3: 'Bank Match'
    },
    grist: {
      metric1: 'ORD-8812-US',
      label1: 'Record ID',
      metric2: 'FULFILLMENT_READY',
      label2: 'Order State',
      metric3: 'Row #4,821',
      label3: 'Table Index'
    },
    hubspot: {
      metric1: 'Closed-Won',
      label1: 'Deal Stage',
      metric2: '$12,500 ARR',
      label2: 'Deal Amount',
      metric3: 'Customer',
      label3: 'Lifecycle Stage'
    }
  },

  upgrade: {
    name: 'Customer Plan Upgrade in CRM',
    latency: '312ms',
    checksum: 'sha256:4b910e4281fa',
    stripe: {
      metric1: '$4,800.00/mo',
      label1: 'Prorated Subscription',
      metric2: 'sub_882910a',
      label2: 'Subscription ID',
      metric3: 'Auto-Billed',
      label3: 'Invoice Status'
    },
    quickbooks: {
      metric1: 'REC-REV-4081',
      label1: 'Recurring Schedule',
      metric2: '$4,800.00/mo',
      label2: 'SaaS Revenue 4010',
      metric3: 'Tax Mapped',
      label3: 'Avalara Tax Code'
    },
    grist: {
      metric1: 'Enterprise Tier',
      label1: 'Entitlements',
      metric2: '100 Seats Active',
      label2: 'License Quota',
      metric3: 'Real-Time Sync',
      label3: 'Sync Engine'
    },
    hubspot: {
      metric1: 'Enterprise Plan',
      label1: 'Tier Level',
      metric2: '$57,600 ARR',
      label2: 'Contract Value',
      metric3: 'Expansion',
      label3: 'Pipeline Type'
    }
  },

  refund: {
    name: 'Dispute / Refund in Payment Gateway',
    latency: '295ms',
    checksum: 'sha256:9c1044ba902e',
    stripe: {
      metric1: '-$1,250.00',
      label1: 'Refund Dispatched',
      metric2: 're_18920199',
      label2: 'Refund ID',
      metric3: 'Settled',
      label3: 'Gateway State'
    },
    quickbooks: {
      metric1: 'CM-2026-081',
      label1: 'Credit Memo',
      metric2: '-$1,250.00',
      label2: 'Contra Revenue',
      metric3: 'Audited',
      label3: 'Audit Trail'
    },
    grist: {
      metric1: 'RETURN_RESTOCK',
      label1: 'Inventory Status',
      metric2: '+2 Units Restocked',
      label2: 'Stock Delta',
      metric3: 'Auto-Logged',
      label3: 'Audit Status'
    },
    hubspot: {
      metric1: 'Health: At-Risk',
      label1: 'CS Health Score',
      metric2: 'Ticket #4928',
      label2: 'Support Escalation',
      metric3: 'Task Dispatched',
      label3: 'CSM Alert'
    }
  }
};

let currentMeshScenario = 'payment';

function initConsistencyMesh() {
  const triggerBtns = document.querySelectorAll('.trigger-btn');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.getAttribute('data-scenario');
      if (!scenario || !MESH_SCENARIOS[scenario]) return;

      triggerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMeshScenario = scenario;
      executeMeshSync(scenario);
    });
  });

  executeMeshSync('payment', false);
}

function executeMeshSync(scenarioKey, animate = true) {
  const data = MESH_SCENARIOS[scenarioKey];
  if (!data) return;

  const nodes = document.querySelectorAll('.mesh-node-card');
  const latencyEl = document.getElementById('mesh-latency-metric');
  const checksumEl = document.getElementById('mesh-checksum-metric');

  if (latencyEl) latencyEl.textContent = data.latency;
  if (checksumEl) checksumEl.textContent = data.checksum;

  // Update Node Values
  updateNodeData('node-stripe', data.stripe);
  updateNodeData('node-quickbooks', data.quickbooks);
  updateNodeData('node-grist', data.grist);
  updateNodeData('node-hubspot', data.hubspot);

  if (animate) {
    nodes.forEach(node => {
      node.classList.remove('pulse-updated');
      void node.offsetWidth; // Force DOM reflow
      node.classList.add('pulse-updated');
      setTimeout(() => node.classList.remove('pulse-updated'), 1000);
    });
    showToast(`✓ Consistency Mesh synchronized 4 platforms in ${data.latency}! SHA-256 Verified.`);
  }
}

function updateNodeData(nodeId, nodeData) {
  const node = document.getElementById(nodeId);
  if (!node || !nodeData) return;

  const rows = node.querySelectorAll('.node-state-row');
  if (rows.length >= 3) {
    rows[0].querySelector('span').textContent = nodeData.label1;
    rows[0].querySelector('strong').textContent = nodeData.metric1;

    rows[1].querySelector('span').textContent = nodeData.label2;
    rows[1].querySelector('strong').textContent = nodeData.metric2;

    rows[2].querySelector('span').textContent = nodeData.label3;
    rows[2].querySelector('strong').textContent = nodeData.metric3;
  }
}

// ===========================================================================
// 2. SELF-AUDITING & SELF-HEALING ENGINE CONTROLLER
// ===========================================================================
let isHealingSimRunning = false;

function initSelfHealingEngine() {
  const simBtn = document.getElementById('run-healing-sim-btn');
  if (!simBtn) return;

  simBtn.addEventListener('click', () => {
    if (isHealingSimRunning) return;
    runHealingSimulation();
  });
}

function runHealingSimulation() {
  isHealingSimRunning = true;
  const simBtn = document.getElementById('run-healing-sim-btn');
  const steps = document.querySelectorAll('.healing-step-card');
  const consoleFeed = document.getElementById('healing-console-logs');

  if (simBtn) {
    simBtn.disabled = true;
    simBtn.innerHTML = `
      <svg class="spin-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      </svg>
      <span>Simulating Healing Protocol...</span>
    `;
  }

  // Reset steps
  steps.forEach(s => s.classList.remove('active', 'resolved'));

  if (consoleFeed) {
    consoleFeed.innerHTML = `
      <div class="log-entry">[00:00.00] Ingesting webhook event: customer.subscription.updated (Payload: 4.2KB)</div>
    `;
  }

  // Step 1: Checksum Audit
  setTimeout(() => {
    if (steps[0]) steps[0].classList.add('resolved');
    appendLog(consoleFeed, '[00:00.08] [PASS] Cryptographic SHA-256 Checksum verified: 8f910ab... valid.', 'success');
  }, 400);

  // Step 2: Schema Normalization
  setTimeout(() => {
    if (steps[1]) steps[1].classList.add('resolved');
    appendLog(consoleFeed, '[00:00.22] [PASS] Pydantic schema validation: 18 fields cast & normalized.', 'success');
  }, 900);

  // Step 3: Simulated 429 Rate Limit Encountered & Backoff
  setTimeout(() => {
    if (steps[2]) steps[2].classList.add('active');
    appendLog(consoleFeed, '[00:00.35] [WARN] Downstream ERP returned HTTP 429 (Rate-Limited: 120 req/sec exceeded).', 'warn');
    appendLog(consoleFeed, '[00:00.38] [AUTO-HEAL] Engaging exponential backoff jitter: t * 2^1 = 400ms delay.', 'warn');
  }, 1500);

  // Step 4: Backoff Retry 2 & Self-Healing Completion
  setTimeout(() => {
    if (steps[2]) {
      steps[2].classList.remove('active');
      steps[2].classList.add('resolved');
    }
    if (steps[3]) steps[3].classList.add('resolved');

    appendLog(consoleFeed, '[00:00.82] [RETRY 1] Retrying webhook delivery with backoff token...', 'warn');
    appendLog(consoleFeed, '[00:00.94] [SUCCESS] Downstream QuickBooks GL ACK 200 OK. Zero data loss.', 'success');
    appendLog(consoleFeed, '[00:01.05] [AUDIT] Dead-Letter Queue clear (0 quarantined records).', 'success');

    if (simBtn) {
      simBtn.disabled = false;
      simBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Simulate 429 Failure & Auto-Heal</span>
      `;
    }
    isHealingSimRunning = false;
    showToast('✓ Self-Healing Engine resolved 429 rate limit via exponential backoff with zero data loss!');
  }, 2300);
}

function appendLog(container, text, type = '') {
  if (!container) return;
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.textContent = text;
  container.appendChild(entry);
  container.scrollTop = container.scrollHeight;
}

// ===========================================================================
// 3. HUMAN-IN-THE-LOOP (HITL) AUTO-PROMPTING SYSTEM CONTROLLER
// ===========================================================================
function initHitlAlerts() {
  const thresholdSlider = document.getElementById('variance-threshold-slider');
  const thresholdVal = document.getElementById('variance-threshold-val');
  const reconcileBtn = document.getElementById('hitl-action-reconcile');
  const rollbackBtn = document.getElementById('hitl-action-rollback');
  const splitBtn = document.getElementById('hitl-action-split');
  const slackStatus = document.getElementById('slack-resolution-status');

  if (thresholdSlider && thresholdVal) {
    thresholdSlider.addEventListener('input', (e) => {
      thresholdVal.textContent = `$${parseInt(e.target.value, 10).toLocaleString()}`;
    });
  }

  if (reconcileBtn) {
    reconcileBtn.addEventListener('click', () => {
      if (slackStatus) {
        slackStatus.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; padding: 0.75rem; border-radius: 6px; color: #34d399; font-size: 0.8rem; font-weight: 700;">
            ✓ RESOLVED by Executive: Reconciled $500 delta directly to General Ledger (GL Account 1010-Cash).
          </div>
        `;
      }
      showToast('✓ Discrepancy accepted & reconciled to GL with executive cryptographic signature.');
    });
  }

  if (rollbackBtn) {
    rollbackBtn.addEventListener('click', () => {
      if (slackStatus) {
        slackStatus.innerHTML = `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; padding: 0.75rem; border-radius: 6px; color: #f87171; font-size: 0.8rem; font-weight: 700;">
            ↺ ROLLED BACK: Transaction quarantined in DLQ. Finance team alerted in #finance-escalations.
          </div>
        `;
      }
      showToast('↺ Transaction rolled back and quarantined in Dead-Letter-Queue.');
    });
  }

  if (splitBtn) {
    splitBtn.addEventListener('click', () => {
      if (slackStatus) {
        slackStatus.innerHTML = `
          <div style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; padding: 0.75rem; border-radius: 6px; color: #38bdf8; font-size: 0.8rem; font-weight: 700;">
            ✏️ AUTO-SPLIT EXECUTED: $14,350 mapped to Revenue + $500 allocated to FX Variance Account 4090.
          </div>
        `;
      }
      showToast('✓ Split transaction mapped across primary revenue and foreign exchange accounts.');
    });
  }
}

// ===========================================================================
// 4. TOAST NOTIFICATION SUPPORT
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
    border-left: 4px solid #10b981;
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
