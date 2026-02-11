# HeirsAI - Intelligent Insurance Assistant

An AI-powered chatbot for **Heirs Insurance Group**, Nigeria's digital-first insurer. Built for a hackathon focused on **Customer Experience + Claims Processing**.

HeirsAI uses Google Gemini 2.0 Flash to provide instant, accurate responses about insurance products, pricing, claims processing, and more — all grounded in Heirs Insurance's real knowledge base.

## Features

- **AI-Powered Chat** — Real-time streaming responses via Google Gemini 2.0 Flash
- **Knowledge-Grounded** — Context-stuffed with Heirs Insurance data (no hallucinations)
- **Quick Actions** — Pre-built prompts for common insurance queries
- **Dark Mode** — Full light/dark theme support
- **Mobile Responsive** — Works across all device sizes
- **Nigerian Pidgin Support** — Responds in Pidgin when users write in Pidgin
- **Sidebar Navigation** — Chat history and conversation management

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| AI | [Vercel AI SDK v6](https://sdk.vercel.ai/) + [Google Gemini 2.0 Flash](https://ai.google.dev/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Package Manager | [pnpm](https://pnpm.io/) |

## Prerequisites

- **Node.js** 18.17 or later
- **pnpm** (install with `npm install -g pnpm`)
- **Google Gemini API key** — free at [Google AI Studio](https://aistudio.google.com/apikey)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jjokah/heirs-ai.git
cd heirs-ai
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example env file and add your API key:

```bash
cp .env.example .env.local
```

Edit `.env.local` and replace the placeholder with your actual key:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
```

### 4. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Project Structure

```
heirs-ai/
├── app/
│   ├── api/chat/route.ts      # Gemini streaming API with knowledge base
│   ├── layout.tsx              # Root layout (metadata, fonts)
│   ├── page.tsx                # Main chat interface
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── theme-provider.tsx      # Dark mode theme provider
├── hooks/
│   ├── use-mobile.tsx          # Mobile detection hook
│   └── use-toast.ts            # Toast notification hook
├── lib/
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
├── HEIRS_KNOWLEDGE_BASE.json   # Scraped Heirs Insurance data
├── heirs-chatbot-guide.md      # Build guide and reference
├── .env.example                # Environment variable template
└── CLAUDE.md                   # AI assistant instructions
```

## How It Works

1. **Knowledge Base** — Insurance data scraped from the Heirs Insurance website is stored in `HEIRS_KNOWLEDGE_BASE.json`
2. **Context Stuffing** — The API route (`app/api/chat/route.ts`) injects a condensed version of the knowledge base into the system prompt on every request
3. **Streaming** — Gemini generates responses token-by-token, streamed to the frontend via Vercel AI SDK's `streamText()`
4. **Frontend** — The `useChat` hook from `@ai-sdk/react` manages conversation state, message history, and streaming display

## AI Behavior

The chatbot is configured to:

- Only answer from the knowledge base — never fabricate details
- Mention starting prices when recommending products
- Highlight the 48-hour claims processing promise
- Provide contact numbers and WhatsApp for urgent matters
- Direct purchases to the mobile app, USSD `*1100#`, or website
- Use warm, simple language suited for a Nigerian audience
- Respond in Nigerian Pidgin when the user writes in Pidgin

## Roadmap

- [x] **Phase 1** — AI backend with streaming chat
- [ ] **Phase 2** — Product Recommender and Claims Assistant components
- [ ] **Phase 3** — Analytics dashboard, mobile polish, and demo prep

## Key Business Contact Info

| | Phone | WhatsApp |
|---|---|---|
| **General Insurance** | 0700 434 7746 | +234 9114009420 |
| **Life Insurance** | 0700 434 7754 | +234 9122222200 |

- **USSD:** `*1100#`
- **App:** SimpleLife by Heirs Life
- **Address:** Heirs Towers, 107b Ajose Adeogun Street, Victoria Island, Lagos

## License

This project was built for a hackathon. All rights reserved.
