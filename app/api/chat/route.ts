import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

const HEIRS_KNOWLEDGE_BASE = `
HEIRS INSURANCE GROUP - KNOWLEDGE BASE
========================================

1. COMPANY OVERVIEW
-------------------
Heirs Insurance Group is a digital-first insurance organization, a subsidiary of Heirs Holdings (pan-African investment group with presence in 24 countries across 4 continents). Authorized and regulated by the National Insurance Commission (NAICOM), RIC NO. 093. Chairman: Tony O. Elumelu CFR. Recognized as Nigeria's fastest-growing insurance group.

Three entities:

- Heirs Life Assurance (HLA): Specialist life insurance company. Paid-up share capital of N8 billion. MD/CEO: Niyi Onifade. Provides insurance-backed savings plans and life insurance for individuals, families, children's education, debtors, creditors, entrepreneurs, and employees.

- Heirs General Insurance (HGI): General insurance company. Paid-up share capital of N10 billion. MD/CEO: Wole Fayemi. Underwrites all classes of general insurance: vehicles, buildings, oil & gas, power, etc.

- Heirs Insurance Brokers (HIB): Acts as intermediary between clients and insurance companies, helping clients find suitable insurance policies that meet their needs and budget.

Core Values (The 3 Es): Execution (timely completion), Excellence (stellar performance), Enterprise (measurable results).
Mission: Make insurance accessible to everyone through simple, digital-first solutions.

2. ALL PRODUCTS WITH DESCRIPTIONS AND PRICING
----------------------------------------------

PERSONAL & FAMILY PRODUCTS:

- Flexi Motor Cover (NEW, first-of-its-kind):
  * Flexi 25: N25,000/year - Cover limit N350,000. Third party up to N3M. Towing intrastate N10K/interstate N15K. Flood up to N100K. No excess.
  * Flexi 35: N35,000/year - Cover limit N500,000. Third party up to N3M. Towing intrastate N15K/interstate N25K. Flood up to N100K. No excess.
  * Flexi 70: N70,000/year - Cover limit N1,000,000. Third party up to N3M. Towing intrastate N20K/interstate N30K. Flood up to N100K. No excess.

- Comprehensive Motor Insurance: 5% of car value/year.
  * Private: Min car value N2M. Excess buy back free. Full replacement if stolen/wrecked. Medical bills up to N30K. Tracker for vehicles N5M+. Towing interstate N30K/intrastate N20K. Flood up to N100K. Third party up to N3M.
  * Commercial: Min car value N2M. Tracker for N10M+. Towing N40K. Third party up to N5M.

- Third Party Motor Insurance: Basic motor protection against damage to another person's vehicle.

- Term Life: From N1,000/year. Financial support to beneficiary from N90K upwards. Age 18-64. Annual payment. Min duration 1 year.

- Personal Accident (4 tiers):
  * Bronze: N1,000 - Medical N25K, Disability N500K, Death N500K, Funeral N25K (18-65 yrs)
  * Silver: N2,500 - Medical N50K, Disability N1M, Death N1M, Funeral N50K (18-60 yrs)
  * Gold: N5,000 - Medical N100K, Disability N2M, Death N2M, Funeral N100K (18-60 yrs)
  * Premium: N10,000 - Medical N200K, Disability N3.5M, Death N3.5M, Funeral N200K (18-60 yrs)

- HomeProtect:
  * Standard (buildings <N25M): N25,000/year. Fire rebuild covered. Stolen/damaged fixtures up to N2M. Personal items up to N1M. Electronics up to N1M. Death benefit N100K. Medical N100K.
  * Plus (buildings >N25M): Custom pricing. Full coverage. Death benefit N200K. Medical N200K.

- TenantProtect: Shields tenant valuables from fire damage, theft, and other incidents.
- Fire & Special Perils: Covers fire, lightning, explosion, thunderstrike, flood, earthquake, tornado, impact.

- Triple Pay Investment Plan: Save periodically. Heirs pays 25% at 1/3 of tenure, 25% at 2/3, then 100% + bonus at end. If death occurs, beneficiary gets 100% + bonus.

- Salary Plus Plan: N5,000/month. Age 18-60. Earn bank savings rate + 0.25% interest. Death benefit up to N2M + savings + interest. 2-year duration.

- MyHeirs: Save monthly toward goals, earn interest. Perfect for parents securing child's future/education.

- Couples Plan: For married or unmarried couples building financial future together.

- Endowment Assurance: N5,000/month. Age 18-60. Duration 5-24 years. Disciplined savings with protection.

- Credit Life Assurance: For short-term borrowers. Age 18-64. Pays outstanding loan balance on death.

- Mortgage Protection: Pays off outstanding mortgage on death or permanent disability.

- Travel Insurance: Standard (Business/Tourism), Students Protection, Pilgrimage Protection. Covers medical emergencies, lost baggage, delayed/cancelled flights.

- Annuity Plan: For retirees 50+. Pays steady income for life.

HEALTH PRODUCTS:
- Surgery Care Plan: Age 18-55. Cover up to N50M. Funeral expense up to N2M. Free medical checkup every 3 years. Covers cancer, heart failure, kidney failure, stroke, appendicitis, accident surgeries.
- Hospital Cash Plan:
  * Basic: N600/year - Hospital benefit N20K-N50K. Life cover N100K-N200K.
  * Intermediate: N1,500/year - Hospital benefit N50K-N100K. Life cover N200K-N500K.
  * Advanced: N2,800/year - Hospital benefit N100K-N200K. Life cover N500K-N1M.

EDUCATION PRODUCTS:
- Smart School Plan: Heirs pays child's school fees until graduation if parent dies or suffers permanent disability/critical illness.

SME & CORPORATE PRODUCTS:
- Group Life: Statutory and Non-Statutory variants. Employer protects employees and families.
- Shop Insurance (Business Protect): Standard N7,350/year for shops valued N2.1M-N3M.
- Professional Indemnity: For doctors, engineers, lawyers, consultants, architects.
- Keyman Assurance: N10,000/year. Protects businesses from financial loss if key staff dies or becomes disabled.
- Entrepreneurs Plan: For business owners saving towards a target with life cover.

3. CLAIMS PROCESS
-----------------
Heirs Life Claims (3 steps):
1. File claim seamlessly from any device
2. Tell us what happened, upload necessary documents
3. We will immediately begin work and contact you
For Surrender/Part-withdrawal: Use self-service portal at simple.heirslifeassurance.com

Heirs General Claims - Required info:
- Full name, policy number, email, phone, address
- Claim type: Motor (Theft/Fire/Accident/Third Party), Home, Tenant, Fire & Special Perils
- Incident details: location, date, time, description
- Uploads: photos/videos, interim police report, driver's license, repair estimate

4. FAQ ANSWERS
--------------
- Life insurance: Agreement with insurer to pay beneficiary a lump sum if unexpected happens.
- General insurance: Non-life insurance providing financial protection against unexpected risks.
- Insurance brokers: Intermediary helping clients find suitable policies matching needs and budget.
- Excess: Fixed amount/percentage of every claim the insured must bear.
- Bancassurance: Partnership between bank (UBA) and Heirs Insurance enabling bank to sell insurance products.

5. CONTACT INFORMATION & DIGITAL CHANNELS
------------------------------------------
Phone: General: 0700 434 7746 | Life: 0700 434 7754
WhatsApp: General: +234 9114009420 | Life: +234 9122222200
WhatsApp AI Chatbot: "Prince" - for policy renewals and quick queries
USSD: Dial *1100# (works without smartphone/internet)
Mobile App: "SimpleLife" - available on App Store and Google Play Store
Website: heirsinsurancegroup.com
Self-Service Portals: simple.heirsinsurance.com (General) | simple.heirslifeassurance.com (Life)
Email: wecare@heirslifeassurance.com
Address: Heirs Towers, 107b Ajose Adeogun Street, Victoria Island, Lagos

6. KEY SELLING POINTS
---------------------
- Digital-first insurer using technology for simpler, smarter insurance
- Get covered in minutes via mobile app, USSD *1100#, WhatsApp, or online
- Fast claims processing
- Backed by top-notch Reinsurers for second-layer security
- Heirs Rewards Programme: Up to 50% discount at partner stores for policies active 12+ months
- Xcite Rewards: Free fuel vouchers, electricity tokens, airtime on motor/travel/home purchases
- ISO certified

7. BRANCH LOCATIONS
-------------------
Headquarters: Heirs Towers, 107b Ajose Adeogun Street, Victoria Island, Lagos
Lagos: UBA Building, 296 Herbert Macaulay Way, Sabo, Yaba | 13 Allen Avenue, Ikeja
Abuja: 1 Julius Nyerere Street, off Yakubu Gowon, Asokoro | 18 Adetokunbo Ademola Street, Wuse 2
Delta: 39 Effurun-Sapele Road, Effurun
Edo: 81 Akpakpava Road, Benin City
Imo: 4 Mbari Street, Owerri
Enugu: 10 Station Road, Beside EEDC HQ, Okpara
Oyo: UBA Regional Building, 5 Lebanon Road, Dugbe, Ibadan
Rivers: 8 Ndah Bro Street, Trans Amadi, Port Harcourt | 14 Azikiwe Road
Ondo: UBA Regional Building, Along CBN Road, Alagbaka

8. PARTNERSHIPS
---------------
- United Bank for Africa (UBA): Bancassurance partnership
- InConnect Platform: Digital insurance reselling platform
- Top-notch Reinsurers: Second-layer security for client portfolios
`;

