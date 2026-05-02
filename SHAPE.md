# SHAPE BRIEF: Freelance Web Developer Portfolio

## 1. Physical Scene
A high-end design director or startup founder reviewing potential partners for a flagship digital product. They are viewing the site on a high-resolution display (27" 5K) in a well-lit architectural studio. The mood is focused, professional, and appreciative of technical nuance.

## 2. Interface Anatomy

### Global Elements
- **Background:** `#F8F6F1` (Warm off-white)
- **Cursor:** 16px blurred glow dot (`#5C45FF` @ 20% opacity). Magnetic snapping on `<a>`, `<button>`, and `.interactive`. Morphs to a ring (`border: 1px solid #5C45FF`) on hover.
- **Scroll:** Lenis smooth scrolling with GSAP ScrollTrigger orchestration.

### Section 1: HERO
- **Layout:** Asymmetric. Giant `Playfair Display` name (e.g., "ALEX / RIVERA") stacked vertically on the left. 
- **Mesh:** Three.js wireframe icosphere or torus knot on the right. Electric Indigo lines. Slow auto-rotation + mouse-tilt parallax.
- **Typography:** Role typed out via typewriter animation (e.g., "Full-stack Architect").
- **CTA:** Single minimal button: "View Work" with magnetic hover.

### Section 2: MARQUEE
- **Visuals:** Light gray strip divider. Bold `DM Sans` ticker: "STRATEGY / DESIGN / CODE / DEPLOY". Separated by glyphs (e.g., ✦).

### Section 3: ABOUT
- **Layout:** Two-column.
- **Visuals:** Organic blob clip-path for portrait photo on the left. Large serif philosophy text (28px) on the right.
- **Stats:** Minimalist pills for "5+ Years Exp" and "40+ Projects".

### Section 4: SKILLS ORBIT (Inverted)
- **Background:** `#0F0F0F` (Dark).
- **Core Feature:** CSS 3D orbital ring tilted 30deg. Tech logos (SVG) orbiting. Hovering on the container pauses the orbit and reveals tooltips in Electric Indigo.
- **Secondary:** Horizontal chip scroll for secondary tools below.

### Section 5: WORK
- **Layout:** Vertical accordion. 
- **State:** Rest: Project Title + Year + Tag. Hover/Active: Inflates height, reveals full-bleed mockup on right, description on left. GSAP height/opacity animation.

### Section 6: TESTIMONIALS
- **Typography:** 48px Italic Playfair Display. Auto-fades quotes. Client name in small caps below. No avatars.

### Section 7: CONTACT
- **Visuals:** Centered "Let's build something." Oversized email link.
- **Detail:** Pulsing green dot next to "Available for Q3".

## 3. Implementation Plan
1. **Setup:** React + Vite + Three.js + GSAP + Lenis.
2. **Components:** Build atomic components (Cursor, Marquee, Section) then complex ones (Orbit, HeroMesh).
3. **Orchestration:** Connect all sections with ScrollTrigger.
4. **Final Polish:** 'Impeccable' audit for spacing, contrast, and motion.

IMPECCABLE_PREFLIGHT: context=pass product=pass command_reference=pass shape=pass image_gate=skipped:design_is_the_product mutation=open
