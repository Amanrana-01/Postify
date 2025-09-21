# Frontend Setup Guide

## Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```env
# PayloadCMS Configuration
PAYLOAD_API=your_payload_api_key_here
PAYLOAD_URL=http://localhost:3001

# Next.js Configuration (for client-side components)
NEXT_PUBLIC_PAYLOAD_API=your_payload_api_key_here
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables (see above)

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- ✅ Modern Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Tailwind CSS for styling
- ✅ PayloadCMS integration
- ✅ Responsive design
- ✅ Dark mode support
- ✅ SEO optimized
- ✅ Error boundaries
- ✅ Loading states
- ✅ Image optimization

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── Components/     # Reusable components
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── blog/
│       └── [id]/
│           └── page.tsx   # Blog post page
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
