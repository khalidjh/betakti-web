# Betakti Web — Product Requirements Document (PRD)

## 1. Overview

**Betakti** (بطاقتي — "My Card") is an Arabic-first design and greeting card editor. The existing **Flutter mobile app** is live on iOS & Android. This document specifies the requirements for building a **standalone web application** using **SvelteKit** that mirrors the core experience of the mobile app while leveraging web-specific capabilities, and dresses it in a refined designer-tool interface that reflects the brand.

**Reference Flutter project:** `/Users/khalid/Documents/betakti-flutter`

---

## 2. Goals

| Goal | Detail |
|------|--------|
| Increase usage & reach | Web removes the app-install barrier |
| Feature parity (core) | Users can browse templates, edit designs, and export — same as mobile |
| Monetization | Subscription via **Moyasar** payment gateway (replaces RevenueCat) |
| SEO & shareability | Public template gallery pages, sharable design links |
| Designer-grade UX | Interface quality on par with Figma / Framer / Canva Pro |
| Brand expression | Visual identity carries the logo's gradient and playful Arabic character throughout |

---

## 3. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **SvelteKit 2.x** with **Svelte 5** (runes: `$state`, `$derived`, `$effect`) |
| Language | TypeScript (strict mode) |
| Canvas / Editor | **Konva.js** via `svelte-konva` bindings (reactive, GPU-friendly, better animation support than Fabric.js) |
| State Management | Svelte 5 runes in `.svelte.ts` modules + context API for scoped state |
| Styling | **Tailwind CSS v4** + CSS custom properties for theming |
| UI Primitives | **bits-ui** (headless) + **melt-ui** for accessible components; small hand-rolled library on top to match brand |
| Icons | **lucide-svelte** (stroke-based, designer-friendly) |
| Backend / DB | **Firebase** (Firestore, Auth, Storage) — same project as mobile |
| Payments | **Moyasar** (credit card + Apple Pay + mada) |
| Hosting | **Vercel** (`@sveltejs/adapter-vercel`) with edge SSR for marketing pages |
| Auth | Firebase Auth via `firebase` SDK (email/password + Google + Apple) |
| Fonts | Fontsource (self-hosted npm-distributed fonts) + Google Fonts API fallback for long-tail fonts |
| i18n | **Paraglide JS** (type-safe, tree-shaken, RTL/LTR aware) — preferred over `svelte-i18n` for the scale of string catalog |
| Forms | **sveltekit-superforms** + **Zod** for validation (auth, settings, paywall) |
| Export | Canvas `toDataURL()` → PNG, `jsPDF` for PDF, `gif.js` (web worker) for GIF |
| Background removal | `@imgly/background-removal` (WASM, runs client-side) |
| Analytics | PostHog or Plausible (privacy-respecting, Arabic market appropriate) |
| Testing | Vitest (unit) + Playwright (E2E, including RTL snapshots) |

### Key SvelteKit routing conventions applied

- `+page.svelte` / `+layout.svelte` for pages and shells
- `+page.server.ts` for server-only loaders (auth checks, template prefetch for SEO)
- `+page.ts` universal loaders for client-shared data
- `hooks.server.ts` for Firebase Admin session verification and locale negotiation
- Route groups `(marketing)`, `(app)`, `(auth)` to isolate layouts without affecting URLs
- Form actions for login, register, subscription checkout callbacks

---

## 4. Brand & Design System

The app is a **designer tool** — the interface itself must pass a designer's eye. The design direction is **quiet canvas, loud brand moments**: a mostly monochrome, high-contrast shell that lets user content shine, punctuated by the Betakti gradient at a few deliberate anchor points (logo, primary CTAs, active states, upgrade surfaces).

### 4.1 Logo

- Asset: `/static/brand/logo.svg` (primary), with PNG `@1x/@2x/@3x` fallbacks
- App icon: the rounded-square teal→violet gradient tile
- Usage: never recolor the mark, never place on busy imagery without a solid scrim, minimum clear space = half the mark's height

### 4.2 Color Palette

**Brand gradient** (the signature moment — reuse sparingly):

```css
--brand-gradient: linear-gradient(160deg, #2DE2E6 0%, #5B8DEF 45%, #8B5CF6 100%);
--brand-gradient-soft: linear-gradient(160deg, #D3F7F8 0%, #DEE8FB 45%, #E9DFFB 100%);
```

**Core tokens:**

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--color-accent` | `#6B4EFF` | `#8B7BFF` | Primary CTAs, focus rings, selection |
| `--color-accent-hover` | `#5A3EF0` | `#9B8BFF` | Hover states |
| `--color-teal` | `#2DE2E6` | `#2DE2E6` | Secondary accent, success-adjacent |
| `--color-violet` | `#8B5CF6` | `#A78BFA` | Pro/premium surfaces |
| `--color-ink` | `#0B0D17` | `#F5F5F7` | Primary text |
| `--color-ink-2` | `#3A3D4D` | `#C7CAD6` | Secondary text |
| `--color-muted` | `#6B7280` | `#8B8FA3` | Tertiary text, captions |
| `--color-paper` | `#FAFAFB` | `#0B0D17` | Page background |
| `--color-surface` | `#FFFFFF` | `#14161F` | Cards, panels |
| `--color-surface-2` | `#F4F4F6` | `#1C1F2A` | Nested surfaces, input fields |
| `--color-border` | `#E8E8EC` | `#262937` | Hairlines, dividers |
| `--color-border-strong` | `#D1D5DB` | `#3A3D4D` | Input borders, focused outlines |

