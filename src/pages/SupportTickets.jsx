import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';
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

const SupportTickets = () => {
    const { tickets } = useTickets();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const openCount = tickets.filter((t) => t.status === 'Open').length;
    const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
    const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

    const filteredTickets = tickets
        .filter((t) => statusFilter === 'All' || t.status === statusFilter)
        .filter((t) =>
            searchQuery === '' ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.id.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-extrabold text-gray-900">🎫 All Support Tickets</h1>
                        <p className="text-gray-500 text-sm mt-1">View and manage all user tickets</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total', value: tickets.length, color: 'text-primary', bg: 'bg-primary/10' },
                            { label: 'Open', value: openCount, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'In Progress', value: inProgressCount, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { label: 'Resolved', value: resolvedCount, color: 'text-gray-600', bg: 'bg-gray-100' },
                        ].map((stat) => (
                            <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
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
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by ID, subject, or user..."
                            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all w-full sm:w-72"
                        />
                    </div>

                    {/* Ticket Table */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="text-left py-3.5 px-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Ticket</th>
                                        <th className="text-left py-3.5 px-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">User</th>
                                        <th className="text-left py-3.5 px-5 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Type</th>
                                        <th className="text-left py-3.5 px-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Status</th>
                                        <th className="text-left py-3.5 px-5 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                                        <th className="text-right py-3.5 px-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTickets.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center">
                                                <p className="text-4xl mb-2">📭</p>
                                                <p className="font-semibold text-gray-600">No tickets found</p>
                                                <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTickets.map((ticket) => (
                                            <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3.5 px-5">
                                                    <p className="font-bold text-gray-800">{ticket.id}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-[200px]">{ticket.subject}</p>
                                                </td>
                                                <td className="py-3.5 px-5">
                                                    <p className="font-semibold text-gray-700 text-sm">{ticket.userName}</p>
                                                    <p className="text-xs text-gray-400">{ticket.userEmail}</p>
                                                </td>
                                                <td className="py-3.5 px-5 hidden md:table-cell">
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600">
                                                        {typeIcon[ticket.issueType] || '📋'} {ticket.issueType}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-5">
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColor[ticket.status]}`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-5 text-gray-500 text-xs hidden sm:table-cell">{ticket.createdAt}</td>
                                                <td className="py-3.5 px-5 text-right">
                                                    <button
                                                        onClick={() => navigate('/support/respond', { state: { ticketId: ticket.id } })}
                                                        className="px-3.5 py-1.5 text-xs font-semibold text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        💬 Respond
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SupportTickets;
