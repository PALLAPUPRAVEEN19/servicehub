import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import { useNotifications } from '../context/NotificationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const statusColor = {
    Open: 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Resolved: 'bg-gray-100 text-gray-600',
};

const typeIcon = {
    'Payment Issue': '💳',
    'Service Issue': '🔧',
    'Account Issue': '👤',
    General: '📋',
    Other: '❓',
};

const SupportRespond = () => {
    const { user } = useAuth();
    const { tickets, replyToTicket, updateTicketStatus } = useTickets();
    const { addNotification } = useNotifications();
    const location = useLocation();
    const preSelectedId = location.state?.ticketId;

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyText, setReplyText] = useState('');

    // Auto-select ticket if navigated from SupportTickets
    useEffect(() => {
        if (preSelectedId) {
            const found = tickets.find((t) => t.id === preSelectedId);
            if (found) setSelectedTicket(found);
        }
    }, [preSelectedId, tickets]);

    // Keep selected ticket in sync with context
    useEffect(() => {
        if (selectedTicket) {
            const updated = tickets.find((t) => t.id === selectedTicket.id);
            if (updated) setSelectedTicket(updated);
        }
    }, [tickets]);

    const handleReply = () => {
        if (!replyText.trim() || !selectedTicket) return;
        replyToTicket(selectedTicket.id, replyText, 'support', user?.name || 'Support Agent');
        addNotification('user', {
            icon: '💬',
            title: 'Support replied',
            description: `Support responded to your ticket ${selectedTicket.id}`,
        });
        setReplyText('');
    };

    const handleResolve = (ticketId) => {
        updateTicketStatus(ticketId, 'Resolved');
        addNotification('user', {
            icon: '✅',
            title: 'Ticket resolved',
            description: `Your ticket ${ticketId} has been resolved`,
        });
    };

    const activeTickets = tickets.filter((t) => t.status !== 'Resolved');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-extrabold text-gray-900">💬 Respond to Users</h1>
                        <p className="text-gray-500 text-sm mt-1">Select a ticket and reply to resolve user issues</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Ticket List (sidebar) */}
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 h-fit">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Active Tickets ({activeTickets.length})</h3>
                            {activeTickets.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-3xl mb-2">🎉</p>
                                    <p className="text-sm text-gray-500 font-medium">All caught up!</p>
                                    <p className="text-xs text-gray-400 mt-0.5">No open tickets right now</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                    {activeTickets.map((ticket) => (
                                        <button
                                            key={ticket.id}
                                            onClick={() => { setSelectedTicket(ticket); setReplyText(''); }}
                                            className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${selectedTicket?.id === ticket.id
                                                ? 'bg-teal-50 border-2 border-teal-300'
                                                : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold text-gray-800">{ticket.id}</span>
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusColor[ticket.status]}`}>
                                                    {ticket.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600 font-medium truncate">{ticket.subject}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{ticket.userName} · {typeIcon[ticket.issueType] || '📋'} {ticket.issueType}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Chat Area */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '500px' }}>
                            {selectedTicket ? (
                                <>
                                    {/* Ticket Header */}
                                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900 text-sm">{selectedTicket.id}</h3>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[selectedTicket.status]}`}>
                                                        {selectedTicket.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">{selectedTicket.subject}</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">
                                                    {typeIcon[selectedTicket.issueType] || '📋'} {selectedTicket.issueType} · {selectedTicket.userName} · {selectedTicket.createdAt}
                                                </p>
                                            </div>
                                            {selectedTicket.status !== 'Resolved' && (
                                                <button
                                                    onClick={() => handleResolve(selectedTicket.id)}
                                                    className="px-4 py-2 text-xs font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer shadow-sm"
                                                >
                                                    ✓ Mark Resolved
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50/30">
                                        {selectedTicket.messages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.from === 'support' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.from === 'support'
                                                    ? 'bg-teal-500 text-white rounded-br-sm'
                                                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm'
                                                    }`}>
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <span className={`text-[10px] font-bold ${msg.from === 'support' ? 'text-white/80' : 'text-gray-500'}`}>
                                                            {msg.name}
                                                        </span>
                                                        <span className={`text-[9px] ${msg.from === 'support' ? 'text-white/60' : 'text-gray-400'}`}>
                                                            {msg.time}
                                                        </span>
                                                    </div>
                                                    <p className="leading-relaxed">{msg.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Reply Input */}
                                    {selectedTicket.status !== 'Resolved' && (
                                        <div className="p-4 border-t border-gray-100 bg-white">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                                                    placeholder="Type your reply..."
                                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                                                />
                                                <button
                                                    onClick={handleReply}
                                                    disabled={!replyText.trim()}
                                                    className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-500 rounded-xl hover:bg-teal-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {selectedTicket.status === 'Resolved' && (
                                        <div className="p-4 border-t border-gray-100 bg-emerald-50/50 text-center">
                                            <p className="text-xs font-semibold text-emerald-600">✓ This ticket has been resolved</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-5xl mb-3">💬</p>
                                        <p className="font-semibold text-gray-700">Select a ticket to respond</p>
                                        <p className="text-sm text-gray-400 mt-1">Choose from the active tickets on the left</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SupportRespond;