**Semantic tokens:**

| Token | Value | Use |
|-------|-------|-----|
| `--color-success` | `#10B981` | Save confirmations, Pro active |
| `--color-warning` | `#F59E0B` | Quota warnings, guest mode |
| `--color-danger` | `#EF4444` | Destructive actions, errors |
| `--color-premium` | `--brand-gradient` | Pro badges, upgrade CTAs |

### 4.3 Typography

| Role | English | Arabic |
|------|---------|--------|
| Display (hero, paywall headlines) | **Cabinet Grotesk** or **General Sans**, 600–700 | **Readex Pro**, 700 |
| UI body | **Inter**, 400/500 | **IBM Plex Sans Arabic**, 400/500 |
| UI label / numeric | **Geist Mono** or **JetBrains Mono**, 500 | (same; mono is LTR-safe) |
| In-canvas default | User choice from §5.5.2 font lists | (same) |

**Scale (rem, 16px base):** 0.75 / 0.8125 / 0.875 / 1 / 1.125 / 1.25 / 1.5 / 1.875 / 2.25 / 3 / 3.75
**Line-heights:** tight (1.1) for display, normal (1.5) for body, Arabic body bumps to 1.65 for legibility.

### 4.4 Surface, Elevation & Radii

- **Radii:** `--r-sm: 6px`, `--r-md: 10px`, `--r-lg: 14px`, `--r-xl: 20px`, `--r-pill: 999px`. The app icon and primary cards use `--r-lg` to echo the logo's tile.
- **Elevation:** three levels only —
  - `--shadow-1: 0 1px 2px rgba(11,13,23,.06), 0 1px 1px rgba(11,13,23,.04)` (cards)
  - `--shadow-2: 0 4px 12px rgba(11,13,23,.08), 0 2px 4px rgba(11,13,23,.04)` (popovers, dropdowns)
  - `--shadow-3: 0 16px 48px rgba(11,13,23,.18), 0 4px 12px rgba(11,13,23,.08)` (modals, paywall)
- **Hairlines over shadows:** panels prefer 1px borders in `--color-border`; shadow reserved for detached floating UI.
- **Focus ring:** `0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-accent)` — inset then brand ring, always visible.

### 4.5 Motion

- **Durations:** 120ms (micro, hover), 200ms (standard, panel open), 320ms (large, modals), 480ms (rare, celebratory).
- **Easings:** `--ease-out: cubic-bezier(.22,1,.36,1)` (standard), `--ease-spring: cubic-bezier(.34,1.56,.64,1)` (playful, used on successful save, element drop, Pro unlock).
- **Principles:** nothing fades without movement; nothing moves without fading. Respect `prefers-reduced-motion` — drop all non-essential transitions under 50ms.

### 4.6 Iconography & Illustration

- **Icons:** lucide-svelte at 16/20/24px stroke 1.75px — never filled icons except for "active" tab state.
- **Custom icons:** where lucide is insufficient (Arabic-aware text tools, canvas-size glyphs), draw SVGs on the same stroke / radius grid.
- **Illustrations (marketing & empty states):** use the brand gradient on a single key shape, the rest monochrome line art — echoes the logo's "one colored element in a monochrome field" feel.

### 4.7 Designer-Tool UX Principles

1. **Canvas is sacred.** The edit surface has a neutral backdrop (dark mode defaults on), zero decoration, only a faint dot grid that users can toggle.
2. **Panels over modals.** Prefer side-panel disclosure; reserve modals for destructive confirmation and the paywall.
3. **Keyboard-first.** Every editor action has a shortcut, shown on hover after 400ms.
4. **Numeric inputs are mono.** Dimensions, rotations, coordinates — always Geist Mono, right-aligned, with suffix badges (`px`, `°`, `%`).
5. **Contextual coloring.** The brand gradient appears only at: logo, upgrade CTAs, Pro badges, active tool indicator (a 2px left border on the selected tool), and the export-success toast.
6. **Honest empty states.** Every empty list gets a small line illustration, one sentence in Arabic + English, and a primary action.
7. **Bilingual by default.** Every surface previews both Arabic and English at design time — screenshots in the PR template include RTL + LTR side by side.

### 4.8 Component Library (internal)

Built on top of bits-ui headless primitives. Minimum set before MVP:

`Button` (primary/secondary/ghost/danger/gradient), `IconButton`, `Input`, `NumericInput`, `Select`, `Combobox`, `Tabs`, `Tooltip`, `Popover`, `Dialog`, `Sheet` (side panel), `Toast`, `Badge`, `Card`, `Segmented`, `Slider`, `ColorPicker`, `GradientPicker`, `FontPicker`, `ShortcutHint`, `Kbd`, `EmptyState`, `ProBadge`, `UpgradeButton`.

Each component ships with: Svelte 5 props interface, Storybook-style showcase route under `/dev/components`, and Playwright visual regression.

---

## 5. Information Architecture & Pages

SvelteKit route tree (using route groups for layout isolation):

