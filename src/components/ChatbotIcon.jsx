import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Maximize2, Loader2 } from 'lucide-react';

const StreamingMessage = ({ text, isLatest, onComplete }) => {
    const [displayText, setDisplayText] = useState("");
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!isLatest) {
            setDisplayText(text);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
                setIsDone(true);
                if (onComplete) onComplete();
            }
        }, 15);

        return () => clearInterval(interval);
    }, [text, isLatest, onComplete]);

    return <span>{displayText}</span>;
};

const ChatbotIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showOpeningNotif, setShowOpeningNotif] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I am Laven. I've been researching Thakur Dash's expertise—how can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [threadId, setThreadId] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        let id = sessionStorage.getItem('laven_thread_id');
        if (!id) {
            id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
            sessionStorage.setItem('laven_thread_id', id);
        }
        setThreadId(id);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading, isStreaming]);

    const handleExpand = () => {
        setShowOpeningNotif(true);
        window.open("https://portfolio-agent-inky.vercel.app/guest_chat", "_blank");
        setTimeout(() => setShowOpeningNotif(false), 1800);
    };

    const onStreamingComplete = React.useCallback(() => {
        setIsStreaming(false);
    }, []);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isLoading || isStreaming) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://portfolio-agent-backend-k6d6.onrender.com/guest/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: currentInput, thread_id: threadId })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const aiResponse = (data.response || data.message || "I apologize, I'm having trouble connecting right now.")
                .replace(/[#*`_~\[\]()]/g, ''); // Strip markdown

            setIsLoading(false);
            setIsStreaming(true);
            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, streaming: true }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again or visit my full site." }]);
            setIsLoading(false);
        }
    };

    const handleToggle = () => {
        if (window.innerWidth < 768) {
            setIsRedirecting(true);
            setTimeout(() => {
                window.location.href = "https://portfolio-agent-inky.vercel.app/guest_chat";
            }, 1200);
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[1001] flex flex-col items-end gap-4">
            <style dangerouslySetInnerHTML={{
                __html: `
                .chat-wrapper {
                    width: 360px;
                    height: 520px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 16px;
                    overflow: hidden;
                    background: rgba(10, 10, 10, 0.6);
                    backdrop-filter: blur(14px);
                    border: 1px solid rgba(255,255,255,0.06);
                    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
                    position: relative;
                }
                .chat-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 14px 10px;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    background: rgba(0,0,0,0.2);
                }
                .status {
                    position: absolute;
                    left: 12px;
                    font-size: 10px;
                    letter-spacing: 0.1em;
                    opacity: 0.7;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .status-dot {
                    width: 6px;
                    height: 6px;
                    background: #22c55e;
                    border-radius: 50%;
                }
                .title {
                    font-weight: 600;
                    font-size: 15px;
                    color: white;
                }
                .header-actions {
                    position: absolute;
                    right: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .expand-btn, .close-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: rgba(255,255,255,0.4);
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .expand-btn:hover, .close-btn:hover { color: white; }
                .chat-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .message {
                    max-width: 82%;
                    padding: 10px 14px;
                    border-radius: 14px;
                    font-size: 13.5px;
                    line-height: 1.4;
                    word-break: break-word;
                }
                .ai-message {
                    align-self: flex-start;
                    background: linear-gradient(135deg, rgba(65, 105, 225, 0.18), rgba(30, 58, 138, 0.25));
                    border: 1px solid rgba(65,105,225,0.25);
                    color: #e6edff;
                    border-bottom-left-radius: 4px;
                }
                .user-message {
                    align-self: flex-end;
                    background: rgba(255,255,255,0.08);
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                .chat-input {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    background: rgba(0,0,0,0.5);
                    gap: 8px;
                }
                .input-field {
                    flex: 1;
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: 13.5px;
                    color: white;
                }
                .input-field::placeholder { color: rgba(255,255,255,0.2); }
                .send-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: rgba(255,255,255,0.3);
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                }
                .send-btn:not(:disabled) { color: #4169e1; }
                .chat-body::-webkit-scrollbar { width: 4px; }
                .chat-body::-webkit-scrollbar-track { background: transparent; }
                .chat-body::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
                .redirect-toast {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    background: rgba(30, 58, 138, 0.9);
                    backdrop-filter: blur(8px);
                    padding: 10px 20px;
                    border-radius: 12px;
                    color: white;
                    font-size: 12px;
                    border: 1px solid rgba(65, 105, 225, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    white-space: nowrap;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
                }
                .opening-notif {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    background: rgba(22, 38, 110, 0.92);
                    backdrop-filter: blur(12px);
                    padding: 11px 18px;
                    border-radius: 12px;
                    color: white;
                    font-size: 12.5px;
                    border: 1px solid rgba(65, 105, 225, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    white-space: nowrap;
                    box-shadow: 0 10px 24px rgba(0,0,0,0.45);
                    z-index: 20;
                }
            `}} />

            <AnimatePresence>
                {isRedirecting && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.18 }}
                        className="redirect-toast"
                    >
                        <Loader2 size={14} className="animate-spin text-blue-400" />
                        Opening full chat experience...
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Opening-in-new-tab notification */}
            <AnimatePresence>
                {showOpeningNotif && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.18 }}
                        className="opening-notif"
                    >
                        <Loader2 size={13} className="animate-spin" style={{ color: '#6b8cff' }} />
                        Opening in a new tab…
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="chat-wrapper origin-bottom-right"
                    >
                        <div className="chat-header">
                            <span className="status"><span className="status-dot"></span>ONLINE</span>
                            <div className="title">Laven.</div>
                            <div className="header-actions">
                                <button className="expand-btn" onClick={handleExpand} title="Expand to full chat">
                                    <Maximize2 size={15} />
                                </button>
                                <button className="close-btn" onClick={() => setIsOpen(false)}>
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="chat-body custom-scrollbar">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`message ${msg.role === "user" ? "user-message" : "ai-message"}`}
                                >
                                    {msg.role === 'assistant' ? (
                                        <StreamingMessage
                                            text={msg.content}
                                            isLatest={msg.streaming && i === messages.length - 1}
                                            onComplete={onStreamingComplete}
                                        />
                                    ) : msg.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message ai-message italic opacity-50 flex items-center gap-2">
                                    Laven is thinking...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className="chat-input">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about the portfolio..."
                                className="input-field"
                            />
                            <button
                                type="submit"
                                className="send-btn"
                                disabled={!input.trim() || isLoading || isStreaming}
                            >
                                <Send size={18} fill={input.trim() && !isStreaming ? "currentColor" : "none"} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={handleToggle}
                whileHover={{ transform: 'scale(1.08)' }}
                whileTap={{ transform: 'scale(0.93)' }}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300 ${isOpen ? 'bg-white text-black' : 'bg-[#0a0a0a] border border-white/10'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={17} />
                        </motion.div>
                    ) : (
                        <motion.div key="sparkle" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                            <Sparkles size={17} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ChatbotIcon;
