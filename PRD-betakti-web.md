# Betakti Web — Product Requirements Document (PRD)

## 1. Overview

**Betakti** (بطاقتي — "My Card") is an Arabic-first design and greeting card editor. The existing **Flutter mobile app** is live on iOS & Android. This document specifies the requirements for building a **standalone web application** that mirrors the core experience of the mobile app while leveraging web-specific capabilities.

**Reference Flutter project:** `/Users/khalid/Documents/betakti-flutter`

---

## 2. Goals

| Goal | Detail |
|------|--------|
| Increase usage & reach | Web removes the app-install barrier |
| Feature parity (core) | Users can browse templates, edit designs, and export — same as mobile |
| Monetization | Subscription via **Moyasar** payment gateway (replaces RevenueCat) |
| SEO & shareability | Public template gallery pages, sharable design links |

---

## 3. Tech Stack (Recommended)

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 14+ (App Router)** |
| Language | TypeScript |
| Canvas/Editor | **Fabric.js** or **Konva.js** (HTML5 Canvas) |
| State Management | Zustand or React Context |
| Styling | Tailwind CSS |
| Backend / DB | **Firebase** (Firestore, Auth, Storage) — same project as mobile |
| Payments | **Moyasar** (credit card + Apple Pay + mada) |
| Hosting | Vercel or Firebase Hosting |
| Auth | Firebase Auth (email/password + Google + Apple) |
| Fonts | Google Fonts API + self-hosted Arabic font files |
| i18n | next-intl (Arabic RTL primary, English secondary) |
| Export | Canvas `.toDataURL()` for PNG, `jsPDF` for PDF, `gif.js` for GIF |

---

## 4. Information Architecture & Pages

```
/                         → Landing / Marketing page
/app                      → Main app shell (authenticated)
/app/home                 → Home dashboard (templates, recent designs, tools)
/app/editor/:projectId    → Canvas editor
/app/templates            → Template gallery (filterable by category)
/app/templates/:id        → Template detail / preview
/app/projects             → User's saved projects
/app/settings             → Account, subscription, preferences
/app/subscription         → Paywall / pricing page
/auth/login               → Login
/auth/register            → Register
/auth/forgot-password     → Password reset
```

---

## 5. Feature Specifications

### 5.1 Authentication

- Firebase Auth: email/password, Google OAuth, Apple Sign-In
- Guest mode: allow browsing templates and basic editing without login
- Prompt login on save/export

### 5.2 Home Dashboard (`/app/home`)

**Sections (top to bottom):**

1. **Start New Design** — Grid of canvas size cards (see §5.4 for sizes)
2. **Occasion Banner** — Auto-detected based on current date (see §5.2.1)
3. **Template Sections** — Dynamic sections from Firestore (same collection as mobile)
4. **Tools** — Background Removal tool card
5. **Recent Designs** — Grid of user's recent projects with thumbnails

#### 5.2.1 Occasion Detection Logic

Detect current date and show relevant occasion templates:

| Occasion | Approx. Date Range | Category |
|----------|-------------------|----------|
| Ramadan | Feb 18 ± 20 days | `ramadan` |
| Eid al-Fitr | Mar 20 ± 10 days | `eid` |
| Eid al-Adha | May 27 ± 10 days | `eid` |
| National Day | Sep 23 ± 10 days | `nationalDay` |
| Graduation Season | May 15 ± 20 days | `graduation` |

> **Note:** These dates are approximate and should be configurable. Reference: `lib/features/home/presentation/screens/home_screen.dart`

### 5.3 Template System

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
2. **Hardcoded (Static):** Convert key templates from mobile app to JSON/TypeScript constants

> **Reference:** `lib/features/templates/domain/models/template.dart` and `lib/features/templates/domain/models/dynamic_template.dart`

### 5.4 Canvas Sizes

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

### 5.5 Canvas Editor

This is the core of the app. The editor must support all element types from the mobile app.

#### 5.5.1 Canvas Background Types

| Type | Properties |
|------|-----------|
| **Color** | Single solid color (hex) |
| **Gradient** | Linear gradient with 2+ color stops, start/end alignment |
| **Image** | Asset, URL, or uploaded file; fit modes (fill, contain, cover, fitWidth, fitHeight) |
| **Pattern** | Repeating character with: font family, font size, spacing, rotation, color, opacity |

> **Reference:** Background model in `lib/features/editor/domain/models/project.dart`

#### 5.5.2 Element Types

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

#### 5.5.3 Editor Operations

The editor must support all of the following (reference: `lib/features/editor/providers/canvas_provider.dart`):

**Selection:**
- Click to select element
- Multi-select (Shift+click or marquee)
- Deselect on canvas click