```
src/routes/
├── (marketing)/
│   ├── +layout.svelte           → Marketing shell (public nav, footer)
│   ├── +page.svelte             → / Landing page
│   ├── templates/
│   │   ├── +page.svelte         → /templates Public gallery (SEO)
│   │   └── [id]/+page.svelte    → /templates/[id] Template detail
│   └── pricing/+page.svelte     → /pricing
├── (app)/
│   ├── +layout.svelte           → App shell (authenticated guard)
│   ├── +layout.server.ts        → Session check + user load
│   ├── home/+page.svelte        → /home Dashboard
│   ├── editor/[projectId]/+page.svelte  → /editor/[projectId]
│   ├── projects/+page.svelte    → /projects
│   ├── settings/+page.svelte    → /settings
│   └── subscription/+page.svelte → /subscription Paywall/manage
├── (auth)/
│   ├── +layout.svelte           → Auth shell (logo + form)
│   ├── login/+page.svelte
│   ├── register/+page.svelte
│   └── forgot-password/+page.svelte
├── api/                         → Server routes (webhooks, moyasar callback)
│   ├── moyasar/webhook/+server.ts
│   └── upload/+server.ts
└── +error.svelte                → Global error page (branded)
```

---

## 6. Feature Specifications

### 6.1 Authentication

- Firebase Auth: email/password, Google OAuth, Apple Sign-In
- Session stored as an HTTP-only cookie signed by `hooks.server.ts`
- Guest mode: browse templates, open editor read-only; login prompted on save/export
- Use `sveltekit-superforms` + Zod for all auth forms; password rules enforced client-side and server-side
- Form actions live in `(auth)/login/+page.server.ts` etc.

### 6.2 Home Dashboard (`/home`)

**Sections (top to bottom):**

1. **Start New Design** — Grid of canvas size cards (see §6.4 for sizes)
2. **Occasion Banner** — Auto-detected based on current date (see §6.2.1); uses `--brand-gradient-soft` background
3. **Template Sections** — Dynamic sections from Firestore (same collection as mobile)
4. **Tools** — Background Removal tool card
5. **Recent Designs** — Grid of user's recent projects with thumbnails

Each section is a Svelte component loaded via a `+page.ts` universal loader that fans out parallel Firestore reads. Use `{#await}` blocks with skeleton states matching final layout to eliminate CLS.

#### 6.2.1 Occasion Detection Logic

Detect current date and show relevant occasion templates:

| Occasion | Approx. Date Range | Category |
|----------|-------------------|----------|
| Ramadan | Feb 18 ± 20 days | `ramadan` |
| Eid al-Fitr | Mar 20 ± 10 days | `eid` |
| Eid al-Adha | May 27 ± 10 days | `eid` |
| National Day | Sep 23 ± 10 days | `nationalDay` |
| Graduation Season | May 15 ± 20 days | `graduation` |

> **Note:** These dates are approximate and should be configurable via a Firestore `config/occasions` document. Reference: `lib/features/home/presentation/screens/home_screen.dart`

### 6.3 Template System

#### Categories (11)

| Key | Arabic | English |
|-----|--------|---------|
| `quotes` | اقتباسات | Quotes |
| `announcements` | إعلانات | Announcements |
| `sales` | عروض | Sales |
| `events` | مناسبات | Events |
| `social` | تواصل اجتماعي | Social |
| `ramadan` | رمضان | Ramadan |
| `eid` | العيد | Eid |
| `whatsappStatus` | حالات واتساب | WhatsApp Status |
| `graduation` | تخرج | Graduation |
| `wedding` | زفاف | Wedding |
| `nationalDay` | اليوم الوطني | National Day |

#### Template Data Model

```typescript
interface DesignTemplate {
  id: string;
  nameAr: string;
  nameEn: string;
  category: TemplateCategory;
  canvasSize: CanvasSize;       // { width, height, id, nameAr, nameEn }
  isPremium: boolean;
  project: Project;             // Full project with background + elements
}
```

#### Template Sources

1. **Firestore (Dynamic):** Collection `dynamic_templates` — shared with mobile app
   - Fields: `id`, `nameAr`, `nameEn`, `category`, `canvasSizeId`, `isPremium`, `isActive`, `sortOrder`, `section`, `sectionAr`, `sectionEn`, `background` (JSON), `elements` (JSON array)
2. **Hardcoded (Static):** Convert key templates from mobile app to JSON/TypeScript constants in `src/lib/data/templates/`

> **Reference:** `lib/features/templates/domain/models/template.dart` and `lib/features/templates/domain/models/dynamic_template.dart`

### 6.4 Canvas Sizes

| Name | Arabic | Dimensions |
|------|--------|------------|
| Instagram Story | ستوري انستقرام | 1080 × 1920 |
| Square Post | بوست مربع | 1080 × 1080 |
| Facebook Post | بوست فيسبوك | 1200 × 630 |
| Twitter/X Post | بوست تويتر | 1200 × 675 |
| YouTube Thumbnail | صورة يوتيوب | 1280 × 720 |
| Pinterest Pin | بن بنترست | 1000 × 1500 |
| LinkedIn Post | بوست لينكدإن | 1200 × 627 |
| TikTok Video | فيديو تيكتوك | 1080 × 1920 |
| Snapchat Story | ستوري سناب | 1080 × 1920 |
| WhatsApp Status | حالة واتساب | 1080 × 1920 |

### 6.5 Canvas Editor

