/**
 * WISER WORKFLOWS - CRM & Pipeline Automation Interactive Controller
 * Powers the Follow-up Queue Simulator, SOW E-Signature Studio & 3-Stage Cost Transparency Scale
 */

document.addEventListener('DOMContentLoaded', () => {
  initFollowupQueue();
  initSowStudio();
  initCostTransparency();
  initToastSupport();
});

// ===========================================================================
// 1. LEAD INGESTION & INDIVIDUALIZED FOLLOW-UP QUEUE
// ===========================================================================
const QUEUE_DATA = {
  'saas-founder': {
    leadName: 'Sarah Jenkins',
    leadRole: 'CEO & Co-Founder',
    company: 'CloudScale Analytics',
    employees: '65 FTE',
    revenue: '$8.5M ARR',
    crm: 'HubSpot Enterprise',
    score: '98/100 (Hot Inbound)',
    painPoint: 'Enterprise deal cycle stalled at proposal/SOW phase, losing 6-8 days per deal.',
    cadence: {
      0: {
        timing: 'Day 0 • T + 45 Seconds (Instant Trigger)',
        title: 'Instant Context-Rich Ingestion & Welcome',
        desc: 'Dispatched 45s after lead fills form, personalized to SaaS scale & HubSpot stack.',
        subject: 'Quick question regarding CloudScale’s enterprise deal velocity',
        tones: {
          consultative: `Hi Sarah,\n\nNoticed you're scaling CloudScale Analytics through the $8M+ ARR mark on HubSpot—congrats on the recent momentum!\n\nAt your current volume of ~12 enterprise proposals/mo, manual SOW generation and multi-day signature delays typically cost high-growth SaaS teams <span class="token-highlight">$42,000+ per quarter</span> in postponed cash flow.\n\nWe built an automated deal desk bridge that generates custom SOWs directly from HubSpot deal stages in < 90 seconds. Would you be open to seeing a 2-minute interactive blueprint tailored to CloudScale?`,
          executive: `Sarah — saw CloudScale's inquiry. At 65 FTE and $8.5M ARR, reducing your enterprise close cycle by even 4 days unlocks <span class="token-highlight">+$140k/yr in accelerated working capital</span>.\n\nWe automate lead-to-cash handoffs from HubSpot to PandaDoc and Stripe with zero human rep touching. Let’s review your pipeline blueprint this week: <span class="token-highlight">wiserworkflows.com/meet/sarah</span>`,
          technical: `Hi Sarah,\n\nReceived your webhook event via HubSpot. Based on your current stack (HubSpot Enterprise + Stripe Billing), our bidirectional webhook pipeline syncs custom deal properties into auto-drafted legal schemas (Pydantic/Zod), triggering DocuSign webhooks that auto-advance pipeline stages to <span class="token-highlight">Closed-Won</span> with sub-second latency.\n\nAttached is the architectural schema for CloudScale.`
        }
      },
      2: {
        timing: 'Day 2 • T + 48 Hours (Value & ROI Proof)',
        title: 'Custom ROI Projection & Friction Audit',
        desc: 'Delivers custom quantitative analysis calculated from lead company inputs.',
        subject: 'CloudScale Analytics: Projected 42h/mo savings model',
        tones: {
          consultative: `Sarah — ran the numbers against CloudScale’s current team size and pipeline volume.\n\nAutomating your sales-to-CS handoff and contract generation will save your Account Executives <span class="token-highlight">18.5 hours/week</span> in administrative deal logging, reducing proposal turnaround from 5 business days to <span class="token-highlight">under 12 minutes</span>.\n\nHere is your full breakdown: <span class="token-highlight">wiserworkflows.com/roi/cloudscale-report</span>`,
          executive: `Sarah — quick ROI update: CloudScale's projected payback period on pipeline automation is <span class="token-highlight">2.4 months</span>, delivering an estimated <span class="token-highlight">$168,000 net annualized ROI</span>.\n\nHappy to walk through the fixed-fee scope on a 15-minute call Thursday or Friday: <span class="token-highlight">wiserworkflows.com/meet/sarah</span>`,
          technical: `Sarah — telemetry audit update: By eliminating manual Zapier multi-step rate limits and replacing them with our dedicated event-driven Redis queue, CloudScale avoids API rate-limiting spikes during month-end closes and guarantees <span class="token-highlight">99.99% webhook delivery SLA</span>.`
        }
      },
      4: {
        timing: 'Day 4 • T + 96 Hours (Pre-Drafted SOW Lock)',
        title: 'Executive Closing Nudge with Pre-Drafted SOW',
        desc: 'Removes all buying friction by presenting a ready-to-sign SOW link.',
        subject: 'Draft SOW ready for CloudScale Analytics automation rollout',
        tones: {
          consultative: `Sarah,\n\nTo make this frictionless for you and your leadership team, I’ve pre-drafted the complete Statement of Work (SOW) based on your HubSpot requirements.\n\nIt includes full milestone deliverables, 3-week rollout schedule, and guaranteed SLA. You can review and e-sign directly here: <span class="token-highlight">wiserworkflows.com/sow/cloudscale-v1</span>\n\nLooking forward to accelerating CloudScale’s revenue engine!`,
          executive: `Sarah — final follow-up: Your custom SOW is generated and locked at our guaranteed fixed rate ($38,500). 1-click review and execute here: <span class="token-highlight">wiserworkflows.com/sow/cloudscale-v1</span>.\n\nIf you prefer a 10-minute sync first: <span class="token-highlight">wiserworkflows.com/meet/sarah</span>`,
          technical: `Sarah — your deployment architecture and milestone SOW are finalized. Review the SOC2 data boundary definitions, webhook retry schemas, and e-signature terms at <span class="token-highlight">wiserworkflows.com/sow/cloudscale-v1</span>.`
        }
      }
    }
  },

  'construction-ops': {
    leadName: 'David Morales',
    leadRole: 'VP of Operations',
    company: 'Apex Commercial Builders',
    employees: '240 Field Staff',
    revenue: '$35M Annual Vol',
    crm: 'Salesforce + Procore',
    score: '96/100 (High Intent)',
    painPoint: 'Subcontractor change-orders delayed by 14+ days, causing billing cash flow leaks.',
    cadence: {
      0: {
        timing: 'Day 0 • T + 45 Seconds (Instant Trigger)',
        title: 'Field-to-Office Intake & Response',
        desc: 'Instant response referencing Procore and subcontractor change-order delays.',
        subject: 'Apex Commercial Builders: Subcontractor Change-Order Automation',
        tones: {
          consultative: `Hi David,\n\nSaw Apex Builders’ inquiry regarding subcontractor workflows across your commercial job sites.\n\nIn commercial general contracting at the $35M+ scale, manual paper change-order approvals typically tie up <span class="token-highlight">$180,000+ in delayed monthly draw requests</span>.\n\nWe connect Procore field logs directly to Salesforce and QuickBooks, eliminating change-order delays within 48 hours. Open to reviewing a 2-minute visual workflow?`,
          executive: `David — saw your note. For commercial GCs with 200+ field staff, automating change-order approvals compresses your payment draw cycle from 18 days to <span class="token-highlight">under 72 hours</span>.\n\nLet’s review the turnkey blueprint for Apex: <span class="token-highlight">wiserworkflows.com/meet/david</span>`,
          technical: `David — received your intake. Our system interfaces with Procore APIs (V2) and Salesforce via bi-directional webhook listeners, mapping daily field logs directly to G702/G703 AIA billing sheets with zero manual double-entry.`
        }
      },
      2: {
        timing: 'Day 2 • T + 48 Hours (Value & ROI Proof)',
        title: 'Draw Request Compression ROI Analysis',
        desc: 'Delivers commercial GC cash-flow acceleration modeling.',
        subject: 'Apex Builders: 14-Day Billing Cycle Compression Model',
        tones: {
          consultative: `David — calculated the cost of field approval friction across Apex’s current project count.\n\nAutomating your subcontractor sign-offs will save your Project Managers <span class="token-highlight">24 hours/week</span> and accelerate monthly retainage collections by <span class="token-highlight">11 business days</span>.\n\nDetailed GC model: <span class="token-highlight">wiserworkflows.com/roi/apex-gc-report</span>`,
          executive: `David — ROI summary for Apex: Projected annual working capital gain is <span class="token-highlight">$320,000</span> with a 6-week full production rollout.\n\nLet's schedule a 15-minute review: <span class="token-highlight">wiserworkflows.com/meet/david</span>`,
          technical: `David — technical compliance update: All mobile digital field sign-offs capture GPS geotags, timestamp SHA-256 hashes, and subcontractor PE certifications to ensure 100% lien waiver compliance.`
        }
      },
      4: {
        timing: 'Day 4 • T + 96 Hours (Pre-Drafted SOW Lock)',
        title: 'Pre-Drafted Fixed-Fee Master SOW',
        desc: 'Pre-populated GC contract with milestone schedule & AIA billing terms.',
        subject: 'Master SOW ready: Apex Commercial Builders Pipeline Sync',
        tones: {
          consultative: `David,\n\nTo keep things moving without burdening your Estimating team, I’ve generated Apex’s complete Statement of Work.\n\nIncludes Procore-to-QuickBooks integration, mobile e-signature pad for job site supers, and guaranteed 4-week delivery: <span class="token-highlight">wiserworkflows.com/sow/apex-builders-v1</span>`,
          executive: `David — SOW is pre-approved and ready for digital execution: <span class="token-highlight">wiserworkflows.com/sow/apex-builders-v1</span>. Fixed price of $44,000 with milestone billing. Let's get Apex's field ops automated.`,
          technical: `David — contract and API security terms ready for legal review at <span class="token-highlight">wiserworkflows.com/sow/apex-builders-v1</span>.`
        }
      }
    }
  },

  'logistics-vp': {
    leadName: 'Elena Rostova',
    leadRole: 'Director of Supply Chain Operations',
    company: 'Pacific Freight Global',
    employees: '18 Distribution Hubs',
    revenue: '$120M Freight Vol',
    crm: 'Salesforce + SAP TMS',
    score: '99/100 (Enterprise Tier)',
    painPoint: 'Multi-carrier customs invoices take 4-5 days to audit, delaying container release.',
    cadence: {
      0: {
        timing: 'Day 0 • T + 45 Seconds (Instant Trigger)',
        title: 'Enterprise Freight Intake & SLA Guarantee',
        desc: 'Instant response addressing EDI, customs clearances, and demurrage fees.',
        subject: 'Pacific Freight Global: Demurrage & Customs Automation',
        tones: {
          consultative: `Hi Elena,\n\nThank you for reaching out regarding Pacific Freight’s multi-hub customs operations.\n\nAcross 18 distribution hubs, manual tariff cross-checking and slow invoice approvals often result in <span class="token-highlight">$250,000+ in avoidable port demurrage fees</span> each year.\n\nOur autonomous document ingestion pipeline extracts commercial invoices and customs docs in < 750ms, auto-reconciling against SAP TMS deal terms. Would you like to review an interactive demo?`,
          executive: `Elena — saw your inquiry. For freight operations managing $100M+ volume, our sub-second customs extraction eliminates 100% of container demurrage delays.\n\nDirect scheduling link: <span class="token-highlight">wiserworkflows.com/meet/elena</span>`,
          technical: `Elena — intake acknowledged. Our multimodal OCR agents parse multimodal bills of lading (EDI 214/310/850) and sync verified line-item tariffs directly to SAP TMS with 99.98% confidence scoring.`
        }
      },
      2: {
        timing: 'Day 2 • T + 48 Hours (Value & ROI Proof)',
        title: 'Demurrage Reduction & Carrier Velocity Audit',
        desc: 'Quantified carrier invoice reconciliation modeling.',
        subject: 'Pacific Freight: Demurrage Savings & Hub Velocity Model',
        tones: {
          consultative: `Elena — quantified the operational impact across Pacific Freight’s 18 hubs.\n\nAutonomous carrier matching compresses bill audit time from 4.5 days to <span class="token-highlight">sub-second validation</span>, saving your ops coordinators <span class="token-highlight">62 hours/week</span>.\n\nCustom freight model: <span class="token-highlight">wiserworkflows.com/roi/pacific-freight-report</span>`,
          executive: `Elena — ROI summary: Projected annual hard-cost savings of <span class="token-highlight">$410,000</span> in eliminated demurrage and manual billing audit labor.\n\n15-min executive briefing: <span class="token-highlight">wiserworkflows.com/meet/elena</span>`,
          technical: `Elena — benchmark metrics: 0% tariff misclassifications, sub-750ms processing per multi-currency invoice, and automatic dispute generation for carrier surcharges exceeding contract caps.`
        }
      },
      4: {
        timing: 'Day 4 • T + 96 Hours (Pre-Drafted SOW Lock)',
        title: 'Enterprise Master Services Agreement (MSA) & SOW',
        desc: 'Enterprise contract with SOC2, GDPR, and EDI integration SLA.',
        subject: 'Master SOW & SLA: Pacific Freight Global Automation',
        tones: {
          consultative: `Elena,\n\nTo expedite your team’s Q4 deployment, I’ve prepared Pacific Freight’s complete Master SOW.\n\nIncludes SAP TMS bi-directional sync, customs clearance rules, and enterprise 99.99% SLA: <span class="token-highlight">wiserworkflows.com/sow/pacific-freight-v1</span>`,
          executive: `Elena — enterprise SOW finalized and locked at our guaranteed rate: <span class="token-highlight">wiserworkflows.com/sow/pacific-freight-v1</span>. Ready for 1-click electronic execution.`,
          technical: `Elena — enterprise security schedules, data privacy riders, and webhook SLAs ready for compliance review at <span class="token-highlight">wiserworkflows.com/sow/pacific-freight-v1</span>.`
        }
      }
    }
  }
};