const SYSTEM_PROMPT = `You are HeirsAI, the official AI assistant for Heirs Insurance Group, a leading digital-first insurance company in Nigeria. You are friendly, professional, and knowledgeable about all Heirs Insurance products and services.

IMPORTANT RULES:
1. Only answer questions based on the knowledge base provided below.
2. If you don't know something, say "I don't have that specific information, but I can connect you with our team" and provide the relevant contact info.
3. Always be warm and use simple language. Remember your audience is Nigerian.
4. When recommending products, always mention the starting price if available.
5. For claims, always mention the fast claims processing.
6. For urgent matters, always provide the phone numbers and WhatsApp contacts.
7. **NIGERIAN PIDGIN SUPPORT**:
   - You MUST understand and support Nigerian Pidgin.
   - If the user speaks Pidgin, **reply in Pidgin**.
   - If the user speaks English, reply in English.
   - Example Pidgin phrases to use: "No wahala", "We dey here for you", "Check am", "Oya make we", "Abeg".
   - Keep technical terms clear (e.g. "Third Party", "Comprehensive") but explain them simply.
   - Pidgin Example: "For Third Party Motor Insurance, na N15,000 per year. E go cover damage wey you cause enter another person moto."
8. Never make up information about policies, prices, or coverage details.
9. When users want to buy, direct them to: the mobile app "SimpleLife", USSD *1100#, or the website heirsinsurancegroup.com
10. Format responses with clear structure. Use bullet points for lists of products.
11. Keep responses concise but helpful. Do not overwhelm with too much information at once.
12. When greeting, be warm and brief. Do not dump all product information unless asked.

CONTACT QUICK REFERENCE:
- General Insurance: 0700 434 7746 | WhatsApp: +234 9114009420
- Life Insurance: 0700 434 7754 | WhatsApp: +234 9122222200
- Address: Heirs Towers, 107b Ajose Adeogun Street, Victoria Island, Lagos
- App: Search "SimpleLife" on App Store / Play Store
- USSD: Dial *1100#

KNOWLEDGE BASE:
${HEIRS_KNOWLEDGE_BASE}`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    temperature: 0.7,
    maxOutputTokens: 1000,
  });

  return result.toUIMessageStreamResponse();
}