This is the core of the app. The editor must support all element types from the mobile app. The editor state lives in a single `.svelte.ts` module (`src/lib/editor/editor.svelte.ts`) exposing a `createEditor()` factory that returns a reactive rune-based store.

#### 6.5.1 Canvas Background Types

| Type | Properties |
|------|-----------|
| **Color** | Single solid color (hex) |
| **Gradient** | Linear gradient with 2+ color stops, start/end alignment |
| **Image** | Asset, URL, or uploaded file; fit modes (fill, contain, cover, fitWidth, fitHeight) |
| **Pattern** | Repeating character with: font family, font size, spacing, rotation, color, opacity |

> **Reference:** Background model in `lib/features/editor/domain/models/project.dart`

#### 6.5.2 Element Types

**All elements share these base properties:**

```typescript
interface BaseElement {
  id: string;           // UUID
  type: 'text' | 'image' | 'shape' | 'sticker';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;     // radians
  isLocked: boolean;
  isVisible: boolean;
  zIndex: number;
  animation?: ElementAnimation;
  shadow?: ElementShadow;
}
```

---

**A) TextElement**

```typescript
interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;            // hex
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textAlignment: 'left' | 'center' | 'right';
  letterSpacing: number;
  lineHeight: number;
  gradientColors?: string[];
  backgroundColor?: string;
  outlineColor?: string;
  outlineWidth?: number;
  opacity: number;          // 0.0 – 1.0
}
```

**Font families to support:**

*Arabic:*
Cairo, Tajawal, AlmaRai, Dubai, Mada, Changa, ElMessiri, Lemonada, ReemKufi, Aref Ruqaa, Amiri, Scheherazade New, Harmattan, Markazi Text, Lalezar, Rakkas, Marhey, Baloo Bhaijaan 2, Noto Naskh Arabic, Noto Kufi Arabic, IBM Plex Sans Arabic, Readex Pro, Rubik, Vazirmatn, plus decorative/cursive Arabic fonts

*English:*
Roboto, Open Sans, Lato, Montserrat, Poppins, Raleway, Playfair Display, Merriweather, Oswald, Nunito, Quicksand, Comfortaa, Pacifico, Dancing Script, Great Vibes, Lobster, Bebas Neue, Anton, Righteous, Satisfy, Sacramento, Caveat, Kalam, Patrick Hand, Indie Flower, Shadows Into Light, Permanent Marker, Architects Daughter, Abril Fatface, Cinzel, Cormorant Garamond, Libre Baskerville, EB Garamond, Source Serif Pro, Bitter, Crimson Text, Josefin Sans, Fjalla One, Barlow Condensed, DM Sans, Inter

> **Reference:** Font lists in `lib/features/editor/presentation/widgets/panels/text_editor_panel.dart`

---

**B) ImageElement**

```typescript
interface ImageElement extends BaseElement {
  type: 'image';
  imageSrc: string;         // URL or data URI
  fit: 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight';
  opacity: number;
  cornerRadius: number;
  borderColor?: string;
  borderWidth?: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  cropTop: number;          // 0.0 – 1.0
  cropBottom: number;
  cropLeft: number;
  cropRight: number;
  cropShape: 'none' | 'circle' | 'roundedRect' | 'triangle' | 'star' | 'heart' | 'hexagon';
  brightness: number;       // -1.0 to 1.0
  contrast: number;
  saturation: number;
}
```

---

**C) ShapeElement**

```typescript
interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'line' | 'arrow' | 'star' | 'polygon' | 'diamond' | 'heart' | 'hexagon' | 'crescent';
  fillColor: string;
  strokeColor?: string;
  strokeWidth: number;
  cornerRadius: number;
  sides?: number;           // for polygon
  innerRadius?: number;     // for star
  gradientColors?: string[];
  gradientStart?: string;   // alignment
  gradientEnd?: string;
  opacity: number;
}
```

---

**D) StickerElement**

```typescript
interface StickerElement extends BaseElement {
  type: 'sticker';
  stickerType: 'emoji' | 'asset' | 'custom' | 'cursive' | 'lottie';
  content: string;          // emoji char, asset URL, or letter
  fontFamily?: string;      // for cursive
  color?: string;
  gradientColors?: string[];
  imageFill?: string;       // asset URL for image fills
  opacity: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}
```

---

**E) ElementAnimation**

```typescript
interface ElementAnimation {
  type: 'fadeIn' | 'fadeOut' | 'slideInLeft' | 'slideInRight' | 'slideInTop' | 'slideInBottom' | 'scaleIn' | 'scaleOut' | 'bounceIn' | 'rotateIn' | 'pulse' | 'shake' | 'typewriter';
  duration: number;         // milliseconds
  delay: number;
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounceOut' | 'elasticOut';
  loop: boolean;
}
```

> **Reference:** `lib/features/editor/domain/models/element_animation.dart`

---

**F) ElementShadow**

```typescript
interface ElementShadow {
  color: string;
  blurRadius: number;
  offsetX: number;
  offsetY: number;
}
```

#### 6.5.3 Editor Operations

The editor must support all of the following (reference: `lib/features/editor/providers/canvas_provider.dart`):

**Selection:**
- Click to select element
- Multi-select (Shift+click or marquee drag on empty canvas)
- Deselect on canvas click

