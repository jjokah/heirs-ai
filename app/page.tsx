'use client'

import { useState, useRef, useEffect } from 'react'
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

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  isProduct?: boolean
}

interface Product {
  name: string
  price: string
  coverage: string
}

const MOTOR_PRODUCTS: Product[] = [
  { name: 'Flexi Motor', price: '₦25,000/year', coverage: 'Flexible coverage options' },
  { name: 'Comprehensive', price: '₦45,000/year', coverage: 'Full damage coverage' },
  { name: 'Third-Party', price: '₦12,000/year', coverage: 'Legal liability only' },
]

export default function HeirsAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm HeirsAI, your intelligent insurance assistant. I can help you find the right insurance product, file claims, get quotes, or answer any questions about Heirs Insurance Group. How can I help you today?",
    },
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversations, setConversations] = useState(['Today'])
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsMobileOpen(false)

    // Simulate bot thinking
    setIsTyping(true)
    setTimeout(() => {
      let botResponse = ''
      let isProduct = false

      if (messageText.toLowerCase().includes('motor') || messageText.toLowerCase().includes('insurance')) {
        botResponse = "Great question! Here are our motor insurance options:"
        isProduct = true
      } else if (messageText.toLowerCase().includes('claim')) {
        botResponse = "I can help you file a claim. Please provide details about the incident, policy number, and any relevant documentation."
      } else if (messageText.toLowerCase().includes('quote')) {
        botResponse = "I'd be happy to help you get a quote. Please tell me more about your insurance needs and I'll provide you with the best options."
      } else if (messageText.toLowerCase().includes('agent')) {
        botResponse = "I'm connecting you with our team. A representative will be with you shortly to assist with your inquiry."
      } else {
        botResponse = "Thank you for your question. I'm here to help with any insurance-related inquiries. How can I assist you further?"
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        isProduct,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const quickActions = [
    { label: 'Get a Quote', icon: Calculator, action: 'Get a Quote' },
    { label: 'File a Claim', icon: FileText, action: 'File a Claim' },
    { label: 'Find Products', icon: Search, action: 'Find Products' },
    { label: 'Talk to Agent', icon: Headphones, action: 'Talk to Agent' },
  ]

  const handleQuickAction = (action: string) => {
    handleSendMessage(`What motor insurance options do you have?`)
  }

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
            onClick={() => {
              setMessages([
                {
                  id: '1',
                  type: 'bot',
                  content: "Hello! I'm HeirsAI, your intelligent insurance assistant. I can help you find the right insurance product, file claims, get quotes, or answer any questions about Heirs Insurance Group. How can I help you today?",
                },
              ])
            }}
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
                        setMessages([
                          {
                            id: '1',
                            type: 'bot',
                            content: "Hello! I'm HeirsAI, your intelligent insurance assistant. I can help you find the right insurance product, file claims, get quotes, or answer any questions about Heirs Insurance Group. How can I help you today?",
                          },
                        ])
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
              onClick={() => handleQuickAction(action.action)}
              className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg border-2 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-slate-800 flex-shrink-0 transition-colors"
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
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } max-w-xs md:max-w-md lg:max-w-lg`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      H
                    </div>
                  )}

                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>

                    {message.isProduct && (
                      <div className="mt-4 space-y-2">
                        {MOTOR_PRODUCTS.map((product, idx) => (
                          <div
                            key={idx}
                            className="bg-white dark:bg-slate-700 rounded p-3 text-gray-900 dark:text-white border-l-4 border-red-600"
                          >
                            <div className="font-semibold text-sm">{product.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{product.coverage}</div>
                            <div className="text-sm font-bold text-red-600 dark:text-red-500 mt-1">{product.price}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
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
          <div className="max-w-2xl mx-auto flex gap-3">
            <Button
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
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isTyping) {
                  handleSendMessage()
                }
              }}
              className="flex-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={isTyping || !inputValue.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
