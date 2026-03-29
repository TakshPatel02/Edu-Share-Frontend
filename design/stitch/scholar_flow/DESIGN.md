# Design System Strategy: The Academic Curator

## 1. Overview & Creative North Star
The "Academic Curator" is the creative North Star for this design system. We are moving away from the cluttered, "dashboard-heavy" look of traditional Learning Management Systems (LMS) and toward a high-end editorial experience. 

The goal is to treat educational content with the same reverence as a premium digital magazine. We break the "SaaS template" look through **intentional asymmetry**—offsetting headers from content blocks—and **tonal depth**. By utilizing extreme roundedness (`xl`: 3rem) and a "No-Line" philosophy, we create a fluid, organic environment that reduces cognitive load and fosters a sense of calm, focused study.

---

## 2. Colors & Tonal Architecture
This system utilizes a sophisticated Material Design-inspired palette to establish trust through "Professional Blue" and "Clean Slate" neutrals.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts.
*   *Implementation:* Use a `surface-container-low` (#f2f4f6) section sitting on a `background` (#f7f9fb) to define a sidebar or header area. 

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, premium materials.
*   **Level 0 (Base):** `surface` (#f7f9fb) – The canvas.
*   **Level 1 (Sections):** `surface-container-low` (#f2f4f6) – Large structural areas.
*   **Level 2 (Cards):** `surface-container-lowest` (#ffffff) – High-priority interactive modules.
*   **Level 3 (Pop-overs):** `surface-bright` (#f7f9fb) with Glassmorphism.

### The "Glass & Gradient" Rule
To escape the "flat" SaaS look, use **Glassmorphism** for floating navigation and action bars. 
*   *Formula:* `surface-container-lowest` at 80% opacity + 20px Backdrop Blur.
*   *Signature Textures:* For primary CTAs, do not use flat hex codes. Use a subtle linear gradient from `primary` (#004ac6) to `primary-container` (#2563eb) at a 135-degree angle to provide "soul" and depth.

---

## 3. Typography
We use a dual-font pairing to balance authority with readability.

*   **Display & Headlines (Manrope):** A geometric sans-serif that feels modern and architectural. Use `display-lg` (3.5rem) for hero moments to create an editorial "magazine" feel.
*   **Body & Labels (Inter):** The gold standard for UI legibility. Inter handles the heavy lifting of study materials and data.

**Editorial Hierarchy:**
*   **Headline-LG (Manrope, 2rem):** Used for course titles. Pair with an asymmetrical layout where the text is offset to the left of the main content container.
*   **Title-SM (Inter, 1rem):** Used for navigation and sub-headers. Always set to Medium or Semi-Bold weight to ensure the "Trustworthy" brand pillar is met.

---

## 4. Elevation & Depth
We achieve hierarchy through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on top of a `surface-container-high` (#e6e8ea) background. The 4-step jump in tonal value creates a natural, soft "lift" that feels integrated into the environment.
*   **Ambient Shadows:** When a shadow is required for a floating state (e.g., a dragged file), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(25, 28, 30, 0.06);`. Note the use of `on-surface` (#191c1e) as the shadow tint rather than pure black.
*   **The Ghost Border:** If a border is required for accessibility (e.g., input fields), use `outline-variant` (#c3c6d7) at **15% opacity**. High-contrast borders are strictly forbidden as they clutter the "Academic Curator" aesthetic.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary` to `primary-container`), `xl` (3rem) corner radius. High-contrast `on-primary` text.
*   **Secondary:** `surface-container-highest` background with `on-secondary-container` text. No border.
*   **Tertiary:** Text-only with an underline that appears on hover, using the `primary` color.

### Input Fields
*   **Styling:** Background `surface-container-low`, `xl` corners, no border. On focus, transition background to `surface-container-lowest` and add a 1px "Ghost Border" of `primary`.

### Cards & Lists
*   **The "No-Divider" Rule:** Forbid the use of horizontal rules (`<hr>`). 
*   **Structure:** Separate list items using `spacing-4` (1rem) of vertical white space or by alternating background colors between `surface-container-lowest` and `surface-container-low`.

### Academic-Specific Components
*   **The Progress Orbit:** A circular progress indicator for course completion using `primary` and `surface-variant`.
*   **The Focus Mode Card:** A full-screen `surface` layer that hides all navigation, leaving only a `headline-lg` title and a `body-lg` reading area to maximize student concentration.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `spacing-12` (3rem) and `spacing-16` (4rem) for "breathable" margins between major sections.
*   **Do** use the `xl` (3rem) corner radius for all main containers to maintain the soft, friendly SaaS aesthetic.
*   **Do** use `tertiary` (#943700) sparingly for "Success" or "Achievement" callouts to add a warm, academic warmth to the cool blue palette.

### Don't
*   **Don't** use 100% opaque black (#000000) for text. Always use `on-surface` (#191c1e) to reduce eye strain.
*   **Don't** use "Standard" shadows (e.g., `0 2px 4px`). They look cheap and dated.
*   **Don't** use sharp corners. Even small elements like checkboxes must use at least `sm` (0.5rem) rounding to remain cohesive.