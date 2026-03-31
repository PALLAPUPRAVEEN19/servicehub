import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const dummyTickets = [
    {
        id: 'TKT-1001', subject: 'Payment not reflected after booking', issueType: 'Payment', status: 'Open',
        description: 'I completed a payment for AC Service but the transaction is not showing in my booking history. The amount was debited from my account.',
        createdAt: 'Mar 28, 2026', updatedAt: 'Mar 28, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'You', text: 'I completed a payment for AC Service but the transaction is not showing in my booking history. The amount was debited from my account.', time: '10:30 AM' },
        ],
    },
    {
        id: 'TKT-1002', subject: 'Service provider didn\'t show up', issueType: 'Service Issue', status: 'In Progress',
        description: 'I booked a home cleaning service for Mar 25 but the provider never arrived. I waited for over 2 hours. Need a refund or reschedule.',
        createdAt: 'Mar 25, 2026', updatedAt: 'Mar 27, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'You', text: 'I booked a home cleaning service for Mar 25 but the provider never arrived. I waited for over 2 hours.', time: '9:15 AM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Hi! We sincerely apologize for the inconvenience. We are looking into this with the service provider.', time: '11:00 AM' },
            { id: 3, sender: 'user', name: 'You', text: 'Please process a refund or reschedule ASAP.', time: '11:30 AM' },
            { id: 4, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'We have initiated a full refund. You should receive it within 3-5 business days. We have also flagged the provider.', time: '2:00 PM' },
        ],
    },
    {
        id: 'TKT-1003', subject: 'Unable to update phone number', issueType: 'Account', status: 'Resolved',
        description: 'I was unable to change my phone number from the profile settings page. The save button was unresponsive.',
        createdAt: 'Mar 20, 2026', updatedAt: 'Mar 22, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'You', text: 'I was unable to change my phone number from the profile settings. The save button doesn\'t work.', time: '3:00 PM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Thanks for reporting! We\'ve identified the bug and pushed a fix. Please try again now.', time: '5:30 PM' },
            { id: 3, sender: 'user', name: 'You', text: 'It works now! Thank you so much.', time: '6:00 PM' },
        ],
    },
    {
        id: 'TKT-1004', subject: 'Incorrect pricing on plumbing service', issueType: 'Payment', status: 'Open',
        description: 'The listed price for Plumbing Solutions says ₹299 but I was charged ₹599 at checkout. Please investigate.',
        createdAt: 'Mar 27, 2026', updatedAt: 'Mar 27, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'You', text: 'The listed price says ₹299 but I was charged ₹599 at checkout. This is unfair pricing!', time: '1:45 PM' },
        ],
    },
    {
        id: 'TKT-1005', subject: 'App crash during booking', issueType: 'Other', status: 'Resolved',
        description: 'The application crashed when I tried to select a time slot for the electrician service. Happened twice on Chrome.',
        createdAt: 'Mar 18, 2026', updatedAt: 'Mar 21, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'You', text: 'App crashes when I select a time slot for the electrician service. Happened twice on Chrome.', time: '10:00 AM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Could you share your Chrome version and a screenshot if possible?', time: '11:15 AM' },
            { id: 3, sender: 'user', name: 'You', text: 'Chrome Version 123.0. It happens specifically on the March 20 time slot.', time: '11:30 AM' },
            { id: 4, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'We\'ve found and fixed the issue — it was a date parsing bug. The fix is now live!', time: '4:00 PM' },
        ],
    },
    {
        id: 'TKT-1006', subject: 'Refund not received for cancelled service', issueType: 'Payment', status: 'In Progress',
        description: 'I cancelled my booking 24 hours in advance but haven\'t received the refund yet. It\'s been 5 days.',
        createdAt: 'Mar 22, 2026', updatedAt: 'Mar 26, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'You', text: 'I cancelled my booking 24 hours in advance. It\'s been 5 days and I still haven\'t received the refund.', time: '9:00 AM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Hi! We\'re checking with our payments team. Refunds usually take 5-7 business days. We\'ll expedite this for you.', time: '10:30 AM' },
        ],
    },
];

const statusConfig = {
    'Open':        { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
    'In Progress': { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500' },
    'Resolved':    { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const issueIcons = {
    Payment: '💳',
    'Service Issue': '🔧',
    Account: '👤',
    Other: '❓',
};

const MyTicketsPage = () => {
    const [tickets, setTickets] = useState(dummyTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [replyText, setReplyText] = useState('');
    const messagesEndRef = useRef(null);

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
    }, [selectedTicket?.replies?.length]);

    const handleSendReply = () => {
        const trimmed = replyText.trim();
        if (!trimmed || !selectedTicket) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const newReply = {
            id: Date.now(),
            sender: 'user',
            name: 'You',
            text: trimmed,
            time: timeStr,
        };

        setTickets((prev) =>
            prev.map((t) =>
                t.id === selectedTicket.id
                    ? { ...t, replies: [...t.replies, newReply], updatedAt: now.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) }
                    : t
            )
        );
        setSelectedTicket((prev) => ({ ...prev, replies: [...prev.replies, newReply] }));
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
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {filteredTickets.map((ticket) => {
                                    const sc = statusConfig[ticket.status];
                                    return (
                                        <button
                                            key={ticket.id}
                                            onClick={() => { setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket); setReplyText(''); }}
                                            className="w-full text-left p-5 hover:bg-gray-50/80 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Issue Icon */}
                                                <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg
                                                    ${ticket.issueType === 'Payment' ? 'bg-emerald-100' :
                                                      ticket.issueType === 'Service Issue' ? 'bg-orange-100' :
                                                      ticket.issueType === 'Account' ? 'bg-blue-100' : 'bg-purple-100'}`}
                                                >
                                                    {issueIcons[ticket.issueType]}
                                                </span>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                                                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                                            {ticket.status}
                                                        </span>
                                                        <span className="text-xs text-gray-400">💬 {ticket.replies.length}</span>
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
                                                    {/* Conversation */}
                                                    <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                                                        {/* Thread Header */}
                                                        <div className="px-4 py-2.5 bg-gray-100/80 border-b border-gray-200/60">
                                                            <p className="text-xs font-semibold text-gray-500">💬 Conversation Thread</p>
                                                        </div>

                                                        {/* Messages */}
                                                        <div className="p-4 space-y-3 max-h-[350px] overflow-y-auto">
                                                            {selectedTicket.replies.map((msg) => {
                                                                const isUser = msg.sender === 'user';
                                                                return (
                                                                    <div key={msg.id} className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                                                                        {/* Avatar */}
                                                                        {!isUser && (
                                                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mb-1">
                                                                                {msg.avatar}
                                                                            </div>
                                                                        )}

                                                                        {/* Bubble */}
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