**Element Manipulation:**
- Drag to move
- Resize via handles (corner + edge)
- Rotate via rotation handle
- Keyboard nudge (arrow keys, 1px)
- Lock/unlock element
- Show/hide element
- Delete (Delete/Backspace key)
- Duplicate (Ctrl+D)
- Copy/Paste (Ctrl+C / Ctrl+V) with 30px offset

**Layer Management:**
- Layers panel showing all elements (sorted by z-index)
- Drag-drop reorder in layers panel
- Bring forward / Send backward
- Bring to front / Send to back

**Alignment:**
- Align left / center horizontal / right
- Align top / center vertical / bottom

**Undo/Redo:**
- Ctrl+Z / Ctrl+Shift+Z
- Max 50 history entries

**Zoom & Pan:**
- Scroll to zoom
- Drag canvas to pan (when not on element)
- Fit to screen button
- Zoom percentage display

**Text Editing:**
- Double-click text to enter inline edit mode
- Real-time text preview

**Background Editing:**
- Color picker
- Gradient builder (colors, direction)
- Image upload
- Pattern builder

#### 5.5.4 Editor UI Layout

```
┌─────────────────────────────────────────────────────────┐
│  Top Bar: Project name | Undo/Redo | Zoom | Export btn  │
├──────────┬──────────────────────────────┬───────────────┤
│          │                              │               │
│  Left    │                              │   Right       │
│  Panel   │       Canvas Area            │   Panel       │
│          │                              │               │
│  - Add   │   (zoomable, pannable)       │  - Properties │
│    Text   │                              │    of selected│
│    Shape  │                              │    element    │
│    Image  │                              │               │
│    Sticker│                              │  - Layers     │
│           │                              │    list       │
│          │                              │               │
├──────────┴──────────────────────────────┴───────────────┤
│  Bottom: (optional toolbar for quick actions)           │
└─────────────────────────────────────────────────────────┘
```

- **Left Panel:** Element insertion tools (add text, shape, image upload, sticker picker, background editor)
- **Right Panel:** Properties panel for selected element + Layers panel
- **Canvas Area:** The main editing area with the design canvas centered
- **Top Bar:** Project name (editable), undo/redo buttons, zoom controls, export button

### 5.6 Export

#### Formats

| Format | Free | Pro | Details |
|--------|------|-----|---------|
| PNG (Standard, 1x) | ✅ + watermark | ✅ no watermark | Download to device |
| PNG (High, 2x) | ❌ | ✅ | Higher resolution |
| PNG (Ultra, 3x) | ❌ | ✅ | Maximum resolution |
| PDF | ❌ | ✅ | Via `jsPDF` |
| GIF (animated) | ❌ | ✅ | Only if design has animations; via `gif.js` |

#### Watermark (Free Users)

- Text: **"صُمم بـ Betakti"**
- Position: Bottom-right corner
- Semi-transparent overlay
- Applied to both PNG and GIF exports

#### Social Sharing

- "Download" button (saves file to device)
- "Copy to clipboard" for quick paste
- Web Share API for native sharing on supported browsers

> **Reference:** `lib/features/export/presentation/export_dialog.dart`

### 5.7 Subscription & Payments (Moyasar)

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
- **Pricing plans:**
  - Monthly subscription
  - Yearly subscription (recommended, show savings)
  - Lifetime one-time purchase
