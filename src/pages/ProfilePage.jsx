import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
    const user = {
        name: 'Praveen Kumar',
        email: 'praveen@example.com',
        phone: '+91 98765 43210',
        location: 'Hyderabad, India',
        joinedDate: 'March 2026',
        avatar: null,
    };

    const bookings = [
        { id: 1, service: 'Full Home Deep Cleaning', provider: 'CleanPro Services', date: 'Mar 15, 2026', status: 'Completed', price: '₹1,499' },
        { id: 2, service: 'AC Service & Repair', provider: 'CoolTech Experts', date: 'Mar 18, 2026', status: 'Upcoming', price: '₹599' },
        { id: 3, service: 'Plumbing Solutions', provider: 'QuickFix Plumbers', date: 'Mar 10, 2026', status: 'Completed', price: '₹299' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Profile Header Card */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-lg overflow-hidden mb-8">
                        <div className="h-32 bg-gradient-to-r from-primary via-purple-500 to-secondary"></div>
                        <div className="px-6 sm:px-8 pb-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
                                {/* Avatar */}
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg shrink-0">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 pt-2 sm:pt-0">
                                    <h1 className="text-2xl font-extrabold text-gray-900">{user.name}</h1>
                                    <p className="text-gray-500 text-sm">Member since {user.joinedDate}</p>
                                </div>
                                <button className="px-5 py-2 text-sm font-semibold text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column — Info */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Personal Info */}
                            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h2>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Email', value: user.email, icon: '✉️' },
                                        { label: 'Phone', value: user.phone, icon: '📱' },
                                        { label: 'Location', value: user.location, icon: '📍' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-3">
                                            <span className="text-lg">{item.icon}</span>
                                            <div>
                                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                                                <p className="text-sm text-gray-800 font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Bookings', value: '12', color: 'text-primary' },
                                        { label: 'Reviews', value: '8', color: 'text-amber-500' },
                                        { label: 'Saved', value: '5', color: 'text-pink-500' },
                                        { label: 'Spent', value: '₹15K', color: 'text-emerald-500' },
                                    ].map((stat) => (
                                        <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                                            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                                            <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column — Bookings */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                                    <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                                        View All
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 text-sm">{booking.service}</h4>
                                                <p className="text-xs text-gray-400 mt-0.5">{booking.provider} · {booking.date}</p>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-1">
                                                <span className="font-bold text-gray-900 text-sm">{booking.price}</span>
                                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${booking.status === 'Completed'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
