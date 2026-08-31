<div align="center">

<img src="./docs/banner.png" alt="LayerCost - 3D Printing Cost Calculator" width="100%" />

<br />

# LayerCost

### Tactile 3D Printing Cost & Pricing Calculator PWA

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

**LayerCost** is a modern, offline-first Progressive Web App (PWA) built for makers, 3D printing hobbyists, and print farm businesses. It computes precise material, electricity, depreciation, labor, failure risk, and profit margins with instant real-time feedback and a delightful, tactile **Claymorphism (Clay 3D)** user experience.

[Features](#-key-features) • [Formulas](#-cost-formulas) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [License](#-license)

</div>

---

## ✨ Key Features

- 🎨 **Authentic Claymorphism UI/UX**: Soft 3D extruded surfaces, inset cavity inputs, tactile physical pressable buttons, step adjusters (`+ / -`, `+10g`, `+15 min`), and smooth pill toggles.
- 🌓 **Dual Themes (Light & Dark Clay)**:
  - **Light Mode**: Warm porcelain clay palette with soft pillowy cards and subtle blue-gray inner cavity shadows.
  - **Dark Mode**: Deep charcoal matte clay palette with soft neon ambient reflections.
  - One-click instant theme toggle with zero-flash early initialization.
- 🌐 **Multi-Language (i18n)**: Seamless instant switching between **English (EN)** and **Turkish (TR)** with localized currency and duration formatting.
- ⚡ **Instant Real-Time Calculations**: Every parameter adjustment instantly recalculates base cost, failure buffer, markup, and hourly unit prices.
- 🧵 **Extensive Hardware & Filament Presets**:
  - **Printers**: Bambu Lab (X1C, P1S, A1, A1 Mini), Creality (Ender 3 V3, K1 Max), Anycubic (Kobra S1, Kobra 3 Combo, Kobra 2 Pro/Neo, Photon Mono M5s), Prusa (MK4S), Elegoo (Neptune 4 Pro).
  - **Filaments**: PLA, PLA+, PETG, ABS, TPU, ASA, Carbon Fiber PLA, UV Resin with automatic spool usage meters.
- 📊 **3D Cylindrical Cost Breakdown**: Visual segmented cylinder bar chart and tactile stat cushions breaking down every cost component.
- 📜 **Formula Transparency**: Built-in interactive formula table detailing step-by-step arithmetic for client transparency.
- 💾 **Profile Management & JSON Backup**: Save custom print configurations to `localStorage`, switch between profiles, and export/import JSON backups.
- 📄 **Printable Quotation & PDF Generator**: Generate clean, professional quotations (`window.print()`) with optional toggles for internal company cost breakdowns.
- 📱 **PWA Offline-First**: Installable to iOS, Android, macOS, and Windows with background service worker caching.

---

## 📐 Cost Formulas

LayerCost uses an industry-standard additive manufacturing costing algorithm:

### 1. Material (Filament) Cost
$$\text{Cost}_{\text{filament}} = \left(\frac{\text{Spool Price}}{\text{Spool Weight (g)}}\right) \times \text{Print Weight (g)}$$

### 2. Electricity Cost
$$\text{Cost}_{\text{electricity}} = \left(\frac{\text{Printer Power (W)}}{1000}\right) \times \text{Print Time (hours)} \times \text{Electricity Rate (kWh)}$$

### 3. Machine Depreciation (Wear & Tear)
$$\text{Cost}_{\text{depreciation}} = \left(\frac{\text{Printer Purchase Price}}{\text{Printer Lifespan (hours)}}\right) \times \text{Print Time (hours)}$$

### 4. Labor Cost
$$\text{Cost}_{\text{labor}} = \left(\frac{\text{Labor Time (minutes)}}{60}\right) \times \text{Hourly Labor Rate}$$

### 5. Base Manufacturing Cost
$$\text{Cost}_{\text{base}} = \text{Cost}_{\text{filament}} + \text{Cost}_{\text{electricity}} + \text{Cost}_{\text{depreciation}} + \text{Cost}_{\text{labor}} + \text{Extra Consumables}$$

### 6. Risk-Adjusted Cost (Failure Buffer)
$$\text{Cost}_{\text{risk}} = \text{Cost}_{\text{base}} \times \left(1 + \frac{\text{Failure Rate (\%)}}{100}\right)$$

### 7. Final Recommended Sale Price
$$\text{Price}_{\text{final}} = \text{Cost}_{\text{risk}} \times \left(1 + \frac{\text{Profit Margin (\%)}}{100}\right)$$

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Modern declarative UI component architecture |
| **TypeScript 5.7** | Strict type safety with `verbatimModuleSyntax` |
| **Vite 6** | Lightning-fast development server & optimized production bundler |
| **Tailwind CSS v4** | Next-generation utility engine with custom Clay design tokens |
| **vite-plugin-pwa** | Service worker generation, offline caching & Web App Manifest |
| **Lucide React** | Clean, consistent icons for UI controls and visual badges |

---

## 🚀 Quick Start

### Prerequisites
- Node.js `18.0.0` or higher
- npm `9.0.0` or higher (or pnpm / yarn / bun)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/layer-cost.git
   cd layer-cost
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Runs TypeScript typecheck (`tsc -b`) and generates production bundle in `dist/` |
| `npm run preview` | Locally serves the production build for testing |
| `npm run lint` | Runs ESLint across all TypeScript and React files |

---

## 📁 Project Structure

```text
layer-cost/
├── public/                     # Static PWA assets, icons, manifest
│   ├── banner.png              # 3D Clay product banner
│   ├── favicon.svg             # App favicon
│   ├── pwa-192x192.svg         # PWA icon (192px)
│   └── pwa-512x512.svg         # PWA icon (512px)
├── docs/                       # Documentation assets
│   └── banner.png
├── src/
│   ├── assets/                 # React component assets
│   ├── components/             # Clay UI React components
│   │   ├── CostBreakdownChart.tsx   # 3D cylindrical segmented bar chart
│   │   ├── FilamentSection.tsx      # Spool price, weight, type selectors
│   │   ├── Header.tsx               # Brand, theme, language & currency controls
│   │   ├── LaborSection.tsx         # Post-processing time, wage & extra costs
│   │   ├── PricingRiskSection.tsx   # Failure buffer, profit markup & client info
│   │   ├── PrinterSection.tsx       # Power, slicer time, depreciation & presets
│   │   ├── QuoteExportModal.tsx     # Printable PDF quotation sheet
│   │   ├── ResultsOverview.tsx      # Hero sale card, cushions & formula table
│   │   └── SavedProfilesModal.tsx   # Profile templates & JSON import/export
│   ├── data/
│   │   └── presets.ts          # Printer and filament benchmark data
│   ├── i18n/
│   │   └── translations.ts     # English & Turkish translation dictionaries
│   ├── types/
│   │   └── calculator.ts       # TypeScript interfaces & types
│   ├── utils/
│   │   └── calculator.ts       # Mathematical calculation & formatting engine
│   ├── App.tsx                 # Root application component & state sync
│   ├── index.css               # Claymorphism design system & Tailwind v4 rules
│   └── main.tsx                # Application entry point
├── index.html                  # HTML5 shell & zero-flash theme bootstrap
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite & VitePWA plugin configuration
├── CONTRIBUTING.md             # Contribution guidelines
├── CHANGELOG.md                # Release notes & version history
├── SECURITY.md                 # Security reporting policy
└── LICENSE                     # MIT License
```

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the submission process.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and licensed under the [MIT License](./LICENSE).

---

<div align="center">
  <sub>Crafted with precision for the 3D printing community.</sub>
</div>
