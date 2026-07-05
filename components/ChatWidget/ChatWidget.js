"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react";
import faqData, { quickReplies } from "@/content/faqData";
import styles from "./ChatWidget.module.css";

function findAnswer(input) {
  const lower = input.toLowerCase();

  // Check for portfolio/work related queries
  if (
    lower.includes("portfolio") ||
    lower.includes("work") ||
    lower.includes("case stud")
  ) {
    return {
      text: "You can check out our case studies and results on our Portfolio page. We've worked with brands across food, skincare, fitness, edtech, and more!",
      link: { label: "View Portfolio", href: "/portfolio" },
    };
  }

  // Check for contact-related queries
  if (
    lower.includes("contact") ||
    lower.includes("reach") ||
    lower.includes("talk") ||
    lower.includes("call")
  ) {
    return {
      text: "You can reach us through our Contact page or send us an email. We'd love to hear from you!",
      link: { label: "Contact Us", href: "/contact" },
    };
  }

  // Score each FAQ by keyword matches
  let bestMatch = null;
  let bestScore = 0;

  for (const faq of faqData) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        score += keyword.length; // Longer keyword matches = higher relevance
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch && bestScore >= 3) {
    return { text: bestMatch.answer };
  }

  return {
    text: "Great question! I might not have the perfect answer for that one. For anything specific, I'd recommend reaching out to our team directly — they'll get back to you within 24 hours.",
    link: { label: "Contact Us", href: "/contact" },
  };
}

export default function ChatWidget() {
  const defaultMessage = {
    from: "bot",
    text: "Hey there! 👋 I'm Clout Circle's assistant. I can help with questions about our services, pricing, process, and more. What would you like to know?",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([defaultMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEnd = useRef(null);

  // Load saved state on mount
  useEffect(() => {
    const loadState = async () => {
      const savedMessages = localStorage.getItem("clout_chat_messages");
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error("Failed to parse saved chat messages", e);
        }
      }
      
      const savedIsOpen = localStorage.getItem("clout_chat_isOpen");
      if (savedIsOpen === "true") {
        setIsOpen(true);
      }
    };
    loadState();
  }, []);

  // Save state on changes
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("clout_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("clout_chat_isOpen", isOpen.toString());
  }, [isOpen]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { from: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      const response = findAnswer(text);
      setMessages((prev) => [...prev, { from: "bot", ...response }]);
      setIsTyping(false);

      // Save to database silently
      try {
        await fetch("/api/chat-logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage: text.trim(),
            botResponse: response.text,
          }),
        });
      } catch (e) {
        console.error("Failed to log chat interaction", e);
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={styles.widget}>
      {/* Chat Window */}
      <div className={`${styles.window} ${isOpen ? styles.windowOpen : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.headerAvatar}>CC</div>
            <div>
              <p className={styles.headerName}>Clout Circle</p>
              <p className={styles.headerStatus}>
                <span className={styles.statusDot} />
                Typically replies instantly
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={styles.closeBtn}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.message} ${
                msg.from === "user" ? styles.userMsg : styles.botMsg
              }`}
            >
              <p>{msg.text}</p>
              {msg.link && (
                <a
                  href={msg.link.href}
                  className={styles.msgLink}
                  onClick={() => setIsOpen(false)}
                >
                  {msg.link.label} <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.message} ${styles.botMsg}`}>
              <div className={styles.typingDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={messagesEnd} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className={styles.quickReplies}>
            {quickReplies.map((qr) => (
              <button
                key={qr}
                className={styles.quickReply}
                onClick={() => sendMessage(qr)}
              >
                {qr}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className={styles.inputBar}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className={styles.input}
            aria-label="Chat message"
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* Floating Bubble */}
      <button
        className={`${styles.bubble} ${isOpen ? styles.bubbleHidden : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className={styles.bubblePulse} />
      </button>
    </div>
  );
}
