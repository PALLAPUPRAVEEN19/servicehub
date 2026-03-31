import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import { useNotifications } from '../context/NotificationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SupportDashboard = () => {
    const { user } = useAuth();
    const { tickets, replyToTicket, updateTicketStatus } = useTickets();
    const { addNotification } = useNotifications();
    const [activeTab, setActiveTab] = useState('tickets');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const openCount = tickets.filter((t) => t.status === 'Open').length;
    const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
    const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

    const filteredTickets = tickets.filter((t) => statusFilter === 'All' || t.status === statusFilter);

    const handleReply = () => {
        if (!replyText.trim() || !selectedTicket) return;
        replyToTicket(selectedTicket.id, replyText, 'support', user?.name || 'Support Agent');
        addNotification('user', {
            icon: '💬',
            title: 'Support replied',
            description: `Support responded to your ticket ${selectedTicket.id}`,
        });
        setReplyText('');
        // Refresh selected ticket from context
        const updated = tickets.find((t) => t.id === selectedTicket.id);
        if (updated) setSelectedTicket({ ...updated, messages: [...updated.messages, { from: 'support', name: user?.name || 'Support Agent', text: replyText, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }] });
    };

    const handleResolve = (ticketId) => {
        updateTicketStatus(ticketId, 'Resolved');
        addNotification('user', {
            icon: '✅',
            title: 'Ticket resolved',
            description: `Your ticket ${ticketId} has been resolved`,
        });
        if (selectedTicket?.id === ticketId) {
            setSelectedTicket((prev) => prev ? { ...prev, status: 'Resolved' } : null);
        }
    };

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
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* ─── Welcome Banner ─── */}
                    <div className="relative bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden shadow-lg shadow-cyan-500/15">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-white/5 rounded-full translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/20 shadow-lg">
                                    {user?.name?.charAt(0).toUpperCase() || 'S'}
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm font-medium">Support Dashboard 🎧</p>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user?.name || 'Support Agent'}</h1>
                                    <p className="text-white/60 text-sm mt-0.5">Manage and resolve user tickets</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{openCount}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Open</p>
                                </div>
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{inProgressCount}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">In Progress</p>
                                </div>
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{resolvedCount}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Resolved</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Tab Switcher ─── */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => { setActiveTab('tickets'); setSelectedTicket(null); }}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'tickets'
                                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/25'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            🎫 View Tickets
                        </button>
                        <button
                            onClick={() => setActiveTab('respond')}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'respond'
                                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/25'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            💬 Respond to Users
                        </button>
                    </div>

                    {/* ─── View Tickets ─── */}
                    {activeTab === 'tickets' && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">🎫 All Tickets</h2>
                                    <p className="text-sm text-gray-400">{tickets.length} total tickets</p>
                                </div>
                                <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1">
                                    {['All', 'Open', 'In Progress', 'Resolved'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setStatusFilter(filter)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === filter
                                                ? 'bg-white text-teal-600 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Ticket Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Ticket</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">User</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Type</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Status</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                                            <th className="text-right py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTickets.map((ticket) => (
                                            <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3">
                                                    <p className="font-bold text-gray-800">{ticket.id}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-[180px]">{ticket.subject}</p>
                                                </td>
                                                <td className="py-3">
                                                    <p className="font-semibold text-gray-700 text-sm">{ticket.userName}</p>
                                                    <p className="text-xs text-gray-400">{ticket.userEmail}</p>
                                                </td>
                                                <td className="py-3 hidden md:table-cell">
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600">
                                                        {typeIcon[ticket.issueType] || '📋'} {ticket.issueType}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColor[ticket.status]}`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-gray-500 text-xs hidden sm:table-cell">{ticket.createdAt}</td>
                                                <td className="py-3 text-right">
                                                    <button
                                                        onClick={() => { setSelectedTicket(ticket); setActiveTab('respond'); }}
                                                        className="px-3 py-1.5 text-xs font-semibold text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        Respond
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ─── Respond to Users ─── */}
                    {activeTab === 'respond' && (
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Ticket List (sidebar) */}
                            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 h-fit">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Select a Ticket</h3>
                                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                    {tickets.filter((t) => t.status !== 'Resolved').map((ticket) => (
                                        <button
                                            key={ticket.id}
                                            onClick={() => setSelectedTicket(ticket)}
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
                                            <p className="text-[10px] text-gray-400 mt-0.5">{ticket.userName}</p>
                                        </button>
                                    ))}
                                </div>
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
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-5xl mb-3">💬</p>
                                            <p className="font-semibold text-gray-700">Select a ticket to respond</p>
                                            <p className="text-sm text-gray-400 mt-1">Choose from the list on the left</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SupportDashboard;
