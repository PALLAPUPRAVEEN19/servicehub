import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

const initialNotifications = {
    user: [
        { id: 1, icon: '📋', title: 'Booking confirmed', description: 'Your AC Service & Repair booking has been confirmed', time: '2 min ago', read: false },
        { id: 2, icon: '✅', title: 'Service completed', description: 'Plumbing Fix has been marked as completed', time: '1 hour ago', read: false },
        { id: 3, icon: '⭐', title: 'Rate your service', description: 'Please rate your experience with Plumbing Fix', time: '1 hour ago', read: false },
    ],
    professional: [
        { id: 1, icon: '📥', title: 'New booking request', description: 'Amit Sharma requested AC Repair service', time: '5 min ago', read: false },
        { id: 2, icon: '⭐', title: 'New review received', description: 'You received a 4.9 star rating from Priya Singh', time: '1 hour ago', read: false },
    ],
    customer_support: [
        { id: 1, icon: '🎫', title: 'New ticket raised', description: 'Payment issue ticket from Amit Sharma', time: '10 min ago', read: false },
        { id: 2, icon: '💬', title: 'User replied', description: 'Sneha Patel replied to TKT-1004', time: '30 min ago', read: false },
    ],
    admin: [
        { id: 1, icon: '👤', title: 'New user registered', description: 'Karan Mehta joined as User', time: '10 min ago', read: false },
        { id: 2, icon: '📋', title: 'Booking spike', description: '14 new bookings received today', time: '1 hour ago', read: false },
        { id: 3, icon: '🔔', title: 'Ticket alert', description: '2 tickets require attention', time: '2 hours ago', read: false },
    ],
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const addNotification = (role, notification) => {
        const newNotif = {
            id: Date.now(),
            read: false,
            time: 'Just now',
            ...notification,
        };
        setNotifications((prev) => ({
            ...prev,
            [role]: [newNotif, ...(prev[role] || [])],
        }));
    };

    const getNotifications = (role) => notifications[role] || [];

    const markAsRead = (role, notifId) => {
        setNotifications((prev) => ({
            ...prev,
            [role]: (prev[role] || []).map((n) => (n.id === notifId ? { ...n, read: true } : n)),
        }));
    };

    const markAllAsRead = (role) => {
        setNotifications((prev) => ({
            ...prev,
            [role]: (prev[role] || []).map((n) => ({ ...n, read: true })),
        }));
    };

    const getUnreadCount = (role) => (notifications[role] || []).filter((n) => !n.read).length;

    return (
        <NotificationContext.Provider value={{ addNotification, getNotifications, markAsRead, markAllAsRead, getUnreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within NotificationProvider');
    return context;
};

export default NotificationContext;
