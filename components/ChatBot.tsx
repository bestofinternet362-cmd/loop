
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageSquare, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { getChatResponse } from '../services/geminiService';

interface ChatBotProps {
  product: Product;
}

const ChatBot: React.FC<ChatBotProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: `Hi! I'm Loop AI. Ask me anything about ${product.name}.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await getChatResponse(product, userMessage, history);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't find an answer for that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Service temporarily unavailable. Try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center space-x-2"
        >
          <MessageSquare size={20} />
          <span className="font-black uppercase tracking-widest text-[10px] pr-1">Loop AI</span>
        </button>
      ) : (
        <div className="bg-white w-[320px] sm:w-[350px] h-[450px] rounded-[24px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8">
          <div className="bg-zinc-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <Bot className="text-red-500" size={20} />
              <div>
                <h3 className="font-black uppercase tracking-widest text-[9px]">Loop Assistant</h3>
                <p className="text-[8px] text-zinc-400">Personal Shopper</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-zinc-800 p-1.5 rounded-full hover:bg-zinc-700">
              <X size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50/50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-xl text-[13px] leading-snug ${
                  m.role === 'user' 
                    ? 'bg-red-500 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl rounded-tl-none border border-gray-200">
                  <Loader2 className="animate-spin text-red-500" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Loop..."
              className="flex-1 bg-gray-50 border-none rounded-full px-5 py-2.5 text-xs font-medium focus:ring-1 focus:ring-red-500"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-red-500 text-white p-2.5 rounded-full disabled:opacity-50 hover:bg-red-600"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
