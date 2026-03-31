import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const statusConfig = {
    'Open':        { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
    'In Progress': { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500' },
    'Resolved':    { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const issueIcons = {
    'Payment Issue': '💳',
    'Service Issue': '🔧',
    'Account Issue': '👤',
    Other: '❓',
};

const MyTicketsPage = () => {
    const { user } = useAuth();
    const { tickets: allTickets, replyToTicket } = useTickets();
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [replyText, setReplyText] = useState('');
    const messagesEndRef = useRef(null);

    // Show user's own tickets (or all if not logged in)
    const tickets = user
        ? allTickets.filter((t) => t.userEmail === user.email || t.userName === user.name)
        : allTickets;

    const filteredTickets = filterStatus === 'All'
        ? tickets
        : tickets.filter((t) => t.status === filterStatus);

    const counts = {
        All: tickets.length,
        Open: tickets.filter((t) => t.status === 'Open').length,
        'In Progress': tickets.filter((t) => t.status === 'In Progress').length,
        Resolved: tickets.filter((t) => t.status === 'Resolved').length,
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedTicket?.messages?.length]);

    const handleSendReply = () => {
        const trimmed = replyText.trim();
        if (!trimmed || !selectedTicket) return;
        replyToTicket(selectedTicket.id, trimmed, 'user', user?.name || 'You');
        // Refresh selected ticket view
        setSelectedTicket((prev) => ({
            ...prev,
            messages: [
                ...prev.messages,
                {
                    from: 'user',
                    name: user?.name || 'You',
                    text: trimmed,
                    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                },
            ],
        }));
        setReplyText('');
    };

    const handleReplyKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendReply();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Page Header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl mb-4 shadow-lg">
                            📋
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900">My Tickets</h1>
                        <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
                            Track and manage all your support tickets in one place.
                        </p>
                        <Link
                            to="/support"
                            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Raise New Ticket
                        </Link>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total', value: counts.All, color: 'text-primary', bg: 'bg-primary/10' },
                            { label: 'Open', value: counts.Open, color: 'text-red-600', bg: 'bg-red-50' },
                            { label: 'In Progress', value: counts['In Progress'], color: 'text-amber-600', bg: 'bg-amber-50' },
                            { label: 'Resolved', value: counts.Resolved, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        ].map((stat) => (
                            <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['All', 'Open', 'In Progress', 'Resolved'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                                    filterStatus === status
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/40 hover:text-primary'
                                }`}
                            >
                                {status} ({counts[status]})
                            </button>
                        ))}
                    </div>

                    {/* Tickets List */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-lg overflow-hidden">
                        {filteredTickets.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-4xl mb-3">🎉</p>
                                <p className="text-gray-500 font-medium text-sm">No tickets found for this filter.</p>
                                <Link to="/support" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:text-primary-dark transition-colors no-underline">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                    Raise a new ticket
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {filteredTickets.map((ticket) => {
                                    const sc = statusConfig[ticket.status] || statusConfig['Open'];
                                    return (
                                        <button
                                            key={ticket.id}
                                            onClick={() => { setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket); setReplyText(''); }}
                                            className="w-full text-left p-5 hover:bg-gray-50/80 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Issue Icon */}
                                                <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg
                                                    ${ticket.issueType === 'Payment Issue' ? 'bg-emerald-100' :
                                                      ticket.issueType === 'Service Issue' ? 'bg-orange-100' :
                                                      ticket.issueType === 'Account Issue' ? 'bg-blue-100' : 'bg-purple-100'}`}
                                                >
                                                    {issueIcons[ticket.issueType] || '❓'}
                                                </span>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                                                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                                            {ticket.status}
                                                        </span>
                                                        <span className="text-xs text-gray-400">💬 {ticket.messages?.length || 0}</span>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-primary transition-colors">
                                                        {ticket.subject}
                                                    </h4>
                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                        {ticket.issueType} · Created {ticket.createdAt}
                                                    </p>
                                                </div>

                                                {/* Expand Arrow */}
                                                <span className={`shrink-0 text-gray-300 group-hover:text-primary transition-all duration-200 text-lg ${selectedTicket?.id === ticket.id ? 'rotate-90' : ''}`}>
                                                    ›
                                                </span>
                                            </div>

                                            {/* Expanded Conversation Thread */}
                                            {selectedTicket?.id === ticket.id && (
                                                <div className="mt-4 ml-14 text-left" onClick={(e) => e.stopPropagation()}>
                                                    <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                                                        {/* Thread Header */}
                                                        <div className="px-4 py-2.5 bg-gray-100/80 border-b border-gray-200/60">
                                                            <p className="text-xs font-semibold text-gray-500">💬 Conversation Thread</p>
                                                        </div>

                                                        {/* Messages */}
                                                        <div className="p-4 space-y-3 max-h-[350px] overflow-y-auto">
                                                            {selectedTicket.messages.map((msg, i) => {
                                                                const isUser = msg.from === 'user';
                                                                return (
                                                                    <div key={i} className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                                                                        {!isUser && (
                                                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mb-1">
                                                                                ST
                                                                            </div>
                                                                        )}
                                                                        <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                                                                            <p className={`text-[10px] font-semibold mb-0.5 px-1 ${isUser ? 'text-right text-primary' : 'text-left text-amber-600'}`}>
                                                                                {msg.name}
                                                                            </p>
                                                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                                                                isUser
                                                                                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-br-md'
                                                                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                                                                            }`}>
                                                                                {msg.text}
                                                                            </div>
                                                                            <p className={`text-[10px] text-gray-400 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                                                                                {msg.time}
                                                                                {isUser && <span className="ml-1 text-primary/60">✓✓</span>}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                            <div ref={messagesEndRef} />
                                                        </div>

                                                        {/* Reply Input */}
                                                        {ticket.status !== 'Resolved' && (
                                                            <div className="px-4 py-3 border-t border-gray-200/60 bg-white">
                                                                <div className="flex items-end gap-2">
                                                                    <textarea
                                                                        value={replyText}
                                                                        onChange={(e) => setReplyText(e.target.value)}
                                                                        onKeyDown={handleReplyKeyDown}
                                                                        placeholder="Type your reply..."
                                                                        rows={1}
                                                                        className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 resize-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                                        style={{ maxHeight: '80px' }}
                                                                    />
                                                                    <button
                                                                        onClick={handleSendReply}
                                                                        disabled={!replyText.trim()}
                                                                        className={`p-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                                                                            replyText.trim()
                                                                                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5'
                                                                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                                        }`}
                                                                        title="Send reply"
                                                                    >
                                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <p className="text-[10px] text-gray-400 mt-1.5 text-center">Press Enter to send · Shift+Enter for new line</p>
                                                            </div>
                                                        )}

                                                        {ticket.status === 'Resolved' && (
                                                            <div className="px-4 py-3 border-t border-gray-200/60 bg-emerald-50/50 text-center">
                                                                <p className="text-xs font-semibold text-emerald-600">✓ This ticket has been resolved</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyTicketsPage;
