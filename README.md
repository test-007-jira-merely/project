# SaulDesign Portfolio

A modern, pixel-perfect portfolio website built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✨ Pixel-perfect design implementation
- 🎨 Dark theme with teal accents
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive layout
- 🚀 Built with Next.js App Router
- 💎 Glassmorphism effects
- 🔍 SEO optimized
- ⚡ Fast performance

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page composing all sections
│   └── globals.css      # Global styles and Tailwind directives
├── components/
│   ├── Header.tsx       # Sticky navigation header
│   ├── Hero.tsx         # Hero section with illustration
│   ├── About.tsx        # About section with floating icons
│   ├── Works.tsx        # Portfolio works with filtering
│   └── Footer.tsx       # Footer with social links
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Sections

### Header
- Sticky navigation with blur effect
- Smooth scroll to sections
- Logo and navigation menu

### Hero
- Large heading with gradient text
- Call-to-action buttons
- SVG illustration
- Animated scroll indicator

### About
- Two-column layout
- Floating background icons
- Custom SVG illustration
- Fade-in animations

### Works
- Filter tabs (All, UI, UX, Web Design)
- 3-column responsive grid
- Hover effects with lift and glow
- Category-based filtering

### Footer
- Social media links
- Quick navigation
- Copyright information

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  navy: {
    DEFAULT: '#1f252d',
    dark: '#1a1f26',
    light: '#252d36',
  },
  teal: {
    DEFAULT: '#14b8a6',
    light: '#2dd4bf',
    dark: '#0d9488',
  },
}
```

### Content

Update the content in each component file to match your portfolio needs.

## License

MIT License - feel free to use this template for your own portfolio!
