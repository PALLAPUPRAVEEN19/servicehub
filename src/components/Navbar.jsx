import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, getDashboardPath } = useAuth();
    const { getNotifications, markAsRead: ctxMarkAsRead, markAllAsRead: ctxMarkAllAsRead, getUnreadCount } = useNotifications();

    const notifications = isAuthenticated ? getNotifications(user?.role) : [];
    const unreadCount = isAuthenticated ? getUnreadCount(user?.role) : 0;

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    const markAsRead = (id) => {
        if (user?.role) ctxMarkAsRead(user.role, id);
    };

    const markAllAsRead = () => {
        if (user?.role) ctxMarkAllAsRead(user.role);
    };

    const getNavLinks = () => {
        if (!isAuthenticated) {
            return [
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
            ];
        }
        switch (user?.role) {
            case 'admin':
                return [
                    { to: '/', label: 'Home' },
                    { to: '/admin-dashboard', label: 'Dashboard' },
                    { to: '/services', label: 'Manage Services' },
                ];
            case 'professional':
                return [
                    { to: '/', label: 'Home' },
                    { to: '/professional-dashboard', label: 'Dashboard' },
                    { to: '/services', label: 'My Services' },
                ];
            case 'customer_support':
                return [
                    { to: '/support-dashboard', label: 'Dashboard' },
                    { to: '/support/tickets', label: 'View Tickets' },
                    { to: '/support/respond', label: 'Respond to Users' },
                ];
            case 'user':
            default:
                return [
                    { to: '/', label: 'Home' },
                    { to: '/user-dashboard', label: 'Dashboard' },
                    { to: '/services', label: 'Browse Services' },
                    { to: '/my-tickets', label: 'My Tickets' },
                    { to: '/support', label: 'Support' },
                ];
        }
    };

    const navLinks = getNavLinks();
    const isActive = (path) => location.pathname === path;

    /* ─── Notification Bell (shared between desktop & mobile) ─── */
    const NotificationBell = ({ className = '' }) => (
        <div ref={notifRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Notifications"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-gray-200/80 shadow-2xl shadow-gray-200/50 overflow-hidden z-[60]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                            {unreadCount > 0 && (
                                <p className="text-xs text-gray-400">{unreadCount} unread</p>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                            <div
                                key={notif.id}
                                onClick={() => markAsRead(notif.id)}
                                className={`flex items-start gap-3 px-5 py-3.5 border-b border-gray-50 cursor-pointer transition-colors ${notif.read ? 'bg-white hover:bg-gray-50' : 'bg-primary/[0.03] hover:bg-primary/[0.06]'
                                    }`}
                            >
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-primary/10'
                                    }`}>
                                    {notif.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className={`text-sm leading-snug ${notif.read ? 'text-gray-700' : 'font-semibold text-gray-900'}`}>
                                            {notif.title}
                                        </p>
                                        {!notif.read && (
                                            <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5 truncate">{notif.description}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                        <button className="w-full text-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                            View All Notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-18">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md shadow-primary/25">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            MyServiceHub
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to + link.label}
                                to={link.to}
                                className={`font-medium transition-colors duration-200 text-sm no-underline relative ${isActive(link.to) ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.to) && (
                                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth + Notification */}
                    <div className="hidden md:flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                {/* Notification Bell */}
                                <NotificationBell />

                                {/* User Badge */}
                                <Link
                                    to={getDashboardPath(user.role)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors no-underline"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-semibold text-gray-800 leading-none">{user.name}</p>
                                        <p className="text-[10px] text-gray-400 capitalize leading-none mt-0.5">{user.role}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 no-underline"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 no-underline"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile: bell + hamburger */}
                    <div className="md:hidden flex items-center gap-1">
                        {isAuthenticated && <NotificationBell />}
                        <button
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to + link.label}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-4 py-2.5 rounded-lg font-medium transition-colors text-sm no-underline ${isActive(link.to) ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 px-4 py-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-center px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full text-center px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-all no-underline"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-md no-underline"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
