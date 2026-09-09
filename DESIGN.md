# Design System — EDSA Digital Portal

Adapted from the "ibm" (Carbon Design System) reference — kept the flat-square enterprise aesthetic, sharp corners, and rigorous grid, but changed the primary color to EDSA Navy and accents to EDSA Red. Dropped IBM Plex Sans in favor of the system-native sans (Inter/System) for performance, while maintaining the light/regular typographic hierarchy.

## Product & feel
The official Electricity Distribution and Supply Authority (EDSA) of Sierra Leone website. It serves citizens, businesses, and government stakeholders. The personality is precise, trustworthy, authoritative, and efficient. The density is medium-high to accommodate utility data, but structurally clean.

## Principles
1. **Utility before decoration**: Information must be instantly scannable. No unnecessary graphics.
2. **Authoritative & flat**: 0px border radius, sharp corners, and thin hairlines. It feels like an official government document.
3. **High contrast**: Maximum legibility for all users, including those on low-end devices or in bright sunlight.
4. **Resilient design**: Must look structurally sound even if images fail to load or data is sparse.

## Colour
Semantic ROLES:
- **bg / canvas**: `#FFFFFF` (Pure white for primary surfaces)
- **surface-1**: `#F4F4F5` (Light gray for alternate rows and inputs)
- **surface-2**: `#E4E4E7` (Slightly darker gray for subtle borders and disabled states)
- **inverse-canvas**: `#0A1931` (EDSA Navy for header/footer and hero sections)
- **fg**: `#111827` (Charcoal for primary text)
- **fg-muted**: `#4B5563` (Secondary text)
- **primary**: `#0A1931` (EDSA Navy for primary actions and authority)
- **primary-fg**: `#FFFFFF` (White text on Navy)
- **accent**: `#D32F2F` (EDSA Red for warnings, urgent CTAs, and alerts)
- **accent-hover**: `#B71C1C`
- **success**: `#059669` (Emerald for active services, online status)
- **warning**: `#D97706` (Amber for maintenance and pending items)
- **danger**: `#D32F2F` (Red for outages and destructive actions)
- **border**: `#E5E7EB` (Standard hairlines)
- **focus-ring**: `#D32F2F` (EDSA Red, offset 2px)

## Typography
- **Families**: System Sans (Inter, San Francisco, Segoe UI). No custom web fonts to save bandwidth in low-connectivity areas.
- **Scale**:
  - `display-lg`: 48px · 1.15 · weight 300 (Hero headers)
  - `display-md`: 36px · 1.2 · weight 300 (Section headers)
  - `headline`: 24px · 1.3 · weight 400 (Card titles, sub-sections)
  - `body-lg`: 18px · 1.5 · weight 400 (Lead text)
  - `body`: 16px · 1.5 · weight 400 (Standard text, `letter-spacing: 0.1px`)
  - `body-sm`: 14px · 1.5 · weight 400 (Meta, footer, small labels)
  - `button`: 14px · 1.2 · weight 500 (Action labels)
  - `caption`: 12px · 1.4 · weight 400 (Very small utility text)
- **Tabular figures**: Must be used for all currency (NLe), kilowatt-hours (kWh), meter numbers, and token codes.

## Spacing & layout
- Base unit: 4px grid (4, 8, 12, 16, 24, 32, 48, 64, 96).
- Max width: 1280px (max-w-7xl).
- Layout relies heavily on alignment and thin 1px dividers rather than large gaps.

## Radius & elevation
- **Radius**: `0px` everywhere. No rounded corners. Buttons, cards, inputs, and images are perfectly square.
- **Elevation**: Flat. Depth is communicated via surface color changes (`canvas` to `surface-1`) and 1px borders, never via drop shadows.

## Components
- **Buttons**:
  - `primary`: Navy background, White text, 0px radius, padding 12px 24px.
  - `accent`: Red background, White text, 0px radius, padding 12px 24px (for "Buy Electricity", "Report Outage").
  - `secondary`: Transparent background, Navy 1px border, Navy text.
  - `ghost`: Transparent background, Navy text, hover gives `surface-1` background.
- **Inputs**: `surface-1` background, 1px bottom border (Navy). Focus expands border to 2px Red. 0px radius.
- **Cards**: `canvas` background, 1px border. No shadow. Internal padding 24px.
- **Nav**: Navy background, White text, flat, bottom 1px border in darker Navy.
- **Badges**: Flat background (e.g., Red/Green/Amber 10%), text color matching semantic, 0px radius.

## States
- **Hover**: Buttons darken, ghost buttons get gray background.
- **Focus**: 2px solid Red outline with 2px offset.
- **Disabled**: `surface-2` background, `fg-muted` text, `not-allowed` cursor.
- **Loading**: Inline spinners, text remains but disabled. Skeletons are flat gray boxes matching final dimensions.
- **Empty**: Left-aligned, pragmatic text explaining what to do next.

## Motion
- Reduced to near-zero. Instant state changes preferred. Focus and hover transitions at 100ms. No complex page transitions.

## Accessibility
- Contrast: All text meets WCAG AA (Navy on White, Red on White, White on Navy).
- Focus: Highly visible Red focus ring, never `outline: none` without replacement.
- Target sizes: Minimum 44px on mobile for all interactive elements.

## Iconography
- Lucide React icons. Stroke width 1.5 for a technical, crisp feel. Size 20px or 24px.

## Do / Don't
- **Do**: Use 0px border radius and 1px borders to separate content.
- **Don't**: Use rounded corners, soft shadows, pastel gradients, or floating cards.
- **Don't**: Use all-caps for long text; reserve it for small meta labels.
- **Don't**: Use generic placeholder imagery; use the `ImagePlaceholder` component with descriptive labels if real photos are missing.

## Implementation
Tokens live in `src/index.css` under `@theme`. Components in `App.tsx` and related files consume Tailwind classes mapped to these tokens.
