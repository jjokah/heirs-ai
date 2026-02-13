'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    User,
    Users,
    Briefcase,
    Car,
    Shield,
    ShieldCheck,
    ShieldPlus,
    Heart,
    GraduationCap,
    PiggyBank,
    Stethoscope,
    Plane,
    Home,
    Package,
    FileText,
    UserCheck,
    Check,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
} from 'lucide-react'

// ── Product data keyed by [category][option] ──────────────────────────
interface Product {
    name: string
    description: string
    price: string
    benefits: string[]
}

const PRODUCT_MAP: Record<string, Record<string, Product>> = {
    vehicle: {
        'Basic (Third-Party)': {
            name: 'Third-Party Motor Insurance',
            description:
                'Basic motor protection against damage to another person\'s vehicle. Meets legal requirements for driving in Nigeria.',
            price: 'From ₦15,000/year',
            benefits: [
                'Legal compliance for driving',
                'Third-party damage coverage up to ₦3M',
                'Affordable entry-level protection',
                'Quick and easy sign-up',
            ],
        },
        'Standard (Flexi)': {
            name: 'Flexi Motor Cover',
            description:
                'First-of-its-kind flexible motor insurance with comprehensive-like benefits at affordable prices.',
            price: 'From ₦25,000/year',
            benefits: [
                'Cover limit from ₦350K to ₦1M',
                'Third-party coverage up to ₦3M',
                'Towing service (intra & interstate)',
                'Flood damage up to ₦100K',
                'Zero excess on claims',
            ],
        },
        'Full (Comprehensive)': {
            name: 'Comprehensive Motor Insurance',
            description:
                'Full protection against damages, theft, third-party liabilities, and more. Premium motor coverage for complete peace of mind.',
            price: '5% of vehicle value/year',
            benefits: [
                'Full replacement if stolen or wrecked',
                'Medical bills up to ₦30K',
                'Third-party coverage up to ₦3M',
                'Flood coverage up to ₦100K',
                'Free excess buy-back',
                'Vehicle tracker for cars ₦5M+',
            ],
        },
    },
    family: {
        'Life Protection': {
            name: 'Term Life Assurance',
            description:
                'Provides a lump-sum payment to your beneficiaries to secure their financial future.',
            price: 'From ₦1,000/year',
            benefits: [
                'Financial support from ₦90K upwards',
                'Age 18–64 eligible',
                'Flexible annual payment',
                'Minimum 1-year duration',
            ],
        },
        "Children's Education": {
            name: 'MyHeirs Plan',
            description:
                'Save monthly toward your child\'s education goals while earning interest. Perfect for parents securing your child\'s future.',
            price: 'From ₦5,000/month',
            benefits: [
                'Target savings of ₦5,000,000+',
                'Earn interest on savings',
                'Flexible monthly contributions',
                'Protection if something happens to you',
            ],
        },
        'Savings & Investment': {
            name: 'Triple Pay Investment Plan',
            description:
                'A unique investment plan that pays you three times: growth, income, and bonus payments.',
            price: 'From ₦5,000/month',
            benefits: [
                '25% payout at 1/3 of tenure',
                '25% payout at 2/3 of tenure',
                '100% + bonus at maturity',
                'Beneficiary gets 100% + bonus if death occurs',
            ],
        },
        Health: {
            name: 'Surgery Care Plan',
            description:
                'Comprehensive health coverage for major surgeries and critical illnesses.',
            price: 'Contact for pricing',
            benefits: [
                'Cover up to ₦50M',
                'Funeral expense up to ₦2M',
                'Free medical checkup every 3 years',
                'Covers cancer, heart failure, kidney failure, stroke',
            ],
        },
    },
    business: {
        'Employee Coverage': {
            name: 'Group Life Insurance',
            description:
                'Statutory and non-statutory employee coverage to protect your team and their families.',
            price: 'Custom pricing',
            benefits: [
                'Statutory compliance',
                'Employee financial protection',
                'Family security for staff',
                'Customisable coverage levels',
            ],
        },
        'Property Protection': {
            name: 'Shop Insurance (Business Protect)',
            description:
                'Protect your business property against fire, theft, and other incidents.',
            price: 'From ₦7,350/year',
            benefits: [
                'Covers shops valued ₦2.1M–₦3M',
                'Fire and theft protection',
                'Business continuity support',
                'Quick claims processing',
            ],
        },
        'Goods in Transit': {
            name: 'Goods-in-Transit Insurance',
            description:
                'Covers goods while being transported from one location to another against loss or damage.',
            price: 'Custom pricing',
            benefits: [
                'Protection during transportation',
                'Covers loss and damage',
                'Nationwide coverage',
                'Quick claims settlement',
            ],
        },
        'Professional Liability': {
            name: 'Professional Indemnity Insurance',
            description:
                'Protection for professionals against claims of negligence or inadequate advice.',
            price: 'Custom pricing',
            benefits: [
                'For doctors, engineers, lawyers, architects',
                'Negligence claims coverage',
                'Legal defence costs',
                'Reputation protection',
            ],
        },
    },
    myself: {
        'Life Cover': {
            name: 'Term Life Assurance',
            description:
                'Affordable life insurance that pays your beneficiaries a lump sum if the unexpected happens.',
            price: 'From ₦1,000/year',
            benefits: [
                'Coverage from ₦90K upwards',
                'Age 18–64 eligible',
                'Annual payment option',
                'Simple, fast sign-up',
            ],
        },
        'Accident Protection': {
            name: 'Personal Accident Cover',
            description:
                'Financial protection in case of accidental injury, disability, or death. Four tiers to fit every budget.',
            price: 'From ₦1,000/year',
            benefits: [
                'Medical expenses up to ₦200K',
                'Disability cover up to ₦3.5M',
                'Death benefit up to ₦3.5M',
                'Funeral expenses included',
            ],
        },
        Travel: {
            name: 'Travel Insurance',
            description:
                'Coverage for travel-associated risks including medical emergencies, lost baggage, and flight issues.',
            price: 'Contact for pricing',
            benefits: [
                'Medical emergency coverage abroad',
                'Lost baggage protection',
                'Delayed/cancelled flight cover',
                'Available for business, tourism & pilgrimage',
            ],
        },
        'Home & Property': {
            name: 'HomeProtect Insurance',
            description:
                'Comprehensive protection for your home and belongings against natural disasters, fire, and theft.',
            price: 'From ₦25,000/year',
            benefits: [
                'Fire rebuild covered',
                'Stolen/damaged fixtures up to ₦2M',
                'Personal items up to ₦1M',
                'Electronics up to ₦1M',
                'Death & medical benefits included',
            ],
        },
    },
}