let currentPersona = 'saas-founder';
let currentTone = 'consultative';
let currentDay = 0;

function initFollowupQueue() {
  const personaButtons = document.querySelectorAll('.persona-pill');
  const toneButtons = document.querySelectorAll('.tone-pill');
  const stepButtons = document.querySelectorAll('.cadence-step-btn');

  // Persona Selection
  personaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const persona = btn.getAttribute('data-persona');
      if (!persona || !QUEUE_DATA[persona]) return;

      personaButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPersona = persona;
      renderQueueSimulator();
    });
  });

  // Tone Selection
  toneButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tone = btn.getAttribute('data-tone');
      if (!tone) return;

      toneButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTone = tone;
      renderQueueSimulator();
    });
  });

  // Cadence Step Selection (Day 0, Day 2, Day 4)
  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = parseInt(btn.getAttribute('data-day'), 10);
      if (isNaN(day)) return;

      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDay = day;
      renderQueueSimulator();
    });
  });

  renderQueueSimulator();
}

function renderQueueSimulator() {
  const data = QUEUE_DATA[currentPersona];
  if (!data) return;

  const cadenceItem = data.cadence[currentDay];
  if (!cadenceItem) return;

  // Update Lead Intel Box
  const leadNameEl = document.getElementById('queue-lead-name');
  const leadScoreEl = document.getElementById('queue-lead-score');
  const leadDetailsEl = document.getElementById('queue-lead-details');

  if (leadNameEl) leadNameEl.textContent = `${data.leadName} — ${data.leadRole}`;
  if (leadScoreEl) leadScoreEl.textContent = data.score;
  if (leadDetailsEl) {
    leadDetailsEl.innerHTML = `
      <div>Company: <strong>${data.company}</strong></div>
      <div>Scale: <strong>${data.employees}</strong></div>
      <div>Volume: <strong>${data.revenue}</strong></div>
      <div>Current CRM: <strong>${data.crm}</strong></div>
    `;
  }

  // Update Email Preview Headers & Body
  const subjectEl = document.getElementById('queue-email-subject');
  const recipientEl = document.getElementById('queue-email-recipient');
  const timingEl = document.getElementById('queue-email-timing');
  const bodyEl = document.getElementById('queue-email-body');

  if (subjectEl) subjectEl.textContent = cadenceItem.subject;
  if (recipientEl) recipientEl.textContent = `${data.leadName} <${data.leadName.toLowerCase().replace(' ', '.')}@${data.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com>`;
  if (timingEl) timingEl.textContent = cadenceItem.timing;

  if (bodyEl) {
    const rawText = cadenceItem.tones[currentTone] || cadenceItem.tones['consultative'];
    bodyEl.innerHTML = rawText.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }
}

