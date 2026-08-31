/**
 * WISER WORKFLOWS - Data Pipelines & BI Dashboards Interactive Controller
 * Powers Data Lake Stream Inspector, Growth Velocity Monitor & Scenario Forecaster
 */

document.addEventListener('DOMContentLoaded', () => {
  initConsolidationEngine();
  initGrowthMonitor();
  initScenarioForecaster();
  initToastSupport();
});

// ===========================================================================
// 1. MULTI-SOURCE DATA CONSOLIDATION ENGINE
// ===========================================================================
const DATA_STREAMS = {
  'marketing-ads': {
    title: 'Marketing & Multi-Channel Ad Spend',
    icon: '📣',
    cadence: '15-Min Micro-Batch',
    metric1Label: 'Monthly Ad Spend',
    metric1Val: '$42,500.00',
    metric2Label: 'Blended CAC',
    metric2Val: '$340.00',
    metric3Label: 'Attributed ROAS',
    metric3Val: '4.8x Target',
    metric4Label: 'Source Channels',
    metric4Val: 'Google, Meta, LinkedIn',
    dbtFile: 'models/staging/stg_marketing_ad_performance.sql',
    sqlCode: `-- dbt Transformation Model: Normalized Marketing Ad Performance
{{ config(materialized='incremental', unique_key='ad_campaign_id') }}

SELECT
    campaign_id AS ad_campaign_id,
    channel_source, -- 'google_ads' | 'meta_ads' | 'linkedin'
    DATE_TRUNC(timestamp_utc, DAY) AS reporting_date,
    SUM(spend_usd) AS total_ad_spend,
    SUM(impressions) AS total_impressions,
    SUM(clicks) AS total_clicks,
    SAFE_DIVIDE(SUM(spend_usd), SUM(conversions)) AS blended_cac_usd,
    SAFE_DIVIDE(SUM(attributed_revenue_usd), SUM(spend_usd)) AS roas_multiple
FROM {{ source('raw_marketing_lake', 'campaign_telemetry') }}
WHERE timestamp_utc >= CURRENT_DATE() - INTERVAL 90 DAY
GROUP BY 1, 2, 3;`
  },

  'sales-velocity': {
    title: 'Sales Pipeline & Deal Desk Velocity',
    icon: '💼',
    cadence: 'Real-Time Webhook (CDC)',
    metric1Label: 'Active Pipeline',
    metric1Val: '$1,850,000',
    metric2Label: 'Win Rate (Proposal)',
    metric2Val: '32.4%',
    metric3Label: 'Avg Sales Cycle',
    metric3Val: '8.2 Days',
    metric4Label: 'Primary CRM',
    metric4Val: 'HubSpot & Salesforce',
    dbtFile: 'models/marts/fct_sales_pipeline_velocity.sql',
    sqlCode: `-- dbt Mart: Real-Time Sales Pipeline & Conversion Velocity
{{ config(materialized='table') }}

WITH deal_stages AS (
    SELECT
        deal_id,
        company_name,
        deal_amount_usd,
        stage_name,
        created_at_utc,
        closed_at_utc,
        DATE_DIFF(closed_at_utc, created_at_utc, DAY) AS days_in_pipeline
    FROM {{ ref('stg_crm_deals') }}
)
SELECT
    DATE_TRUNC(closed_at_utc, WEEK) AS closed_week,
    COUNT(DISTINCT deal_id) AS total_closed_deals,
    SUM(deal_amount_usd) AS closed_won_arr,
    AVG(days_in_pipeline) AS avg_sales_velocity_days,
    COUNTIF(stage_name = 'Closed-Won') / COUNT(*) AS conversion_rate
FROM deal_stages
GROUP BY 1;`
  },

  'support-health': {
    title: 'Customer Support & CS Account Health',
    icon: '🎧',
    cadence: 'Hourly Sync',
    metric1Label: 'Monthly Tickets',
    metric1Val: '1,420 Resolved',
    metric2Label: 'First Response Time',
    metric2Val: '4.2 Minutes',
    metric3Label: 'CSAT Rating',
    metric3Val: '98.2% Positive',
    metric4Label: 'CS Platform',
    metric4Val: 'Zendesk & Intercom',
    dbtFile: 'models/marts/fct_support_csat_retention.sql',
    sqlCode: `-- dbt Mart: CS Health & Net Retention Telemetry
{{ config(materialized='view') }}

SELECT
    c.account_id,
    c.account_name,
    COUNT(t.ticket_id) AS open_tickets_30d,
    AVG(t.first_response_time_minutes) AS avg_first_response_min,
    AVG(t.csat_score) AS average_csat_rating,
    CASE 
        WHEN AVG(t.csat_score) >= 4.5 THEN 'HEALTHY'
        WHEN AVG(t.csat_score) >= 3.5 THEN 'MONITOR'
        ELSE 'AT_RISK'
    END AS account_health_status
FROM {{ ref('stg_accounts') }} c
LEFT JOIN {{ ref('stg_support_tickets') }} t ON c.account_id = t.account_id
GROUP BY 1, 2;`
  },

  'financials-gl': {
    title: 'General Ledger & Cash Flow Accounting',
    icon: '💳',
    cadence: 'Sub-Second Webhooks',
    metric1Label: 'Monthly Revenue',
    metric1Val: '$184,500.00',
    metric2Label: 'Gross Margin',
    metric2Val: '82.4%',
    metric3Label: 'Net Cash Flow',
    metric3Val: '+$64,200.00',
    metric4Label: 'Accounting Engine',
    metric4Val: 'Stripe & QuickBooks Online',
    dbtFile: 'models/marts/mart_financial_pnl_monthly.sql',
    sqlCode: `-- dbt Mart: Executive P&L and Automated Cash Flow Reconciliation
{{ config(materialized='table') }}

SELECT
    DATE_TRUNC(posting_date, MONTH) AS fiscal_month,
    SUM(CASE WHEN gl_account_type = 'REVENUE' THEN amount_usd ELSE 0 END) AS gross_revenue_usd,
    SUM(CASE WHEN gl_account_type = 'COGS' THEN amount_usd ELSE 0 END) AS total_cogs_usd,
    SUM(CASE WHEN gl_account_type = 'OPEX' THEN amount_usd ELSE 0 END) AS total_opex_usd,
    (SUM(CASE WHEN gl_account_type = 'REVENUE' THEN amount_usd ELSE 0 END) -
     SUM(CASE WHEN gl_account_type = 'COGS' THEN amount_usd ELSE 0 END)) / 
     NULLIF(SUM(CASE WHEN gl_account_type = 'REVENUE' THEN amount_usd ELSE 0 END), 0) AS gross_margin_pct
FROM {{ ref('stg_general_ledger_entries') }}
GROUP BY 1;`
  }
};

