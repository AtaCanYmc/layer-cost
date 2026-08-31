# Changelog

All notable changes to **LayerCost** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0](https://github.com/AtaCanYmc/layer-cost/compare/layer-cost-v1.0.0...layer-cost-v1.1.0) (2026-08-31)


### Features

* add Anycubic Kobra S1 preset and update README with printer details ([80d38b7](https://github.com/AtaCanYmc/layer-cost/commit/80d38b79053d8312554cf52049058bc81f132bd1))
* add changelog, contributing guidelines, license, security policy, and update README with key features ([32f9785](https://github.com/AtaCanYmc/layer-cost/commit/32f978576e6cd9aaf4b6ed879590323f3f390844))
* add mobile tab navigation and update UI for better responsiveness ([447eaf1](https://github.com/AtaCanYmc/layer-cost/commit/447eaf13dcc67eeacbd9d62c23474125efe81dee))
* add multilingual support with language and theme options ([796d416](https://github.com/AtaCanYmc/layer-cost/commit/796d416c4760bdf215ef69c0a4b461eb44e9cde0))
* add new Anycubic printer presets and update README with printer details ([b614fcf](https://github.com/AtaCanYmc/layer-cost/commit/b614fcf4c67cc40e25c428fa100b5ff1dcb779d7))
* add web app manifest and update favicon links in index.html ([d758685](https://github.com/AtaCanYmc/layer-cost/commit/d75868589b6d9fa5085e23b967ff2d1ed2bc81f0))
* implement currency conversion with live exchange rates and update UI indicators ([7c79d27](https://github.com/AtaCanYmc/layer-cost/commit/7c79d274e40a5c40f50c201fabf21a64596f9b34))
* update Node.js version to 22 in CI and deployment configurations, add release-please config ([6dd987f](https://github.com/AtaCanYmc/layer-cost/commit/6dd987f740c8230f7480cfbb15f93c95b51df693))

## [1.0.0] - 2026-08-31

### Added
- **Real-Time Cost Calculation Engine**:
  - Filament cost math: `(spoolPrice / spoolWeight) * printWeight`.
  - Electricity consumption cost: `(powerWatt / 1000) * printHours * electricityRate`.
  - Machine depreciation (wear & tear): `(printerPrice / lifespanHours) * printHours`.
  - Post-processing labor: `(laborMinutes / 60) * hourlyRate`.
  - Extra hardware/packaging fixed cost.
  - Failure/risk surcharge buffer.
  - Profit margin markup calculation.
- **Tactile Claymorphism (Clay 3D) Design System**:
  - Dual themes: **Light Porcelain Clay** and **Dark Charcoal Clay**.
  - Soft extruded 3D cards (`.clay-card`), recessed input cavities (`.clay-inset`, `.clay-input`).
  - Tactile physical buttons (`.clay-btn-primary`, `.clay-btn-secondary`, `.clay-stepper-btn`).
  - Tactile step buttons (`+ / -`, `+10g`, `+50g`, `+15 min`).
  - 3D cylindrical segmented breakdown chart & stat cushions.
- **Multi-Language (i18n) Support**:
  - Seamless toggle between **English (EN)** and **Turkish (TR)**.
  - Localized currency formatting for `TRY (₺)`, `USD ($)`, `EUR (€)`, `GBP (£)`.
- **Profile Presets & Persistence**:
  - Save, load, and delete custom print setup profiles in `localStorage`.
  - JSON backup export and restore capability.
- **Printable Quotation / PDF Generator**:
  - Clean client-facing quotation sheet with `window.print()` support.
  - Optional internal cost breakdown toggle for business transparency.
- **Progressive Web App (PWA)**:
  - Offline-first caching with Workbox service worker.
  - Responsive app shell with standalone display mode.
