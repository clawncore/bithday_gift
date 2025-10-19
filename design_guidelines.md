# Design Guidelines: Happy Birthday Panda - Cinematic Gift Experience

## Design Approach
**Cinematic Storytelling Experience** - This is an emotional, single-use gift that prioritizes narrative flow, intimate pacing, and heartfelt presentation over traditional web patterns. Draw inspiration from interactive story experiences and premium gift unboxing moments.

## Core Design Principles
1. **Cinematic Pacing**: Slow, deliberate reveals with long easing transitions
2. **Emotional Intimacy**: Warm, personal, vulnerable aesthetic
3. **One-Time Magic**: The entire experience is designed for a single viewing
4. **Respectful Motion**: Beautiful but never overwhelming or disorienting

## Color Palette

### Dark Mode (Primary)
- **Background**: 15 7% 14% (deep navy/charcoal #0f1724)
- **Warm Accent**: 24 75% 77% (#F6C9A8 - soft peach/cream)
- **Panda Neutrals**: Pure black and white for panda motifs
- **Text Primary**: 0 0% 95% (off-white)
- **Text Secondary**: 0 0% 70% (muted gray)
- **Success/Accept**: 142 65% 55% (gentle green for "Yes" button)
- **Gentle Warning**: 38 85% 65% (soft amber for "I need time")

### Accent Usage
- Warm accent for interactive elements, highlights, and emotional moments
- Panda black/white for decorative elements and brand consistency
- Avoid harsh contrasts; prefer soft glows and subtle gradients

## Typography

### Font Families
- **Display/Headings**: Soft-rounded serif (e.g., DM Serif Display, Crimson Pro) or gentle display font (e.g., Comfortaa, Nunito)
- **Body Text**: Clean sans-serif with warmth (e.g., Inter, Plus Jakarta Sans)
- **Accent/Special Moments**: Handwritten or script font for personal notes (e.g., Pacifico, Dancing Script) - use sparingly

### Scale & Hierarchy
- **Hero Title**: text-6xl to text-7xl (72-96px) - "Happy Birthday, Panda 🐼"
- **Section Headings**: text-3xl to text-4xl (36-48px)
- **Body Text**: text-base to text-lg (16-18px) with generous line-height (1.7-1.8)
- **Captions**: text-sm (14px)
- Maintain WCAG AA contrast ratios throughout

## Layout System

### Spacing Primitives
Use Tailwind units: **4, 8, 12, 16, 24, 32** for consistent rhythm
- Section padding: py-24 to py-32
- Component spacing: gap-8 to gap-12
- Intimate spacing: p-4, p-8 for cards and content
- Breathing room is essential - never cram content

### Section Flow (Single-Page Scroll)
1. **Hero/Gift Box**: Full viewport (100vh) with centered unwrapping animation
2. **Craig's Apology**: 80vh minimum, single column max-w-3xl centered
3. **Simbisai's Apology**: Mirror Craig's layout with different accent color variation
4. **Memory Lane Gallery**: Auto-height, masonry or carousel grid
5. **The Ask**: Centered, minimal, 80vh with dramatic spacing
6. **Closure Message**: Only shown on subsequent visits

### Container Strategy
- Max width: max-w-6xl for content sections
- Reading content: max-w-3xl for text-heavy sections
- Full-bleed backgrounds with contained content

## Component Library

### Hero Gift Box
- Animated closed gift box (paper texture + ribbon)
- Parallax background: subtle panda silhouettes, paper texture
- Gentle pulsing "Open Gift" button with warm glow
- Ambient animation loop (floating sparkles, subtle sway)

### Apology Cards (Craig & Simbisai)
- Frosted glass card aesthetic (backdrop-blur-lg bg-white/5)
- Small circular portrait (96x96px) with soft border
- Expandable "read more" modal overlay
- Optional audio player UI (waveform visualization or simple play/pause)
- Distinct warm accent per person (Craig: peach, Simbisai: soft coral/rose)

### Memory Gallery
- Grid layout: grid-cols-2 md:grid-cols-3 gap-4
- Each item: aspect-ratio-square or aspect-video
- Hover: gentle scale (1.02) and brightness increase
- Lightbox: full-screen overlay, black background, swipe/arrow navigation
- Image treatment: subtle Ken Burns effect (slow zoom + pan)
- Caption overlay: bottom gradient with text-sm

### The Ask Module
- Large, dramatic spacing (py-32)
- Two prominent buttons side-by-side (md:flex-row, base:flex-col)
- "Yes" button: filled with success green, large (px-12 py-4)
- "I need time" button: outline style with amber border
- Confetti animation on "Yes" (floating pandas + sparkles)

### Footer/Closure
- Minimal, centered
- Locked gift icon + timestamp
- Soft waving panda animation (Lottie or CSS)

## Animations & Interactions

### Motion Principles
- **Easing**: Prefer `ease-out` and custom cubic-bezier for organic feel
- **Duration**: 600-1200ms for major transitions, 300-400ms for micro-interactions
- **Stagger**: Delay child animations by 100-150ms for sequential reveals
- **Reduce Motion**: Respect `prefers-reduced-motion` - provide toggle in corner

### Key Animations
1. **Gift Unwrap**: Ribbon unties (rotate + fade), lid opens (rotateX), paper tears (clip-path)
2. **Scroll Reveals**: Fade + slide up (translateY), stagger for lists/grids
3. **Typed Text**: Character-by-character reveal for apology sections
4. **Gallery Lightbox**: Smooth scale + fade, backdrop blur-in
5. **Confetti**: Floating pandas (rotate + y-axis drift), sparkle particles
6. **Panda Peek**: Small panda SVGs peek from corners on scroll milestones

### Audio Cues (Muted by Default)
- Ambient music loop: soft piano or acoustic guitar (low volume 10-15%)
- Paper rustle: on unwrap
- Gentle chime: on section reveals
- Visible audio controls: bottom-right corner with mute/unmute toggle

## Panda Motifs

### Visual Elements
- Small panda silhouettes as background decorations (opacity-10 to opacity-20)
- Animated panda stickers: floating in corners, peeking behind sections
- Use SVG or Lottie animations (max 3-4 throughout page)
- Keep tasteful and non-distracting - accent, not overwhelming

### Placement
- Hero background: subtle panda pattern
- Section dividers: small panda icon
- "Yes" confetti: panda emojis/SVGs floating upward
- Closure screen: waving panda animation

## Images & Media

### Photography Treatment
- Warm color grading (+5-10% saturation, slight sepia tint)
- Soft vignette on gallery items
- Rounded corners (rounded-lg to rounded-xl)
- Lazy loading with blur-up placeholders

### Video Integration
- React Player for embedded clips
- Muted autoplay for gallery items
- Full-screen option in lightbox
- Custom controls matching design system

### Image Specifications
**Hero Background**: Abstract paper texture with panda silhouettes (1920x1080, subtle, dark)
**Portrait Photos**: Craig and Simbisai circular avatars (300x300)
**Memory Gallery**: Mixed aspect ratios (square, landscape, portrait) - authentic personal photos
**Panda Decorations**: SVG illustrations, small and whimsical

## Accessibility

- All images have descriptive alt text
- Keyboard navigation for all interactive elements (gallery, modals, buttons)
- Skip to content link
- Captions for videos
- Accessible labels for panda decorative elements (aria-hidden="true" for pure decoration)
- Focus indicators visible and styled to match warm aesthetic
- Color contrast WCAG AA compliant throughout

## Responsive Behavior

- **Mobile**: Single column, reduced spacing (py-12 vs py-24), touch-friendly buttons (min 44px)
- **Tablet**: Moderate spacing, 2-column gallery grid
- **Desktop**: Full spacing, 3-column gallery, side-by-side apology sections possible
- Maintain cinematic pacing across all viewports
- Test on portrait and landscape orientations

## Special States

### First Visit (Unused Token)
- Full unwrapping experience
- All sections accessible
- Audio enabled (after user interaction)

### Subsequent Visits (Used Token)
- Show locked gift box
- Display timestamp: "This gift was opened on [DATE]"
- Gentle waving panda animation
- Message: "Thank you for seeing this."
- No access to internal content

This design creates an intimate, cinematic journey that honors the emotional weight of the moment while maintaining technical elegance and accessibility.