**Element Manipulation:**
- Drag to move
- Resize via handles (corner + edge); Shift to constrain aspect ratio
- Rotate via rotation handle; Shift to snap to 15° increments
- Keyboard nudge (arrow keys, 1px; Shift+arrow = 10px)
- Lock/unlock element
- Show/hide element
- Delete (Delete/Backspace key)
- Duplicate (Ctrl+D)
- Copy/Paste (Ctrl+C / Ctrl+V) with 30px offset

**Layer Management:**
- Layers panel showing all elements (sorted by z-index, newest on top)
- Drag-drop reorder in layers panel
- Bring forward / Send backward
- Bring to front / Send to back

**Alignment:**
- Align left / center horizontal / right
- Align top / center vertical / bottom
- Distribute horizontally / vertically (when 3+ selected)
- Smart guides: snap to canvas edges, center, and other element edges/centers with 4px threshold

**Undo/Redo:**
- Ctrl+Z / Ctrl+Shift+Z
- Max 50 history entries per project
- History is a stack of JSON patches, not full state snapshots

**Zoom & Pan:**
- Scroll to zoom (at cursor position); pinch on trackpads
- Space+drag to pan canvas
- Fit to screen button (F key)
- Zoom percentage display, click to enter exact value

**Text Editing:**
- Double-click text to enter inline edit mode (HTML input overlaid on Konva node)
- Real-time text preview
- Arabic input respects RTL and shaping

**Background Editing:**
- Color picker (with eyedropper on supported browsers)
- Gradient builder (colors, stops, angle)
- Image upload (drag-drop into canvas area)
- Pattern builder

#### 6.5.4 Editor UI Layout

The editor uses a three-column shell with a thin top bar. Panels are Svelte components lazy-loaded on first open to keep the initial editor bundle lean.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Top bar (48px): [logo] Project name  ⌘Z ⌘⇧Z  •  Zoom ▾  •  Share │
├─────────┬──────────────────────────────────────────────┬─────────────┤
│         │                                              │             │
│  Left   │           Canvas stage                       │   Right     │
│  rail   │        (neutral dot-grid backdrop,           │   inspector │
│  (64px) │         centered artboard,                   │   (320px)   │
│         │         floating zoom chip bottom-left)      │             │
│ ▢ Text   │                                              │ Properties │
│ ▢ Shape  │                                              │  of select │
│ ▢ Image  │                                              │  element   │
│ ▢ Stickr │                                              │            │
│ ▢ Bg     │                                              │ Layers     │
│ ▢ Upload│                                              │  (collapse) │
│         │                                              │             │
└─────────┴──────────────────────────────────────────────┴─────────────┘
```

- **Top bar:** 48px, `--color-surface` over `--color-border` hairline. Logo at left with gradient accent (the only gradient in the chrome). Project name is an inline-editable input. Export = primary gradient button far right.
- **Left rail:** 64px icon-only tool rail. Tools are `IconButton`s; the active tool gets a 2px left border in `--color-accent` and a `--color-surface-2` background. Hover reveals a tooltip with keyboard shortcut (`Kbd`).
- **Right inspector:** 320px (collapsible to 0 via `]` key). Two tabs at top: **Properties** / **Layers**. Properties section header uses mono-labeled numeric inputs for x/y/w/h/rotation.
- **Canvas stage:** fills remaining space. Background is `--color-surface-2` in light mode, near-black `#0E1018` in dark mode (independent of app theme — designers often want a dark canvas regardless). Optional dot grid at `rgba(0,0,0,.04)`.
- **Zoom chip:** floating bottom-left, shows `75%` with −/+ buttons and a fit-to-screen icon.
- **Mobile (<768px):** left rail becomes a bottom bar (56px), right inspector becomes a bottom sheet that slides up on selection, top bar compresses project name into a menu.

### 6.6 Export

#### Formats

| Format | Free | Pro | Details |
|--------|------|-----|---------|
| PNG (Standard, 1x) | ✅ + watermark | ✅ no watermark | Download to device |
| PNG (High, 2x) | ❌ | ✅ | Higher resolution |
| PNG (Ultra, 3x) | ❌ | ✅ | Maximum resolution |
| PDF | ❌ | ✅ | Via `jsPDF` |
| GIF (animated) | ❌ | ✅ | Only if design has animations; via `gif.js` in web worker |

#### Watermark (Free Users)

- Text: **"صُمم بـ Betakti"**
- Position: Bottom-right corner
- Semi-transparent overlay (opacity 0.5)
- Applied to both PNG and GIF exports
- Rendered server-side-of-the-canvas (i.e., onto a separate Konva layer before `toDataURL()`)

#### Export Flow UI

- Export button in top bar opens a `Sheet` from the right
- Format selection via `Segmented` control
- Preview thumbnail with approximate file size
- Primary download button uses `--brand-gradient`
- On success: toast with `--ease-spring`, "Copied to clipboard" quick action

#### Social Sharing

- "Download" button (saves file to device)
- "Copy to clipboard" for quick paste (ClipboardItem API)
- Web Share API (`navigator.share`) for native sharing on supported browsers

> **Reference:** `lib/features/export/presentation/export_dialog.dart`

### 6.7 Subscription & Payments (Moyasar)

#### Tiers

