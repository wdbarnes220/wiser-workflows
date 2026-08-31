# Wiser Workflows ⚡

> **Intelligent AI & Business Automation Solutions**
> Reclaim 40+ hours per week, eliminate manual friction, and scale lean with bespoke AI workflows, autonomous agents, and cross-platform integrations.

---

## 📖 Overview

**Wiser Workflows** is a business process automation and AI workflow consultancy. This repository houses the public-facing web platform, interactive site map, architecture explorer, and dynamic ROI estimator.

### ✨ Key Features

1. **Flagship Landing Page (`index.html`)**:
   - Modern cyber-SaaS design system (dark mode, glassmorphism, responsive grid, Outfit & Inter typography).
   - **Live Pipeline Simulator**: Animated simulation of webhook triggers $\rightarrow$ LLM reasoning $\rightarrow$ CRM sync $\rightarrow$ Ops dispatch.
   - **4 Core Solutions**: AI Agents & Document Intelligence, CRM & RevOps Pipelines, Cross-Platform API Sync, Data Warehousing & Executive BI.
   - **4-Step Methodology**: Audit $\rightarrow$ Blueprint $\rightarrow$ Rapid Integration $\rightarrow$ Monitoring.
   - **Multi-Step Audit Booking Modal**: Interactive lead capture for 15-minute consultation requests.

2. **Interactive Site Map & Blueprint Explorer (`sitemap.html` & embedded widget)**:
   - **Tree View**: Visual hierarchical node graph showing page relationships and levels.
   - **Directory View**: Categorized breakdown across Core, Solutions, Industries, Tools, and Company pages.
   - **Interactive Node Drawer**: Click any node to inspect target personas, conversion goals, component specs, and technology stack.
   - **Live Filters & Keyword Search**: Real-time filtering by category, status (*Live*, *Planned*, *Expansion*), and keywords.

3. **Reactive Workflow ROI Calculator**:
   - Dynamic sliders for Team Size, Manual Hours/Week, and Loaded Hourly Cost.
   - Real-time calculations of Annual Financial Savings, Reclaimed Hours, Monthly Lift, and Productive FTE Multiplier.
   - 1-click team presets (*Startup*, *Mid-Market*, *Enterprise*).

---

## 📁 Repository Structure

```
wiser-workflows/
├── index.html               # Main landing page with hero, simulator, services, calculator, and audit modal
├── sitemap.html             # Dedicated fullscreen architecture blueprint and site map directory
├── css/
│   ├── style.css            # Global design tokens, color variables, typography, layout
│   ├── components.css       # Buttons, glass cards, badges, calculator, modals, form controls
│   └── sitemap.css          # Visual tree layout, node cards, connectors, filter toolbar, side drawer
├── js/
│   ├── main.js              # UI controller (header blur, mobile menu, simulator animation, modal logic)
│   ├── sitemap-data.js      # Structured data model for all site pages, status, and funnels
│   ├── sitemap-viewer.js    # Tree & grid visualizer engine, search/filter, and detail drawer
│   └── calculator.js        # Real-time ROI and time-savings calculation engine
├── package.json             # Project scripts and configuration
└── .gitignore               # Standard git ignore rules
```

---

## 🚀 Getting Started

To run the site locally:

### Option 1: Python HTTP Server
```bash
python3 -m http.server 3000
```

### Option 2: NPM / Serve
```bash
npm start
# or
npm run dev
```

Then open your browser to:
- **Home**: [http://localhost:3000/index.html](http://localhost:3000/index.html)
- **Site Map**: [http://localhost:3000/sitemap.html](http://localhost:3000/sitemap.html)

---

## 🛠️ Tech Stack

- **Core**: Semantic HTML5, Vanilla ES6+ JavaScript (zero build step required).
- **Styling**: Vanilla CSS3 Custom Properties, Backdrop Filters, Gradient Meshes, CSS Grid & Flexbox.
- **Icons**: SVG / Lucide Icons.
- **Fonts**: Google Fonts (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono`).

---

## 📄 License

MIT © [Wiser Workflows](https://wiserworkflows.com)