// ── Step 1 options ────────────────────────────────────────────────────
const STEP1_OPTIONS = [
    { key: 'myself', label: 'Myself', icon: User },
    { key: 'family', label: 'My Family', icon: Users },
    { key: 'business', label: 'My Business', icon: Briefcase },
    { key: 'vehicle', label: 'My Vehicle', icon: Car },
] as const

// ── Step 2 questions per category ─────────────────────────────────────
const STEP2_CONFIG: Record<
    string,
    { question: string; options: { key: string; label: string; icon: React.ElementType }[] }
> = {
    vehicle: {
        question: 'What coverage level do you need?',
        options: [
            { key: 'Basic (Third-Party)', label: 'Basic (Third-Party)', icon: Shield },
            { key: 'Standard (Flexi)', label: 'Standard (Flexi)', icon: ShieldCheck },
            { key: 'Full (Comprehensive)', label: 'Full (Comprehensive)', icon: ShieldPlus },
        ],
    },
    family: {
        question: "What's your priority?",
        options: [
            { key: 'Life Protection', label: 'Life Protection', icon: Heart },
            { key: "Children's Education", label: "Children's Education", icon: GraduationCap },
            { key: 'Savings & Investment', label: 'Savings & Investment', icon: PiggyBank },
            { key: 'Health', label: 'Health', icon: Stethoscope },
        ],
    },
    business: {
        question: 'What do you need?',
        options: [
            { key: 'Employee Coverage', label: 'Employee Coverage', icon: Users },
            { key: 'Property Protection', label: 'Property Protection', icon: Home },
            { key: 'Goods in Transit', label: 'Goods in Transit', icon: Package },
            { key: 'Professional Liability', label: 'Professional Liability', icon: FileText },
        ],
    },
    myself: {
        question: 'What matters most to you?',
        options: [
            { key: 'Life Cover', label: 'Life Cover', icon: Heart },
            { key: 'Accident Protection', label: 'Accident Protection', icon: UserCheck },
            { key: 'Travel', label: 'Travel', icon: Plane },
            { key: 'Home & Property', label: 'Home & Property', icon: Home },
        ],
    },
}