| Feature | Free | Pro |
|---------|------|-----|
| Basic templates | ✅ | ✅ |
| Premium templates | ❌ | ✅ |
| Basic fonts | ✅ | ✅ |
| All fonts (60+) | ❌ | ✅ |
| Basic stickers | ✅ | ✅ |
| Premium stickers | ❌ | ✅ |
| Standard export (1x PNG) | ✅ (watermark) | ✅ (no watermark) |
| HD export (2x, 3x) | ❌ | ✅ |
| PDF export | ❌ | ✅ |
| GIF export | ❌ | ✅ |
| No watermark | ❌ | ✅ |
| AI Style Transfer | ❌ | ✅ |
| Background Removal | ✅ (limited) | ✅ (unlimited) |

#### Moyasar Integration

- **Payment methods:** Credit/Debit cards, mada, Apple Pay (on Safari)
- **Pricing plans:** Monthly / Yearly (recommended, show savings) / Lifetime one-time
- **Implementation:**
  - Mount Moyasar Web SDK inside a Svelte component via `onMount`; call `Moyasar.init()` there
  - The form element uses a dedicated container div; SvelteKit hydration doesn't interfere because we gate Moyasar init to `browser` from `$app/environment`
  - Store subscription status in Firestore under the user document
  - Server-side webhook (SvelteKit `+server.ts` under `/api/moyasar/webhook`) handles payment confirmations; verify signature, then upsert `subscriptions/{id}`
  - Manage subscription lifecycle (activate, renew, cancel, expire)
- **Paywall UI:** full-screen `Dialog` with the brand gradient as a background wash, hero headline in Display type, 6 key premium benefits rendered as a two-column list, three pricing cards (yearly highlighted with a gradient border), restore-purchases button at bottom.

> **Note:** Since Moyasar doesn't handle subscription lifecycle natively like RevenueCat, you need to build:
> 1. A Firestore `subscriptions` collection tracking user subscription status
> 2. A webhook endpoint (`/api/moyasar/webhook/+server.ts`) to receive Moyasar payment callbacks
> 3. Expiration checking logic (cron via scheduled Cloud Function or on-access check)
> 4. For recurring payments, use Moyasar's tokenization to charge saved cards

### 6.8 Projects / Saved Designs