let currentStreamKey = 'marketing-ads';

function initConsolidationEngine() {
  const sourceButtons = document.querySelectorAll('.source-pill-btn');

  sourceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stream = btn.getAttribute('data-stream');
      if (!stream || !DATA_STREAMS[stream]) return;

      sourceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStreamKey = stream;
      renderStreamDetails();
    });
  });

  renderStreamDetails();
}

function renderStreamDetails() {
  const data = DATA_STREAMS[currentStreamKey];
  if (!data) return;

  const titleEl = document.getElementById('stream-card-title');
  const cadenceEl = document.getElementById('stream-cadence-tag');
  const m1Label = document.getElementById('stream-m1-label');
  const m1Val = document.getElementById('stream-m1-val');
  const m2Label = document.getElementById('stream-m2-label');
  const m2Val = document.getElementById('stream-m2-val');
  const m3Label = document.getElementById('stream-m3-label');
  const m3Val = document.getElementById('stream-m3-val');
  const m4Label = document.getElementById('stream-m4-label');
  const m4Val = document.getElementById('stream-m4-val');

  const dbtFileEl = document.getElementById('dbt-file-name');
  const sqlCodeEl = document.getElementById('dbt-sql-code');

  if (titleEl) titleEl.innerHTML = `${data.icon} <span>${data.title}</span>`;
  if (cadenceEl) cadenceEl.textContent = data.cadence;
  if (m1Label) m1Label.textContent = data.metric1Label;
  if (m1Val) m1Val.textContent = data.metric1Val;
  if (m2Label) m2Label.textContent = data.metric2Label;
  if (m2Val) m2Val.textContent = data.metric2Val;
  if (m3Label) m3Label.textContent = data.metric3Label;
  if (m3Val) m3Val.textContent = data.metric3Val;
  if (m4Label) m4Label.textContent = data.metric4Label;
  if (m4Val) m4Val.textContent = data.metric4Val;

  if (dbtFileEl) dbtFileEl.textContent = data.dbtFile;
  if (sqlCodeEl) sqlCodeEl.textContent = data.sqlCode;
}

// ===========================================================================
// 2. INTERACTIVE WEEKLY GROWTH & TREND VELOCITY MONITOR
// ===========================================================================
const TIMEFRAME_DATA = {
  '7d': {
    revenueVelocity: '+$38,400',
    revenueGrowth: '+18.4% WoW',
    cacLtv: '4.8x',
    cacLtvSub: 'Target > 3.0x',
    salesDays: '8.2 Days',
    salesDaysSub: '-3.4 days vs baseline',
    hoursReclaimed: '46.5 Hrs',
    hoursSub: 'Saved across 12 reps',
    sparklineActual: 'M 0 120 Q 80 110, 160 85 T 320 60 T 480 35 T 640 20',
    sparklineProjected: 'M 0 130 Q 80 120, 160 100 T 320 80 T 480 55 T 640 40'
  },
  '30d': {
    revenueVelocity: '+$164,200',
    revenueGrowth: '+24.2% MoM',
    cacLtv: '5.2x',
    cacLtvSub: 'Top decile SaaS health',
    salesDays: '7.8 Days',
    salesDaysSub: '-4.8 days vs baseline',
    hoursReclaimed: '184.0 Hrs',
    hoursSub: 'Saved across 12 reps',
    sparklineActual: 'M 0 140 Q 80 125, 160 90 T 320 55 T 480 30 T 640 10',
    sparklineProjected: 'M 0 145 Q 80 135, 160 110 T 320 85 T 480 60 T 640 35'
  },
  'qtd': {
    revenueVelocity: '+$512,000',
    revenueGrowth: '+31.8% QoQ',
    cacLtv: '5.6x',
    cacLtvSub: 'Capital-efficient scale',
    salesDays: '7.1 Days',
    salesDaysSub: '-6.2 days vs baseline',
    hoursReclaimed: '540.0 Hrs',
    hoursSub: 'Saved across 12 reps',
    sparklineActual: 'M 0 150 Q 80 130, 160 80 T 320 40 T 480 20 T 640 5',
    sparklineProjected: 'M 0 150 Q 80 140, 160 115 T 320 90 T 480 65 T 640 30'
  }
};