// ── Compare products per category ─────────────────────────────────────
function getAlternatives(category: string, selected: string): Product[] {
    const products = PRODUCT_MAP[category]
    if (!products) return []
    return Object.entries(products)
        .filter(([key]) => key !== selected)
        .map(([, p]) => p)
}

// ── Component ─────────────────────────────────────────────────────────
interface ProductRecommenderProps {
    onComplete?: () => void
}

export function ProductRecommender({ onComplete }: ProductRecommenderProps) {
    const [step, setStep] = useState(1)
    const [category, setCategory] = useState('')
    const [option, setOption] = useState('')
    const [showAlternatives, setShowAlternatives] = useState(false)

    const handleCategorySelect = (cat: string) => {
        setCategory(cat)
        setStep(2)
    }

    const handleOptionSelect = (opt: string) => {
        setOption(opt)
        setStep(3)
    }

    const handleBack = () => {
        if (step === 3) {
            setOption('')
            setStep(2)
        } else if (step === 2) {
            setCategory('')
            setStep(1)
        }
    }

    const product = category && option ? PRODUCT_MAP[category]?.[option] : null
    const alternatives = category && option ? getAlternatives(category, option) : []

    return (
        <Card className="w-full max-w-md border-red-200 dark:border-red-900/50 overflow-hidden">
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-2 rounded-full transition-all duration-300 ${s === step
                            ? 'w-8 bg-red-600'
                            : s < step
                                ? 'w-2 bg-red-400'
                                : 'w-2 bg-gray-300 dark:bg-slate-600'
                            }`}
                    />
                ))}
            </div>

            <CardContent className="p-4 pt-2">
                {/* ── Step 1 ─────────────────────────────────────────── */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            Insurance Product Finder
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Who are you looking to insure?
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {STEP1_OPTIONS.map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => handleCategorySelect(opt.key)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                >
                                    <opt.icon className="w-6 h-6 text-red-600 dark:text-red-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {opt.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 2 ─────────────────────────────────────────── */}
                {step === 2 && STEP2_CONFIG[category] && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <button
                            onClick={handleBack}
                            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {STEP2_CONFIG[category].question}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Select the option that best fits your needs
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {STEP2_CONFIG[category].options.map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => handleOptionSelect(opt.key)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                >
                                    <opt.icon className="w-6 h-6 text-red-600 dark:text-red-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                        {opt.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 3 — Results ────────────────────────────────── */}
                {step === 3 && product && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <button
                            onClick={handleBack}
                            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </button>

                        <div className="space-y-4">
                            {/* Recommended badge */}
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-semibold">
                                <Check className="w-3 h-3" /> Recommended for you
                            </div>

                            {/* Product info */}
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {product.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Starting from</span>
                                <div className="text-xl font-bold text-red-600 dark:text-red-500">
                                    {product.price}
                                </div>
                            </div>

                            {/* Benefits */}
                            <ul className="space-y-2">
                                {product.benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <Check className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => {
                                        window.open('https://heirsinsurancegroup.com', '_blank')
                                    }}
                                >
                                    Get a Quote
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    onClick={() => {
                                        window.open('https://heirsinsurancegroup.com', '_blank')
                                    }}
                                >
                                    Learn More
                                </Button>
                            </div>

                            {/* Compare alternatives */}
                            {alternatives.length > 0 && (
                                <div className="border-t border-gray-200 dark:border-slate-700 pt-3">
                                    <button
                                        onClick={() => setShowAlternatives(!showAlternatives)}
                                        className="flex items-center justify-between w-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        Compare with other plans
                                        {showAlternatives ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </button>

                                    {showAlternatives && (
                                        <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {alternatives.map((alt, i) => (
                                                <div
                                                    key={i}
                                                    className="p-3 rounded-lg border border-gray-200 dark:border-slate-700"
                                                >
                                                    <div className="font-medium text-sm text-gray-900 dark:text-white">
                                                        {alt.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        {alt.description}
                                                    </div>
                                                    <div className="text-sm font-semibold text-red-600 dark:text-red-500 mt-1">
                                                        {alt.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Done */}
                            <Button
                                variant="ghost"
                                className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700"
                                onClick={onComplete}
                            >
                                Close Recommender
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
