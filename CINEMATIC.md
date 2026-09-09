# Cinematic — EDSA Portal · Landing Hero

## Product & intent
The landing hero introduces EDSA as Sierra Leone's national power grid authority. The cinematic background creates a premium, serious, and infrastructural tone. As the user scrolls, the hero video scrubs synchronously to reveal the sheer scale of the electricity infrastructure, grounding the digital portal in physical reality.

## Mode
Cinematic DOM. The simplest sufficient mode: a scroll-driven timeline parsing a sequence of images (or an optimized video) onto a single `aria-hidden` `<canvas>`, mapped to the user's scroll progression down a tall sticky container. No WebGL is necessary for a straightforward scroll-scrubbed video layer behind semantic HTML content.

## Scroll Storyboard
- scene — grid-reveal
- scroll range — 0–100% of the track
- purpose — establish the scale and modern reality of the national power grid while the hero copy stays legible on top
- entry / hold / exit — enter with a wide shot of infrastructure; scrub forward as the user scrolls down; exit as the canvas fades to make way for the services section.
- asset — landing-hero sequence (or webm)

## Assets
Status: AWAITING

- Path: `public/cinematic/landing-hero/`
- Spec: 4–6s duration, ~1080p landscape, continuous motion (no hard cuts), cinematic high contrast, supplied as pre-extracted frames or `.webm` + poster (ffmpeg absent).
- Actual: (To be filled once received)

## Motion system
GSAP ScrollTrigger + a single requestAnimationFrame loop. The canvas will paint frames corresponding to the ScrollTrigger's progress. We'll use a single timeline to fade out the overlay text slightly and scale the canvas subtly to add depth as the user scrolls.

## Device strategy
Desktop: full scrub.
Mobile: Recomposed. The track is shorter, and the canvas uses `object-fit: cover` logic (simulated in canvas drawing) to ensure the focal point remains visible. 

## Reduced motion
For `prefers-reduced-motion`, the canvas will be replaced with a static high-quality poster image of the infrastructure. No scroll-driven scrub will occur.

## Implementation
- A sticky container taking up e.g. `300vh`.
- An inner container that stays pinned.
- A `<canvas>` drawing the frames based on scroll progress.
- Semantic HTML (headings, buttons) layered over the canvas using CSS positioning and `z-index`.
- Cleanup logic to kill the ScrollTrigger on unmount.
