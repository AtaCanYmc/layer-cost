# Contributing to LayerCost

Thank you for your interest in contributing to LayerCost! We welcome bug reports, feature requests, documentation improvements, and code contributions.

---

## 🛠️ Development Setup

1. **Fork and Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/layer-cost.git
   cd layer-cost
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Run Linter & Build Verification:**
   ```bash
   npm run lint
   npm run build
   ```

---

## 📐 Coding Conventions & Guidelines

- **TypeScript Strictness**:
  - `verbatimModuleSyntax` is enabled in `tsconfig.json`. Use `import type { ... }` when importing types and interfaces.
  - Avoid using `any`. Use strict union types or generics where appropriate.
- **Claymorphism Styling System**:
  - Use custom Clay tokens (`.clay-card`, `.clay-inset`, `.clay-input`, `.clay-btn-primary`, `.clay-btn-secondary`, `.clay-stepper-btn`, `.clay-pill-active`, `.clay-pill-inactive`, `.clay-hero-card`, `.clay-stat-cushion`, `.clay-slider`).
  - Ensure all colors and contrasts support both `.light` and `.dark` modes.
- **Internationalization (i18n)**:
  - Add all user-facing strings to `src/i18n/translations.ts` in both `tr` (Turkish) and `en` (English) dictionaries.

---

## 🚀 Pull Request Workflow

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
2. Commit your changes with clear, concise commit messages:
   ```bash
   git commit -m "feat(i18n): add German language translation"
   ```
3. Verify that linting and builds succeed without any errors or warnings:
   ```bash
   npm run lint
   npm run build
   ```
4. Push your branch to GitHub and submit a Pull Request.

---

## 💬 Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for everyone, regardless of gender, sexual orientation, disability, ethnicity, or religion. Please be respectful and collaborative.
