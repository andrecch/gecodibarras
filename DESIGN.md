---
name: Corporate Utility Blue
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#444653'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#323537'
  on-tertiary: '#ffffff'
  tertiary-container: '#484c4e'
  on-tertiary-container: '#b9bcbe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 20px
  margin: 24px
---

## Brand & Style

This design system is built for high-productivity corporate environments where clarity, reliability, and efficiency are paramount. The aesthetic is rooted in **Modern Corporate Minimalism**, prioritizing functional density over decorative flair. 

The visual language communicates authority through a deep blue palette and a rigorous adherence to a systematic grid. By utilizing generous whitespace within components and tight structural alignment, the system ensures that complex data remains legible and actionable. The emotional response should be one of stability and professional "utility"—a tool that feels invisible yet indispensable.

## Colors

The palette is anchored by a deep corporate blue (#1e40af), which serves as the primary driver for call-to-actions, active states, and brand signifiers. To maintain a professional utility aesthetic, the supporting palette is strictly neutral, utilizing a range of slate grays to establish hierarchy without introducing visual noise.

- **Primary:** #1e40af (Actionable elements, brand highlights)
- **Secondary:** #64748b (De-emphasized text, icons, secondary actions)
- **Surface:** #ffffff (Main background)
- **Subtle Surface:** #f8fafc (Container backgrounds, table headers)
- **Border:** #e2e8f0 (Default structural borders)
- **Text Primary:** #0f172a (High-contrast body and headings)
- **Success/Warning/Error:** Use standard utility tones (Emerald 600, Amber 500, Rose 600) sparingly to ensure the primary blue remains the dominant identifier.

## Typography

This design system uses **Inter** exclusively to leverage its exceptional legibility and neutral, systematic character. 

Hierarchy is established through weight and scale rather than decorative shifts. Headings utilize a tighter letter spacing and heavier weights to anchor sections, while body text maintains standard tracking for optimal readability in data-heavy views. Small labels should use uppercase styling with increased letter spacing to differentiate them from standard body text in utility sidebars and metadata fields.

## Layout & Spacing

The system employs a **Fixed-Fluid Hybrid Grid**. Main content areas use a 12-column fluid grid for flexibility across dashboard views, while sidebars and navigation drawers use fixed widths (typically 240px or 280px) to ensure consistent control density.

The spacing rhythm is based on a 4px baseline. Use 16px (md) as the default padding for cards and containers, and 8px (sm) for internal element grouping. This "tight but breathable" approach ensures high information density without feeling cramped.

## Elevation & Depth

Hierarchy is primarily achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Base):** The primary background (#ffffff).
- **Level 1 (Subtle):** Containers use #f8fafc with a 1px border (#e2e8f0).
- **Level 2 (Interactive):** Elements like cards or dropdowns use a very soft, high-diffusion shadow: `0px 4px 6px -1px rgba(0, 0, 0, 0.05)`.
- **Active States:** Use the primary blue (#1e40af) for subtle bottom borders or indicator pips to denote focus without changing the elevation of the element itself.

## Shapes

The design system adopts a **Rounded (8px)** corner radius across all core UI components, including buttons, input fields, and cards. This radius strikes a balance between the clinical feel of sharp corners and the overly casual nature of pill shapes. 

- **Standard (Base):** 8px (Buttons, Inputs, Cards)
- **Small:** 4px (Checkboxes, Tags, Tooltips)
- **Large:** 12px (Modals, Large Feature Sections)

## Components

### Buttons
- **Primary:** Solid #1e40af background with white text. 8px radius.
- **Secondary:** White background with #e2e8f0 border and #0f172a text.
- **Ghost:** No background or border; uses #64748b text that shifts to #1e40af on hover.

### Input Fields
- Height of 40px for standard density. 
- 1px border (#e2e8f0). On focus, the border shifts to #1e40af with a 2px outer glow (10% opacity blue).

### Chips & Tags
- Default: #f1f5f9 background with #475569 text.
- Active/Primary: Light blue tint (#dbeafe) with #1e40af text.

### Cards
- White background, 1px #e2e8f0 border, 8px corner radius. 
- Headers should be separated by a subtle 1px divider if the card contains complex lists or tables.

### Data Tables
- Use #f8fafc for header backgrounds. 
- 14px (Body-md) text for cell content to maximize information density.
- Rows use a subtle hover state (#f1f5f9) to assist with horizontal tracking.