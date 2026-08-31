# Changelog

All notable changes to **LayerCost** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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
