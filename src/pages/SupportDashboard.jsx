import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const dummyTickets = [
    {
        id: 'TKT-1001',
        user: 'Amit Sharma',
        email: 'amit@example.com',
        subject: 'Payment not reflected after UPI transfer',
        issueType: 'Payment Issue',
        status: 'Open',
        createdAt: '30 Mar, 2026',
        description: 'I made a payment of ₹599 via UPI but the service was not booked. Transaction ID: TXN987654321.',
        messages: [
            { from: 'user', text: 'I made a payment of ₹599 via UPI but the service was not booked. Transaction ID: TXN987654321.', time: '10:30 AM' },
        ],
    },
    {
        id: 'TKT-1002',
        user: 'Priya Singh',
        email: 'priya@example.com',
        subject: 'AC technician did not arrive',
        issueType: 'Service Issue',
        status: 'In Progress',
        createdAt: '29 Mar, 2026',
        description: 'I had a booking for AC repair at 10 AM but no one showed up.',
        messages: [
            { from: 'user', text: 'I had a booking for AC repair at 10 AM but no one showed up.', time: '11:00 AM' },
            { from: 'support', text: 'We apologize for the inconvenience. Let me check with the assigned technician.', time: '11:15 AM' },
        ],
    },
    {
        id: 'TKT-1003',
        user: 'Rahul Verma',
        email: 'rahul@example.com',
        subject: 'Unable to update profile picture',
        issueType: 'Account Issue',
        status: 'Resolved',
        createdAt: '28 Mar, 2026',
        description: 'Getting an error when trying to upload a new profile picture.',
        messages: [
            { from: 'user', text: 'Getting an error when trying to upload a new profile picture.', time: '2:00 PM' },
            { from: 'support', text: 'We have fixed the upload issue. Please try again.', time: '3:30 PM' },
            { from: 'user', text: 'It works now. Thank you!', time: '4:00 PM' },
        ],
    },
    {
        id: 'TKT-1004',
        user: 'Sneha Patel',
        email: 'sneha@example.com',
        subject: 'Refund not received for cancelled booking',
        issueType: 'Payment Issue',
        status: 'Open',
        createdAt: '30 Mar, 2026',
        description: 'I cancelled my cleaning service booking 3 days ago but have not received my refund of ₹349.',
        messages: [
            { from: 'user', text: 'I cancelled my cleaning service booking 3 days ago but have not received my refund of ₹349.', time: '9:00 AM' },
        ],
    },
];

const statusColors = {
    Open: 'bg-amber-100 text-amber-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Resolved: 'bg-emerald-100 text-emerald-700',
};

const issueIcons = {
    'Payment Issue': '💳',
    'Service Issue': '🔧',
    'Account Issue': '👤',
    Other: '❓',
};

