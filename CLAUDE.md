# HeirsAI - Intelligent Insurance Assistant

## Project Overview
HeirsAI is an AI-powered chatbot for **Heirs Insurance Group**, a digital-first insurer in Nigeria. Built for a hackathon focused on Customer Experience + Claims Processing.

## Tech Stack
- **Framework:** Next.js 16 (App Router) with TypeScript
- **UI:** shadcn/ui + Tailwind CSS + Radix primitives
- **Icons:** lucide-react
- **Charts:** recharts (installed, for analytics dashboard)
- **Package Manager:** pnpm
- **AI Model:** Anthropic Claude (preferred) or OpenAI GPT-4o-mini
- **Approach:** Context-stuffing (knowledge base in system prompt, no vector DB)

## Commands
- `pnpm dev` - Start dev server (uses Turbopack)
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint

## Project Structure
```
app/
  layout.tsx          # Root layout (metadata, fonts)
  page.tsx            # Main chat interface (all UI logic currently here)
  globals.css         # Global styles
  api/chat/           # TODO: AI chat API route
components/
  ui/                 # shadcn/ui components (button, input, card, sheet, etc.)
  theme-provider.tsx  # Dark mode theme provider
hooks/
  use-mobile.tsx      # Mobile detection hook
  use-toast.ts        # Toast notification hook
lib/
  utils.ts            # Utility functions (cn helper)
public/               # Static assets
HEIRS_KNOWLEDGE_BASE.json  # Scraped Heirs Insurance website data
heirs-chatbot-guide.md     # Complete build guide and reference
```

## Current State
- Chat UI is built with sidebar, quick actions, message bubbles, typing indicator
- Responses are **hardcoded/simulated** (setTimeout with keyword matching)
- No AI backend connected yet
- No product recommender or claims assistant components yet
- No analytics dashboard yet

## Build Roadmap

### Phase 1: AI Backend (Priority)
1. Create `/app/api/chat/route.ts` - API route that sends messages to Claude/OpenAI
2. Use context-stuffing: load `HEIRS_KNOWLEDGE_BASE.json` into the system prompt
3. Wire frontend `handleSendMessage` to call `/api/chat` instead of using setTimeout
4. Add streaming support for real-time response display

### Phase 2: Smart Features
5. Build `ProductRecommender` component - interactive questionnaire (who/what/results)
6. Build `ClaimsAssistant` component - multi-step guided claims form
7. Add intent detection: route to recommender/claims based on user message
8. Make quick-action buttons trigger appropriate flows

### Phase 3: Polish & Demo
9. Build analytics dashboard at `/app/dashboard/page.tsx` with mock metrics
10. Add Nigerian Pidgin language support in system prompt
11. Mobile responsiveness polish
12. Demo preparation

## Brand & Design
- **Primary color:** Red `#C8102E` (used as `red-600` in Tailwind)
- **Brand name:** HeirsAI
- **Avatar:** Red circle with "H"
- **Tone:** Friendly, professional, simple language, Nigerian audience
- **Core values:** Enterprise, Excellence, Execution (The 3 Es)

## System Prompt Rules
When building the AI backend, the system prompt must enforce:
1. Only answer from the knowledge base
2. Admit when information is unavailable, offer to connect with team
3. Warm, simple language for Nigerian audience
4. Always mention starting prices when recommending products
5. Always mention 48-hour claims processing promise
6. Provide phone/WhatsApp for urgent matters
7. Support Nigerian Pidgin if user writes in Pidgin
8. Never fabricate policy/price/coverage details
9. Direct purchases to: mobile app, USSD *1100#, or website
10. Use bullet points for product lists

## Key Business Data (Quick Reference)
- **Entities:** Heirs Life Assurance (HLA), Heirs General Insurance (HGI), Heirs Insurance Brokers (HIB)
- **Claims promise:** All validated claims paid within 48 hours
- **General Insurance:** 0700 434 7746 | WhatsApp: +234 9114009420
- **Life Insurance:** 0700 434 7754 | WhatsApp: +234 9122222200
- **USSD:** *1100#
- **App:** "SimpleLife by Heirs Life"
- **Address:** Heirs Towers, 107b Ajose Adeogun Street, Victoria Island, Lagos

## Coding Conventions
- Use `'use client'` directive for interactive components
- Follow existing shadcn/ui patterns for component composition
- Use Tailwind utility classes; match existing color scheme (red-600, red-50, slate-*, gray-*)
- Support dark mode with `dark:` variants
- Keep components in `components/` and pages in `app/`
- Use TypeScript interfaces for data shapes
