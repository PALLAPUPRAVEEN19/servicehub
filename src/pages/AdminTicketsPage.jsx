import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialTickets = [
    {
        id: 'TKT-1001', userName: 'Amit Sharma', email: 'amit@email.com', avatar: 'AS',
        subject: 'Payment not reflected after booking', issueType: 'Payment Issue', status: 'Open',
        description: 'I completed a payment for AC Service but the transaction is not showing in my booking history. The amount was debited from my account.',
        createdAt: 'Mar 28, 2026', updatedAt: 'Mar 28, 2026',
        transactionId: 'TXN20260328001', paymentMethod: 'UPI', amount: '599', dateOfPayment: '2026-03-28',
        replies: [
            { id: 1, sender: 'user', name: 'Amit Sharma', avatar: 'AS', text: 'I completed a payment for AC Service but the transaction is not showing in my booking history. The amount was debited from my account.', time: '10:30 AM' },
        ],
    },
    {
        id: 'TKT-1002', userName: 'Priya Singh', email: 'priya@email.com', avatar: 'PS',
        subject: 'Service provider didn\'t show up', issueType: 'Service Issue', status: 'In Progress',
        description: 'I booked a home cleaning service for Mar 25 but the provider never arrived. I waited for over 2 hours. Need a refund or reschedule.',
        createdAt: 'Mar 25, 2026', updatedAt: 'Mar 27, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'Priya Singh', avatar: 'PS', text: 'I booked a home cleaning service for Mar 25 but the provider never arrived. I waited for over 2 hours.', time: '9:15 AM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Hi Priya, we sincerely apologize for the inconvenience. We are looking into this with the service provider.', time: '11:00 AM' },
            { id: 3, sender: 'user', name: 'Priya Singh', avatar: 'PS', text: 'Please process a refund or reschedule ASAP.', time: '11:30 AM' },
            { id: 4, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'We have initiated a full refund. You should receive it within 3-5 business days. We have also flagged the provider.', time: '2:00 PM' },
        ],
    },
    {
        id: 'TKT-1003', userName: 'Rahul Verma', email: 'rahul@email.com', avatar: 'RV',
        subject: 'Unable to update phone number', issueType: 'Account Issue', status: 'Resolved',
        description: 'I was unable to change my phone number from the profile settings page. The save button was unresponsive.',
        createdAt: 'Mar 20, 2026', updatedAt: 'Mar 22, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'Rahul Verma', avatar: 'RV', text: 'I was unable to change my phone number from the profile settings. The save button doesn\'t work.', time: '3:00 PM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Thanks for reporting, Rahul. We\'ve identified the bug and pushed a fix. Please try again now.', time: '5:30 PM' },
            { id: 3, sender: 'user', name: 'Rahul Verma', avatar: 'RV', text: 'It works now! Thank you so much.', time: '6:00 PM' },
        ],
    },
    {
        id: 'TKT-1004', userName: 'Sneha Patel', email: 'sneha@email.com', avatar: 'SP',
        subject: 'Incorrect pricing on plumbing service', issueType: 'Payment Issue', status: 'Open',
        description: 'The listed price for Plumbing Solutions says ₹299 but I was charged ₹599 at checkout. Please investigate.',
        createdAt: 'Mar 27, 2026', updatedAt: 'Mar 27, 2026',
        transactionId: 'TXN20260327042', paymentMethod: 'Card', amount: '599', dateOfPayment: '2026-03-27',
        replies: [
            { id: 1, sender: 'user', name: 'Sneha Patel', avatar: 'SP', text: 'The listed price says ₹299 but I was charged ₹599 at checkout. This is unfair pricing!', time: '1:45 PM' },
        ],
    },
    {
        id: 'TKT-1005', userName: 'Vikram Reddy', email: 'vikram@email.com', avatar: 'VR',
        subject: 'App crash during booking', issueType: 'Other', status: 'Resolved',
        description: 'The application crashed when I tried to select a time slot for the electrician service. Happened twice on Chrome.',
        createdAt: 'Mar 18, 2026', updatedAt: 'Mar 21, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'Vikram Reddy', avatar: 'VR', text: 'App crashes when I select a time slot for the electrician service. Happened twice on Chrome.', time: '10:00 AM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Could you share your Chrome version and a screenshot if possible? We\'ll investigate right away.', time: '11:15 AM' },
            { id: 3, sender: 'user', name: 'Vikram Reddy', avatar: 'VR', text: 'Chrome Version 123.0. It happens specifically on the March 20 time slot.', time: '11:30 AM' },
            { id: 4, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'We\'ve found and fixed the issue — it was a date parsing bug. The fix is now live. Please try again!', time: '4:00 PM' },
        ],
    },
    {
        id: 'TKT-1006', userName: 'Anita Desai', email: 'anita@email.com', avatar: 'AD',
        subject: 'Refund not received for cancelled service', issueType: 'Payment Issue', status: 'In Progress',
        description: 'I cancelled my booking 24 hours in advance but haven\'t received the refund yet. It\'s been 5 days.',
        createdAt: 'Mar 22, 2026', updatedAt: 'Mar 26, 2026',
        transactionId: 'TXN20260320015', paymentMethod: 'Net Banking', amount: '1299', dateOfPayment: '2026-03-20',
        replies: [
            { id: 1, sender: 'user', name: 'Anita Desai', avatar: 'AD', text: 'I cancelled my booking 24 hours in advance. It\'s been 5 days and I still haven\'t received the refund.', time: '9:00 AM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'Hi Anita, we\'re checking with our payments team. Refunds usually take 5-7 business days. We\'ll expedite this for you.', time: '10:30 AM' },
        ],
    },
    {
        id: 'TKT-1007', userName: 'Karan Mehta', email: 'karan@email.com', avatar: 'KM',
        subject: 'Wrong service category displayed', issueType: 'Service Issue', status: 'Open',
        description: 'My search for "Plumbing" shows results under "Electrical" category. The filters seem to be broken.',
        createdAt: 'Mar 29, 2026', updatedAt: 'Mar 29, 2026',
        replies: [
            { id: 1, sender: 'user', name: 'Karan Mehta', avatar: 'KM', text: 'Search for "Plumbing" is showing results under "Electrical" category. Filters are broken.', time: '8:30 AM' },
        ],
    },
    {
        id: 'TKT-1008', userName: 'Deepak Kumar', email: 'deepak@email.com', avatar: 'DK',
        subject: 'Double charged for AC repair', issueType: 'Payment Issue', status: 'Verified',
        description: 'I was charged twice for the same AC Repair service. Transaction IDs are different but same amount was debited.',
        createdAt: 'Mar 24, 2026', updatedAt: 'Mar 28, 2026',
        transactionId: 'TXN20260324077', paymentMethod: 'UPI', amount: '799', dateOfPayment: '2026-03-24',
        replies: [
            { id: 1, sender: 'user', name: 'Deepak Kumar', avatar: 'DK', text: 'I was charged twice ₹799 for the same AC Repair. Please refund the duplicate.', time: '2:00 PM' },
            { id: 2, sender: 'admin', name: 'Support Team', avatar: 'ST', text: 'We\'ve verified the duplicate charge. Initiating refund for ₹799.', time: '4:30 PM' },
        ],
    },
];

