import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

const initialBookings = [
    { id: 1, service: 'AC Service & Repair', provider: 'CoolTech Experts', date: 'Mar 20, 2026', time: '10:00 AM', status: 'Confirmed', price: '₹599', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=80&h=80&fit=crop' },
    { id: 2, service: 'Home Deep Cleaning', provider: 'CleanPro Services', date: 'Mar 22, 2026', time: '2:00 PM', status: 'Pending', price: '₹1,499', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=80&h=80&fit=crop' },
    { id: 3, service: 'Plumbing Fix', provider: 'QuickFix Plumbers', date: 'Mar 10, 2026', time: '11:00 AM', status: 'Completed', price: '₹299', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=80&h=80&fit=crop' },
    { id: 4, service: 'Painting - 2 Rooms', provider: 'ColorCraft Studios', date: 'Feb 28, 2026', time: '9:00 AM', status: 'Completed', price: '₹3,600', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=80&h=80&fit=crop' },
    { id: 5, service: 'Electrical Wiring', provider: 'VoltMaster', date: 'Feb 15, 2026', time: '3:00 PM', status: 'Completed', price: '₹799', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=80&h=80&fit=crop' },
];

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState(initialBookings);

    const addBooking = (booking) => {
        const newBooking = {
            id: Date.now(),
            status: 'Pending',
            ...booking,
        };
        setBookings((prev) => [newBooking, ...prev]);
        return newBooking;
    };

    const cancelBooking = (id) => {
        setBookings((prev) => prev.filter((b) => b.id !== id));
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBookings = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error('useBookings must be used within BookingProvider');
    return context;
};