// ===========================================================================
// 2. PRE-DRAFTED SOW CONTRACTS & 1-CLICK E-SIGNATURE STUDIO
// ===========================================================================
let currentDealSize = 38500;
let currentTimelineWeeks = 3;
let isContractSigned = false;

function initSowStudio() {
  const dealSlider = document.getElementById('deal-size-slider');
  const timelineSlider = document.getElementById('timeline-slider');
  const scopeChips = document.querySelectorAll('.scope-chip-btn');
  const signContractBtn = document.getElementById('sign-contract-btn');

  if (dealSlider) {
    dealSlider.addEventListener('input', (e) => {
      currentDealSize = parseInt(e.target.value, 10);
      const valBadge = document.getElementById('deal-size-val');
      if (valBadge) valBadge.textContent = `$${currentDealSize.toLocaleString()}`;
      updateSowContractDetails();
    });
  }

  if (timelineSlider) {
    timelineSlider.addEventListener('input', (e) => {
      currentTimelineWeeks = parseInt(e.target.value, 10);
      const valBadge = document.getElementById('timeline-val');
      if (valBadge) valBadge.textContent = `${currentTimelineWeeks} Weeks`;
      updateSowContractDetails();
    });
  }

  scopeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      updateSowContractDetails();
    });
  });

  if (signContractBtn) {
    signContractBtn.addEventListener('click', () => {
      if (isContractSigned) return;
      executeContractSignature();
    });
  }

  updateSowContractDetails();
}

