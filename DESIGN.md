# Design Guidelines

## Colors
- **Background:** `#F8F6F1` (Warm off-white)
- **Text:** `#1A1A1A` (Deep charcoal, not pure black)
- **Accent:** `#5C45FF` (Electric Indigo)
- **Dark Inverted:** `#0F0F0F` (For the Skills section)

## Typography
- **Headings:** `Playfair Display`, Serif. Vertical stacking, 100-120px for hero.
- **Body:** `DM Sans`, Sans-serif. 16-18px for readability.
- **Philosophy Text:** 28px Playfair Display.

## Spatial System
- High whitespace usage.
- Asymmetric layouts to avoid "grid" feeling.
- Margin/Padding based on viewport units (vw/vh) for fluid scaling.

## Motion
- **Smooth Scroll:** Lenis.
- **Parallax:** GSAP ScrollTrigger.
- **3D:** Three.js wireframes + CSS 3D transforms.
- **Easing:** `expo.out` for all GSAP animations.
