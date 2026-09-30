"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, CheckCircle2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I'm your FixIt AI Support Copilot. How can I assist you with your household repair or active booking today?",
      time: "Just now",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simulate smart bot response
    setTimeout(() => {
      let replyText =
        "I've checked your inquiry. All active technicians are GPS-tracked and will verify your 4-digit START OTP prior to initiating any repair. Need to reschedule or add details?";

      const q = query.toLowerCase();
      if (q.includes("otp") || q.includes("code")) {
        replyText =
          "Your 4-digit START OTP is displayed directly on your 'My Bookings' page card. Share it with your technician only once they arrive at your doorstep.";
      } else if (q.includes("technician") || q.includes("where") || q.includes("status")) {
        replyText =
          "Your assigned specialist is on schedule. You can monitor live progress across the 5 timeline phases on the My Bookings dashboard.";
      } else if (q.includes("fridge") || q.includes("leak") || q.includes("iron")) {
        replyText =
          "For immediate fault identification, you can launch the 'Show Your Problem' camera scan to get an instant cost estimate and DIY manual.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: replyText,
          time: "Just now",
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(45,212,191,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-teal-400/40"
          aria-label="Open AI Support Chat"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-slate-950" />}

          {/* Small Red "AI" Badge */}
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-[10px] font-mono font-bold text-white shadow-md border border-slate-950">
            AI
          </span>
        </button>
      </div>

      {/* Dark Glass Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-96 max-h-[550px] rounded-3xl bg-[#050B1F]/95 backdrop-blur-2xl border border-teal-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-400/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>FixIt AI Copilot</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <span className="text-[11px] text-slate-400">Live Hardware & Booking Support</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="p-2.5 bg-slate-950/40 border-b border-white/5 flex gap-1.5 overflow-x-auto text-[11px]">
              {["Where is technician?", "Verify service OTP", "Emergency tap leak"].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-white/10 whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[320px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 text-xs ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-teal-400 text-slate-950 font-medium rounded-br-none"
                        : "bg-white/[0.05] border border-white/10 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/10 flex items-center gap-2 bg-slate-950/60"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about booking or repair..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 focus:border-teal-400 text-white text-xs placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
