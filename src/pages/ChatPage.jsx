import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialMessages = [
    { id: 1, sender: 'professional', name: 'Rajesh Kumar', text: 'Hi! I received your booking for AC Service & Repair. I can come tomorrow at 10 AM.', time: '10:30 AM', avatar: 'RK' },
    { id: 2, sender: 'user', name: 'You', text: 'That works! Can you also check the AC in the bedroom?', time: '10:32 AM' },
    { id: 3, sender: 'professional', name: 'Rajesh Kumar', text: 'Absolutely. I\'ll inspect both units. If any parts need replacement, I\'ll let you know the cost upfront before proceeding.', time: '10:33 AM', avatar: 'RK' },
    { id: 4, sender: 'user', name: 'You', text: 'Perfect, thanks! What should I have ready before you arrive?', time: '10:35 AM' },
    { id: 5, sender: 'professional', name: 'Rajesh Kumar', text: 'Just make sure both ACs are turned off 30 minutes before I arrive. Also, please clear any furniture near the outdoor unit if possible. I\'ll bring all the tools and cleaning supplies.', time: '10:36 AM', avatar: 'RK' },
    { id: 6, sender: 'user', name: 'You', text: 'Got it, will do! See you tomorrow 👍', time: '10:38 AM' },
];

const ChatPage = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        const newMsg = {
            id: Date.now(),
            sender: 'user',
            name: user?.name || 'You',
            text: trimmed,
            time: timeStr,
        };

        setMessages((prev) => [...prev, newMsg]);
        setInput('');
        inputRef.current?.focus();

        // Simulate professional typing & reply
        setIsTyping(true);
        setTimeout(() => {
            const replies = [
                'Sure, I\'ll take care of that! 👍',
                'No worries, I\'ve noted that down.',
                'Great question! Let me check and get back to you.',
                'Sounds good! I\'ll be there on time.',
                'Absolutely, consider it done!',
                'Thanks for letting me know. I\'ll prepare accordingly.',
            ];
            const reply = {
                id: Date.now() + 1,
                sender: 'professional',
                name: 'Rajesh Kumar',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                avatar: 'RK',
            };
            setIsTyping(false);
            setMessages((prev) => [...prev, reply]);
        }, 1200 + Math.random() * 800);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-0 flex flex-col">
                <div className="max-w-3xl w-full mx-auto flex flex-col flex-1 px-4">

                    {/* Chat Header */}
                    <div className="bg-white rounded-t-2xl border border-b-0 border-gray-200/80 px-5 py-4 mt-6 flex items-center gap-3 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold shadow-md">
                            RK
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold text-gray-900 text-sm">Rajesh Kumar</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs text-emerald-600 font-medium">Online</span>
                                <span className="text-xs text-gray-400 ml-1">· AC Service & Repair</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" title="Voice call">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </button>
                            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" title="More options">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 bg-white border-x border-gray-200/80 px-5 py-4 overflow-y-auto flex flex-col gap-3 min-h-[400px] max-h-[calc(100vh-320px)]">
                        {/* Date Divider */}
                        <div className="flex items-center gap-3 my-2">
                            <div className="flex-1 h-px bg-gray-100"></div>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-full">Today</span>
                            <div className="flex-1 h-px bg-gray-100"></div>
                        </div>

                        {messages.map((msg) => {
                            const isUser = msg.sender === 'user';
                            return (
                                <div key={msg.id} className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                                    {/* Avatar (professional only) */}
                                    {!isUser && (
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold shrink-0 mb-1">
                                            {msg.avatar}
                                        </div>
                                    )}

                                    {/* Bubble */}
                                    <div className={`max-w-[75%] group ${isUser ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${isUser
                                                ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-br-md'
                                                : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <p className={`text-[10px] text-gray-400 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                                            {msg.time}
                                            {isUser && (
                                                <span className="ml-1 text-primary/60">✓✓</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex items-end gap-2">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold shrink-0 mb-1">
                                    RK
                                </div>
                                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="bg-white rounded-b-2xl border border-t-0 border-gray-200/80 px-4 py-3 shadow-sm mb-6">
                        <div className="flex items-end gap-2">
                            {/* Attachment */}
                            <button className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0" title="Attach file">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </button>

                            {/* Text Input */}
                            <div className="flex-1 relative">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    rows={1}
                                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 resize-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    style={{ maxHeight: '120px' }}
                                />
                            </div>

                            {/* Emoji */}
                            <button className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0" title="Emoji">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            {/* Send */}
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className={`p-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${input.trim()
                                        ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5'
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                                title="Send message"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChatPage;
