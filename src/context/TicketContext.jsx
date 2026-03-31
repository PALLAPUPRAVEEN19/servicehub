import { createContext, useContext, useState } from 'react';

const TicketContext = createContext();

const initialTickets = [
    {
        id: 'TKT-1001',
        userId: 'user1',
        userName: 'Amit Sharma',
        userEmail: 'amit@example.com',
        subject: 'Payment not reflected after UPI transfer',
        description: 'I made a payment of ₹599 via UPI but the service was not booked. Transaction ID: TXN987654321.',
        issueType: 'Payment Issue',
        status: 'Open',
        createdAt: '30 Mar, 2026',
        transactionId: 'TXN987654321',
        paymentMethod: 'UPI',
        amount: '599',
        dateOfPayment: '2026-03-28',
        messages: [
            { from: 'user', name: 'Amit Sharma', text: 'I made a payment of ₹599 via UPI but the service was not booked. Transaction ID: TXN987654321.', time: '10:30 AM' },
        ],
    },
    {
        id: 'TKT-1002',
        userId: 'user2',
        userName: 'Priya Singh',
        userEmail: 'priya@example.com',
        subject: 'AC technician did not arrive',
        description: 'I had a booking for AC repair at 10 AM but no one showed up.',
        issueType: 'Service Issue',
        status: 'In Progress',
        createdAt: '29 Mar, 2026',
        messages: [
            { from: 'user', name: 'Priya Singh', text: 'I had a booking for AC repair at 10 AM but no one showed up.', time: '11:00 AM' },
            { from: 'support', name: 'Support Agent', text: 'We apologize for the inconvenience. Let me check with the assigned technician.', time: '11:15 AM' },
        ],
    },
    {
        id: 'TKT-1003',
        userId: 'user3',
        userName: 'Rahul Verma',
        userEmail: 'rahul@example.com',
        subject: 'Unable to update profile picture',
        description: 'Getting an error when trying to upload a new profile picture.',
        issueType: 'Account Issue',
        status: 'Resolved',
        createdAt: '28 Mar, 2026',
        messages: [
            { from: 'user', name: 'Rahul Verma', text: 'Getting an error when trying to upload a new profile picture.', time: '2:00 PM' },
            { from: 'support', name: 'Support Agent', text: 'We have fixed the upload issue. Please try again.', time: '3:30 PM' },
            { from: 'user', name: 'Rahul Verma', text: 'It works now. Thank you!', time: '4:00 PM' },
        ],
    },
    {
        id: 'TKT-1004',
        userId: 'user1',
        userName: 'Sneha Patel',
        userEmail: 'sneha@example.com',
        subject: 'Refund not received for cancelled booking',
        description: 'I cancelled my cleaning service booking 3 days ago but have not received my refund of ₹349.',
        issueType: 'Payment Issue',
        status: 'Open',
        createdAt: '30 Mar, 2026',
        transactionId: 'TXN123456789',
        paymentMethod: 'Card',
        amount: '349',
        dateOfPayment: '2026-03-27',
        messages: [
            { from: 'user', name: 'Sneha Patel', text: 'I cancelled my cleaning service booking 3 days ago but have not received my refund of ₹349.', time: '9:00 AM' },
        ],
    },
];

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState(initialTickets);

    const addTicket = (ticket) => {
        const newTicket = {
            id: `TKT-${Date.now().toString().slice(-4)}`,
            status: 'Open',
            createdAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
            messages: [
                {
                    from: 'user',
                    name: ticket.userName || 'User',
                    text: ticket.description,
                    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                },
            ],
            ...ticket,
        };
        setTickets((prev) => [newTicket, ...prev]);
        return newTicket;
    };

    const replyToTicket = (ticketId, message, sender = 'support', senderName = 'Support Agent') => {
        const newMessage = {
            from: sender,
            name: senderName,
            text: message,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        };
        setTickets((prev) =>
            prev.map((t) =>
                t.id === ticketId
                    ? {
                        ...t,
                        messages: [...t.messages, newMessage],
                        status: t.status === 'Open' ? 'In Progress' : t.status,
                    }
                    : t
            )
        );
    };

    const updateTicketStatus = (ticketId, newStatus) => {
        setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t)));
    };

    const getTicketsByUser = (userEmail) => tickets.filter((t) => t.userEmail === userEmail);

    return (
        <TicketContext.Provider value={{ tickets, addTicket, replyToTicket, updateTicketStatus, getTicketsByUser }}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTickets = () => {
    const context = useContext(TicketContext);
    if (!context) throw new Error('useTickets must be used within TicketProvider');
    return context;
};

export default TicketContext;
