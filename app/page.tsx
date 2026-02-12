'use client'

import { useRef, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Menu,
  Plus,
  Send,
  Paperclip,
  Calculator,
  FileText,
  Search,
  Headphones,
  Dot
} from 'lucide-react'

const WELCOME_MESSAGE = "Hello! I'm HeirsAI, your intelligent insurance assistant. I can help you find the right insurance product, file claims, get quotes, or answer any questions about Heirs Insurance Group. How can I help you today?"

function getMessageText(message: { parts: Array<{ type: string; text?: string }> }): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text ?? '')
    .join('')
}

export default function HeirsAIChat() {
  const initialMessages: UIMessage[] = [
    {
      id: 'welcome',
      role: 'assistant',
      parts: [{ type: 'text', text: WELCOME_MESSAGE }],
    },
  ]

  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
  })

  const [inputValue, setInputValue] = useState('')
  const [conversations] = useState(['Today'])
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue('')
  }

  const handleQuickAction = (message: string) => {
    if (isLoading) return
    sendMessage({ text: message })
  }

  const resetChat = () => {
    setMessages(initialMessages)
  }

  const quickActions = [
    { label: 'Get a Quote', icon: Calculator, message: 'I want to get an insurance quote. What options do you have?' },
    { label: 'File a Claim', icon: FileText, message: 'I need to file an insurance claim. How do I go about it?' },
    { label: 'Find Products', icon: Search, message: 'What insurance products do you offer?' },
    { label: 'Talk to Agent', icon: Headphones, message: 'I would like to speak with a human agent.' },
  ]

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 flex-col bg-red-50 dark:bg-slate-900 border-r border-red-100 dark:border-slate-700">
        {/* Logo Area */}
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

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            onClick={resetChat}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Conversation History */}
        <div className="flex-1 px-4 py-2">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-3">Conversations</div>
          <ScrollArea className="h-full">
            {conversations.map((conv, idx) => (
              <div
                key={idx}
                className="p-3 mb-2 rounded-lg bg-white dark:bg-slate-800 cursor-pointer hover:bg-red-100 dark:hover:bg-slate-700 text-sm text-gray-700 dark:text-gray-300 truncate"
              >
                {conv}
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
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
                  <div className="p-4">
                    <Button
                      onClick={() => {
                        resetChat()
                        setIsMobileOpen(false)
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Chat
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">HeirsAI Assistant</h1>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Dot className="w-2 h-2 fill-green-600" />
                Online
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 pt-4 flex gap-3 overflow-x-auto pb-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAction(action.message)}
              disabled={isLoading}
              className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg border-2 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-slate-800 flex-shrink-0 transition-colors disabled:opacity-50"
            >
              <action.icon className="w-5 h-5 text-red-600 dark:text-red-500" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center whitespace-nowrap">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } max-w-xs md:max-w-md lg:max-w-lg`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      H
                    </div>
                  )}

                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-2">
                      <ReactMarkdown>{getMessageText(message)}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    H
                  </div>
                  <div className="bg-gray-100 dark:bg-slate-800 rounded-lg px-4 py-3 flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