function updateSowContractDetails() {
  const clientNameEl = document.getElementById('sow-client-name');
  const contractTotalEl = document.getElementById('sow-contract-total');
  const milestoneDepositEl = document.getElementById('sow-milestone-deposit');
  const milestoneDeliveryEl = document.getElementById('sow-milestone-delivery');
  const timelineTextEl = document.getElementById('sow-timeline-text');

  const activeScopes = Array.from(document.querySelectorAll('.scope-chip-btn.active'))
    .map(c => c.textContent.trim());

  if (contractTotalEl) contractTotalEl.textContent = `$${currentDealSize.toLocaleString()}`;
  if (milestoneDepositEl) milestoneDepositEl.textContent = `$${(currentDealSize * 0.5).toLocaleString()} (50%)`;
  if (milestoneDeliveryEl) milestoneDeliveryEl.textContent = `$${(currentDealSize * 0.5).toLocaleString()} (50%)`;
  if (timelineTextEl) timelineTextEl.textContent = `${currentTimelineWeeks} Weeks from Kickoff`;

  // Update dynamic cost scale in sync
  updateCostTransparencyCalculations(currentDealSize);
}

function executeContractSignature() {
  isContractSigned = true;
  const signBtn = document.getElementById('sign-contract-btn');
  const watermark = document.getElementById('contract-watermark-tag');
  const downstreamCard = document.getElementById('downstream-flow-card');

  if (signBtn) {
    signBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>✓ Document Executed (DocuSign API)</span>
    `;
    signBtn.classList.remove('btn-primary');
    signBtn.classList.add('btn-secondary');
    signBtn.disabled = true;
  }

  if (watermark) {
    watermark.textContent = '✓ EXECUTED & LEGALLY BINDING';
    watermark.style.background = 'rgba(16, 185, 129, 0.2)';
    watermark.style.borderColor = '#10b981';
    watermark.style.color = '#047857';
  }

  if (downstreamCard) {
    downstreamCard.classList.add('active');
    animateDownstreamSteps();
  }

  showToast('✓ SOW Signed! Triggering downstream RevOps automations across CRM, Stripe & Slack...');
}

function animateDownstreamSteps() {
  const steps = document.querySelectorAll('.flow-step-item');
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('done');
      const icon = step.querySelector('.step-status-icon');
      if (icon) icon.textContent = '✓';
    }, (index + 1) * 450);
  });
}

// ===========================================================================
// 3. INTERACTIVE 3-STAGE COST TRANSPARENCY SCALE
// ===========================================================================
let currentTransparencyStage = 'executive'; // 'executive', 'milestone', 'itemized'

function initCostTransparency() {
  const stageButtons = document.querySelectorAll('.stage-tab-btn');

  stageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.getAttribute('data-stage');
      if (!stage) return;

      stageButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTransparencyStage = stage;
      renderTransparencyView();
    });
  });

  renderTransparencyView();
}

function renderTransparencyView() {
  const execView = document.getElementById('transparency-exec-view');
  const milestoneView = document.getElementById('transparency-milestone-view');
  const itemizedView = document.getElementById('transparency-itemized-view');

  if (execView) execView.style.display = currentTransparencyStage === 'executive' ? 'block' : 'none';
  if (milestoneView) milestoneView.style.display = currentTransparencyStage === 'milestone' ? 'block' : 'none';
  if (itemizedView) itemizedView.style.display = currentTransparencyStage === 'itemized' ? 'block' : 'none';
}

function updateCostTransparencyCalculations(totalInvestment) {
  // Executive Metrics
  const execTotalEl = document.getElementById('cost-exec-total');
  const execRoiEl = document.getElementById('cost-exec-roi');
  const execPaybackEl = document.getElementById('cost-exec-payback');
  const execHoursEl = document.getElementById('cost-exec-hours');

  const annualSavings = Math.round(totalInvestment * 4.25);
  const paybackMonths = (totalInvestment / (annualSavings / 12)).toFixed(1);
  const hoursSaved = Math.round(totalInvestment * 37.5);

  if (execTotalEl) execTotalEl.textContent = `$${totalInvestment.toLocaleString()}`;
  if (execRoiEl) execRoiEl.textContent = `$${annualSavings.toLocaleString()}/yr`;
  if (execPaybackEl) execPaybackEl.textContent = `${paybackMonths} Months`;
  if (execHoursEl) execHoursEl.textContent = `${hoursSaved.toLocaleString()} Hrs/yr`;

  // Milestone Stages
  const m1El = document.getElementById('cost-m1-val');
  const m2El = document.getElementById('cost-m2-val');
  const m3El = document.getElementById('cost-m3-val');
  const m4El = document.getElementById('cost-m4-val');

  if (m1El) m1El.textContent = `$${Math.round(totalInvestment * 0.2).toLocaleString()}`;
  if (m2El) m2El.textContent = `$${Math.round(totalInvestment * 0.45).toLocaleString()}`;
  if (m3El) m3El.textContent = `$${Math.round(totalInvestment * 0.2).toLocaleString()}`;
  if (m4El) m4El.textContent = `$${Math.round(totalInvestment * 0.15).toLocaleString()}`;

  // Itemized Table Total
  const itemizedTotalEl = document.getElementById('cost-itemized-total');
  if (itemizedTotalEl) itemizedTotalEl.textContent = `$${totalInvestment.toLocaleString()}`;
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
    border-left: 4px solid #e2725b;
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
