/**
 * WISER WORKFLOWS - Site Map & Blueprint Architecture Data
 * Defines the complete sitemap, page hierarchy, conversion goals, and target personas.
 */

const SITE_MAP_DATA = {
  root: {
    id: "home",
    title: "Home (Landing Page)",
    route: "/",
    category: "core",
    status: "live",
    badgeText: "Live",
    icon: "home",
    description: "Primary entry point. Value proposition, live workflow interactive visualizer, ROI calculator, core services overview, and audit booking CTA.",
    audience: "Business Owners, Operations Leaders, Founders, IT Managers",
    conversionGoal: "Book a Free 15-Minute Workflow Audit or Try ROI Calculator",
    keyComponents: [
      "Hero with Dynamic Automation Flow Demo",
      "Interactive Site Map & Blueprint Explorer",
      "Core 4 Pillars of Automation Services",
      "Interactive ROI & Hours-Saved Calculator",
      "4-Step Optimization Methodology",
      "Social Proof & Client Testimonials",
      "Multi-Step Consultation Booking Modal"
    ],
    techStack: ["HTML5", "CSS Glassmorphism", "ES6+ JavaScript", "Lucide Icons"],
    seoKeywords: ["business workflow automation", "AI workflow agency", "Zapier Make integration", "process automation consulting"]
  },
  categories: [
    {
      id: "core",
      name: "Core Business & Architecture",
      description: "Fundamental brand pages, site navigation, and primary conversion funnels."
    },
    {
      id: "solutions",
      name: "Solutions & Services",
      description: "Dedicated service offering pages tailored to specific automation categories."
    },
    {
      id: "industries",
      name: "Industry Blueprints",
      description: "Niche-specific workflow blueprints and automation architectures."
    },
    {
      id: "resources",
      name: "Resources & Interactive Tools",
      description: "Calculators, guides, templates, and lead generation magnets."
    },
    {
      id: "company",
      name: "Company & Trust",
      description: "Case studies, team background, security posture, and contact."
    }
  ],
  nodes: [
    {
      id: "home",
      parentId: null,
      level: 1,
      title: "Home",
      route: "/",
      category: "core",
      status: "live",
      icon: "layout",
      description: "Central landing page showcasing capabilities, visual architecture, ROI calculator, and lead generation.",
      audience: "All Visitors, Founders, Ops Managers",
      conversionGoal: "Schedule Audit / Interactive Demo",
      keyComponents: ["Hero Pipeline", "Service Cards", "ROI Calculator", "Audit Modal"],
      techStack: ["Semantic HTML", "Vanilla CSS", "Modular JS"],
      seoKeywords: ["business automation", "AI workflows", "systems optimization"]
    },
    {
      id: "sitemap-page",
      parentId: "home",
      level: 2,
      title: "Interactive Site Map",
      route: "/sitemap.html",
      category: "core",
      status: "live",
      icon: "git-branch",
      description: "Visual node map and directory showcasing the entire architecture, planned roadmap, and expansion modules of Wiser Workflows.",
      audience: "Prospects, Partners, Developers, Stakeholders",
      conversionGoal: "Explore system blueprints and request custom architecture",
      keyComponents: ["Tree Visualizer", "Grid Directory", "Node Search & Filters", "Deep Dive Drawer"],
      techStack: ["Dynamic DOM Rendering", "SVG Tree Connectors"],
      seoKeywords: ["site map", "automation blueprint", "workflow architecture"]
    },
    {
      id: "services-ai",
      parentId: "home",
      level: 2,
      title: "AI & Agentic Workflows",
      route: "ai-workflows.html",
      category: "solutions",
      status: "live",
      icon: "bot",
      description: "Custom Autonomous AI Agents, Multimodal Vision/OCR parsing (Gemini, Claude, GPT-4o), and continuous Change-Data-Capture vector freshness.",
      audience: "Knowledge-heavy teams, AEC/Construction, Logistics, Ops Leaders",
      conversionGoal: "Book AI Workflow Audit & Live Interactive Demo",
      keyComponents: [
        "Multimodal Document & Vision Parsing Lab",
        "Continuous Data Freshness Engine (CDC + Vector)",
        "Enterprise Multi-Agent Architecture Diagram",
        "Human-In-The-Loop (HITL) Decision Checkpoints"
      ],
      techStack: ["Gemini 2.0 / Flash", "Claude 3.5 Sonnet", "GPT-4o", "Qdrant", "Debezium CDC", "Pydantic"],
      seoKeywords: ["AI agent automation", "multimodal vision OCR", "document extraction AI", "Change Data Capture"]
    },
    {
      id: "services-crm",
      parentId: "home",
      level: 2,
      title: "CRM & Pipeline Automation",
      route: "crm-pipeline.html",
      category: "solutions",
      status: "live",
      icon: "users",
      description: "Autonomous lead ingestion, individualized multi-touch follow-up cadences, pre-drafted SOW contracts, and 1-click e-signatures.",
      audience: "Sales Directors, Growth Founders, RevOps Leaders, Operations VPs",
      conversionGoal: "Schedule CRM Automation Audit",
      keyComponents: [
        "Individualized Follow-up Queue Simulator",
        "Pre-Drafted SOW Contracts with Instant E-Sign",
        "Interactive 3-Stage Cost Transparency Scale",
        "Downstream RevOps Webhook Cascade"
      ],
      techStack: ["HubSpot API", "Salesforce Flow", "DocuSign / PandaDoc API", "Stripe Billing", "Slack Webhooks"],
      seoKeywords: ["CRM automation", "sales pipeline workflow", "RevOps automation", "automated SOW contracts", "e-signature workflow"]
    },
    {
      id: "services-integrations",
      parentId: "home",
      level: 2,
      title: "Cross-Platform API Sync",
      route: "api-sync.html",
      category: "solutions",
      status: "live",
      icon: "refresh-cw",
      description: "Real-time two-way synchronization connecting Stripe, QuickBooks, Grist, and CRM into a zero-drift data mesh with self-healing protocols.",
      audience: "CTOs, Operations VPs, Finance Leaders, RevOps Teams",
      conversionGoal: "Request System Integration Blueprint",
      keyComponents: [
        "Multi-Interface Consistency Mesh (4-Way Live Sync)",
        "Self-Auditing & Self-Healing Engine (4-Stage Backoff & DLQ)",
        "Human-in-the-Loop Auto-Prompting Alert System",
        "Pre-Built Connector Ecosystem"
      ],
      techStack: ["Stripe Webhooks", "QuickBooks Online SDK", "Grist / Airtable API", "HubSpot / Salesforce", "AWS EventBridge", "Redis DLQ"],
      seoKeywords: ["API integration agency", "Stripe QuickBooks sync", "two-way API sync", "self-healing webhooks", "dead letter queue automation"]
    },
    {
      id: "services-data",
      parentId: "home",
      level: 2,
      title: "Data Pipelines & BI Dashboards",
      route: "data-dashboards.html",
      category: "solutions",
      status: "live",
      icon: "database",
      description: "Consolidating marketing ad spend, sales velocity, customer support, and financial accounting into a single source of truth with automated ELT pipelines and predictive forecasting.",
      audience: "Executives, Growth Founders, Data Leads, RevOps Leaders",
      conversionGoal: "Get Custom Analytics Blueprint",
      keyComponents: [
        "Multi-Source Data Consolidation Engine (dbt / Data Lake)",
        "Interactive Weekly Growth & Trend Velocity Monitor",
        "Future Opportunity & Scenario Forecaster (Predictive Simulator)",
        "Enterprise BI & Warehouse Ecosystem"
      ],
      techStack: ["Snowflake", "Google BigQuery", "dbt", "Fivetran", "Looker", "Metabase", "PostgreSQL"],
      seoKeywords: ["automated business intelligence", "data pipeline consulting", "executive KPI automation", "predictive ARR forecasting", "dbt data modeling"]
    },
    {
      id: "industries-legal",
      parentId: "home",
      level: 3,
      title: "Legal & Professional Services",
      route: "/industries/legal",
      category: "industries",
      status: "planned",
      icon: "file-text",
      description: "Automated client intake, conflict check workflows, AI document summarization, billing and retainer tracking.",
      audience: "Law Firms, Consulting Practices, Accounting Firms",
      conversionGoal: "Download Legal Workflow Blueprint",
      keyComponents: ["Intake Portal Mockup", "Document AI Triage Demo", "HIPAA/SOC2 compliance checklist"],
      techStack: ["Clio / PracticePanther APIs", "OCR", "Private Cloud Storage"],
      seoKeywords: ["law firm automation", "legal document AI", "intake workflow"]
    },
    {
      id: "industries-ecommerce",
      parentId: "home",
      level: 3,
      title: "E-Commerce & Retail Ops",
      route: "/industries/ecommerce",
      category: "industries",
      status: "planned",
      icon: "shopping-bag",
      description: "Multi-channel inventory sync, automated supplier re-ordering, return management, order tracking bots.",
      audience: "Shopify / Amazon DTC Brand Owners, Logistics Managers",
      conversionGoal: "Book E-Commerce Operations Review",
      keyComponents: ["Inventory Sync Demo", "Customer Return Automation Flow", "Supplier Webhooks"],
      techStack: ["Shopify GraphQL", "Klaviyo", "ShipStation"],
      seoKeywords: ["e-commerce workflow automation", "Shopify inventory sync", "order fulfillment automation"]
    },
    {
      id: "calculator-tool",
      parentId: "home",
      level: 2,
      title: "Workflow ROI Calculator",
      route: "/tools/roi-calculator",
      category: "resources",
      status: "live",
      icon: "calculator",
      description: "Interactive financial modeling tool estimating annual dollar savings and reclaimed team bandwidth by automating busywork.",
      audience: "CFOs, Budget Decision Makers, Team Leads",
      conversionGoal: "Export Full Savings Report via Email",
      keyComponents: ["Dynamic Sliders (Team Size, Wage, Hours)", "Real-time Chart Visualizer", "Downloadable PDF Breakdown"],
      techStack: ["Reactive JavaScript Calculations", "SVG Charts"],
      seoKeywords: ["automation ROI calculator", "process optimization cost savings"]
    },
    {
      id: "case-studies",
      parentId: "home",
      level: 2,
      title: "Case Studies & Client Proof",
      route: "/case-studies",
      category: "company",
      status: "live",
      icon: "award",
      description: "In-depth case studies with verified metrics: 40+ hours saved weekly, 99.8% reduction in data entry errors, 3x faster client onboarding.",
      audience: "High-Intent Prospects, Procurement Teams",
      conversionGoal: "Book Similar Implementation",
      keyComponents: ["Before vs After Process Maps", "Video Testimonials", "Architecture Breakdown Diagrams"],
      techStack: ["Case Study Schema Markup", "Interactive Diff Viewer"],
      seoKeywords: ["workflow automation case studies", "business automation success stories"]
    },
    {
      id: "about-process",
      parentId: "home",
      level: 2,
      title: "About & 4-Step Methodology",
      route: "/about",
      category: "company",
      status: "live",
      icon: "compass",
      description: "Our philosophy, security standards (encryption, least privilege), and the 4-step audit-to-scale delivery methodology.",
      audience: "Security Officers, Decision Makers, Potential Hires",
      conversionGoal: "Schedule Intro Call",
      keyComponents: ["4-Step Delivery Framework", "Security & Compliance Safeguards", "Founder Story"],
      techStack: ["Interactive Timeline", "Security Cert Badges"],
      seoKeywords: ["about Wiser Workflows", "automation agency methodology", "secure automation practices"]
    },
    {
      id: "client-portal",
      parentId: "home",
      level: 3,
      title: "Client Portal & Monitor",
      route: "/portal",
      category: "core",
      status: "expansion",
      icon: "shield-check",
      description: "Client dashboard for monitoring live automated workflows, viewing health metrics, error logs, and submitting change requests.",
      audience: "Active Clients & Managed Support Accounts",
      conversionGoal: "Client Login / Status Overview",
      keyComponents: ["Live Workflow Health Pings", "Execution Volume Charts", "One-Click Support Escalation"],
      techStack: ["Next.js / Dashboard App", "Webhook Monitoring Agent"],
      seoKeywords: ["workflow monitoring portal", "automation maintenance hub"]
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_MAP_DATA;
}