const SupportDashboard = () => {
    const [activeTab, setActiveTab] = useState('tickets');
    const [tickets, setTickets] = useState(dummyTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredTickets = filterStatus === 'All'
        ? tickets
        : tickets.filter((t) => t.status === filterStatus);

    const openCount = tickets.filter((t) => t.status === 'Open').length;
    const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
    const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setActiveTab('respond');
        setReplyText('');
    };

    const handleSendReply = () => {
        if (!replyText.trim() || !selectedTicket) return;

        const newMessage = {
            from: 'support',
            text: replyText.trim(),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        };

        setTickets((prev) =>
            prev.map((t) =>
                t.id === selectedTicket.id
                    ? { ...t, messages: [...t.messages, newMessage], status: t.status === 'Open' ? 'In Progress' : t.status }
                    : t
            )
        );
        setSelectedTicket((prev) => ({
            ...prev,
            messages: [...prev.messages, newMessage],
            status: prev.status === 'Open' ? 'In Progress' : prev.status,
        }));
        setReplyText('');
    };

    const handleStatusChange = (ticketId, newStatus) => {
        setTickets((prev) => prev.map((t) => t.id === ticketId ? { ...t, status: newStatus } : t));
        if (selectedTicket?.id === ticketId) {
            setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
        }
    };

    const tabs = [
        { id: 'tickets', label: 'View Tickets', icon: '📋' },
        { id: 'respond', label: 'Respond to Users', icon: '💬' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-2xl shadow-lg shadow-teal-500/25">
                                🎧
                            </span>
                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-900">Support Dashboard</h1>
                                <p className="text-gray-500 text-sm">Manage tickets and respond to users</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-lg">🔔</div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-900">{openCount}</p>
                                <p className="text-xs text-gray-500 font-medium">Open Tickets</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-lg">⏳</div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-900">{inProgressCount}</p>
                                <p className="text-xs text-gray-500 font-medium">In Progress</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">✅</div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-900">{resolvedCount}</p>
                                <p className="text-xs text-gray-500 font-medium">Resolved</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-500/25'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* VIEW TICKETS TAB */}
                    {activeTab === 'tickets' && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-lg overflow-hidden">
                            {/* Filter Bar */}
                            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <span className="text-sm font-semibold text-gray-600 mr-2">Filter:</span>
                                {['All', 'Open', 'In Progress', 'Resolved'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            filterStatus === status
                                                ? 'bg-teal-500 text-white shadow-sm'
                                                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>

                            {/* Tickets Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                            <th className="px-6 py-3 font-semibold">Ticket</th>
                                            <th className="px-6 py-3 font-semibold">User</th>
                                            <th className="px-6 py-3 font-semibold">Type</th>
                                            <th className="px-6 py-3 font-semibold">Status</th>
                                            <th className="px-6 py-3 font-semibold">Date</th>
                                            <th className="px-6 py-3 font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTickets.map((ticket) => (
                                            <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-gray-900">{ticket.id}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{ticket.subject}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-800">{ticket.user}</p>
                                                    <p className="text-xs text-gray-400">{ticket.email}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1.5 text-sm text-gray-700">
                                                        <span>{issueIcons[ticket.issueType] || '❓'}</span>
                                                        {ticket.issueType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[ticket.status]}`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-500">{ticket.createdAt}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleSelectTicket(ticket)}
                                                        className="px-3.5 py-1.5 text-xs font-semibold text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        Respond
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredTickets.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                                                    No tickets match the selected filter.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* RESPOND TO USERS TAB */}
                    {activeTab === 'respond' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Ticket List Sidebar */}
                            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                    <h3 className="text-sm font-bold text-gray-800">All Tickets</h3>
                                </div>
                                <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                                    {tickets.map((ticket) => (
                                        <button
                                            key={ticket.id}
                                            onClick={() => handleSelectTicket(ticket)}
                                            className={`w-full text-left px-5 py-4 transition-colors cursor-pointer ${
                                                selectedTicket?.id === ticket.id
                                                    ? 'bg-teal-50/60 border-l-4 border-teal-500'
                                                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold text-gray-900">{ticket.id}</p>
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[ticket.status]}`}>
                                                    {ticket.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 truncate">{ticket.subject}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{ticket.user}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chat / Conversation Area */}
                            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col overflow-hidden">
                                {selectedTicket ? (
                                    <>
                                        {/* Ticket Header */}
                                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900">{selectedTicket.subject}</h3>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {selectedTicket.id} · {selectedTicket.user} · {selectedTicket.issueType}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={selectedTicket.status}
                                                        onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                                                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-200"
                                                    >
                                                        <option value="Open">Open</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Resolved">Resolved</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 max-h-[400px] bg-gray-50/30">
                                            {selectedTicket.messages.map((msg, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex ${msg.from === 'support' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                                                            msg.from === 'support'
                                                                ? 'bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-br-md'
                                                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                                                        }`}
                                                    >
                                                        <p>{msg.text}</p>
                                                        <p className={`text-[10px] mt-1.5 ${msg.from === 'support' ? 'text-teal-100' : 'text-gray-400'}`}>
                                                            {msg.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Reply Input */}
                                        <div className="px-6 py-4 border-t border-gray-100">
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                                                    placeholder="Type your reply..."
                                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-all"
                                                />
                                                <button
                                                    onClick={handleSendReply}
                                                    disabled={!replyText.trim()}
                                                    className="px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-md shadow-teal-500/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md text-sm"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center py-20">
                                        <div className="text-center">
                                            <span className="text-5xl mb-4 block">💬</span>
                                            <p className="text-gray-500 text-sm font-medium">Select a ticket to start responding</p>
                                            <p className="text-gray-400 text-xs mt-1">Choose a ticket from the sidebar</p>
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
