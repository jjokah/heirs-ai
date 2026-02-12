'use client'

import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
    Car,
    Home,
    Heart,
    Plane,
    HelpCircle,
    CalendarIcon,
    Upload,
    X,
    CheckCircle2,
    Phone,
    Edit2,
} from 'lucide-react'
import { format } from 'date-fns'

// ── Types ─────────────────────────────────────────────────────────────
interface UploadedFile {
    id: string
    name: string
    size: string
}

interface ClaimData {
    type: string
    date: Date | undefined
    description: string
    location: string
    policyNumber: string
    files: UploadedFile[]
}

const CLAIM_TYPES = [
    { key: 'motor', label: 'Motor / Vehicle', icon: Car },
    { key: 'property', label: 'Property', icon: Home },
    { key: 'life', label: 'Life', icon: Heart },
    { key: 'travel', label: 'Travel', icon: Plane },
    { key: 'other', label: 'Other', icon: HelpCircle },
] as const

function generateRefNumber() {
    const prefix = 'HIC'
    const ts = Date.now().toString(36).toUpperCase()
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}-${ts}-${rand}`
}

// ── Component ─────────────────────────────────────────────────────────
interface ClaimsAssistantProps {
    onComplete?: () => void
}

export function ClaimsAssistant({ onComplete }: ClaimsAssistantProps) {
    const [step, setStep] = useState(1)
    const [data, setData] = useState<ClaimData>({
        type: '',
        date: undefined,
        description: '',
        location: '',
        policyNumber: '',
        files: [],
    })
    const [confirmed, setConfirmed] = useState(false)
    const [refNumber, setRefNumber] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const totalSteps = 5

    // ── helpers ───────────────────────────────────────────────────────
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const newFiles: UploadedFile[] = Array.from(e.target.files).map((f) => ({
            id: crypto.randomUUID(),
            name: f.name,
            size: (f.size / 1024).toFixed(1) + ' KB',
        }))
        setData((d) => ({ ...d, files: [...d.files, ...newFiles] }))
        e.target.value = ''
    }

    const removeFile = (id: string) => {
        setData((d) => ({ ...d, files: d.files.filter((f) => f.id !== id) }))
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const droppedFiles: UploadedFile[] = Array.from(e.dataTransfer.files).map((f) => ({
            id: crypto.randomUUID(),
            name: f.name,
            size: (f.size / 1024).toFixed(1) + ' KB',
        }))
        setData((d) => ({ ...d, files: [...d.files, ...droppedFiles] }))
    }

    const handleSubmit = () => {
        setRefNumber(generateRefNumber())
        setStep(5)
    }

    const canProceedStep2 = data.date && data.description.trim() && data.location.trim()

    const claimTypeLabel = CLAIM_TYPES.find((t) => t.key === data.type)?.label ?? data.type

    return (
        <Card className="w-full max-w-md border-red-200 dark:border-red-900/50 overflow-hidden">
            {/* Progress bar */}
            <div className="px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        Claims Assistant
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                        Step {step} of {totalSteps}
                    </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-red-600 rounded-full transition-all duration-500"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            <CardContent className="p-4 pt-2">
                {/* ── Step 1: Claim Type ──────────────────────────────── */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            What type of claim are you filing?
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Select the category that best matches your situation
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {CLAIM_TYPES.map((ct) => (
                                <button
                                    key={ct.key}
                                    onClick={() => {
                                        setData((d) => ({ ...d, type: ct.key }))
                                        setStep(2)
                                    }}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${ct.key === 'other' ? 'col-span-2' : ''
                                        } border-gray-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-950/30`}
                                >
                                    <ct.icon className="w-6 h-6 text-red-600 dark:text-red-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {ct.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 2: Incident Details ────────────────────────── */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                Incident Details
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Tell us what happened
                            </p>
                        </div>

                        {/* Date picker */}
                        <div className="space-y-1.5">
                            <Label className="text-gray-700 dark:text-gray-300">Date of Incident</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal dark:bg-slate-800 dark:border-slate-700"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                                        {data.date ? format(data.date, 'PPP') : 'Select date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={data.date}
                                        onSelect={(d) => setData((prev) => ({ ...prev, date: d }))}
                                        disabled={(d) => d > new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <Label className="text-gray-700 dark:text-gray-300">Brief Description</Label>
                            <Textarea
                                rows={3}
                                placeholder="Describe what happened..."
                                value={data.description}
                                onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
                                className="dark:bg-slate-800 dark:border-slate-700"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-1.5">
                            <Label className="text-gray-700 dark:text-gray-300">Location</Label>
                            <Input
                                placeholder="Where did the incident occur?"
                                value={data.location}
                                onChange={(e) => setData((d) => ({ ...d, location: e.target.value }))}
                                className="dark:bg-slate-800 dark:border-slate-700"
                            />
                        </div>

                        {/* Policy number */}
                        <div className="space-y-1.5">
                            <Label className="text-gray-700 dark:text-gray-300">Policy Number (optional)</Label>
                            <Input
                                placeholder="e.g. HGI-12345678"
                                value={data.policyNumber}
                                onChange={(e) => setData((d) => ({ ...d, policyNumber: e.target.value }))}
                                className="dark:bg-slate-800 dark:border-slate-700"
                            />
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                Found on your policy document or mobile app
                            </p>
                        </div>

                        <div className="flex gap-3 pt-1">
                            <Button
                                variant="outline"
                                className="dark:border-slate-700"
                                onClick={() => setStep(1)}
                            >
                                Back
                            </Button>
                            <Button
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                disabled={!canProceedStep2}
                                onClick={() => setStep(3)}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Step 3: Evidence Upload ─────────────────────────── */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                Upload Evidence
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Add photos or documents to support your claim
                            </p>
                        </div>

                        {/* Drop zone */}
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-red-400 dark:hover:border-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors"
                        >
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Drag & drop files here or click to browse
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                PDF, JPG, PNG up to 10MB
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>

                        {/* Uploaded files */}
                        {data.files.length > 0 && (
                            <div className="space-y-2">
                                {data.files.map((f) => (
                                    <div
                                        key={f.id}
                                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                                {f.name}
                                            </div>
                                            <div className="text-xs text-gray-400">{f.size}</div>
                                        </div>
                                        <button
                                            onClick={() => removeFile(f.id)}
                                            className="ml-2 text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-3 pt-1">
                            <Button
                                variant="outline"
                                className="dark:border-slate-700"
                                onClick={() => setStep(2)}
                            >
                                Back
                            </Button>
                            <Button
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => setStep(4)}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Step 4: Review & Submit ──────────────────────────── */}
                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                Review Your Claim
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Please verify all information before submitting
                            </p>
                        </div>

                        <div className="space-y-3">
                            {/* Claim type */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Claim Type</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {claimTypeLabel}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Incident details */}
                            <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Incident Details</div>
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        <strong>Date:</strong>{' '}
                                        {data.date ? format(data.date, 'PPP') : 'Not provided'}
                                    </div>
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        <strong>Location:</strong> {data.location}
                                    </div>
                                    <div className="text-sm text-gray-900 dark:text-white line-clamp-2">
                                        <strong>Description:</strong> {data.description}
                                    </div>
                                    {data.policyNumber && (
                                        <div className="text-sm text-gray-900 dark:text-white">
                                            <strong>Policy:</strong> {data.policyNumber}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-gray-400 hover:text-red-600 ml-2 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Files */}
                            <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Evidence</div>
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        {data.files.length > 0
                                            ? `${data.files.length} file${data.files.length > 1 ? 's' : ''} uploaded`
                                            : 'No files uploaded'}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setStep(3)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Confirmation checkbox */}
                        <div className="flex items-start gap-2 pt-1">
                            <Checkbox
                                id="confirm"
                                checked={confirmed}
                                onCheckedChange={(c) => setConfirmed(c === true)}
                                className="mt-0.5"
                            />
                            <Label
                                htmlFor="confirm"
                                className="text-sm text-gray-600 dark:text-gray-400 leading-tight cursor-pointer"
                            >
                                I confirm that the above information is accurate and complete to the best of my
                                knowledge.
                            </Label>
                        </div>

                        <div className="flex gap-3 pt-1">
                            <Button
                                variant="outline"
                                className="dark:border-slate-700"
                                onClick={() => setStep(3)}
                            >
                                Back
                            </Button>
                            <Button
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                disabled={!confirmed}
                                onClick={handleSubmit}
                            >
                                Submit Claim
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Step 5: Confirmation ────────────────────────────── */}
                {step === 5 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center space-y-4 py-4">
                        {/* Success icon */}
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400 animate-in zoom-in duration-500" />
                        </div>

                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                Claim Submitted!
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Your claim has been successfully submitted
                            </p>
                        </div>

                        {/* Reference number */}
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg px-4 py-3">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Claim Reference</div>
                            <div className="text-lg font-mono font-bold text-gray-900 dark:text-white">
                                {refNumber}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Heirs Insurance processes all validated claims promptly. Our team will review your
                            submission and contact you shortly.
                        </p>

                        {/* Actions */}
                        <div className="space-y-2 pt-2">
                            <Button
                                className="w-full bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => window.open('https://simple.heirsinsurance.com', '_blank')}
                            >
                                Track Claim Status
                            </Button>
                            <a
                                href="tel:07004347746"
                                className="flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                            >
                                <Phone className="w-4 h-4" />
                                Need help? Call 0700 434 7746
                            </a>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700"
                            onClick={onComplete}
                        >
                            Close
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