// Extended status flow: Open → In Progress → Verified → Resolved
const statusConfig = {
    'Open':        { bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500',     next: 'In Progress', order: 0 },
    'In Progress': { bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500',   next: 'Verified',    order: 1 },
    'Verified':    { bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-500',    next: 'Resolved',    order: 2 },
    'Resolved':    { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', next: null,          order: 3 },
};

const issueColors = {
    'Payment Issue':  'bg-violet-100 text-violet-700',
    'Service Issue':  'bg-orange-100 text-orange-700',
    'Account Issue':  'bg-blue-100 text-blue-700',
    'Other':          'bg-purple-100 text-purple-700',
};

const issueIcons = {
    'Payment Issue': '💳',
    'Service Issue': '🔧',
    'Account Issue': '👤',
    'Other': '❓',
};

const AdminTicketsPage = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState(initialTickets);
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterIssueType, setFilterIssueType] = useState('All');
    const [search, setSearch] = useState('');
    const [viewTicket, setViewTicket] = useState(null);
    const [replyText, setReplyText] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [viewTicket?.replies?.length]);

    const handleAdvanceStatus = (id) => {
        setTickets((prev) =>
            prev.map((t) => {
                if (t.id !== id) return t;
                const nextStatus = statusConfig[t.status]?.next;
                if (!nextStatus) return t;
                return { ...t, status: nextStatus, updatedAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) };
            })
        );
    };

    const handleSetStatus = (id, newStatus) => {
        setTickets((prev) =>
            prev.map((t) => {
                if (t.id !== id) return t;
                return { ...t, status: newStatus, updatedAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) };
            })
        );
        if (viewTicket?.id === id) {
            setViewTicket((prev) => ({ ...prev, status: newStatus, updatedAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) }));
        }
    };

    const handleSendReply = () => {
        const trimmed = replyText.trim();
        if (!trimmed || !viewTicket) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const newReply = {
            id: Date.now(),
            sender: 'admin',
            name: 'Support Team',
            avatar: 'ST',
            text: trimmed,
            time: timeStr,
        };

        setTickets((prev) =>
            prev.map((t) =>
                t.id === viewTicket.id
                    ? { ...t, replies: [...t.replies, newReply], updatedAt: now.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) }
                    : t
            )
        );
        setViewTicket((prev) => ({ ...prev, replies: [...prev.replies, newReply] }));
        setReplyText('');
    };

    const handleReplyKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendReply();
        }
    };

    const filteredTickets = tickets.filter((t) => {
        const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
        const matchesIssue = filterIssueType === 'All' || t.issueType === filterIssueType;
        const matchesSearch = t.userName.toLowerCase().includes(search.toLowerCase()) ||
            t.subject.toLowerCase().includes(search.toLowerCase()) ||
            t.id.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesIssue && matchesSearch;
    });

    const counts = {
        All: tickets.length,
        Open: tickets.filter((t) => t.status === 'Open').length,
        'In Progress': tickets.filter((t) => t.status === 'In Progress').length,
        Verified: tickets.filter((t) => t.status === 'Verified').length,
        Resolved: tickets.filter((t) => t.status === 'Resolved').length,
    };

    const paymentTicketCount = tickets.filter((t) => t.issueType === 'Payment Issue').length;

    // Action button config for Payment Issue tickets based on current status
    const getPaymentActions = (ticket) => {
        if (ticket.issueType !== 'Payment Issue') return null;
        const actions = [];
        if (ticket.status === 'Open') {
            actions.push({ label: 'Start Progress', color: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20', targetStatus: 'In Progress' });
        }
        if (ticket.status === 'In Progress') {
            actions.push({ label: 'Verify Payment', color: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20', targetStatus: 'Verified' });
        }
        if (ticket.status === 'Verified') {
            actions.push({ label: 'Mark Refunded', color: 'bg-violet-500 hover:bg-violet-600 text-white shadow-violet-500/20', targetStatus: 'Resolved' });
            actions.push({ label: 'Resolve Issue', color: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20', targetStatus: 'Resolved' });
        }
        return actions.length > 0 ? actions : null;
    };

    // For non-payment tickets, keep the standard advance flow
    const getNonPaymentActions = (ticket) => {
        if (ticket.issueType === 'Payment Issue') return null;
        const sc = statusConfig[ticket.status];
        if (!sc?.next) return null;
        const labels = { 'Open': 'Start Progress', 'In Progress': 'Mark Verified', 'Verified': 'Resolve' };
        const colors = { 'Open': 'bg-amber-500 hover:bg-amber-600 text-white', 'In Progress': 'bg-blue-500 hover:bg-blue-600 text-white', 'Verified': 'bg-emerald-500 hover:bg-emerald-600 text-white' };
        return [{ label: labels[ticket.status], color: colors[ticket.status], targetStatus: sc.next }];
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* ─── Admin Banner ─── */}
                    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden shadow-lg shadow-orange-500/15">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-white/5 rounded-full translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/20 shadow-lg">
                                    🎫
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm font-medium">Ticket Management</p>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Support Tickets</h1>
                                    <p className="text-white/60 text-sm mt-0.5">Manage and resolve user support requests</p>
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {[
                                    { label: 'Open', value: counts.Open, color: 'bg-red-500/20' },
                                    { label: 'In Progress', value: counts['In Progress'], color: 'bg-amber-500/20' },
                                    { label: 'Verified', value: counts.Verified, color: 'bg-blue-500/20' },
                                    { label: 'Resolved', value: counts.Resolved, color: 'bg-emerald-500/20' },
                                ].map((s) => (
                                    <div key={s.label} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                        <p className="text-xl font-extrabold text-white">{s.value}</p>
                                        <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ─── Tickets Table Card ─── */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                        {/* Header + Status Filters */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">🎫 All Tickets</h2>
                                <p className="text-sm text-gray-400">{tickets.length} total tickets · {paymentTicketCount} payment issues</p>
                            </div>
                            <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1">
                                {['All', 'Open', 'In Progress', 'Verified', 'Resolved'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setFilterStatus(filter)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filterStatus === filter ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        {filter} ({counts[filter]})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Issue Type Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <div className="flex gap-1.5 items-center">
                                <span className="text-xs font-semibold text-gray-500 mr-1">Type:</span>
                                {['All', 'Payment Issue', 'Service Issue', 'Account Issue', 'Other'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterIssueType(type)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                                            filterIssueType === type
                                                ? type === 'Payment Issue'
                                                    ? 'bg-violet-100 text-violet-700 border-violet-300'
                                                    : 'bg-primary/10 text-primary border-primary/30'
                                                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        {type !== 'All' && <span className="mr-1">{issueIcons[type]}</span>}
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2.5 gap-2 mb-4 border border-gray-100">
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by user, subject, or ticket ID..."
                                className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                            />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Ticket</th>
                                        <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">User</th>
                                        <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Issue Type</th>
                                        <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Status</th>
                                        <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Payment Info</th>
                                        <th className="text-right py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTickets.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-10 text-gray-400">
                                                <p className="text-3xl mb-2">🔍</p>
                                                <p className="font-medium">No tickets found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTickets.map((ticket) => {
                                            const sc = statusConfig[ticket.status];
                                            const isPayment = ticket.issueType === 'Payment Issue';
                                            const paymentActions = getPaymentActions(ticket);
                                            const nonPaymentActions = getNonPaymentActions(ticket);
                                            const actions = paymentActions || nonPaymentActions;

                                            return (
                                                <tr key={ticket.id} className={`border-b border-gray-50 transition-colors ${isPayment ? 'hover:bg-violet-50/30' : 'hover:bg-gray-50/50'}`}>
                                                    <td className="py-3">
                                                        <p className="text-xs font-mono text-gray-400">{ticket.id}</p>
                                                        <p className="font-semibold text-gray-800 text-sm truncate max-w-[200px]">{ticket.subject}</p>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                                {ticket.avatar}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-gray-800 text-sm truncate">{ticket.userName}</p>
                                                                <p className="text-xs text-gray-400 truncate">{ticket.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 hidden md:table-cell">
                                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${issueColors[ticket.issueType]}`}>
                                                            {issueIcons[ticket.issueType]} {ticket.issueType}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">
                                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                                            {ticket.status}
                                                        </span>
                                                    </td>
                                                    {/* Payment Info Column */}
                                                    <td className="py-3 hidden lg:table-cell">
                                                        {isPayment ? (
                                                            <div className="space-y-1">
                                                                <p className="text-xs text-gray-600">
                                                                    <span className="font-semibold text-violet-600">TXN:</span> {ticket.transactionId}
                                                                </p>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">₹{ticket.amount}</span>
                                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">{ticket.paymentMethod}</span>
                                                                    <span className="text-[10px] text-gray-400">{ticket.dateOfPayment}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-300 italic">—</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                                            <button
                                                                onClick={() => { setViewTicket(ticket); setReplyText(''); }}
                                                                className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors cursor-pointer"
                                                                title="View & Reply"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </button>
                                                            {actions ? (
                                                                actions.map((action, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={() => handleSetStatus(ticket.id, action.targetStatus)}
                                                                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-sm ${action.color}`}
                                                                    >
                                                                        {action.label}
                                                                    </button>
                                                                ))
                                                            ) : (
                                                                <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                                                                    ✓ Done
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />

            {/* ─── Ticket Detail + Reply Modal ─── */}
            {viewTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewTicket(null)}></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in flex flex-col" style={{ maxHeight: '90vh' }}>
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-5 shrink-0">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-white/70 text-xs font-mono">{viewTicket.id}</p>
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white`}>
                                            {viewTicket.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white truncate">{viewTicket.subject}</h3>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">
                                            {viewTicket.avatar}
                                        </div>
                                        <span className="text-white/80 text-xs">{viewTicket.userName}</span>
                                        <span className="text-white/40 text-xs">·</span>
                                        <span className="text-white/60 text-xs">{viewTicket.issueType}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setViewTicket(null)}
                                    className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer shrink-0 ml-3"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Payment Details Card in Modal */}
                        {viewTicket.issueType === 'Payment Issue' && (
                            <div className="mx-5 mt-4 p-4 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border border-violet-200/60 shrink-0">
                                <h5 className="text-xs font-bold text-violet-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-md bg-violet-200/70 flex items-center justify-center text-[10px]">💳</span>
                                    Payment Information
                                </h5>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Transaction ID</p>
                                        <p className="text-sm font-bold text-gray-800 truncate">{viewTicket.transactionId}</p>
                                    </div>
                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Amount</p>
                                        <p className="text-sm font-bold text-emerald-700">₹{viewTicket.amount}</p>
                                    </div>
                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Payment Method</p>
                                        <p className="text-sm font-bold text-gray-800">{viewTicket.paymentMethod}</p>
                                    </div>
                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Date of Payment</p>
                                        <p className="text-sm font-bold text-gray-800">{viewTicket.dateOfPayment}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Conversation Thread */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-gray-50/50" style={{ minHeight: '200px' }}>
                            {/* Date divider */}
                            <div className="flex items-center gap-3 my-1">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">Conversation</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            {viewTicket.replies.map((msg) => {
                                const isAdmin = msg.sender === 'admin';
                                return (
                                    <div key={msg.id} className={`flex items-end gap-2 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                                        {/* Avatar */}
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 mb-1 ${
                                            isAdmin
                                                ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                                                : 'bg-gradient-to-br from-primary to-secondary text-white'
                                        }`}>
                                            {msg.avatar}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`max-w-[75%] ${isAdmin ? 'items-end' : 'items-start'}`}>
                                            <p className={`text-[10px] font-semibold mb-0.5 px-1 ${isAdmin ? 'text-right text-amber-600' : 'text-left text-gray-500'}`}>
                                                {msg.name}
                                            </p>
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                                isAdmin
                                                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-br-md'
                                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                                            }`}>
                                                {msg.text}
                                            </div>
                                            <p className={`text-[10px] text-gray-400 mt-1 px-1 ${isAdmin ? 'text-right' : 'text-left'}`}>
                                                {msg.time}
                                                {isAdmin && <span className="ml-1 text-amber-400">✓✓</span>}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Reply Input + Actions */}
                        <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-4 space-y-3">
                            {/* Reply Input */}
                            <div className="flex items-end gap-2">
                                <div className="flex-1">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        onKeyDown={handleReplyKeyDown}
                                        placeholder="Type your reply..."
                                        rows={2}
                                        className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 resize-none outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                        style={{ maxHeight: '100px' }}
                                    />
                                </div>
                                <button
                                    onClick={handleSendReply}
                                    disabled={!replyText.trim()}
                                    className={`p-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                                        replyText.trim()
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 hover:shadow-lg hover:-translate-y-0.5'
                                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                                    title="Send reply"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 text-center">Press Enter to send · Shift+Enter for new line</p>

                            {/* Status Actions — Payment-specific or standard */}
                            <div className="flex gap-2 flex-wrap">
                                {viewTicket.issueType === 'Payment Issue' ? (
                                    <>
                                        {viewTicket.status === 'Open' && (
                                            <button
                                                onClick={() => handleSetStatus(viewTicket.id, 'In Progress')}
                                                className="flex-1 py-2.5 text-sm font-bold rounded-xl text-white shadow-md bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
                                            >
                                                Start Progress
                                            </button>
                                        )}
                                        {viewTicket.status === 'In Progress' && (
                                            <button
                                                onClick={() => handleSetStatus(viewTicket.id, 'Verified')}
                                                className="flex-1 py-2.5 text-sm font-bold rounded-xl text-white shadow-md bg-blue-500 hover:bg-blue-600 shadow-blue-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
                                            >
                                                ✓ Verify Payment
                                            </button>
                                        )}
                                        {viewTicket.status === 'Verified' && (
                                            <>
                                                <button
                                                    onClick={() => handleSetStatus(viewTicket.id, 'Resolved')}
                                                    className="flex-1 py-2.5 text-sm font-bold rounded-xl text-white shadow-md bg-violet-500 hover:bg-violet-600 shadow-violet-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
                                                >
                                                    💰 Mark Refunded
                                                </button>
                                                <button
                                                    onClick={() => handleSetStatus(viewTicket.id, 'Resolved')}
                                                    className="flex-1 py-2.5 text-sm font-bold rounded-xl text-white shadow-md bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
                                                >
                                                    ✓ Resolve Issue
                                                </button>
                                            </>
                                        )}
                                        {viewTicket.status === 'Resolved' && (
                                            <div className="flex-1 py-2.5 text-sm font-bold rounded-xl text-center bg-emerald-100 text-emerald-700">
                                                ✓ Ticket Resolved
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {statusConfig[viewTicket.status]?.next ? (
                                            <button
                                                onClick={() => handleSetStatus(viewTicket.id, statusConfig[viewTicket.status].next)}
                                                className={`flex-1 py-2.5 text-sm font-bold rounded-xl text-white shadow-md transition-all cursor-pointer hover:-translate-y-0.5 ${
                                                    viewTicket.status === 'Open'
                                                        ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                                                        : viewTicket.status === 'In Progress'
                                                        ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20'
                                                        : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                                                }`}
                                            >
                                                {viewTicket.status === 'Open' ? 'Mark In Progress' : viewTicket.status === 'In Progress' ? 'Mark Verified' : 'Mark Resolved'}
                                            </button>
                                        ) : (
                                            <div className="flex-1 py-2.5 text-sm font-bold rounded-xl text-center bg-emerald-100 text-emerald-700">
                                                ✓ Ticket Resolved
                                            </div>
                                        )}
                                    </>
                                )}
                                <button
                                    onClick={() => setViewTicket(null)}
                                    className="px-5 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>

                            {/* Status Flow Indicator */}
                            <div className="pt-2 border-t border-gray-100">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">Status Flow</p>
                                <div className="flex items-center justify-center gap-1">
                                    {['Open', 'In Progress', 'Verified', 'Resolved'].map((status, idx) => {
                                        const isCurrent = viewTicket.status === status;
                                        const isPast = statusConfig[viewTicket.status].order > statusConfig[status].order;
                                        return (
                                            <div key={status} className="flex items-center gap-1">
                                                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                                                    isCurrent
                                                        ? `${statusConfig[status].bg} ${statusConfig[status].text} ring-2 ring-offset-1 ring-${statusConfig[status].dot.replace('bg-', '')}`
                                                        : isPast
                                                        ? 'bg-emerald-100 text-emerald-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                    {isPast ? '✓' : ''} {status}
                                                </div>
                                                {idx < 3 && (
                                                    <svg className={`w-3 h-3 ${isPast ? 'text-emerald-400' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTicketsPage;
