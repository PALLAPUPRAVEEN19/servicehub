import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { useNotifications } from '../context/NotificationContext';
import { StatsGrid } from '../components/StatsCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialServices = [
    { id: 1, name: 'AC Service & Repair', price: '₹599', category: 'Repair', bookings: 145, rating: 4.8, revenue: '₹86,710', active: true, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=80&h=80&fit=crop' },
    { id: 2, name: 'AC Installation', price: '₹1,999', category: 'Installation', bookings: 62, rating: 4.9, revenue: '₹1,23,800', active: true, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=80&h=80&fit=crop' },
    { id: 3, name: 'AC Deep Cleaning', price: '₹799', category: 'Cleaning', bookings: 89, rating: 4.7, revenue: '₹71,100', active: true, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=80&h=80&fit=crop' },
    { id: 4, name: 'Refrigerator Repair', price: '₹699', category: 'Repair', bookings: 38, rating: 4.6, revenue: '₹22,800', active: false, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop' },
];

const earningsData = {
    thisMonth: '₹32,450',
    lastMonth: '₹28,100',
    growth: '+15.5%',
    totalEarnings: '₹2,33,310',
    pendingPayout: '₹8,250',
    weekly: [
        { day: 'Mon', amount: 4500 },
        { day: 'Tue', amount: 6200 },
        { day: 'Wed', amount: 3800 },
        { day: 'Thu', amount: 7100 },
        { day: 'Fri', amount: 5400 },
        { day: 'Sat', amount: 3200 },
        { day: 'Sun', amount: 2250 },
    ],
};

const maxWeekly = Math.max(...earningsData.weekly.map((d) => d.amount));

const statusConfig = {
    Pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Pending' },
    'In Progress': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'In Progress' },
    Completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Completed' },
};

const ProfessionalDashboard = () => {
    const { user } = useAuth();
    const { bookings, updateBookingStatus } = useBookings();
    const { addNotification } = useNotifications();
    const [services, setServices] = useState(initialServices);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newService, setNewService] = useState({ name: '', price: '', category: '' });
    const [activeTab, setActiveTab] = useState('requests');
    const [requestFilter, setRequestFilter] = useState('All');

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    // Professional's bookings — all bookings assigned to any professional (demo mode)
    const myBookings = bookings;

    const handleAccept = (id) => {
        updateBookingStatus(id, 'In Progress');
        addNotification('user', {
            icon: '✅',
            title: 'Booking accepted',
            description: 'Your booking has been accepted and is now in progress.',
        });
    };

    const handleComplete = (id) => {
        updateBookingStatus(id, 'Completed');
        addNotification('user', {
            icon: '🎉',
            title: 'Service completed',
            description: 'Your service has been completed! Please rate your experience.',
        });
    };

    const handleReject = (id) => {
        updateBookingStatus(id, 'Cancelled');
    };

    const handleToggleActive = (id) => {
        setServices((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
    };

    const handleDeleteService = (id) => {
        setServices((prev) => prev.filter((s) => s.id !== id));
    };

    const handleAddService = () => {
        if (!newService.name || !newService.price) return;
        const service = {
            id: Date.now(),
            name: newService.name,
            price: newService.price,
            category: newService.category || 'General',
            bookings: 0,
            rating: 0,
            revenue: '₹0',
            active: true,
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=80&h=80&fit=crop',
        };
        setServices((prev) => [service, ...prev]);
        setNewService({ name: '', price: '', category: '' });
        setShowAddModal(false);
    };

    // Filter requests
    const filteredRequests = myBookings.filter((b) => {
        if (requestFilter === 'All') return true;
        return b.status === requestFilter;
    });

    const pendingCount = myBookings.filter((b) => b.status === 'Pending').length;
    const inProgressCount = myBookings.filter((b) => b.status === 'In Progress').length;
    const completedCount = myBookings.filter((b) => b.status === 'Completed').length;
    const activeServices = services.filter((s) => s.active).length;

    // Ratings from completed bookings
    const ratings = myBookings.filter((b) => b.rating !== null);
    const avgRating = ratings.length > 0 ? (ratings.reduce((sum, b) => sum + b.rating, 0) / ratings.length).toFixed(1) : '0';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* ─── Welcome Banner ─── */}
                    <div className="relative bg-gradient-to-r from-primary via-purple-600 to-indigo-700 rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden shadow-lg shadow-primary/15">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-white/5 rounded-full translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/20 shadow-lg">
                                    {user?.name?.charAt(0).toUpperCase() || 'P'}
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm font-medium">{greeting()} 👋</p>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user?.name || 'Professional'}</h1>
                                    <p className="text-white/60 text-sm mt-0.5">Manage your services and requests</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{pendingCount}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Pending</p>
                                </div>
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{inProgressCount}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">In Progress</p>
                                </div>
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                                    <p className="text-xl font-extrabold text-white">{activeServices}</p>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Active Services</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Stats Row ─── */}
                    <div className="mb-8">
                        <StatsGrid stats={[
                            { label: 'This Month', value: earningsData.thisMonth, icon: '💰', change: earningsData.growth, changeType: 'positive', iconBg: 'bg-emerald-50', valueColor: 'text-emerald-600', subtitle: 'vs last month', trend: [4500, 6200, 3800, 7100, 5400, 3200, 2250] },
                            { label: 'Total Earnings', value: earningsData.totalEarnings, icon: '📈', change: 'All time', changeType: 'neutral', iconBg: 'bg-purple-50', valueColor: 'text-primary', subtitle: 'Revenue earned', trend: [18, 19, 20, 21, 22, 23, 24] },
                            { label: 'Completed Jobs', value: completedCount.toString(), icon: '✅', change: `${avgRating} ⭐`, changeType: 'positive', iconBg: 'bg-blue-50', valueColor: 'text-blue-600', subtitle: `${ratings.length} ratings received`, trend: [30, 35, 32, 40, 38, 36, 34] },
                            { label: 'Pending Payout', value: earningsData.pendingPayout, icon: '🏦', change: 'Mar 25', changeType: 'neutral', iconBg: 'bg-amber-50', valueColor: 'text-amber-600', subtitle: 'Next payout date' },
                        ]} />
                    </div>

                    {/* ─── Tab Switcher ─── */}
                    <div className="flex gap-2 mb-6">
                        {[
                            { key: 'requests', label: '📥 Booking Requests', count: myBookings.length },
                            { key: 'services', label: '🛠 My Services', count: services.length },
                            { key: 'ratings', label: '⭐ Ratings & Reviews', count: ratings.length },
                            { key: 'earnings', label: '📊 Earnings' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === tab.key
                                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full ${activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100'
                                        }`}>{tab.count}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* ─── Booking Requests Tab ─── */}
                    {activeTab === 'requests' && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">📥 Booking Requests</h2>
                                    <p className="text-sm text-gray-400">{pendingCount} pending, {inProgressCount} in progress</p>
                                </div>
                                <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1">
                                    {['All', 'Pending', 'In Progress', 'Completed'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setRequestFilter(filter)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${requestFilter === filter
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {filteredRequests.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-4xl mb-2">📭</p>
                                    <p className="font-semibold text-gray-700">No {requestFilter.toLowerCase()} bookings</p>
                                    <p className="text-sm text-gray-400 mt-1">Bookings will appear here when users hire you</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                                    {filteredRequests.map((req) => {
                                        const status = statusConfig[req.status] || statusConfig.Pending;
                                        return (
                                            <div key={req.id} className={`p-4 rounded-xl border transition-all ${req.status === 'In Progress' ? 'bg-blue-50/50 border-blue-200' :
                                                req.status === 'Completed' ? 'bg-emerald-50/50 border-emerald-200' :
                                                    'bg-gray-50 border-gray-100 hover:bg-gray-100/80'
                                                }`}>
                                                <div className="flex items-start gap-3">
                                                    <img src={req.image} alt={req.service} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm" />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h4 className="font-semibold text-gray-900 text-sm">{req.userName || 'Customer'}</h4>
                                                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                                {req.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-0.5">{req.service} · {req.price}</p>
                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                                                            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                {req.date}, {req.time}
                                                            </span>
                                                            {req.location && (
                                                                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                                    {req.location}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {/* Show rating if given */}
                                                        {req.rating && (
                                                            <div className="flex items-center gap-1.5 mt-2">
                                                                <div className="flex gap-0.5">
                                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                                        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(req.rating) ? 'text-amber-400' : 'text-gray-200'} fill-current`} viewBox="0 0 20 20">
                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                        </svg>
                                                                    ))}
                                                                </div>
                                                                <span className="text-xs font-semibold text-amber-600">{req.rating}</span>
                                                                {req.review && <span className="text-xs text-gray-400 truncate max-w-[200px]">"{req.review}"</span>}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="shrink-0 flex gap-2">
                                                        {req.status === 'Pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleAccept(req.id)}
                                                                    className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer shadow-sm"
                                                                >
                                                                    Accept
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(req.id)}
                                                                    className="px-3.5 py-1.5 text-xs font-semibold border border-gray-200 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                        {req.status === 'In Progress' && (
                                                            <button
                                                                onClick={() => handleComplete(req.id)}
                                                                className="px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all cursor-pointer shadow-sm shadow-emerald-500/20"
                                                            >
                                                                ✓ Mark Completed
                                                            </button>
                                                        )}
                                                        {req.status === 'Completed' && (
                                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                                                ✓ Completed
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── Ratings & Reviews Tab ─── */}
                    {activeTab === 'ratings' && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">⭐ Ratings & Reviews</h2>
                                    <p className="text-sm text-gray-400">{ratings.length} reviews · {avgRating} average</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 rounded-xl">
                                    <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    <span className="text-lg font-bold text-amber-700">{avgRating}</span>
                                </div>
                            </div>

                            {ratings.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-4xl mb-2">⭐</p>
                                    <p className="font-semibold text-gray-700">No reviews yet</p>
                                    <p className="text-sm text-gray-400 mt-1">Reviews will appear here after users rate your services</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {ratings.map((b) => (
                                        <div key={b.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                            <img src={b.image} alt={b.service} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900 text-sm">{b.userName}</h4>
                                                    <span className="text-xs text-gray-400">{b.date}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mb-2">{b.service}</p>
                                                <div className="flex items-center gap-1 mb-2">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <svg key={s} className={`w-4 h-4 ${s <= Math.round(b.rating) ? 'text-amber-400' : 'text-gray-200'} fill-current`} viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                    <span className="text-sm font-bold text-amber-600 ml-1">{b.rating}</span>
                                                </div>
                                                {b.review && (
                                                    <p className="text-sm text-gray-600 italic">"{b.review}"</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── Earnings Tab ─── */}
                    {activeTab === 'earnings' && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">📊 Weekly Earnings</h2>
                            <p className="text-sm text-gray-400 mb-5">This week's breakdown</p>
                            <div className="flex items-end justify-between gap-2 h-40">
                                {earningsData.weekly.map((day) => {
                                    const height = (day.amount / maxWeekly) * 100;
                                    return (
                                        <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                                            <span className="text-[10px] font-semibold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                ₹{(day.amount / 1000).toFixed(1)}K
                                            </span>
                                            <div
                                                className="w-full bg-gradient-to-t from-primary to-purple-400 rounded-lg group-hover:from-primary-dark group-hover:to-primary transition-all duration-200 shadow-sm"
                                                style={{ height: `${height}%`, minHeight: '8px' }}
                                            ></div>
                                            <span className="text-[10px] font-semibold text-gray-400">{day.day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-sm text-gray-500">Week total</span>
                                <span className="font-bold text-gray-900">₹{(earningsData.weekly.reduce((a, d) => a + d.amount, 0) / 1000).toFixed(1)}K</span>
                            </div>
                        </div>
                    )}

                    {/* ─── My Services Tab ─── */}
                    {activeTab === 'services' && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">🛠 My Services</h2>
                                    <p className="text-sm text-gray-400">{services.length} services · {activeServices} active</p>
                                </div>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Service
                                </button>
                            </div>

                            {/* Add Service Modal */}
                            {showAddModal && (
                                <div className="mb-5 p-5 bg-primary/5 border-2 border-dashed border-primary/30 rounded-xl">
                                    <h3 className="font-bold text-gray-900 text-sm mb-3">Add a New Service</h3>
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        <input type="text" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} placeholder="Service name" className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                        <input type="text" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} placeholder="Price (e.g. ₹599)" className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                        <input type="text" value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} placeholder="Category" className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button onClick={handleAddService} className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors cursor-pointer">Add Service</button>
                                        <button onClick={() => { setShowAddModal(false); setNewService({ name: '', price: '', category: '' }); }} className="px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">Cancel</button>
                                    </div>
                                </div>
                            )}

                            {/* Service List */}
                            <div className="space-y-3">
                                {services.map((service) => (
                                    <div key={service.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${service.active ? 'bg-gray-50 border-gray-100 hover:bg-gray-100/80' : 'bg-gray-50/50 border-gray-100 opacity-60'}`}>
                                        <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-gray-900 text-sm truncate">{service.name}</h4>
                                                <span className={`w-2 h-2 rounded-full shrink-0 ${service.active ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                <span className="text-sm font-bold text-primary">{service.price}</span>
                                                <span className="text-xs text-gray-400">{service.category}</span>
                                                <span className="text-xs text-gray-400">{service.bookings} bookings</span>
                                                {service.rating > 0 && (
                                                    <span className="inline-flex items-center gap-0.5 text-xs text-gray-400">
                                                        <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                        {service.rating}
                                                    </span>
                                                )}
                                                <span className="text-xs font-semibold text-emerald-600">{service.revenue}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button onClick={() => handleToggleActive(service.id)} title={service.active ? 'Deactivate' : 'Activate'} className={`p-2 rounded-lg transition-colors cursor-pointer ${service.active ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    {service.active ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    )}
                                                </svg>
                                            </button>
                                            <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors cursor-pointer" title="Edit">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDeleteService(service.id)} className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors cursor-pointer" title="Delete">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfessionalDashboard;
