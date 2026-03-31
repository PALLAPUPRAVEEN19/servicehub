import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { StatsGrid } from '../components/StatsCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialUsers = [
    { id: 1, name: 'Amit Sharma', email: 'amit@email.com', role: 'User', status: 'Active', joined: 'Mar 10, 2026', bookings: 8, avatar: 'AS' },
    { id: 2, name: 'Priya Singh', email: 'priya@email.com', role: 'Professional', status: 'Active', joined: 'Mar 8, 2026', bookings: 0, avatar: 'PS' },
    { id: 3, name: 'Rahul Verma', email: 'rahul@email.com', role: 'User', status: 'Active', joined: 'Mar 5, 2026', bookings: 12, avatar: 'RV' },
    { id: 4, name: 'Sneha Patel', email: 'sneha@email.com', role: 'Professional', status: 'Blocked', joined: 'Feb 28, 2026', bookings: 0, avatar: 'SP' },
    { id: 5, name: 'Vikram Reddy', email: 'vikram@email.com', role: 'User', status: 'Active', joined: 'Feb 20, 2026', bookings: 5, avatar: 'VR' },
    { id: 6, name: 'Anita Desai', email: 'anita@email.com', role: 'Professional', status: 'Active', joined: 'Feb 15, 2026', bookings: 0, avatar: 'AD' },
    { id: 7, name: 'Karan Mehta', email: 'karan@email.com', role: 'User', status: 'Active', joined: 'Feb 10, 2026', bookings: 3, avatar: 'KM' },
];

const initialPendingServices = [
    { id: 1, name: 'Interior Decoration', provider: 'Sneha Patel', category: 'Home', price: '₹2,999', submitted: 'Mar 18, 2026', status: 'pending' },
    { id: 2, name: 'Car Wash & Detailing', provider: 'Vikram Auto', category: 'Auto', price: '₹499', submitted: 'Mar 17, 2026', status: 'pending' },
    { id: 3, name: 'Yoga Training', provider: 'Anita Desai', category: 'Fitness', price: '₹799/mo', submitted: 'Mar 16, 2026', status: 'pending' },
    { id: 4, name: 'CCTV Installation', provider: 'SecureHome', category: 'Security', price: '₹3,499', submitted: 'Mar 15, 2026', status: 'pending' },
];

const activityLogs = [
    { id: 1, icon: '👤', text: 'New user Karan Mehta registered', time: '10 min ago', type: 'user' },
    { id: 2, icon: '🛠', text: 'Service "Interior Decoration" submitted for review', time: '25 min ago', type: 'service' },
    { id: 3, icon: '🚫', text: 'User Sneha Patel was blocked by admin', time: '1 hour ago', type: 'block' },
    { id: 4, icon: '✅', text: 'Service "Plumbing Solutions" approved', time: '2 hours ago', type: 'approve' },
    { id: 5, icon: '💰', text: 'Payout of ₹45,200 processed for professionals', time: '3 hours ago', type: 'payment' },
    { id: 6, icon: '📋', text: '14 new bookings received today', time: '5 hours ago', type: 'booking' },
    { id: 7, icon: '⭐', text: 'Average platform rating increased to 4.8', time: '8 hours ago', type: 'rating' },
    { id: 8, icon: '👤', text: 'New professional Anita Desai registered', time: '1 day ago', type: 'user' },
];

const logColors = {
    user: 'bg-blue-100 text-blue-600',
    service: 'bg-purple-100 text-purple-600',
    block: 'bg-red-100 text-red-600',
    approve: 'bg-emerald-100 text-emerald-600',
    payment: 'bg-amber-100 text-amber-600',
    booking: 'bg-cyan-100 text-cyan-600',
    rating: 'bg-pink-100 text-pink-600',
};