let currentTimeframe = '7d';

function initGrowthMonitor() {
  const timeframeBtns = document.querySelectorAll('.timeframe-btn');

  timeframeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tf = btn.getAttribute('data-tf');
      if (!tf || !TIMEFRAME_DATA[tf]) return;

      timeframeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTimeframe = tf;
      renderGrowthMetrics();
    });
  });

  renderGrowthMetrics();
}

function renderGrowthMetrics() {
  const data = TIMEFRAME_DATA[currentTimeframe];
  if (!data) return;

  const revValEl = document.getElementById('kpi-revenue-val');
  const revGrowthEl = document.getElementById('kpi-revenue-growth');
  const cacValEl = document.getElementById('kpi-cac-val');
  const cacSubEl = document.getElementById('kpi-cac-sub');
  const daysValEl = document.getElementById('kpi-days-val');
  const daysSubEl = document.getElementById('kpi-days-sub');
  const hoursValEl = document.getElementById('kpi-hours-val');
  const hoursSubEl = document.getElementById('kpi-hours-sub');

  const sparkActual = document.getElementById('sparkline-actual');
  const sparkProjected = document.getElementById('sparkline-projected');

  if (revValEl) revValEl.textContent = data.revenueVelocity;
  if (revGrowthEl) revGrowthEl.textContent = data.revenueGrowth;
  if (cacValEl) cacValEl.textContent = data.cacLtv;
  if (cacSubEl) cacSubEl.textContent = data.cacLtvSub;
  if (daysValEl) daysValEl.textContent = data.salesDays;
  if (daysSubEl) daysSubEl.textContent = data.salesDaysSub;
  if (hoursValEl) hoursValEl.textContent = data.hoursReclaimed;
  if (hoursSubEl) hoursSubEl.textContent = data.hoursSub;

  if (sparkActual) sparkActual.setAttribute('d', data.sparklineActual);
  if (sparkProjected) sparkProjected.setAttribute('d', data.sparklineProjected);
}

// ===========================================================================
// 3. FUTURE OPPORTUNITY & SCENARIO FORECASTER
// ===========================================================================
function initScenarioForecaster() {
  const leadSlider = document.getElementById('forecast-lead-slider');
  const effSlider = document.getElementById('forecast-eff-slider');
  const winSlider = document.getElementById('forecast-win-slider');

  const leadVal = document.getElementById('forecast-lead-val');
  const effVal = document.getElementById('forecast-eff-val');
  const winVal = document.getElementById('forecast-win-val');

  function updateForecaster() {
    const leadGrowth = parseInt(leadSlider.value, 10);
    const effGain = parseInt(effSlider.value, 10);
    const winRate = parseInt(winSlider.value, 10);

    if (leadVal) leadVal.textContent = `+${leadGrowth}%`;
    if (effVal) effVal.textContent = `+${effGain}%`;
    if (winVal) winVal.textContent = `${winRate}%`;

    // Mathematical ARR Impact Modeling
    const baseArr = 1200000;
    const leadFactor = 1 + (leadGrowth / 100);
    const winRateFactor = winRate / 20; // 20% baseline win rate
    const efficiencyFactor = 1 + (effGain / 100 * 0.5);

    const projectedArrDelta = Math.round(baseArr * (leadFactor * winRateFactor * efficiencyFactor - 1));
    const hoursSavedYear = Math.round(1200 + (effGain * 24));
    const workingCapitalGain = Math.round(projectedArrDelta * 0.28);
    const capacityMultiplier = (leadFactor * efficiencyFactor).toFixed(1);

    const arrEl = document.getElementById('forecast-arr-val');
    const hoursEl = document.getElementById('forecast-hours-val');
    const capitalEl = document.getElementById('forecast-capital-val');
    const capacityEl = document.getElementById('forecast-capacity-val');

    if (arrEl) arrEl.textContent = `+$${projectedArrDelta.toLocaleString()}`;
    if (hoursEl) hoursEl.textContent = `${hoursSavedYear.toLocaleString()} Hrs/yr`;
    if (capitalEl) capitalEl.textContent = `+$${workingCapitalGain.toLocaleString()}`;
    if (capacityEl) capacityEl.textContent = `${capacityMultiplier}x Scale (0 Hires)`;
  }

  [leadSlider, effSlider, winSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', updateForecaster);
  });

  updateForecaster();
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
    border-left: 4px solid #9333ea;
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