- **Implementation:**
  - Use [Moyasar Web SDK](https://docs.moyasar.com/) for payment form
  - Store subscription status in Firestore under the user document
  - Server-side webhook to handle payment confirmations and renewals
  - Manage subscription lifecycle (activate, renew, cancel, expire)
- **Paywall UI:** Show when user tries to access a Pro feature
  - Display 6 key premium benefits
  - Show all 3 pricing tiers
  - Highlight yearly as "recommended"
  - Restore purchases / check status button

> **Note:** Since Moyasar doesn't handle subscription lifecycle natively like RevenueCat, you need to build:
> 1. A Firestore `subscriptions` collection tracking user subscription status
> 2. A webhook endpoint (Cloud Function) to receive Moyasar payment callbacks
> 3. Expiration checking logic (cron or on-access check)
> 4. For recurring payments, use Moyasar's tokenization to charge saved cards

### 5.8 Projects / Saved Designs

- Save projects to Firestore (under user's document)
- Auto-save every 30 seconds while editing
- Project thumbnail generation (canvas snapshot)
- Project listing with grid view
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

### 5.9 Tools

#### Background Removal

- Upload image → remove background → download result
- Use a JS-based ML model (e.g., `@imgly/background-removal` npm package) or a backend API
- Free tier: limited uses per day; Pro: unlimited

#### AI Style Transfer (Phase 2)

- Upload image → apply artistic style → download result
- Backend: **fal.ai** API (Flux Dev Image-to-Image model)
- Style presets: anime, oil painting, watercolor, pencil sketch, etc.
- Pro only feature

> **Reference:** `lib/features/ai_style/data/services/ai_style_service.dart`

### 5.10 Settings

- Account info (email, display name)
- Subscription status & management
- Theme toggle (dark/light mode)
- Language switch (Arabic/English)
- Help & Support (mailto link)
- Privacy Policy / Terms of Service links
- Social links: Twitter (@khalidjsah), Instagram (@khalidjh)

### 5.11 Stock Photos Integration

- **Pexels API** for free stock photos
- Categories: nature, abstract, minimal, textures, gradients, people, food, architecture, etc.
- Search functionality
- Used as image elements or backgrounds

> **Reference:** Stock photo service in the Flutter app uses curated Pexels photo lists

---

## 6. RTL & Localization

- **Primary language:** Arabic (RTL layout)
- **Secondary language:** English (LTR layout)
- All UI strings must be localized
- The editor canvas itself is direction-agnostic (elements have absolute positions)
- Text elements support both RTL and LTR text
- Use `next-intl` or similar for i18n
- `dir="rtl"` on HTML root when Arabic is selected
- Font loading must handle both Arabic and English font families

---

## 7. Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| Desktop (≥1024px) | Full editor with side panels |
| Tablet (768–1023px) | Collapsible panels, floating toolbars |
| Mobile (<768px) | Simplified editor with bottom sheets for tools (similar to mobile app UX) |

The editor should be **primarily optimized for desktop** (this is the web version's main advantage over mobile). Mobile web should gracefully degrade but doesn't need full parity.

---

## 8. Data Architecture (Firestore)

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
```

---

## 9. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Shift+Z | Redo |
| Ctrl+C | Copy element |
| Ctrl+V | Paste element |
| Ctrl+D | Duplicate element |
| Delete / Backspace | Delete selected element |
| Arrow keys | Nudge element 1px |
| Ctrl+A | Select all elements |
| Ctrl+S | Save project |
| Ctrl+E | Export |
| Escape | Deselect / Close panel |
| Shift+Click | Multi-select |
| Double-click text | Enter text edit mode |
| Scroll wheel | Zoom in/out |
| Space+Drag | Pan canvas |

---

## 10. SEO & Marketing Pages

The landing page (`/`) should be a **marketing page** (not behind auth):

- Hero section with app screenshots and "Start Designing" CTA
- Feature highlights
- Template gallery preview (public, browsable)
- Pricing section
- Arabic-first design, bilingual content

---

## 11. Performance Requirements

- First Contentful Paint < 2s
- Editor load time < 3s
- Canvas rendering at 60fps for drag/resize/rotate
- Auto-save should not block UI
- Lazy-load templates and images
- Use Web Workers for heavy operations (GIF encoding, background removal)

---

## 12. Phase Plan

### Phase 1 — MVP
- Auth (Firebase)
- Home dashboard with template browsing
- Canvas editor with all 4 element types (text, image, shape, sticker)
- Background types (color, gradient, image)
- PNG export (with watermark for free)
- Project save/load (Firestore)
- Moyasar subscription integration
- Arabic/English localization
- Responsive layout (desktop-first)

### Phase 2 — Enhanced
- Animation system + GIF export
- PDF export
- Pattern backgrounds
- Stock photos (Pexels)
- Background removal tool
- Element shadows
- Advanced image editing (crop shapes, filters)

### Phase 3 — Advanced
- AI Style Transfer (fal.ai)
- Template creation & sharing
- Collaborative editing
- Custom font upload
- Referral program (web version)

---

## 13. Reference Files in Flutter Project

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

## 14. Important Implementation Notes

1. **Shared Firestore:** The web app should connect to the **same Firebase project** as the mobile app. This means `dynamic_templates` collection is already populated and will work immediately.

2. **Cross-platform projects:** Design the project storage schema so that projects created on web could theoretically be opened on mobile in the future (same element model structure).

3. **Moyasar vs RevenueCat:** The mobile app uses RevenueCat for in-app purchases. The web app uses Moyasar. Subscription status should be stored in Firestore so both platforms can check if a user is Pro.

4. **Watermark text:** Exactly `"صُمم بـ Betakti"` — positioned bottom-right, semi-transparent.

5. **Default project name:** `"تصميم جديد"` (New Design).

6. **Arabic-first:** All default UI should be Arabic. English is secondary.

7. **Theme:** Support dark and light modes. Default to system preference.

8. **Canvas coordinate system:** Elements use absolute x/y positioning within the canvas dimensions. Rotation is in radians. Z-index determines layer order.

9. **Font loading strategy:** Load only fonts that are used in the current design to minimize bandwidth. Use Google Fonts API for English fonts. Host Arabic fonts that aren't on Google Fonts.

10. **Auto-save:** Save to Firestore every 30 seconds. Debounce saves on rapid edits. Show save indicator in top bar.