const AdminDashboard = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState(initialUsers);
    const [pendingServices, setPendingServices] = useState(initialPendingServices);
    const [userFilter, setUserFilter] = useState('All');
    const [userSearch, setUserSearch] = useState('');

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const handleBlockToggle = (id) => {
        setUsers((prev) => prev.map((u) =>
            u.id === id ? { ...u, status: u.status === 'Blocked' ? 'Active' : 'Blocked' } : u
        ));
    };

    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const handleApproveService = (id) => {
        setPendingServices((prev) => prev.map((s) => s.id === id ? { ...s, status: 'approved' } : s));
    };

    const handleRejectService = (id) => {
        setPendingServices((prev) => prev.map((s) => s.id === id ? { ...s, status: 'rejected' } : s));
    };

    const totalUsers = users.filter((u) => u.role === 'User').length;
    const totalProfessionals = users.filter((u) => u.role === 'Professional').length;
    const pendingCount = pendingServices.filter((s) => s.status === 'pending').length;

    const filteredUsers = users.filter((u) => {
        const matchesFilter = userFilter === 'All' || u.role === userFilter || u.status === userFilter;
        const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* ─── Welcome Banner ─── */}
                    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden shadow-lg shadow-orange-500/15">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-white/5 rounded-full translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/20 shadow-lg">
                                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm font-medium">{greeting()} 👋</p>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user?.name || 'Admin'}</h1>
                                    <p className="text-white/60 text-sm mt-0.5">Platform Administration Panel</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{pendingCount}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Pending Reviews</p>
                                </div>
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{users.length}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Total Accounts</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Stats Cards ─── */}
                    <div className="mb-8">
                        <StatsGrid stats={[
                            { label: 'Total Users', value: totalUsers.toLocaleString(), icon: '👥', change: '+3 this week', changeType: 'positive', iconBg: 'bg-blue-50', valueColor: 'text-blue-600', subtitle: 'Registered users', trend: [120, 135, 122, 140, 155, 148, 160] },
                            { label: 'Professionals', value: totalProfessionals.toLocaleString(), icon: '💼', change: '+1 this week', changeType: 'positive', iconBg: 'bg-purple-50', valueColor: 'text-purple-600', subtitle: 'Service providers', trend: [30, 32, 28, 35, 33, 38, 40] },
                            { label: 'Active Services', value: '8,290', icon: '⚡', change: '+12 today', changeType: 'positive', iconBg: 'bg-amber-50', valueColor: 'text-amber-600', subtitle: 'Across all categories', trend: [7800, 7900, 8000, 8100, 8150, 8200, 8290] },
                            { label: 'Revenue', value: '₹24.5L', icon: '💰', change: '+22%', changeType: 'positive', iconBg: 'bg-emerald-50', valueColor: 'text-emerald-600', subtitle: 'This month', trend: [18, 19, 20, 21, 22, 23, 24.5] },
                        ]} />
                    </div>

                    {/* ─── Manage Users + Activity Logs ─── */}
                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                        {/* Manage Users Table */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">👥 Manage Users</h2>
                                    <p className="text-sm text-gray-400">{users.length} total accounts</p>
                                </div>
                                <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1">
                                    {['All', 'User', 'Professional', 'Blocked'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setUserFilter(filter)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${userFilter === filter ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {filter}
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
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                    placeholder="Search users..."
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                                />
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">User</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Role</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Joined</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Status</th>
                                            <th className="text-right py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-10 text-gray-400">
                                                    <p className="text-3xl mb-2">🔍</p>
                                                    <p className="font-medium">No users found</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map((u) => (
                                                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                                {u.avatar}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-gray-800 text-sm truncate">{u.name}</p>
                                                                <p className="text-xs text-gray-400 truncate">{u.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${u.role === 'Professional' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                            }`}>{u.role}</span>
                                                    </td>
                                                    <td className="py-3 text-gray-500 text-xs hidden sm:table-cell">{u.joined}</td>
                                                    <td className="py-3">
                                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                                                            }`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                            {u.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                onClick={() => handleBlockToggle(u.id)}
                                                                title={u.status === 'Blocked' ? 'Unblock' : 'Block'}
                                                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${u.status === 'Blocked'
                                                                    ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                                                    : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                                                                    }`}
                                                            >
                                                                {u.status === 'Blocked' ? (
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(u.id)}
                                                                className="p-1.5 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors cursor-pointer"
                                                                title="Delete"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Activity Logs */}
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 h-fit">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">🕐 Activity Logs</h2>
                            <p className="text-sm text-gray-400 mb-5">Latest platform activity</p>
                            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                                {activityLogs.map((log) => (
                                    <div key={log.id} className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${logColors[log.type]} flex items-center justify-center text-sm shrink-0`}>
                                            {log.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-gray-700 leading-snug">{log.text}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 pt-4 border-t border-gray-100">
                                <button className="w-full text-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                                    View All Logs
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ─── Manage Services ─── */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">📦 Manage Services</h2>
                                <p className="text-sm text-gray-400">{pendingCount} services pending approval</p>
                            </div>
                        </div>

                        {pendingServices.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-4xl mb-2">✅</p>
                                <p className="font-semibold text-gray-700">All caught up!</p>
                                <p className="text-sm text-gray-400 mt-1">No services pending review</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Service</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Provider</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Price</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Submitted</th>
                                            <th className="text-right py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingServices.map((service) => (
                                            <tr key={service.id} className={`border-b border-gray-50 transition-colors ${service.status === 'approved' ? 'bg-emerald-50/30' :
                                                service.status === 'rejected' ? 'bg-red-50/30 opacity-60' :
                                                    'hover:bg-gray-50/50'
                                                }`}>
                                                <td className="py-3">
                                                    <p className="font-semibold text-gray-800">{service.name}</p>
                                                </td>
                                                <td className="py-3 text-gray-500 hidden sm:table-cell">{service.provider}</td>
                                                <td className="py-3 hidden md:table-cell">
                                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{service.category}</span>
                                                </td>
                                                <td className="py-3 font-semibold text-gray-800">{service.price}</td>
                                                <td className="py-3 text-gray-500 text-xs hidden md:table-cell">{service.submitted}</td>
                                                <td className="py-3">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {service.status === 'pending' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApproveService(service.id)}
                                                                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer shadow-sm"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRejectService(service.id)}
                                                                    className="px-3 py-1.5 text-xs font-semibold border border-gray-200 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                                                                }`}>
                                                                {service.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
