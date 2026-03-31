import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

const initialBookings = [
    {
        id: 1,
        service: 'AC Service & Repair',
        provider: 'CoolTech Experts',
        professionalId: 'pro1',
        professionalName: 'CoolTech Experts',
        userId: 'user1',
        userName: 'Amit Sharma',
        date: 'Mar 20, 2026',
        time: '10:00 AM',
        status: 'Pending',
        price: '₹599',
        location: 'Banjara Hills, Hyderabad',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=80&h=80&fit=crop',
        rating: null,
        review: '',
    },
    {
        id: 2,
        service: 'Home Deep Cleaning',
        provider: 'CleanPro Services',
        professionalId: 'pro2',
        professionalName: 'CleanPro Services',
        userId: 'user2',
        userName: 'Priya Singh',
        date: 'Mar 22, 2026',
        time: '2:00 PM',
        status: 'In Progress',
        price: '₹1,499',
        location: 'Jubilee Hills, Hyderabad',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=80&h=80&fit=crop',
        rating: null,
        review: '',
    },
    {
        id: 3,
        service: 'Plumbing Fix',
        provider: 'QuickFix Plumbers',
        professionalId: 'pro3',
        professionalName: 'QuickFix Plumbers',
        userId: 'user1',
        userName: 'Amit Sharma',
        date: 'Mar 10, 2026',
        time: '11:00 AM',
        status: 'Completed',
        price: '₹299',
        location: 'Hitech City, Hyderabad',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=80&h=80&fit=crop',
        rating: 4.8,
        review: 'Great service! Fixed the issue quickly.',
    },
    {
        id: 4,
        service: 'Painting - 2 Rooms',
        provider: 'ColorCraft Studios',
        professionalId: 'pro4',
        professionalName: 'ColorCraft Studios',
        userId: 'user3',
        userName: 'Rahul Verma',
        date: 'Feb 28, 2026',
        time: '9:00 AM',
        status: 'Completed',
        price: '₹3,600',
        location: 'Gachibowli, Hyderabad',
        image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=80&h=80&fit=crop',
        rating: null,
        review: '',
    },
    {
        id: 5,
        service: 'Electrical Wiring',
        provider: 'VoltMaster',
        professionalId: 'pro5',
        professionalName: 'VoltMaster',
        userId: 'user2',
        userName: 'Priya Singh',
        date: 'Feb 15, 2026',
        time: '3:00 PM',
        status: 'Completed',
        price: '₹799',
        location: 'Madhapur, Hyderabad',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=80&h=80&fit=crop',
        rating: 4.5,
        review: 'Good work, very professional.',
    },
];

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState(initialBookings);

    const addBooking = (booking) => {
        const newBooking = {
            id: Date.now(),
            status: 'Pending',
            rating: null,
            review: '',
            ...booking,
        };
        setBookings((prev) => [newBooking, ...prev]);
        return newBooking;
    };

    const cancelBooking = (id) => {
        setBookings((prev) => prev.filter((b) => b.id !== id));
    };

    const updateBookingStatus = (id, newStatus) => {
        setBookings((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
    };

    const rateBooking = (id, rating, review) => {
        setBookings((prev) =>
            prev.map((b) => (b.id === id ? { ...b, rating, review } : b))
        );
    };

    const getBookingsByProfessional = (professionalName) =>
        bookings.filter((b) => b.professionalName === professionalName || b.provider === professionalName);

    const getBookingsByUser = (userName) =>
        bookings.filter((b) => b.userName === userName);

    const getBookingStats = () => ({
        total: bookings.length,
        pending: bookings.filter((b) => b.status === 'Pending').length,
        inProgress: bookings.filter((b) => b.status === 'In Progress').length,
        completed: bookings.filter((b) => b.status === 'Completed').length,
        rated: bookings.filter((b) => b.rating !== null).length,
    });

    return (
        <BookingContext.Provider
            value={{
                bookings,
                addBooking,
                cancelBooking,
                updateBookingStatus,
                rateBooking,
                getBookingsByProfessional,
                getBookingsByUser,
                getBookingStats,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookings = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error('useBookings must be used within BookingProvider');
    return context;
};