- Save projects to Firestore (under user's document)
- Auto-save every 30 seconds while editing; debounce saves on rapid edits
- Project thumbnail generation (canvas snapshot at 400×400 to Firebase Storage)
- Project listing with grid view; staggered animation on mount
- Rename, delete, duplicate projects
- Load project into editor

#### Project Data Model

```typescript
interface Project {
  id: string;
  name: string;             // default: "تصميم جديد"
  canvasSize: CanvasSize;
  background: CanvasBackground;
  elements: CanvasElement[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  thumbnailUrl?: string;
  userId: string;
}
```

### 6.9 Tools

#### Background Removal

- Upload image → remove background → download result
- Use `@imgly/background-removal` (WASM, runs client-side, no backend cost)
- Free tier: 3 uses per day (enforced via Firestore counter); Pro: unlimited
- Progress indicator uses `--brand-gradient` as a linear progress bar

#### AI Style Transfer (Phase 2)

- Upload image → apply artistic style → download result
- Backend: **fal.ai** API (Flux Dev Image-to-Image model)
- Style presets: anime, oil painting, watercolor, pencil sketch, etc.
- Pro only feature

> **Reference:** `lib/features/ai_style/data/services/ai_style_service.dart`

### 6.10 Settings

- Account info (email, display name)
- Subscription status & management
- Theme toggle (dark/light/system) — defaults to system
- Language switch (Arabic/English)
- Help & Support (mailto link)
- Privacy Policy / Terms of Service links
- Social links: Twitter (@khalidjsah), Instagram (@khalidjh)

### 6.11 Stock Photos Integration

- **Pexels API** for free stock photos, proxied through a SvelteKit API route to keep the API key server-side
- Categories: nature, abstract, minimal, textures, gradients, people, food, architecture, etc.
- Search functionality with debounced input
- Used as image elements or backgrounds

> **Reference:** Stock photo service in the Flutter app uses curated Pexels photo lists

---

## 7. RTL & Localization

- **Primary language:** Arabic (RTL layout)
- **Secondary language:** English (LTR layout)
- All UI strings go through **Paraglide JS** with messages defined in `project.inlang/`
- The editor canvas itself is direction-agnostic (elements have absolute positions)
- Text elements support both RTL and LTR text, with automatic shaping via Konva's text rendering
- `dir="rtl"` toggled on `<html>` in `app.html` based on negotiated locale in `hooks.server.ts`
- Font loading must handle both Arabic and English font families — use Fontsource for static bundling of the design-system fonts, Google Fonts CDN for in-canvas typeface library
- Icons that have directionality (back arrows, undo/redo) must flip in RTL — provide `ChevronStart` / `ChevronEnd` wrappers that map to `ChevronLeft` / `ChevronRight` based on `dir`

---

## 8. Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| Desktop (≥1024px) | Full editor with side panels |
| Tablet (768–1023px) | Collapsible panels, floating toolbars |
| Mobile (<768px) | Simplified editor with bottom sheets for tools (similar to mobile app UX) |

The editor should be **primarily optimized for desktop** (this is the web version's main advantage over mobile). Mobile web should gracefully degrade but doesn't need full parity. Marketing, home, templates, projects, settings, and paywall pages must be fully responsive.

---

## 9. Data Architecture (Firestore)

### Collections

```
users/
  {userId}/
    - email, displayName, createdAt
    - subscription: { tier, isActive, expirationDate, productId, isLifetime }

projects/
  {projectId}/
    - userId, name, canvasSize, background, elements[], createdAt, updatedAt, thumbnailUrl

dynamic_templates/                    ← shared with mobile app (already exists)
  {templateId}/
    - nameAr, nameEn, category, canvasSizeId, isPremium, isActive
    - sortOrder, section, sectionAr, sectionEn
    - background (JSON), elements (JSON array)

subscriptions/                        ← payment records
  {subscriptionId}/
    - userId, moyasarPaymentId, plan, amount, currency
    - status, startDate, endDate, autoRenew
    - moyasarToken (for recurring charges)

home_sections/                        ← shared with mobile app (may already exist)
  {sectionId}/
    - title, titleAr, titleEn, type, sortOrder, isActive

config/                               ← app configuration
  occasions/                          ← occasion date ranges (editable without deploy)
```

---

## 10. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Shift+Z | Redo |
| Ctrl+C | Copy element |
| Ctrl+V | Paste element |
| Ctrl+D | Duplicate element |
| Delete / Backspace | Delete selected element |
| Arrow keys | Nudge element 1px (Shift+arrow = 10px) |
| Ctrl+A | Select all elements |
| Ctrl+S | Save project |
| Ctrl+E | Export |
| Escape | Deselect / Close panel |
| Shift+Click | Multi-select |
| Double-click text | Enter text edit mode |
| Scroll wheel | Zoom in/out |
| Space+Drag | Pan canvas |
| `T` / `S` / `I` / `K` / `B` | Tool hotkeys: Text / Shape / Image / Sticker / Background |
| `F` | Fit to screen |
| `]` | Toggle inspector panel |
| `?` | Open shortcut cheatsheet |

A global `Dialog` opened by `?` shows all shortcuts in a two-column Arabic/English layout — keeps the "designer tool" expectation.

---

## 11. SEO & Marketing Pages

The landing page (`/`) should be a **marketing page** (not behind auth), rendered via SvelteKit SSR/prerender for optimal SEO:

- Hero section with app screenshots and "ابدأ التصميم / Start Designing" CTA
- Feature highlights (3-column grid, each with a custom line illustration)
- Template gallery preview (public, browsable, prerendered pages per template)
- Pricing section
- Arabic-first design, bilingual content — toggle sticky in top-right
- Open Graph + Twitter Card meta per template for shareability
- JSON-LD structured data for templates (as `CreativeWork`)

Prerender config in `+page.ts`:

```typescript
export const prerender = true;
```

---

## 12. Performance Requirements

- First Contentful Paint < 1.8s (marketing pages are prerendered, so near-instant)
- Largest Contentful Paint < 2.5s on 4G
- Editor initial load < 3s; canvas interactive < 4s
- Canvas rendering at 60fps for drag/resize/rotate (Konva's layered rendering handles this)
- Auto-save must not block UI — run in a micro-task, write via Firestore's offline queue
- Lazy-load templates and images via intersection observer
- Use Web Workers for heavy operations (GIF encoding, background removal, thumbnail generation)
- Code-split: the editor bundle is loaded only when `/editor/*` is hit, not on `/home`
- Icons tree-shaken (lucide-svelte imports are per-icon, not barrel)

---

## 13. Phase Plan

### Phase 1 — MVP
- SvelteKit + Tailwind + brand token setup, component library foundation
- Auth (Firebase) with superforms
- Home dashboard with template browsing
- Canvas editor with all 4 element types (text, image, shape, sticker) on Konva
- Background types (color, gradient, image)
- PNG export (with watermark for free)
- Project save/load (Firestore)
- Moyasar subscription integration
- Arabic/English localization via Paraglide
- Responsive layout (desktop-first)
- Full dark + light theming

### Phase 2 — Enhanced
- Animation system + GIF export (web worker)
- PDF export
- Pattern backgrounds
- Stock photos (Pexels) integration
- Background removal tool (WASM)
- Element shadows + glows
- Advanced image editing (crop shapes, filters)
- Shortcut cheatsheet dialog
- Smart guides & snap-to-grid

### Phase 3 — Advanced
- AI Style Transfer (fal.ai)
- Template creation & sharing (user-generated)
- Collaborative editing (Firestore realtime + Yjs for CRDT)
- Custom font upload
- Referral program (web version)
- Public share links with view-only mode

---

## 14. Reference Files in Flutter Project

When building, consult these files in `/Users/khalid/Documents/betakti-flutter/` for exact specifications:

| What | Path |
|------|------|
| Template model & categories | `lib/features/templates/domain/models/template.dart` |
| Dynamic template model | `lib/features/templates/domain/models/dynamic_template.dart` |
| Canvas element models | `lib/features/editor/domain/models/canvas_element.dart` |
| Project model (background, canvas) | `lib/features/editor/domain/models/project.dart` |
| Animation model | `lib/features/editor/domain/models/element_animation.dart` |
| Canvas provider (all operations) | `lib/features/editor/providers/canvas_provider.dart` |
| Export dialog & logic | `lib/features/export/presentation/export_dialog.dart` |
| Export service | `lib/features/export/data/services/export_service.dart` |
| GIF export service | `lib/features/export/data/services/gif_export_service.dart` |
| Subscription service | `lib/core/services/subscription_service.dart` |
| Subscription model | `lib/core/services/subscription_service.dart` (SubscriptionStatus) |
| Home screen | `lib/features/home/presentation/screens/home_screen.dart` |
| Text editor panel (font lists) | `lib/features/editor/presentation/widgets/panels/text_editor_panel.dart` |
| Shape types | `lib/features/editor/domain/models/canvas_element.dart` (ShapeType enum) |
| Sticker types | `lib/features/editor/domain/models/canvas_element.dart` (StickerType enum) |
| AI Style service | `lib/features/ai_style/data/services/ai_style_service.dart` |
| Stock photos | Stock photo service files |
| Settings screen | `lib/features/settings/` |
| Occasion detection | `lib/features/home/presentation/screens/home_screen.dart` |
| Watermark logic | `lib/features/export/` |
| Canvas sizes | `lib/features/editor/domain/models/project.dart` (CanvasSize) |
| All dependencies | `pubspec.yaml` |

---

## 15. Suggested Project Structure

```
betakti-web/
├── src/
│   ├── app.html                     ← dir + lang attrs + brand theme color meta
│   ├── app.css                      ← Tailwind layers + design tokens
│   ├── app.d.ts                     ← App types (session, locale)
│   ├── hooks.server.ts              ← Session verify, locale negotiation
│   ├── routes/                      ← (see §5)
│   └── lib/
│       ├── brand/                   ← Logo, tokens, gradient helpers
│       │   ├── tokens.ts
│       │   ├── logo.svelte
│       │   └── gradient.svelte
│       ├── components/              ← Design system components
│       │   ├── button.svelte
│       │   ├── input.svelte
│       │   ├── numeric-input.svelte
│       │   └── ...
│       ├── editor/                  ← Canvas editor core
│       │   ├── editor.svelte.ts     ← State store (runes)
│       │   ├── stage.svelte         ← Konva stage wrapper
│       │   ├── elements/            ← Per-element-type renderers
│       │   ├── panels/              ← Inspector, layers, tools
│       │   ├── shortcuts.ts         ← Global shortcut registrar
│       │   └── history.ts           ← Undo/redo stack
│       ├── firebase/                ← Client + admin SDK wrappers
│       ├── moyasar/                 ← Payment integration
│       ├── i18n/                    ← Paraglide generated + wrapper
│       ├── data/                    ← Static templates, canvas sizes, fonts
│       └── utils/
├── static/
│   ├── brand/                       ← Logo assets
│   ├── fonts/                       ← Arabic fonts not on Google Fonts
│   └── favicon.*
├── project.inlang/                  ← Paraglide message catalog
├── tailwind.config.ts
├── svelte.config.js
├── vite.config.ts
└── package.json
```

---

## 16. Important Implementation Notes

1. **Shared Firestore:** The web app connects to the **same Firebase project** as the mobile app. This means `dynamic_templates` collection is already populated and will work immediately.

2. **Cross-platform projects:** Design the project storage schema so that projects created on web could theoretically be opened on mobile in the future (same element model structure).

3. **Moyasar vs RevenueCat:** The mobile app uses RevenueCat for in-app purchases. The web app uses Moyasar. Subscription status is stored in Firestore so both platforms can check if a user is Pro — read the `users/{userId}.subscription` field as the single source of truth.

4. **Watermark text:** Exactly `"صُمم بـ Betakti"` — positioned bottom-right, semi-transparent, rendered in the Readex Pro / IBM Plex Sans Arabic font at 3% of canvas width.

5. **Default project name:** `"تصميم جديد"` (New Design).

6. **Arabic-first:** All default UI is Arabic. English is secondary. `app.html` sets `lang="ar" dir="rtl"` by default, overridden by `hooks.server.ts` based on cookie/header.

7. **Theme:** Support dark and light modes. Default to system preference. Theme switch is instantaneous (no flash) — inject a small inline script in `app.html` that reads the preference and sets `data-theme` before hydration.

8. **Canvas coordinate system:** Elements use absolute x/y positioning within the canvas dimensions. Rotation is in radians. Z-index determines layer order.

9. **Font loading strategy:** Load only fonts that are used in the current design. Use Google Fonts API for English fonts. Host Arabic fonts that aren't on Google Fonts. Design-system fonts (Inter, Readex Pro, Geist Mono) are bundled via Fontsource so they never block the shell.

10. **Auto-save:** Save to Firestore every 30 seconds. Debounce saves on rapid edits. Show save indicator in top bar — a subtle gradient dot pulsing during save, settled when synced.

11. **Svelte 5 idioms:** Use `$state` for local reactive values, `$derived` for computed, `$effect` for side effects. Never use legacy `$:` reactive statements in new code. Props are declared via `let { foo } = $props()`.

12. **Accessibility:** Every interactive element has a visible focus ring using the accent color. All icons inside IconButtons have `aria-label`. The canvas has an ARIA live region that announces structural changes ("element added", "element deleted"). Arabic reading order tested with NVDA and VoiceOver.

13. **Brand discipline:** The gradient is a signature, not a pattern. Using it in more than ~6 places on any single screen dilutes it. Audit every screen: logo, one primary CTA, one active-state indicator, pro badge if present, upgrade button if present — that's usually the ceiling.
