'use client'

import { useState } from 'react'

import Link from 'next/link'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts'
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    Clock,
    CheckCircle,
    TrendingUp,
    ArrowUpRight,
    Menu
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const data = [
    { name: 'Mon', conversations: 120 },
    { name: 'Tue', conversations: 132 },
    { name: 'Wed', conversations: 101 },
    { name: 'Thu', conversations: 134 },
    { name: 'Fri', conversations: 190 },
    { name: 'Sat', conversations: 230 },
    { name: 'Sun', conversations: 210 },
]

const pieData = [
    { name: 'Product Inquiry', value: 400 },
    { name: 'Claims', value: 300 },
    { name: 'Support', value: 300 },
    { name: 'General', value: 200 },
]

const COLORS = ['#DC2626', '#EA580C', '#2563EB', '#4B5563'] // Red-600, Orange-600, Blue-600, Gray-600

export default function DashboardPage() {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    return (
        <div className="flex h-screen bg-white dark:bg-slate-950">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex w-64 flex-col bg-red-50 dark:bg-slate-900 border-r border-red-100 dark:border-slate-700">
                <div className="p-6 border-b border-red-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            H
                        </div>
                        <div>
                            <div className="font-bold text-red-600 dark:text-red-500">HeirsAI</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Assistant</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 py-6 px-4 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 text-md font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-100 dark:hover:bg-slate-800 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        Chat
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-md font-medium bg-red-100 dark:bg-slate-800 text-red-700 dark:text-red-400 rounded-lg">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="w-5 h-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-64 p-0">
                                    <div className="flex flex-col h-full bg-red-50 dark:bg-slate-900">
                                        <div className="p-6 border-b border-red-100 dark:border-slate-700">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                                    H
                                                </div>
                                                <div>
                                                    <div className="font-bold text-red-600 dark:text-red-500">HeirsAI</div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400">Assistant</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 py-6 px-4 space-y-2">
                                            <Link href="/" className="flex items-center gap-3 px-3 py-2 text-md font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-100 dark:hover:bg-slate-800 transition-colors">
                                                <MessageSquare className="w-5 h-5" />
                                                Chat
                                            </Link>
                                            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-md font-medium bg-red-100 dark:bg-slate-800 text-red-700 dark:text-red-400 rounded-lg">
                                                <LayoutDashboard className="w-5 h-5" />
                                                Dashboard
                                            </Link>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Overview</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">Track your AI assistant's performance and metrics.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Live System
                            </span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Conversations</CardTitle>
                                <MessageSquare className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">1,324</div>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="font-medium">+15%</span> from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Response Time</CardTitle>
                                <Clock className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">1.2s</div>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="w-3 h-3 rotate-45" />
                                    <span className="font-medium">-0.3s</span> improvement
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Claims Processed</CardTitle>
                                <CheckCircle className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">842</div>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="font-medium">+8%</span> this week
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">User Satisfaction</CardTitle>
                                <Users className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</div>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="font-medium">+0.2</span> score
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Conversation Activity</CardTitle>
                                <CardDescription>Number of conversations per day (Last 7 Days)</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e5e7eb',
                                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                                }}
                                                cursor={{ fill: '#f3f4f6' }}
                                            />
                                            <Bar dataKey="conversations" fill="#dc2626" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Intent Distribution</CardTitle>
                                <CardDescription>Breakdown of user requests by category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e5e7eb',
                                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="flex justify-center gap-4 mt-4 flex-wrap">
                                        {pieData.map((entry, index) => (
                                            <div key={entry.name} className="flex items-center gap-2 text-sm">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
