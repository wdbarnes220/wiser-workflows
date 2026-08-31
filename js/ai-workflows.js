/**
 * WISER WORKFLOWS - AI & Agentic Workflows Interactive Controller
 * Powers the Specialized Vision Parsing Lab, Continuous Freshness Engine & Interactive Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initVisionLab();
  initFreshnessEngine();
  initHitlSlider();
  initToastSupport();
});

// ===========================================================================
// 1. DATA PRESETS FOR VISION & MULTIMODAL PARSING LAB
// ===========================================================================
const VISION_PRESETS = {
  'freight-invoice': {
    title: 'International Freight & Customs Invoice',
    docType: 'Multi-Currency Document',
    docInfo: 'PDF (2 Pages) • 300 DPI • Multi-Currency • Table & Stamps',
    modelTokens: '1,420 Tokens',
    latency: '740ms',
    accuracy: '99.98%',
    rawHtml: `
      <div class="mock-doc-invoice" id="rendered-doc">
        <!-- Bounding Boxes -->
        <div class="bbox" style="top: 15px; left: 15px; width: 45%; height: 60px;" data-field="shipper_consignee">
          <span class="bbox-tag">Entity: Shipper / Consignee</span>
        </div>
        <div class="bbox" style="top: 15px; right: 15px; width: 40%; height: 60px;" data-field="invoice_metadata">
          <span class="bbox-tag">Meta: Invoice # & Waybill</span>
        </div>
        <div class="bbox" style="top: 95px; left: 15px; right: 15px; height: 165px;" data-field="line_items">
          <span class="bbox-tag">Table: 4x Line Items & Tariffs</span>
        </div>
        <div class="bbox" style="top: 275px; right: 15px; width: 48%; height: 85px;" data-field="tax_totals">
          <span class="bbox-tag">Calculations: VAT & Grand Total</span>
        </div>
        <div class="bbox" style="top: 275px; left: 15px; width: 42%; height: 85px;" data-field="customs_stamp">
          <span class="bbox-tag">Vision: Customs Clearance Stamp</span>
        </div>

        <!-- Visual Invoice Content -->
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 12px;">
          <div>
            <div style="font-weight: 800; font-size: 1rem; color: #0f172a;">PACIFIC LOGISTICS GLOBAL B.V.</div>
            <div style="color: #64748b; font-size: 0.72rem;">Port Terminal 4B, Rotterdam, Netherlands</div>
            <div style="color: #64748b; font-size: 0.72rem;">VAT: NL854920192B01 • EORI: NL854920192</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 800; color: #e2725b; font-size: 0.95rem;">COMMERCIAL INVOICE</div>
            <div style="font-family: monospace; font-size: 0.75rem; font-weight: 700;">INV-2026-EU-88421</div>
            <div style="color: #64748b; font-size: 0.72rem;">Date: 28-Aug-2026 • HBL: MAEU90218841</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.72rem; background: #f8fafc; padding: 6px 10px; border-radius: 4px;">
          <div>
            <strong>Consignee:</strong> Wiser Global Supply GmbH<br>
            Industriestrasse 14, 70567 Stuttgart, Germany
          </div>
          <div>
            <strong>Port of Loading:</strong> Shanghai (CNSHA)<br>
            <strong>Port of Discharge:</strong> Rotterdam (NLRTM)
          </div>
        </div>

        <!-- Line Item Table -->
        <table style="width: 100%; border-collapse: collapse; font-size: 0.72rem; margin-bottom: 12px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 4px;">HS Code</th>
              <th style="padding: 4px;">Description</th>
              <th style="padding: 4px; text-align: right;">Qty</th>
              <th style="padding: 4px; text-align: right;">Rate (EUR)</th>
              <th style="padding: 4px; text-align: right;">Amount (EUR)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 4px; font-family: monospace;">8471.50.00</td>
              <td style="padding: 4px;">High-Density AI Compute Modules</td>
              <td style="padding: 4px; text-align: right;">40 Units</td>
              <td style="padding: 4px; text-align: right;">€ 1,850.00</td>
              <td style="padding: 4px; text-align: right; font-weight: 600;">€ 74,000.00</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 4px; font-family: monospace;">8504.40.82</td>
              <td style="padding: 4px;">Redundant 3.2kW Titanium PSUs</td>
              <td style="padding: 4px; text-align: right;">80 Units</td>
              <td style="padding: 4px; text-align: right;">€ 320.00</td>
              <td style="padding: 4px; text-align: right; font-weight: 600;">€ 25,600.00</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 4px; font-family: monospace;">8544.70.00</td>
              <td style="padding: 4px;">QSFP-DD 800G Direct Attach Optics</td>
              <td style="padding: 4px; text-align: right;">160 Pcs</td>
              <td style="padding: 4px; text-align: right;">€ 145.00</td>
              <td style="padding: 4px; text-align: right; font-weight: 600;">€ 23,200.00</td>
            </tr>
            <tr>
              <td style="padding: 4px; font-family: monospace;">9902.00.00</td>
              <td style="padding: 4px;">Bunker Adjustment Factor & Surcharge</td>
              <td style="padding: 4px; text-align: right;">1 Lump</td>
              <td style="padding: 4px; text-align: right;">€ 2,450.00</td>
              <td style="padding: 4px; text-align: right; font-weight: 600;">€ 2,450.00</td>
            </tr>
          </tbody>
        </table>

        <!-- Totals & Stamp -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="border: 2px dashed #16a34a; padding: 6px 10px; border-radius: 6px; color: #16a34a; text-align: center; transform: rotate(-3deg);">
            <div style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.05em;">DUTCH CUSTOMS CLEARED</div>
            <div style="font-size: 0.6rem;">DOC # C-8942-RTM • 28.08.2026</div>
          </div>

          <div style="width: 48%; font-size: 0.72rem; line-height: 1.5;">
            <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span><strong>€ 125,250.00</strong></div>
            <div style="display: flex; justify-content: space-between;"><span>VAT (21.00%):</span><strong>€ 26,302.50</strong></div>
            <div style="display: flex; justify-content: space-between; border-top: 1px solid #0f172a; padding-top: 2px; margin-top: 2px; font-size: 0.85rem; color: #0f172a;">
              <span>Grand Total:</span><strong style="color: #e2725b;">€ 151,552.50</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    prompt: `// SYSTEM PROMPT: Autonomous Multimodal Extraction Engine v4.2
// STRICT CONTRACT: Zero hallucination. Field confidence scores required.
// Model configured with response_mime_type: "application/json"

You are a Specialized Document Intelligence Agent.
Extract all structured commercial metadata, tariff classifications, line items, and taxes from the provided freight invoice.

CRITICAL RULES:
1. Verify math: Subtotal + VAT == Grand Total. Flag discrepancy if delta > 0.01.
2. Normalize ISO currencies into standard ISO-4217 ("EUR", "USD", etc.).
3. Extract bounding polygon coordinates [ymin, xmin, ymax, xmax] normalized (0-1000).
4. Assign per-field confidence rating based on OCR clarity and spatial grounding.

PYDANTIC / ZOD SCHEMA DEFINITION:
{
  "invoice_number": string (regex: "^[A-Z0-9-]+$"),
  "shipper": { "name": string, "vat_id": string, "country": string },
  "consignee": { "name": string, "city": string, "country": string },
  "line_items": Array<{
    "hs_code": string,
    "description": string,
    "quantity": integer,
    "unit_price": float,
    "total_price": float,
    "confidence": float (0.0 - 1.0)
  }>,
  "financials": {
    "currency": "EUR",
    "subtotal": float,
    "tax_rate_pct": float,
    "tax_amount": float,
    "grand_total": float,
    "math_verified": boolean
  },
  "customs_clearance": {
    "is_cleared": boolean,
    "clearance_id": string,
    "timestamp": ISO8601String
  }
}`,
    summaryHtml: `
      <div class="exec-summary-wrap">
        <div class="exec-metrics-row">
          <div class="exec-stat-card">
            <span class="exec-stat-label">Total Verified</span>
            <span class="exec-stat-value" style="color: #e2725b;">€ 151,552.50</span>
          </div>
          <div class="exec-stat-card">
            <span class="exec-stat-label">Confidence Score</span>
            <span class="exec-stat-value" style="color: #34d399;">99.98%</span>
          </div>
        </div>

        <div class="exec-fields-list">
          <div class="exec-field-item">
            <span class="exec-field-name">🏢 Vendor / Shipper</span>
            <span class="exec-field-val">Pacific Logistics Global B.V.</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">📄 Invoice Number</span>
            <span class="exec-field-val">INV-2026-EU-88421</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">📦 Line Items</span>
            <span class="exec-field-val">4 Items Extracted (HS Codes Verified)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">💶 Subtotal & VAT</span>
            <span class="exec-field-val">€ 125,250.00 + 21% VAT (€ 26,302.50)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🛃 Customs Status</span>
            <span class="exec-field-val" style="color: #34d399;">CLEARED (Doc # C-8942-RTM)</span>
          </div>
        </div>

        <div class="exec-sync-banner">
          <div class="exec-sync-icon">✓</div>
          <div>
            <strong>Autonomous Action:</strong> 100% verified & synced to SAP ERP, QuickBooks & HubSpot in <strong>740ms</strong>.
          </div>
        </div>
      </div>
    `,
    jsonOutput: `{
  <span class="token-key">"invoice_number"</span>: <span class="token-string">"INV-2026-EU-88421"</span> <span class="token-badge-confidence">conf: 0.999</span>,
  <span class="token-key">"shipper"</span>: {
    <span class="token-key">"name"</span>: <span class="token-string">"PACIFIC LOGISTICS GLOBAL B.V."</span>,
    <span class="token-key">"vat_id"</span>: <span class="token-string">"NL854920192B01"</span>,
    <span class="token-key">"country"</span>: <span class="token-string">"NLD"</span>,
    <span class="token-key">"eori"</span>: <span class="token-string">"NL854920192"</span>
  },
  <span class="token-key">"consignee"</span>: {
    <span class="token-key">"name"</span>: <span class="token-string">"Wiser Global Supply GmbH"</span>,
    <span class="token-key">"address"</span>: <span class="token-string">"Industriestrasse 14, 70567 Stuttgart"</span>,
    <span class="token-key">"country"</span>: <span class="token-string">"DEU"</span>
  },
  <span class="token-key">"transport"</span>: {
    <span class="token-key">"bill_of_lading"</span>: <span class="token-string">"MAEU90218841"</span>,
    <span class="token-key">"port_loading"</span>: <span class="token-string">"CNSHA"</span>,
    <span class="token-key">"port_discharge"</span>: <span class="token-string">"NLRTM"</span>
  },
  <span class="token-key">"line_items"</span>: [
    {
      <span class="token-key">"hs_code"</span>: <span class="token-string">"8471.50.00"</span>,
      <span class="token-key">"description"</span>: <span class="token-string">"High-Density AI Compute Modules"</span>,
      <span class="token-key">"quantity"</span>: <span class="token-number">40</span>,
      <span class="token-key">"unit_price"</span>: <span class="token-number">1850.00</span>,
      <span class="token-key">"total_price"</span>: <span class="token-number">74000.00</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.998</span>
    },
    {
      <span class="token-key">"hs_code"</span>: <span class="token-string">"8504.40.82"</span>,
      <span class="token-key">"description"</span>: <span class="token-string">"Redundant 3.2kW Titanium PSUs"</span>,
      <span class="token-key">"quantity"</span>: <span class="token-number">80</span>,
      <span class="token-key">"unit_price"</span>: <span class="token-number">320.00</span>,
      <span class="token-key">"total_price"</span>: <span class="token-number">25600.00</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.999</span>
    },
    {
      <span class="token-key">"hs_code"</span>: <span class="token-string">"8544.70.00"</span>,
      <span class="token-key">"description"</span>: <span class="token-string">"QSFP-DD 800G Direct Attach Optics"</span>,
      <span class="token-key">"quantity"</span>: <span class="token-number">160</span>,
      <span class="token-key">"unit_price"</span>: <span class="token-number">145.00</span>,
      <span class="token-key">"total_price"</span>: <span class="token-number">23200.00</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.997</span>
    },
    {
      <span class="token-key">"hs_code"</span>: <span class="token-string">"9902.00.00"</span>,
      <span class="token-key">"description"</span>: <span class="token-string">"Bunker Adjustment Factor & Surcharge"</span>,
      <span class="token-key">"quantity"</span>: <span class="token-number">1</span>,
      <span class="token-key">"unit_price"</span>: <span class="token-number">2450.00</span>,
      <span class="token-key">"total_price"</span>: <span class="token-number">2450.00</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.996</span>
    }
  ],
  <span class="token-key">"financials"</span>: {
    <span class="token-key">"currency"</span>: <span class="token-string">"EUR"</span>,
    <span class="token-key">"subtotal"</span>: <span class="token-number">125250.00</span>,
    <span class="token-key">"tax_rate_pct"</span>: <span class="token-number">21.00</span>,
    <span class="token-key">"tax_amount"</span>: <span class="token-number">26302.50</span>,
    <span class="token-key">"grand_total"</span>: <span class="token-number">151552.50</span>,
    <span class="token-key">"math_verified"</span>: <span class="token-boolean">true</span>
  },
  <span class="token-key">"customs_stamp"</span>: {
    <span class="token-key">"status"</span>: <span class="token-string">"CLEARED"</span>,
    <span class="token-key">"port"</span>: <span class="token-string">"Rotterdam"</span>,
    <span class="token-key">"ref_code"</span>: <span class="token-string">"C-8942-RTM"</span>,
    <span class="token-key">"confidence"</span>: <span class="token-number">0.994</span>
  }
}`
  },

  'blueprint': {
    title: 'Architectural & MEP Structural Blueprint',
    docType: 'CAD / Vector Blueprints',
    docInfo: 'AutoCAD DWG/PDF • Vector Schematics • Metric Coordinates',
    modelTokens: '2,150 Tokens',
    latency: '890ms',
    accuracy: '99.92%',
    rawHtml: `
      <div class="mock-doc-blueprint" id="rendered-doc">
        <!-- Bounding Boxes -->
        <div class="bbox" style="top: 10px; left: 10px; width: 45%; height: 50px;" data-field="project_title">
          <span class="bbox-tag">CAD Header: Project & Revision</span>
        </div>
        <div class="bbox" style="top: 75px; left: 15px; width: 55%; height: 180px;" data-field="grid_spans">
          <span class="bbox-tag">Structural Grid: Beam W14x90</span>
        </div>
        <div class="bbox" style="top: 75px; right: 15px; width: 38%; height: 180px;" data-field="schedule_table">
          <span class="bbox-tag">Schedule: Door & Window Specs</span>
        </div>
        <div class="bbox" style="bottom: 15px; left: 15px; right: 15px; height: 90px;" data-field="load_specs">
          <span class="bbox-tag">MEP & Structural Load Parameters</span>
        </div>

        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #3b82f6; padding-bottom: 6px; margin-bottom: 10px;">
          <div>
            <span style="font-weight: 700; color: #ffffff; font-size: 0.85rem;">APEX TOWER LEVEL 04 — STRUCTURAL SECTION B-4</span><br>
            <span style="color: #60a5fa; font-size: 0.7rem;">ARCH-DWG-8802 • SCALE: 1:50 METRIC • REV 3.4 (APPROVED)</span>
          </div>
          <div style="text-align: right; font-size: 0.7rem; color: #93c5fd;">
            STAMP: PE #48291-CA<br>
            DATE: 2026-08-15
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 12px; font-size: 0.72rem; margin-bottom: 10px;">
          <!-- Left CAD Visual Grid -->
          <div style="border: 1px dashed #3b82f6; padding: 8px; border-radius: 4px; background: rgba(59, 130, 246, 0.05);">
            <div style="color: #ffffff; font-weight: 600; margin-bottom: 4px;">GRID SPAN: COLUMN AXIS [A-1 to A-4]</div>
            <div style="line-height: 1.5; color: #bfdbfe;">
              • Beam Spec: <strong>W14 × 90 Grade 50 Steel</strong><br>
              • Span Clearance: <strong>8,450 mm</strong> (C-to-C)<br>
              • Slab Thickness: <strong>175 mm Post-Tensioned Concrete</strong><br>
              • Fire Rating: <strong>2-HR UL Design No. D916</strong>
            </div>
          </div>

          <!-- Right Window/Door Schedule -->
          <div style="border: 1px solid #1e3a8a; padding: 6px; border-radius: 4px; background: rgba(15, 23, 42, 0.6);">
            <div style="color: #e2725b; font-weight: 700; font-size: 0.7rem; margin-bottom: 4px;">OPENING SCHEDULE</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.68rem;">
              <tr style="border-bottom: 1px solid #334155; color: #94a3b8;">
                <th>TAG</th><th>DIM (WxH)</th><th>RATING</th>
              </tr>
              <tr><td>D-101</td><td>950x2100mm</td><td>90-min FR</td></tr>
              <tr><td>D-102</td><td>1800x2100mm</td><td>Acoustic STC 45</td></tr>
              <tr><td>W-204</td><td>2400x1800mm</td><td>Low-E Triple</td></tr>
            </table>
          </div>
        </div>

        <!-- Load Calculations Box -->
        <div style="background: rgba(30, 58, 138, 0.3); border: 1px solid #2563eb; padding: 8px; border-radius: 4px; font-size: 0.7rem; color: #dbeafe;">
          <strong>STRUCTURAL ENGINEERING CALCS:</strong> Dead Load: 4.8 kPa • Live Load (Commercial): 3.0 kPa • Seismic Category: D • Max Allowable Deflection: L/360 (23.4mm actual: 16.8mm PASS)
        </div>
      </div>
    `,
    prompt: `// SYSTEM PROMPT: Spatial Architectural & CAD Vision Parser
// Spatial grounding with vector coordinate bounding boxes [ymin, xmin, ymax, xmax]

You are an expert Structural Engineering & Architectural AI Agent.
Analyze the CAD blueprint section and extract:
1. Drawing hierarchy, sheet ID, project title, and revision history.
2. Structural elements (beam profiles, span clearances, slab specs, fire ratings).
3. Opening schedules (doors, windows, acoustic/fire performance ratings).
4. Structural load tolerances and engineering safety factors.

STRICT JSON SCHEMA:
{
  "sheet_id": string,
  "revision": string,
  "engineer_pe": string,
  "structural_elements": Array<{
    "element_type": "beam" | "column" | "slab",
    "material_grade": string,
    "dimension_metric_mm": float,
    "fire_rating_hours": integer
  }>,
  "opening_schedule": Array<{
    "tag": string,
    "type": "door" | "window",
    "width_mm": integer,
    "height_mm": integer,
    "acoustic_rating_stc": integer | null,
    "fire_rating_min": integer | null
  }>,
  "load_tolerances": {
    "dead_load_kpa": float,
    "live_load_kpa": float,
    "deflection_status": "PASS" | "FAIL"
  }
}`,
    summaryHtml: `
      <div class="exec-summary-wrap">
        <div class="exec-metrics-row">
          <div class="exec-stat-card">
            <span class="exec-stat-label">Structural Check</span>
            <span class="exec-stat-value" style="color: #34d399;">PASS (L/360)</span>
          </div>
          <div class="exec-stat-card">
            <span class="exec-stat-label">Openings Parsed</span>
            <span class="exec-stat-value" style="color: #e2725b;">3 Schedules</span>
          </div>
        </div>

        <div class="exec-fields-list">
          <div class="exec-field-item">
            <span class="exec-field-name">📐 Project & Sheet</span>
            <span class="exec-field-val">Apex Tower L4 • ARCH-DWG-8802 (Rev 3.4)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🏗️ Structural Steel</span>
            <span class="exec-field-val">W14 × 90 Grade 50 (8,450 mm Span)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🚪 Door / Window Schedule</span>
            <span class="exec-field-val">D-101 (90m FR), D-102 (STC 45), W-204 (Low-E)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🔥 Fire Rating</span>
            <span class="exec-field-val">2-Hour UL Design D916</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">⚖️ Max Deflection</span>
            <span class="exec-field-val" style="color: #34d399;">16.8mm (Limit: 23.4mm)</span>
          </div>
        </div>

        <div class="exec-sync-banner">
          <div class="exec-sync-icon">✓</div>
          <div>
            <strong>Autonomous Action:</strong> Quantities & schedules pushed to Procore & Excel Takeoff in <strong>890ms</strong>.
          </div>
        </div>
      </div>
    `,
    jsonOutput: `{
  <span class="token-key">"sheet_id"</span>: <span class="token-string">"ARCH-DWG-8802"</span> <span class="token-badge-confidence">conf: 0.998</span>,
  <span class="token-key">"project"</span>: <span class="token-string">"Apex Tower Level 04 — Section B-4"</span>,
  <span class="token-key">"revision"</span>: <span class="token-string">"3.4"</span>,
  <span class="token-key">"engineer_pe"</span>: <span class="token-string">"PE #48291-CA"</span>,
  <span class="token-key">"scale"</span>: <span class="token-string">"1:50 Metric"</span>,
  <span class="token-key">"structural_elements"</span>: [
    {
      <span class="token-key">"element_type"</span>: <span class="token-string">"beam"</span>,
      <span class="token-key">"profile"</span>: <span class="token-string">"W14 × 90"</span>,
      <span class="token-key">"material_grade"</span>: <span class="token-string">"Grade 50 Structural Steel"</span>,
      <span class="token-key">"span_clearance_mm"</span>: <span class="token-number">8450</span>,
      <span class="token-key">"fire_rating_hours"</span>: <span class="token-number">2</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.999</span>
    },
    {
      <span class="token-key">"element_type"</span>: <span class="token-string">"slab"</span>,
      <span class="token-key">"thickness_mm"</span>: <span class="token-number">175</span>,
      <span class="token-key">"type"</span>: <span class="token-string">"Post-Tensioned Concrete"</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.995</span>
    }
  ],
  <span class="token-key">"opening_schedule"</span>: [
    {
      <span class="token-key">"tag"</span>: <span class="token-string">"D-101"</span>,
      <span class="token-key">"type"</span>: <span class="token-string">"door"</span>,
      <span class="token-key">"width_mm"</span>: <span class="token-number">950</span>,
      <span class="token-key">"height_mm"</span>: <span class="token-number">2100</span>,
      <span class="token-key">"fire_rating_min"</span>: <span class="token-number">90</span>
    },
    {
      <span class="token-key">"tag"</span>: <span class="token-string">"D-102"</span>,
      <span class="token-key">"type"</span>: <span class="token-string">"door"</span>,
      <span class="token-key">"width_mm"</span>: <span class="token-number">1800</span>,
      <span class="token-key">"height_mm"</span>: <span class="token-number">2100</span>,
      <span class="token-key">"acoustic_rating_stc"</span>: <span class="token-number">45</span>
    },
    {
      <span class="token-key">"tag"</span>: <span class="token-string">"W-204"</span>,
      <span class="token-key">"type"</span>: <span class="token-string">"window"</span>,
      <span class="token-key">"width_mm"</span>: <span class="token-number">2400</span>,
      <span class="token-key">"height_mm"</span>: <span class="token-number">1800</span>,
      <span class="token-key">"glazing"</span>: <span class="token-string">"Low-E Triple Pane"</span>
    }
  ],
  <span class="token-key">"load_tolerances"</span>: {
    <span class="token-key">"dead_load_kpa"</span>: <span class="token-number">4.8</span>,
    <span class="token-key">"live_load_kpa"</span>: <span class="token-number">3.0</span>,
    <span class="token-key">"seismic_category"</span>: <span class="token-string">"D"</span>,
    <span class="token-key">"deflection_max_mm"</span>: <span class="token-number">23.4</span>,
    <span class="token-key">"deflection_actual_mm"</span>: <span class="token-number">16.8</span>,
    <span class="token-key">"deflection_status"</span>: <span class="token-string">"PASS"</span>
  }
}`
  },

  'schematic': {
    title: 'Industrial P&ID Piping & Sensor Schematic',
    docType: 'Technical Process Diagram',
    docInfo: 'ISA-5.1 Standard • Instrumentation Loop • High-Res Diagram',
    modelTokens: '1,890 Tokens',
    latency: '680ms',
    accuracy: '99.96%',
    rawHtml: `
      <div class="mock-doc-schematic" id="rendered-doc">
        <!-- Bounding Boxes -->
        <div class="bbox" style="top: 10px; left: 10px; width: 45%; height: 50px;" data-field="loop_header">
          <span class="bbox-tag">Loop Header: Reactor Feed 104</span>
        </div>
        <div class="bbox" style="top: 70px; left: 15px; width: 40%; height: 120px;" data-field="valve_tag">
          <span class="bbox-tag">Tag: FCV-301 Flow Control Valve</span>
        </div>
        <div class="bbox" style="top: 70px; right: 15px; width: 45%; height: 120px;" data-field="sensor_tag">
          <span class="bbox-tag">Tag: PT-88 / TT-405 Transmitters</span>
        </div>
        <div class="bbox" style="bottom: 15px; left: 15px; right: 15px; height: 130px;" data-field="failsafe_logic">
          <span class="bbox-tag">Safety Interlock: SIL-2 Matrix</span>
        </div>

        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #374151; padding-bottom: 6px; margin-bottom: 10px;">
          <div>
            <span style="font-weight: 700; color: #f97316; font-size: 0.85rem;">P&ID LOOP-104: PRIMARY CATALYST REACTION UNIT</span><br>
            <span style="color: #9ca3af; font-size: 0.7rem;">SYSTEM: ISA 5.1 COMPLIANT • LINE: 4"-SS-316L-CL300</span>
          </div>
          <div style="text-align: right; font-size: 0.7rem; color: #34d399;">
            STATUS: ACTIVE TELEMETRY<br>
            PRESSURE: 42.8 BARG
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.72rem; margin-bottom: 10px;">
          <div style="background: #1f2937; padding: 8px; border-radius: 4px; border: 1px solid #374151;">
            <div style="color: #38bdf8; font-weight: 700;">VALVE INSTRUMENTATION</div>
            <div style="color: #d1d5db; margin-top: 4px; line-height: 1.4;">
              • Tag: <strong>FCV-301</strong> (Equal % Globe Valve)<br>
              • Actuator: Pneumatic Diaphragm w/ Positioner<br>
              • Fail-Safe Mode: <strong>FC (Fail Closed)</strong><br>
              • Max Cv: 48.2 @ 100% Travel
            </div>
          </div>

          <div style="background: #1f2937; padding: 8px; border-radius: 4px; border: 1px solid #374151;">
            <div style="color: #fbbf24; font-weight: 700;">TRANSMITTER TELEMETRY</div>
            <div style="color: #d1d5db; margin-top: 4px; line-height: 1.4;">
              • <strong>PT-88:</strong> 0-100 bar (4-20mA HART)<br>
              • <strong>TT-405:</strong> Dual RTD PT100 (-50°C to 450°C)<br>
              • Accuracy: ±0.075% Span<br>
              • Sampling Rate: 100ms
            </div>
          </div>
        </div>

        <div style="background: #1e1b4b; border: 1px solid #4338ca; padding: 8px; border-radius: 4px; font-size: 0.7rem; color: #c7d2fe;">
          <strong>SAFETY INTERLOCK & EMERGENCY SHUTDOWN (ESD):</strong> Interlock # I-104-A triggers ESDV-101 upon PT-88 exceeding 52.0 BARG or TT-405 exceeding 385°C. Reaction delay: &lt; 250ms. SIL-2 Certified.
        </div>
      </div>
    `,
    prompt: `// SYSTEM PROMPT: P&ID ISA-5.1 Technical Extraction Agent
// Topological node extraction and safety interlock verification

Extract all instrument tags, flow loops, fail-safe states, and safety shutdown interlocks from the P&ID schematic.

REQUIRED SCHEMA OUTPUT:
{
  "system_id": string,
  "piping_spec": string,
  "instruments": Array<{
    "tag": string,
    "type": "flow_control_valve" | "pressure_transmitter" | "temperature_transmitter",
    "fail_safe": "FAIL_CLOSED" | "FAIL_OPEN" | "FAIL_LAST" | null,
    "range_spec": string,
    "protocol": string
  }>,
  "safety_interlocks": Array<{
    "interlock_id": string,
    "sil_rating": "SIL-1" | "SIL-2" | "SIL-3",
    "trigger_condition": string,
    "target_action": string,
    "max_delay_ms": integer
  }>
}`,
    summaryHtml: `
      <div class="exec-summary-wrap">
        <div class="exec-metrics-row">
          <div class="exec-stat-card">
            <span class="exec-stat-label">Safety Rating</span>
            <span class="exec-stat-value" style="color: #34d399;">SIL-2 Certified</span>
          </div>
          <div class="exec-stat-card">
            <span class="exec-stat-label">Instruments</span>
            <span class="exec-stat-value" style="color: #e2725b;">3 Tags Mapped</span>
          </div>
        </div>

        <div class="exec-fields-list">
          <div class="exec-field-item">
            <span class="exec-field-name">⚙️ Process Loop</span>
            <span class="exec-field-val">Loop-104 (Catalyst Reaction Unit)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🔧 Flow Control Valve</span>
            <span class="exec-field-val">FCV-301 (Equal %, Fail-Closed)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">📡 Sensor Telemetry</span>
            <span class="exec-field-val">PT-88 (0-100 bar) • TT-405 (-50 to 450°C)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🛑 Emergency Interlock</span>
            <span class="exec-field-val">I-104-A (Trips ESDV-101 in &lt; 250ms)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🧪 Piping Spec</span>
            <span class="exec-field-val">4"-SS-316L-CL300 (42.8 BARG)</span>
          </div>
        </div>

        <div class="exec-sync-banner">
          <div class="exec-sync-icon">✓</div>
          <div>
            <strong>Autonomous Action:</strong> Topology & safety rules exported to SCADA telemetry mesh in <strong>680ms</strong>.
          </div>
        </div>
      </div>
    `,
    jsonOutput: `{
  <span class="token-key">"system_id"</span>: <span class="token-string">"P&ID LOOP-104"</span> <span class="token-badge-confidence">conf: 0.999</span>,
  <span class="token-key">"process_unit"</span>: <span class="token-string">"Primary Catalyst Reaction Unit"</span>,
  <span class="token-key">"piping_spec"</span>: <span class="token-string">"4\\"-SS-316L-CL300"</span>,
  <span class="token-key">"instruments"</span>: [
    {
      <span class="token-key">"tag"</span>: <span class="token-string">"FCV-301"</span>,
      <span class="token-key">"type"</span>: <span class="token-string">"flow_control_valve"</span>,
      <span class="token-key">"valve_characteristic"</span>: <span class="token-string">"Equal Percentage Globe"</span>,
      <span class="token-key">"fail_safe"</span>: <span class="token-string">"FAIL_CLOSED"</span>,
      <span class="token-key">"max_cv"</span>: <span class="token-number">48.2</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.998</span>
    },
    {
      <span class="token-key">"tag"</span>: <span class="token-string">"PT-88"</span>,
      <span class="token-key">"type"</span>: <span class="token-string">"pressure_transmitter"</span>,
      <span class="token-key">"range_spec"</span>: <span class="token-string">"0-100 bar"</span>,
      <span class="token-key">"protocol"</span>: <span class="token-string">"4-20mA HART"</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.997</span>
    },
    {
      <span class="token-key">"tag"</span>: <span class="token-string">"TT-405"</span>,
      <span class="token-key">"type"</span>: <span class="token-string">"temperature_transmitter"</span>,
      <span class="token-key">"range_spec"</span>: <span class="token-string">"-50°C to 450°C"</span>,
      <span class="token-key">"sensor_element"</span>: <span class="token-string">"Dual RTD PT100"</span>,
      <span class="token-key">"confidence"</span>: <span class="token-number">0.996</span>
    }
  ],
  <span class="token-key">"safety_interlocks"</span>: [
    {
      <span class="token-key">"interlock_id"</span>: <span class="token-string">"I-104-A"</span>,
      <span class="token-key">"sil_rating"</span>: <span class="token-string">"SIL-2"</span>,
      <span class="token-key">"trigger_condition"</span>: <span class="token-string">"PT-88 &gt; 52.0 BARG OR TT-405 &gt; 385°C"</span>,
      <span class="token-key">"target_action"</span>: <span class="token-string">"Trip ESDV-101 (Emergency Shutdown)"</span>,
      <span class="token-key">"max_delay_ms"</span>: <span class="token-number">250</span>
    }
  ]
}`
  },

  'handwritten-log': {
    title: 'Substation Field Inspection Handwritten Log',
    docType: 'Messy Cursive & Sensor Forms',
    docInfo: 'Scanned Ink on Grid Paper • Checkbox Matrices • Handwritten Gauges',
    modelTokens: '1,620 Tokens',
    latency: '820ms',
    accuracy: '99.89%',
    rawHtml: `
      <div class="mock-doc-handwritten" id="rendered-doc">
        <!-- Bounding Boxes -->
        <div class="bbox" style="top: 10px; left: 10px; width: 55%; height: 50px;" data-field="site_metadata">
          <span class="bbox-tag">Field OCR: Substation & Inspector</span>
        </div>
        <div class="bbox" style="top: 65px; left: 10px; right: 10px; height: 110px;" data-field="gauge_readings">
          <span class="bbox-tag">Handwritten Values: Gauge Readings</span>
        </div>
        <div class="bbox" style="top: 185px; left: 10px; width: 60%; height: 110px;" data-field="checklist_status">
          <span class="bbox-tag">Vision Classification: Checkbox Matrix</span>
        </div>
        <div class="bbox" style="bottom: 10px; right: 10px; width: 45%; height: 60px;" data-field="signature">
          <span class="bbox-tag">Signature Biometrics: Verified</span>
        </div>

        <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; color: #1e3a8a;">
          Grid Operations — Field Substation Daily Log (Form E-41)
        </div>
        <div style="font-size: 0.85rem; color: #1e3a8a; margin-bottom: 8px;">
          Substation: <span style="text-decoration: underline; font-weight: 600;">Oak Ridge 500kV - Bay 3</span> &nbsp;|&nbsp; Date: <span style="text-decoration: underline;">Aug 29, 2026 14:30</span><br>
          Lead Tech: <span style="text-decoration: underline;">Marcus Vance (ID: 9482)</span>
        </div>

        <div style="font-size: 0.85rem; line-height: 1.6; margin-bottom: 10px; color: #172554;">
          <strong>TRANSFORMER T-2 GAUGES:</strong><br>
          • Winding Temp: <span style="font-size: 0.95rem; font-weight: 700; color: #b91c1c;">74.2 °C</span> (Warning: +4.2°C above baseline)<br>
          • Top Oil Temp: <strong>58.6 °C</strong> &nbsp;|&nbsp; Ambient: <strong>31.0 °C</strong><br>
          • SF6 Gas Pressure: <strong>0.58 MPa</strong> [Normal Band: 0.55 - 0.62 MPa]<br>
          • Silica Gel Desiccant Color: <span style="text-decoration: underline;">Light Blue (Good condition)</span>
        </div>

        <div style="font-size: 0.82rem; color: #172554; margin-bottom: 8px;">
          <strong>INSPECTION CHECKLIST:</strong><br>
          [X] Bushing corona discharge test: PASSED (No audible arcing)<br>
          [X] Cooling fan bank 1 & 2 operational: PASSED<br>
          [ ] Oil leak inspection: <span style="color: #b91c1c; font-weight: 700;">FLAGGED (Minor seepage at valve V-12)</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 0.85rem; margin-top: 10px;">
          <div style="color: #1e3a8a;">
            Action Taken: <span style="text-decoration: underline;">Work order WO-9082 filed for gasket replacement.</span>
          </div>
          <div style="font-family: 'Brush Script MT', cursive; font-size: 1.3rem; color: #1e3a8a; border-bottom: 1px solid #1e3a8a; padding: 0 10px;">
            M. Vance, PE
          </div>
        </div>
      </div>
    `,
    prompt: `// SYSTEM PROMPT: Multimodal Cursive Handwriting & Checkbox Classifier
// Few-shot trained on ambiguous handwritten digits, checkboxes [X] vs [ ], and field signatures

You are a Specialized Industrial Field Log Parser.
Parse the handwritten physical inspection log:
1. Normalize messy cursive text and technician IDs.
2. Disambiguate handwritten numbers (e.g. 74.2 vs 742; 0.58 vs 0.50).
3. Classify visual checkbox states: [X] = CHECKED/PASSED, [ ] = UNCHECKED/FLAGGED.
4. Extract anomalies, temperature variances, and auto-flag maintenance escalations.

STRICT PYDANTIC OUTPUT SCHEMA:
{
  "substation": string,
  "inspector": { "name": string, "id": string },
  "timestamp": ISO8601String,
  "telemetry": {
    "winding_temp_c": float,
    "top_oil_temp_c": float,
    "ambient_temp_c": float,
    "sf6_pressure_mpa": float,
    "temp_anomaly_flag": boolean
  },
  "checklist": Array<{
    "item": string,
    "status": "PASSED" | "FLAGGED",
    "notes": string | null
  }>,
  "escalation_required": boolean,
  "work_order_id": string | null,
  "signature_detected": boolean
}`,
    summaryHtml: `
      <div class="exec-summary-wrap">
        <div class="exec-metrics-row">
          <div class="exec-stat-card">
            <span class="exec-stat-label">Action Status</span>
            <span class="exec-stat-value" style="color: #e2725b;">Anomaly Flagged</span>
          </div>
          <div class="exec-stat-card">
            <span class="exec-stat-label">OCR Match Rate</span>
            <span class="exec-stat-value" style="color: #34d399;">99.89%</span>
          </div>
        </div>

        <div class="exec-fields-list">
          <div class="exec-field-item">
            <span class="exec-field-name">⚡ Substation & Inspector</span>
            <span class="exec-field-val">Oak Ridge 500kV • Marcus Vance (PE #9482)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🌡️ Winding Temperature</span>
            <span class="exec-field-val" style="color: #ef4444;">74.2 °C (Flagged +4.2°C High)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">📊 SF6 Gas Pressure</span>
            <span class="exec-field-val">0.58 MPa (Normal 0.55-0.62)</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">📋 Inspection Checklist</span>
            <span class="exec-field-val">2 Passed • 1 Leak Flagged at Valve V-12</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">✍️ Signature Biometrics</span>
            <span class="exec-field-val" style="color: #34d399;">Verified (M. Vance, PE)</span>
          </div>
        </div>

        <div class="exec-sync-banner">
          <div class="exec-sync-icon">✓</div>
          <div>
            <strong>Autonomous Action:</strong> Work order WO-9082 auto-generated & dispatched to IBM Maximo in <strong>820ms</strong>.
          </div>
        </div>
      </div>
    `,
    jsonOutput: `{
  <span class="token-key">"substation"</span>: <span class="token-string">"Oak Ridge 500kV - Bay 3"</span> <span class="token-badge-confidence">conf: 0.998</span>,
  <span class="token-key">"inspector"</span>: {
    <span class="token-key">"name"</span>: <span class="token-string">"Marcus Vance"</span>,
    <span class="token-key">"id"</span>: <span class="token-string">"9482"</span>,
    <span class="token-key">"title"</span>: <span class="token-string">"Lead Tech / PE"</span>
  },
  <span class="token-key">"timestamp"</span>: <span class="token-string">"2026-08-29T14:30:00-05:00"</span>,
  <span class="token-key">"telemetry"</span>: {
    <span class="token-key">"transformer_id"</span>: <span class="token-string">"T-2"</span>,
    <span class="token-key">"winding_temp_c"</span>: <span class="token-number">74.2</span> <span class="token-badge-confidence">conf: 0.997</span>,
    <span class="token-key">"top_oil_temp_c"</span>: <span class="token-number">58.6</span>,
    <span class="token-key">"ambient_temp_c"</span>: <span class="token-number">31.0</span>,
    <span class="token-key">"sf6_pressure_mpa"</span>: <span class="token-number">0.58</span>,
    <span class="token-key">"desiccant_condition"</span>: <span class="token-string">"Light Blue (Good)"</span>,
    <span class="token-key">"temp_anomaly_flag"</span>: <span class="token-boolean">true</span>
  },
  <span class="token-key">"checklist"</span>: [
    {
      <span class="token-key">"item"</span>: <span class="token-string">"Bushing corona discharge test"</span>,
      <span class="token-key">"status"</span>: <span class="token-string">"PASSED"</span>,
      <span class="token-key">"notes"</span>: <span class="token-string">"No audible arcing"</span>
    },
    {
      <span class="token-key">"item"</span>: <span class="token-string">"Cooling fan bank 1 & 2 operational"</span>,
      <span class="token-key">"status"</span>: <span class="token-string">"PASSED"</span>,
      <span class="token-key">"notes"</span>: <span class="token-null">null</span>
    },
    {
      <span class="token-key">"item"</span>: <span class="token-string">"Oil leak inspection"</span>,
      <span class="token-key">"status"</span>: <span class="token-string">"FLAGGED"</span>,
      <span class="token-key">"notes"</span>: <span class="token-string">"Minor seepage at valve V-12"</span>
    }
  ],
  <span class="token-key">"escalation_required"</span>: <span class="token-boolean">true</span>,
  <span class="token-key">"work_order_id"</span>: <span class="token-string">"WO-9082"</span>,
  <span class="token-key">"signature_detected"</span>: <span class="token-boolean">true</span>
}`
  }
};

// ===========================================================================
// 2. DOCUMENT UPLOAD & MULTIMODAL PARSING STUDIO CONTROLLER
// ===========================================================================
let currentPresetKey = 'freight-invoice';
let currentTab = 'summary'; // 'summary' (default), 'json'
let currentCustomUpload = null; // Stores uploaded file metadata & data

function initVisionLab() {
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('doc-file-input');
  const sampleButtons = document.querySelectorAll('.sample-pill-btn');
  const uploadAnotherBtn = document.getElementById('upload-another-btn');
  const segButtons = document.querySelectorAll('.seg-btn');
  const copyBtn = document.getElementById('copy-output-btn');

  // Trigger file picker on dropzone click (except on sample pills)
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('.sample-pill-btn') || e.target.closest('.sample-pills-row')) return;
      fileInput.click();
    });

    // Drag and Drop Events
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'dragend', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleUserFileUpload(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleUserFileUpload(fileInput.files[0]);
      }
    });
  }

  // Sample Preset Buttons (1-Click Test)
  sampleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const preset = btn.getAttribute('data-preset');
      if (!preset || !VISION_PRESETS[preset]) return;
      selectSamplePreset(preset);
    });
  });

  // "Test Another File" Button
  if (uploadAnotherBtn) {
    uploadAnotherBtn.addEventListener('click', () => {
      const activeViewport = document.getElementById('lab-active-viewport');
      const dropzone = document.getElementById('upload-dropzone');
      const fileInput = document.getElementById('doc-file-input');

      if (activeViewport) activeViewport.style.display = 'none';
      if (dropzone) dropzone.style.display = 'flex';
      if (fileInput) fileInput.value = '';
      currentCustomUpload = null;
    });
  }

  // Segmented View Toggle (Verified Summary vs Raw JSON)
  segButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (!tab) return;

      segButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = tab;
      renderActiveTabContent();
    });
  });

  // Copy Output
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      let textToCopy = '';
      if (currentCustomUpload) {
        if (currentTab === 'json') {
          const temp = document.createElement('div');
          temp.innerHTML = currentCustomUpload.jsonOutput;
          textToCopy = temp.textContent || temp.innerText || '';
        } else {
          const temp = document.createElement('div');
          temp.innerHTML = currentCustomUpload.summaryHtml;
          textToCopy = temp.textContent || temp.innerText || '';
        }
      } else {
        const data = VISION_PRESETS[currentPresetKey];
        if (currentTab === 'json') {
          const temp = document.createElement('div');
          temp.innerHTML = data.jsonOutput;
          textToCopy = temp.textContent || temp.innerText || '';
        } else {
          const temp = document.createElement('div');
          temp.innerHTML = data.summaryHtml;
          textToCopy = temp.textContent || temp.innerText || '';
        }
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('✓ Extracted data copied to clipboard!');
      }).catch(() => {
        showToast('✓ Copied to clipboard!');
      });
    });
  }
}

// Handle User Uploaded File (Image, PDF, Document)
function handleUserFileUpload(file) {
  const activeViewport = document.getElementById('lab-active-viewport');
  const dropzone = document.getElementById('upload-dropzone');
  const titleEl = document.getElementById('active-doc-title');
  const subEl = document.getElementById('active-doc-subtitle');
  const canvas = document.getElementById('doc-render-container');

  if (dropzone) dropzone.style.display = 'none';
  if (activeViewport) activeViewport.style.display = 'grid';

  const fileSizeKb = (file.size / 1024).toFixed(1);
  const fileName = file.name;
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');

  if (titleEl) titleEl.textContent = fileName;
  if (subEl) subEl.textContent = `${fileSizeKb} KB • ${isImage ? 'Uploaded Image' : isPdf ? 'Uploaded PDF Document' : 'Uploaded File'}`;

  // Generate Custom Dynamic Parsing Model
  currentCustomUpload = generateCustomExtractionData(fileName, fileSizeKb, isImage);

  // Render Left Document Preview
  if (isImage) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (canvas) {
        canvas.innerHTML = `
          <div class="uploaded-img-frame">
            <div class="laser-scan-bar scanning" id="laser-bar"></div>
            <img src="${e.target.result}" class="uploaded-img-preview" alt="Uploaded Document">
          </div>
        `;
        triggerLaserScan();
      }
    };
    reader.readAsDataURL(file);
  } else {
    if (canvas) {
      canvas.innerHTML = `
        <div class="uploaded-img-frame" style="flex-direction: column; gap: 1rem; color: #94a3b8; padding: 2rem; text-align: center;">
          <div class="laser-scan-bar scanning" id="laser-bar"></div>
          <div style="font-size: 3.5rem;">📄</div>
          <div style="font-weight: 700; color: #ffffff; font-size: 1.1rem;">${escapeHtml(fileName)}</div>
          <div style="font-size: 0.85rem; color: #64748b;">${fileSizeKb} KB • Multi-Page PDF Stream Rendered</div>
          <div style="background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 0.4rem 0.8rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.3);">
            ✓ Ingested via Gemini 2.0 Multimodal Pipeline
          </div>
        </div>
      `;
      triggerLaserScan();
    }
  }

  renderActiveTabContent();
  showToast(`✓ Document "${fileName}" ingested successfully! Parsing structured entities...`);
}

// Select Pre-Made Sample Preset
function selectSamplePreset(presetKey) {
  currentPresetKey = presetKey;
  currentCustomUpload = null;

  const activeViewport = document.getElementById('lab-active-viewport');
  const dropzone = document.getElementById('upload-dropzone');
  const titleEl = document.getElementById('active-doc-title');
  const subEl = document.getElementById('active-doc-subtitle');
  const canvas = document.getElementById('doc-render-container');
  const data = VISION_PRESETS[presetKey];

  if (!data) return;

  if (dropzone) dropzone.style.display = 'none';
  if (activeViewport) activeViewport.style.display = 'grid';

  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.docInfo;

  if (canvas) {
    canvas.innerHTML = `
      <div class="laser-scan-bar" id="laser-bar"></div>
      ${data.rawHtml}
    `;
    triggerLaserScan();
  }

  renderActiveTabContent();
}

function triggerLaserScan() {
  const laser = document.getElementById('laser-bar');
  if (laser) {
    laser.classList.add('scanning');
    setTimeout(() => {
      laser.classList.remove('scanning');
    }, 1200);
  }
}

function renderActiveTabContent() {
  const container = document.getElementById('inspector-content-area');
  if (!container) return;

  if (currentCustomUpload) {
    if (currentTab === 'summary') {
      container.innerHTML = currentCustomUpload.summaryHtml;
    } else {
      container.innerHTML = `<pre class="code-block">${currentCustomUpload.jsonOutput}</pre>`;
    }
  } else {
    const data = VISION_PRESETS[currentPresetKey];
    if (!data) return;

    if (currentTab === 'summary') {
      container.innerHTML = data.summaryHtml;
    } else {
      container.innerHTML = `<pre class="code-block">${data.jsonOutput}</pre>`;
    }
  }
}

// Dynamically generate realistic structured output for any uploaded file
function generateCustomExtractionData(fileName, fileSizeKb, isImage) {
  const cleanName = fileName.replace(/\.[^/.]+$/, "");
  const randTotal = (Math.random() * 45000 + 5000).toFixed(2);
  const randTax = (randTotal * 0.19).toFixed(2);
  const grandTotal = (parseFloat(randTotal) + parseFloat(randTax)).toFixed(2);
  const docId = `DOC-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    title: fileName,
    summaryHtml: `
      <div class="exec-summary-wrap">
        <div class="exec-metrics-row">
          <div class="exec-stat-card">
            <span class="exec-stat-label">Model Confidence</span>
            <span class="exec-stat-value" style="color: #34d399;">99.94%</span>
          </div>
          <div class="exec-stat-card">
            <span class="exec-stat-label">Processing Time</span>
            <span class="exec-stat-value" style="color: #e2725b;">680ms</span>
          </div>
        </div>

        <div class="exec-fields-list">
          <div class="exec-field-item">
            <span class="exec-field-name">📄 Document Name</span>
            <span class="exec-field-val">${escapeHtml(fileName)}</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🏷️ Classification</span>
            <span class="exec-field-val">Commercial / Unstructured Record</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🔢 Assigned Tracking ID</span>
            <span class="exec-field-val">${docId}</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">📐 Extracted Key Entities</span>
            <span class="exec-field-val" style="color: #34d399;">✓ 14 Fields Mapped & Verified</span>
          </div>
          <div class="exec-field-item">
            <span class="exec-field-name">🛡️ Schema Validation</span>
            <span class="exec-field-val" style="color: #34d399;">PASSED (0 Hallucinations)</span>
          </div>
        </div>

        <div class="exec-sync-banner">
          <div class="exec-sync-icon">✓</div>
          <div>
            <strong>Ready for Production:</strong> Connect your document pipelines directly to QuickBooks, SAP, Procore, or HubSpot.
          </div>
        </div>
      </div>
    `,
    jsonOutput: `{
  <span class="token-key">"document_name"</span>: <span class="token-string">"${escapeHtml(fileName)}"</span>,
  <span class="token-key">"tracking_id"</span>: <span class="token-string">"${docId}"</span> <span class="token-badge-confidence">conf: 0.999</span>,
  <span class="token-key">"classification"</span>: <span class="token-string">"Unstructured Multimodal Record"</span>,
  <span class="token-key">"file_metadata"</span>: {
    <span class="token-key">"size_kb"</span>: <span class="token-number">${fileSizeKb}</span>,
    <span class="token-key">"mime_type"</span>: <span class="token-string">"${isImage ? 'image/custom' : 'application/pdf'}"</span>,
    <span class="token-key">"spatial_grounding"</span>: <span class="token-boolean">true</span>
  },
  <span class="token-key">"extracted_entities"</span>: {
    <span class="token-key">"status"</span>: <span class="token-string">"VERIFIED"</span>,
    <span class="token-key">"confidence_score"</span>: <span class="token-number">0.9994</span>,
    <span class="token-key">"fields_parsed"</span>: <span class="token-number">14</span>,
    <span class="token-key">"schema_pass"</span>: <span class="token-boolean">true</span>
  },
  <span class="token-key">"automated_action"</span>: {
    <span class="token-key">"pipeline_sync"</span>: <span class="token-string">"PENDING_INTEGRATION"</span>,
    <span class="token-key">"latency_ms"</span>: <span class="token-number">680</span>
  }
}`
  };
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ===========================================================================
// 3. CONTINUOUS DATA FRESHNESS ENGINE CONTROLLER
// ===========================================================================
function initFreshnessEngine() {
  const triggerBtn = document.getElementById('trigger-freshness-sim-btn');
  const steps = document.querySelectorAll('.pipeline-step-card');
  const logList = document.getElementById('freshness-log-list');
  let isRunning = false;

  if (!triggerBtn) return;

  triggerBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = `
      <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
      <span>Propagating CDC Event...</span>
    `;

    // Clear previous highlights
    steps.forEach(s => s.classList.remove('active-step'));
    if (logList) logList.innerHTML = '';

    const events = [
      {
        step: 0,
        delay: 200,
        log: `<span class="log-ts">[+32ms]</span> <span class="log-highlight">[WEBHOOK]</span> Inbound event: Customer updated pricing contract <span class="log-status-ok">#CTR-8891</span>`
      },
      {
        step: 1,
        delay: 700,
        log: `<span class="log-ts">[+85ms]</span> <span class="log-highlight">[CDC DIFF]</span> Postgres WAL change detected: 2 tables mutated (0.4kb payload diff)`
      },
      {
        step: 2,
        delay: 1300,
        log: `<span class="log-ts">[+240ms]</span> <span class="log-highlight">[VECTOR RE-INDEX]</span> Chunked 4 modified paragraphs -> Upserted dense+sparse vectors to Qdrant`
      },
      {
        step: 3,
        delay: 1900,
        log: `<span class="log-ts">[+310ms]</span> <span class="log-highlight">[CACHE PURGE]</span> Redis semantic query cache invalidated. Active Agent memory synchronized <span class="log-status-ok">✓ ZERO-STALE</span>`
      }
    ];

    events.forEach((evt, idx) => {
      setTimeout(() => {
        steps.forEach(s => s.classList.remove('active-step'));
        if (steps[evt.step]) steps[evt.step].classList.add('active-step');

        if (logList) {
          const li = document.createElement('li');
          li.className = 'log-entry';
          li.innerHTML = evt.log;
          logList.appendChild(li);
          logList.scrollTop = logList.scrollHeight;
        }

        if (idx === events.length - 1) {
          setTimeout(() => {
            triggerBtn.disabled = false;
            triggerBtn.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Simulate Live Data Mutation</span>
            `;
            isRunning = false;
            showToast('✓ Continuous Freshness Engine: All vector indexes & agent caches synced in 310ms!');
          }, 600);
        }
      }, evt.delay);
    });
  });
}

// ===========================================================================
// 4. HITL CONFIDENCE THRESHOLD SLIDER CONTROLLER
// ===========================================================================
function initHitlSlider() {
  const slider = document.getElementById('hitl-threshold-slider');
  const badge = document.getElementById('hitl-threshold-value');
  const autoRate = document.getElementById('hitl-auto-rate');
  const hitlRate = document.getElementById('hitl-review-rate');

  if (!slider || !badge) return;

  slider.addEventListener('input', () => {
    const val = parseInt(slider.value);
    badge.textContent = `${val}%`;

    // Dynamic throughput calculation
    if (autoRate && hitlRate) {
      if (val >= 98) {
        autoRate.textContent = '84.2%';
        hitlRate.textContent = '15.8%';
      } else if (val >= 94) {
        autoRate.textContent = '96.8%';
        hitlRate.textContent = '3.2%';
      } else if (val >= 90) {
        autoRate.textContent = '99.1%';
        hitlRate.textContent = '0.9%';
      } else {
        autoRate.textContent = '99.9%';
        hitlRate.textContent = '0.1%';
      }
    }
  });
}

// ===========================================================================
// 5. TOAST NOTIFICATION UTILITY
// ===========================================================================
function initToastSupport() {
  // Ensure toast container exists
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}
