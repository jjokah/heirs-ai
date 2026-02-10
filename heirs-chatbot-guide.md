# Heirs Insurance AI Chatbot - Complete Build Guide

## Project Name: "HeirsAI" - Intelligent Insurance Assistant

### Hackathon Focus Area: Customer Experience + Claims Processing

---

## PART 1: TECHNICAL ARCHITECTURE

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│         Next.js App (v0 Generated UI)            │
│  ┌───────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Chat UI   │  │ Product  │  │ Claims       │  │
│  │ Component │  │ Recomm.  │  │ Assistant    │  │
│  │           │  │ Cards    │  │ Form         │  │
│  └─────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│        └──────────────┼───────────────┘          │
│                       │                          │
│              API Route Handler                   │
│              /api/chat                           │
└───────────────────────┬─────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────┐
│                  BACKEND LOGIC                    │
│                       │                          │
│  ┌────────────────────▼──────────────────────┐   │
│  │         AI Router / Intent Classifier      │   │
│  │   (Determines: FAQ, Product, Claims, etc)  │   │
│  └────────────┬───────────────┬──────────────┘   │
│               │               │                  │
│  ┌────────────▼────┐  ┌──────▼───────────────┐   │
│  │  RAG Pipeline   │  │  Tool/Action Handler  │   │
│  │  (Knowledge Q&A)│  │  (Claims, Calculator) │   │
│  └────────┬────────┘  └──────────────────────┘   │
│           │                                      │
│  ┌────────▼────────┐                             │
│  │  Vector Store   │                             │
│  │  (Embeddings of │                             │
│  │   website data) │                             │
│  └─────────────────┘                             │
└──────────────────────────────────────────────────┘
```

### Tech Stack

| Layer          | Technology                    | Why                                    |
|----------------|-------------------------------|----------------------------------------|
| Frontend       | Next.js 14 (App Router)       | v0 generates Next.js by default        |
| UI Components  | shadcn/ui + Tailwind CSS      | v0 uses these natively                 |
| AI Model       | OpenAI GPT-4o-mini            | Cheap, fast, good enough for demo      |
| Embeddings     | OpenAI text-embedding-3-small | Pairs with GPT model                   |
| Vector DB      | Vercel AI SDK + in-memory     | Zero config for hackathon speed        |
| Hosting        | Vercel                        | One-click deploy from v0               |
| Alt AI Model   | Anthropic Claude 3.5 Sonnet   | If you prefer Claude API               |

### Simplified Stack (Fastest Build)

For maximum speed, skip the vector DB entirely and use a **context-stuffing** approach:

1. Scrape all website content into a single large JSON/text file
2. Include the full knowledge base in the system prompt
3. Let GPT-4o-mini (128k context) handle it directly

This works because the Heirs website content fits within the context window.

---

## PART 2: SCRAPED KNOWLEDGE BASE

Below is the complete structured data from the Heirs Insurance website. This becomes your chatbot's brain.

### Company Overview

Heirs Insurance Group is a digital-first insurer operating in Nigeria. It consists of three entities:

1. **Heirs Life Assurance Limited (HLA)** - Specialist life insurance. Paid-up share capital of N8 billion.
   - MD/CEO: Niyi Onifade
   - Chairman: Tony O. Elumelu CFR
   - Subsidiary of Heirs Holdings (pan-African, 24 countries, 4 continents)

2. **Heirs General Insurance Limited (HGI)** - General/non-life insurance. Paid-up share capital of N10 billion.
   - MD/CEO: Wole Fayemi
   - Chairman: Tony O. Elumelu CFR
   - Regulated by National Insurance Commission, RIC NO. 093

3. **Heirs Insurance Brokers (HIB)** - Insurance brokerage intermediary.
   - Regulated by NCRIB (Nigerian Council of Registered Insurance Brokers)
   - No additional fees to clients; earns commission from insurers

### Key Selling Points
- 100% validated claims paid
- Claims paid within 48 hours
- Buy insurance in minutes (mobile app, USSD *1100#, online)
- Branches nationwide across Nigeria
- Rewards and networking club for customers
- ISO certified
- Core Values: Enterprise, Excellence, Execution (The 3 Es)

### Contact Information
- **Address:** Heirs Towers, 107b, Ajose Adeogun Street, Victoria Island, Lagos, Nigeria
- **General Insurance Phone:** 0700 434 7746
- **Life Insurance Phone:** 0700 434 7754
- **General WhatsApp:** +234 9114009420
- **Life WhatsApp:** +234 9122222200
- **General Email:** contact@heirsgeneralinsurance.com
- **Life Email:** contact@heirslifeassurance.com
- **Brokers Email:** info@heirsinsurancebrokers.com

### Digital Channels
- Mobile App: Available on App Store and Google Play ("SimpleLife by Heirs Life")
- USSD: Dial *1100#
- Self-Service Portal (General): simple.heirsinsurance.com
- Self-Service Portal (Life): simple.heirslifeassurance.com
- Partners/Resellers Portal: partners.heirsinsurance.com

### Products Catalog

#### Personal & Family
1. **Flexi Motor Plan** - First-of-its-kind, comprehensive coverage at affordable prices from N25,000/year
2. **Comprehensive Motor Insurance** - Full protection against damages, theft, third-party liabilities
3. **Third-Party Motor Insurance** - Legal compliance, covers third-party damages, from N15,000/year
4. **Her Motor Insurance** - Motor insurance designed for women
5. **Personal Accident** - Financial protection for accidents causing injury
6. **Term Life Assurance** - Lump-sum payment to beneficiaries upon passing
7. **Triple Pay Investment** - Earn 3 bulk payments; growth, income, and bonus; from N5,000/month
8. **Savings Plan (Heirs Save)** - Growth and stability for funds
9. **Salary Plus Insurance** - For salary earners; competitive returns while saving
10. **Home Insurance (HomeProtect)** - Protection against natural disasters
11. **Tenant Insurance** - Coverage for renters' belongings and liability
12. **Fire & Burglary** - Property protection from fire and theft
13. **Heirs Couple's Plan** - For couples building financial future together
14. **Endowment Assurance** - Disciplined savings with protection
15. **Credit Life** - Protects loved ones from loan burdens (short-term borrowers)
16. **Mortgage Protection** - Ensures home stays in family during difficult times

#### Education
- **MyHeirs Plan** - Children's education savings; starts from N5,000/month; targets N5,000,000+

#### Travel & Logistics
- **Travel Insurance** - Covers travel-associated risks

#### SMEs & Corporates
- **Group Life** - Employee coverage for businesses

#### Retirees & Seniors
- **Annuity Plan** - Structured income stream for retirement

### Claims Process
- **General Claims:** Fill form on website/app, provide documentation, benefits paid within 24 hours if eligible
- **Life Claims:** Fill form on Claims section of website, reviewed and processed accordingly
- **Claims Promise:** All validated claims paid within 48 hours

### FAQ Knowledge

**Life Insurance:**
- Life insurance pays beneficiary a lump sum if something happens to you
- Types: savings plans, core protection plans, endowment/inheritance plans
- Premiums based on: age, gender, health, lifestyle, occupation, coverage amount
- Can purchase for someone else with their consent
- Missed payment may cause lapse/cancellation depending on grace period
- Can change beneficiaries or adjust coverage depending on policy type
- If you outlive a term policy, coverage expires with no payout; savings plans pay full benefits

**General Insurance:**
- Covers properties, cars, businesses, travel, health risks
- Premiums depend on: coverage type, risk profile, amount, claims history, location
- Coverage can be customized to fit unique needs
- Policy changes possible depending on type

**Insurance Brokers:**
- Acts as intermediary between clients and insurance companies
- Works with multiple insurers (unlike agents who represent one company)
- No additional fees to clients
- Helps with claims process and liaising with insurance companies

### Partners (Trusted By)
UBA, Intels, Total, Mobil, Transcorp, Aiteo, AEDC, NGLN, JMG, NIMASA

### Lifestyle & Community
- CSR & Sustainability programs
- Essay Championship
- Travel Festival
- Retirees Club
- Rewards program with partner discounts
- Blog, Magazine, Movie partnerships, Insights

---

## PART 3: V0 PROMPTS

### PROMPT 1: Main Chat Interface

Copy and paste this into v0.dev:

```
Create a modern AI chatbot interface for "HeirsAI" - an insurance assistant for Heirs Insurance Group (a Nigerian insurance company). The brand colors are red (#C8102E) and white with dark text.

Requirements:
- Full-page chat interface with a sidebar and main chat area
- Sidebar shows: HeirsAI logo area at top, conversation history list, and a "New Chat" button
- Main chat area has:
  - Header with "HeirsAI Assistant" title and a status indicator (green dot + "Online")
  - Message area with alternating user/bot message bubbles
  - Bot messages are left-aligned with a red avatar circle containing "H"
  - User messages are right-aligned with gray background
  - A typing indicator animation (three bouncing dots) for when bot is thinking
  - Input area at bottom with a text field, attachment icon, and red send button
- Below the header, show 4 quick-action cards in a horizontal row:
  1. "Get a Quote" with a calculator icon
  2. "File a Claim" with a document icon
  3. "Find Products" with a search icon
  4. "Talk to Agent" with a headset icon
- The cards should be clickable and styled with a light red border
- Include a welcome message from the bot: "Hello! I'm HeirsAI, your intelligent insurance assistant. I can help you find the right insurance product, file claims, get quotes, or answer any questions about Heirs Insurance Group. How can I help you today?"
- Mobile responsive: sidebar collapses on mobile with a hamburger menu
- Use shadcn/ui components and Tailwind CSS
- Make it a fully functional React component with state management for messages
- Include a sample conversation showing:
  - User: "What motor insurance options do you have?"
  - Bot response with a product comparison card showing Flexi Motor, Comprehensive, and Third-Party options with prices
- Add smooth scroll-to-bottom behavior when new messages arrive
- Dark mode support
```

### PROMPT 2: Product Recommendation Engine UI

```
Create a React component for an "Insurance Product Recommender" that works as part of a chatbot for Heirs Insurance Group (Nigerian insurer, brand color #C8102E).

The component should be an interactive questionnaire that appears inline in the chat:

Step 1 - "Who are you insuring?"
  Options as clickable cards with icons: "Myself", "My Family", "My Business", "My Vehicle"

Step 2 - Based on selection, show relevant follow-up:
  For Vehicle: "What coverage level?" with options "Basic (Third-Party)", "Standard (Flexi)", "Full (Comprehensive)"
  For Family: "What's your priority?" with options "Life Protection", "Children's Education", "Savings & Investment", "Health"
  For Business: "What do you need?" with options "Employee Coverage", "Property Protection", "Goods in Transit", "Professional Liability"
  For Myself: "What matters most?" with options "Life Cover", "Accident Protection", "Travel", "Home & Property"

Step 3 - Show a results card with:
  - Recommended product name and description
  - Starting price (e.g., "From N15,000/year")
  - Key benefits as checkmarks
  - Two buttons: "Get a Quote" (red, primary) and "Learn More" (outline)
  - A "Compare with other plans" expandable section

Include smooth transitions between steps with a progress indicator.
Use shadcn/ui components. Make it mobile-friendly.
```

### PROMPT 3: Claims Filing Assistant UI

```
Create a React component for an AI-powered "Claims Filing Assistant" for Heirs Insurance Group (brand color #C8102E).

This is a multi-step guided claims form that appears within a chat interface:

Header: "Claims Assistant" with a progress bar showing current step

Step 1 - Claim Type Selection
  Cards: "Motor/Vehicle", "Property", "Life", "Travel", "Other"
  Each with an appropriate icon

Step 2 - Incident Details
  - Date of incident (date picker)
  - Brief description (textarea, 3 lines)
  - Location (text input)
  - Policy number (text input with helper text "Found on your policy document or app")

Step 3 - Evidence Upload
  - Drag-and-drop zone for photos/documents
  - Camera button for mobile
  - Show uploaded file thumbnails with remove option
  - Accepted formats note: "PDF, JPG, PNG up to 10MB"

Step 4 - Review & Submit
  - Summary card showing all entered information
  - Editable fields (click to go back to that step)
  - Checkbox: "I confirm the above information is accurate"
  - Submit button

Step 5 - Confirmation
  - Green checkmark animation
  - Claim reference number (generated)
  - "Your claim has been submitted. Heirs Insurance processes all validated claims within 48 hours."
  - "Track Claim Status" button
  - "Need help? Call 0700 434 7746" link

Use shadcn/ui, Tailwind CSS, smooth transitions between steps.
Mobile-first responsive design.
```

### PROMPT 4: Analytics Dashboard (Bonus "Wow" Factor)

```
Create a React dashboard component showing "HeirsAI Analytics" - metrics for the AI chatbot's performance at Heirs Insurance Group (brand color #C8102E).

This dashboard demonstrates the business value of the AI chatbot to judges.

Layout: Grid of metric cards and charts

Top Row - Key Metrics (4 cards):
  1. "Conversations Today" - 1,247 with +23% badge (green)
  2. "Avg Response Time" - 1.2s with -45% badge (green, lower is better)
  3. "Resolution Rate" - 87% with a circular progress ring
  4. "Customer Satisfaction" - 4.6/5 with star icons

Middle Row - Two charts side by side:
  Left: Line chart "Conversations Over Time" showing daily data for past 7 days with an upward trend
  Right: Donut/pie chart "Query Categories" showing: Product Inquiries 35%, Claims 25%, Policy Info 20%, Complaints 10%, Other 10%

Bottom Row:
  Left: Bar chart "Top Products Asked About" showing Motor, Travel, Life, Education, Home
  Right: "Recent Conversations" list with truncated messages, sentiment icons (happy/neutral/sad), and timestamps

Include a header with "HeirsAI Performance Dashboard" title, date range selector, and export button.
Use recharts for charts. shadcn/ui cards. Responsive grid layout.
All data should be hardcoded/mock for the demo.
```

---

## PART 4: BACKEND API CODE (Copy-Paste Ready)

### File: `/app/api/chat/route.ts`

```typescript
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This is your complete knowledge base from the scraped website
const HEIRS_KNOWLEDGE_BASE = `
[PASTE THE ENTIRE "SCRAPED KNOWLEDGE BASE" SECTION FROM PART 2 HERE]
`;

const SYSTEM_PROMPT = `You are HeirsAI, the official AI assistant for Heirs Insurance Group, 
a leading digital-first insurance company in Nigeria. You are friendly, professional, 
and knowledgeable about all Heirs Insurance products and services.

IMPORTANT RULES:
1. Only answer questions based on the knowledge base provided below.
2. If you don't know something, say "I don't have that specific information, 
   but I can connect you with our team" and provide the relevant contact info.
3. Always be warm and use simple language. Remember your audience is Nigerian.
4. When recommending products, always mention the starting price if available.
5. For claims, always mention the 48-hour processing promise.
6. For urgent matters, always provide the phone numbers and WhatsApp contacts.
7. You can understand and respond in Nigerian Pidgin if the user writes in Pidgin.
8. Never make up information about policies, prices, or coverage details.
9. When users want to buy, direct them to: the mobile app, USSD *1100#, 
   or the website heirsinsurancegroup.com
10. Format responses with clear structure. Use bullet points for lists of products.

KNOWLEDGE BASE:
${HEIRS_KNOWLEDGE_BASE}

CONTACT QUICK REFERENCE:
- General Insurance: 0700 434 7746 | WhatsApp: +234 9114009420
- Life Insurance: 0700 434 7754 | WhatsApp: +234 9122222200
- Address: Heirs Towers, 107b Ajose Adeogun Street, Victoria Island, Lagos
- App: Search "SimpleLife by Heirs Life" on App Store / Play Store
- USSD: Dial *1100#
`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
```

### File: `.env.local`

```
OPENAI_API_KEY=sk-your-key-here
```

### File: `package.json` (key dependencies)

```json
{
  "dependencies": {
    "openai": "^4.28.0",
    "next": "14.1.0",
    "react": "^18",
    "ai": "^3.0.0"
  }
}
```

---

## PART 5: STEP-BY-STEP BUILD ORDER

Follow this exact sequence for the fastest build:

### Day 1 (3-4 hours): Core Chat UI

1. Go to v0.dev
2. Paste **Prompt 1** (Main Chat Interface)
3. Click "Add to Codebase" to get the Next.js project
4. Deploy to Vercel immediately (you now have a live URL)
5. Create `/app/api/chat/route.ts` with the backend code above
6. Add your OpenAI API key to Vercel environment variables
7. Wire up the frontend to call `/api/chat` on message send
8. Test with basic questions about Heirs Insurance

### Day 2 (2-3 hours): Smart Features

1. Paste **Prompt 2** into v0 (Product Recommender)
2. Paste **Prompt 3** into v0 (Claims Assistant)
3. Integrate both as components that render inside chat messages
4. Add intent detection: if the user asks about products, show the recommender; if they mention claims, show the claims form
5. Add the quick-action buttons that trigger these flows

### Day 3 (1-2 hours): Polish and Demo Prep

1. Paste **Prompt 4** into v0 (Analytics Dashboard)
2. Add it as a separate /dashboard route
3. Add Nigerian Pidgin support to the system prompt
4. Test edge cases and fix any issues
5. Record a demo video showing the full flow
6. Prepare your hackathon proposal document

---

## PART 6: FEATURES THAT WILL IMPRESS JUDGES

### Must-Have (build these)
- Knowledge-based Q&A about all Heirs products
- Product recommendation flow
- Claims filing assistant
- Contact information routing
- Mobile-responsive design

### Nice-to-Have (if time permits)
- Nigerian Pidgin language support ("I wan buy motor insurance" works)
- WhatsApp-style interface option
- Voice input (Web Speech API, 5 lines of code)
- Premium calculator (basic math based on product type)
- Sentiment analysis showing customer satisfaction

### Presentation Tips
- Start demo with: "What if every Heirs Insurance customer had a personal insurance advisor available 24/7?"
- Show a real conversation flow from "I need insurance" to product recommendation to purchase link
- Show the claims assistant reducing a 30-minute process to 2 minutes
- End with the analytics dashboard showing business impact
- Mention scalability: "This can serve millions of customers simultaneously at a fraction of the cost of a call center"

---

## PART 7: ALTERNATIVE APPROACH (Even Faster)

If you want to skip the OpenAI API entirely, you can build this as a **Claude-powered artifact** using Anthropic's API directly inside a React component. This means:

- No backend needed
- No API key management
- The chatbot runs entirely in the browser
- Use the Anthropic API endpoint built into Claude artifacts

This approach works if you're demoing from Claude.ai or if you set up a simple proxy.

---

## PART 8: HACKATHON PROPOSAL ALIGNMENT

Map your solution to the competition criteria:

| Hackathon Focus Area      | How HeirsAI Addresses It                           |
|---------------------------|-----------------------------------------------------|
| Customer Experience       | 24/7 AI assistant, instant answers, product recommendations, multilingual (Pidgin) |
| Claims Processing         | Guided claims filing, document upload, status tracking, 48hr promise reinforcement |
| Product Distribution      | AI-powered product matching, comparison cards, direct purchase links, USSD integration |
| Underwriting              | Risk questionnaire for premium estimation, data collection for underwriting teams |

Your proposal should emphasize: "HeirsAI transforms customer experience by providing instant, accurate, and personalized insurance guidance, while streamlining claims processing from days to minutes."
