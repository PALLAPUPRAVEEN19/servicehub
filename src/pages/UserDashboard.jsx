import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { StatsGrid } from '../components/StatsCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const recommendedServices = [
    { id: 1, title: 'Full Home Deep Cleaning', provider: 'CleanPro Services', rating: 4.9, reviews: 2340, price: '₹1,499', originalPrice: '₹2,499', badge: 'Bestseller', badgeColor: 'bg-amber-500', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop' },
    { id: 2, title: 'AC Service & Repair', provider: 'CoolTech Experts', rating: 4.8, reviews: 1850, price: '₹599', originalPrice: '₹999', badge: 'Top Rated', badgeColor: 'bg-primary', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop' },
    { id: 3, title: 'Professional Painting', provider: 'ColorCraft Studios', rating: 4.7, reviews: 960, price: '₹12/sqft', originalPrice: '₹18/sqft', badge: 'Popular', badgeColor: 'bg-emerald-500', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=300&fit=crop' },
    { id: 4, title: 'Pest Control Treatment', provider: 'SafeHome Pest', rating: 4.5, reviews: 620, price: '₹899', originalPrice: '₹1,499', badge: 'Trending', badgeColor: 'bg-secondary', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop' },
];

// Bookings now come from BookingContext via useBookings()

const recentActivity = [
    { id: 1, type: 'booking', icon: '📋', text: 'You booked Home Deep Cleaning', time: '2 hours ago', color: 'bg-blue-100 text-blue-600' },
    { id: 2, type: 'review', icon: '⭐', text: 'You rated Plumbing Fix 4.8 stars', time: '1 day ago', color: 'bg-amber-100 text-amber-600' },
    { id: 3, type: 'payment', icon: '💳', text: 'Payment of ₹299 completed for Plumbing Fix', time: '2 days ago', color: 'bg-emerald-100 text-emerald-600' },
    { id: 4, type: 'completed', icon: '✅', text: 'Plumbing Fix service was completed', time: '2 days ago', color: 'bg-green-100 text-green-600' },
    { id: 5, type: 'booking', icon: '📋', text: 'You booked AC Service & Repair', time: '3 days ago', color: 'bg-blue-100 text-blue-600' },
    { id: 6, type: 'completed', icon: '✅', text: 'Painting - 2 Rooms was completed', time: '5 days ago', color: 'bg-green-100 text-green-600' },
];

const statusConfig = {
    Confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    Completed: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
};

const UserDashboard = () => {
    const { user } = useAuth();
    const { bookings: myBookings } = useBookings();
    const [searchQuery, setSearchQuery] = useState('');
    const [bookingFilter, setBookingFilter] = useState('All');

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const filteredBookings = myBookings.filter((b) => {
        if (bookingFilter === 'All') return true;
        return b.status === bookingFilter;
    });

    const filteredServices = recommendedServices.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* ─── Welcome Section ─── */}
                    <div className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden shadow-lg shadow-primary/15">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/20 shadow-lg">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm font-medium">{greeting()} 👋</p>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user?.name || 'User'}</h1>
                                    <p className="text-white/60 text-sm mt-0.5">Here's what's happening with your services today</p>
                                </div>
                            </div>
                            <Link
                                to="/services"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm no-underline"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Browse All Services
                            </Link>
                        </div>
                    </div>

                    {/* ─── Quick Stats ─── */}
                    <div className="mb-8">
                        <StatsGrid stats={[
                            { label: 'Total Bookings', value: '12', icon: '📋', change: '+3 this month', changeType: 'positive', iconBg: 'bg-blue-50', valueColor: 'text-blue-600', subtitle: 'Across all services', trend: [2, 1, 3, 2, 1, 2, 1] },
                            { label: 'Upcoming', value: '2', icon: '📅', change: 'Next: Mar 20', changeType: 'neutral', iconBg: 'bg-amber-50', valueColor: 'text-amber-600', subtitle: 'Scheduled bookings' },
                            { label: 'Completed', value: '10', icon: '✅', change: '100%', changeType: 'positive', iconBg: 'bg-emerald-50', valueColor: 'text-emerald-600', subtitle: 'Satisfaction rate', trend: [1, 1, 2, 1, 2, 1, 2] },
                            { label: 'Total Spent', value: '₹15,200', icon: '💳', change: '₹2,098', changeType: 'positive', iconBg: 'bg-purple-50', valueColor: 'text-purple-600', subtitle: 'This month', trend: [1200, 800, 2098, 1500, 900, 1800, 2098] },
                        ]} />
                    </div>

                    {/* ─── Search Bar ─── */}
                    <div className="mb-8">
                        <div className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-200/80 px-5 py-3.5 gap-3 hover:shadow-md transition-shadow">
                            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for services... e.g., cleaning, repair, painting"
                                className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ─── Recommended Services ─── */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">✨ Recommended For You</h2>
                                <p className="text-sm text-gray-400 mt-0.5">Based on your booking history</p>
                            </div>
                            <Link to="/services" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors no-underline">
                                View All →
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {filteredServices.map((service) => (
                                <div key={service.id} className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1">
                                    <div className="relative overflow-hidden h-40">
                                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                        <span className={`absolute top-3 left-3 ${service.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider`}>
                                            {service.badge}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-primary transition-colors line-clamp-1">{service.title}</h3>
                                        <p className="text-xs text-gray-400 mb-2.5">{service.provider}</p>
                                        <div className="flex items-center gap-1 mb-2.5">
                                            <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <span className="text-xs font-semibold text-gray-800">{service.rating}</span>
                                            <span className="text-xs text-gray-400">({service.reviews.toLocaleString()})</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-base font-bold text-gray-900">{service.price}</span>
                                                <span className="text-xs text-gray-400 line-through">{service.originalPrice}</span>
                                            </div>
                                            <button className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredServices.length === 0 && searchQuery && (
                            <div className="text-center py-10 bg-white rounded-2xl border border-gray-200/80">
                                <p className="text-4xl mb-2">🔍</p>
                                <p className="font-semibold text-gray-700">No services match "{searchQuery}"</p>
                                <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
                            </div>
                        )}
                    </div>

                    {/* ─── My Bookings + Recent Activity ─── */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* My Bookings (2/3 width) */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">📋 My Bookings</h2>
                                    <p className="text-sm text-gray-400">{myBookings.length} total bookings</p>
                                </div>
                                <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1">
                                    {['All', 'Pending', 'Confirmed', 'Completed'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setBookingFilter(filter)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${bookingFilter === filter
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {filteredBookings.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-4xl mb-2">📭</p>
                                    <p className="font-semibold text-gray-700">No {bookingFilter.toLowerCase()} bookings</p>
                                    <p className="text-sm text-gray-400 mt-1">Try selecting a different filter</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredBookings.map((booking) => {
                                        const status = statusConfig[booking.status];
                                        return (
                                            <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-colors group cursor-pointer">
                                                <img src={booking.image} alt={booking.service} className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors truncate">{booking.service}</h4>
                                                    <p className="text-xs text-gray-400 mt-0.5">{booking.provider}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-xs text-gray-500">{booking.date} at {booking.time}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                                                    <span className="font-bold text-gray-900 text-sm">{booking.price}</span>
                                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Recent Activity (1/3 width) */}
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 h-fit">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-gray-900">🕐 Recent Activity</h2>
                            </div>
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center text-sm shrink-0`}>
                                            {activity.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-gray-700 leading-snug">{activity.text}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 pt-4 border-t border-gray-100">
                                <button className="w-full text-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                                    View All Activity
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
