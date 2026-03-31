import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import { useNotifications } from '../context/NotificationContext';

const issueTypes = ['Payment Issue', 'Service Issue', 'Account Issue', 'Other'];
const paymentMethods = ['UPI', 'Card', 'Net Banking'];

const CustomerSupportPage = () => {
    const { user } = useAuth();
    const { tickets: allTickets, addTicket } = useTickets();
    const { addNotification } = useNotifications();
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state?.booking;
    const [form, setForm] = useState({
        subject: '',
        description: '',
        issueType: '',
        transactionId: '',
        paymentMethod: '',
        amount: '',
        dateOfPayment: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // Pre-fill form when navigated from a booking
    useEffect(() => {
        if (bookingData) {
            setForm((prev) => ({
                ...prev,
                subject: `Issue with ${bookingData.service} (Booking #${bookingData.id})`,
                description: `I have an issue with my booking for ${bookingData.service} by ${bookingData.provider} on ${bookingData.date}. Booking ID: ${bookingData.id}, Amount: ${bookingData.price}.`,
                issueType: 'Service Issue',
            }));
        }
    }, [bookingData]);

    // Show only the current user's tickets (or all if not logged in)
    const tickets = user ? allTickets.filter((t) => t.userEmail === user.email || t.userName === user.name) : allTickets;

    const isPaymentIssue = form.issueType === 'Payment Issue';

    const validate = () => {
        const newErrors = {};
        if (!form.subject.trim()) newErrors.subject = 'Subject is required';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        if (!form.issueType) newErrors.issueType = 'Please select an issue type';

        if (isPaymentIssue) {
            if (!form.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
            if (!form.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
            if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
                newErrors.amount = 'Enter a valid amount greater than 0';
            if (!form.dateOfPayment) newErrors.dateOfPayment = 'Date of payment is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const updated = { ...prev, [name]: value };
            // Reset payment fields when switching away from Payment Issue
            if (name === 'issueType' && value !== 'Payment Issue') {
                updated.transactionId = '';
                updated.paymentMethod = '';
                updated.amount = '';
                updated.dateOfPayment = '';
            }
            return updated;
        });
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const ticketData = {
            subject: form.subject,
            description: form.description,
            issueType: form.issueType,
            userId: user?.id || 'guest',
            userName: user?.name || 'Guest User',
            userEmail: user?.email || 'guest@example.com',
        };

        if (isPaymentIssue) {
            ticketData.transactionId = form.transactionId;
            ticketData.paymentMethod = form.paymentMethod;
            ticketData.amount = form.amount;
            ticketData.dateOfPayment = form.dateOfPayment;
        }

        addTicket(ticketData);
        addNotification('customer_support', {
            icon: '🎫',
            title: 'New ticket raised',
            description: `${ticketData.issueType} ticket from ${ticketData.userName}`,
        });
        setForm({
            subject: '',
            description: '',
            issueType: '',
            transactionId: '',
            paymentMethod: '',
            amount: '',
            dateOfPayment: '',
        });
        setErrors({});
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            navigate('/my-tickets');
        }, 1500);
    };

    const inputClass = (field) =>
        `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'} bg-gray-50 focus:bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all`;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 pb-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Page Header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl mb-4 shadow-lg">
                            🎧
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900">Customer Support</h1>
                        <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
                            Have an issue? Raise a support ticket and we'll get back to you as soon as possible.
                        </p>
                    </div>

                    {/* Success Banner */}
                    {submitted && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 animate-fade-in">
                            <span className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-xl text-xl">✅</span>
                            <div>
                                <p className="font-semibold text-emerald-800 text-sm">Ticket submitted successfully!</p>
                                <p className="text-emerald-600 text-xs">Our team will review your issue and get back to you shortly.</p>
                            </div>
                        </div>
                    )}

                    {/* Ticket Form Card */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-lg p-6 sm:p-8 mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">📝</span>
                            Raise a Ticket
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Issue Type */}
                            <div>
                                <label htmlFor="issueType" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Issue Type
                                </label>
                                <select
                                    id="issueType"
                                    name="issueType"
                                    value={form.issueType}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.issueType ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'} bg-gray-50 focus:bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer`}
                                >
                                    <option value="">Select an issue type</option>
                                    {issueTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.issueType && <p className="text-red-500 text-xs mt-1">{errors.issueType}</p>}
                            </div>

                            {/* Conditional Payment Fields */}
                            {isPaymentIssue && (
                                <div className="p-5 bg-gradient-to-br from-violet-50/80 to-indigo-50/60 rounded-xl border border-violet-200/60 space-y-4 animate-fade-in">
                                    <h3 className="text-sm font-bold text-violet-800 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-md bg-violet-100 flex items-center justify-center text-xs">💳</span>
                                        Payment Details
                                    </h3>

                                    {/* Transaction ID */}
                                    <div>
                                        <label htmlFor="transactionId" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Transaction ID
                                        </label>
                                        <input
                                            id="transactionId"
                                            type="text"
                                            name="transactionId"
                                            value={form.transactionId}
                                            onChange={handleChange}
                                            placeholder="e.g. TXN123456789"
                                            className={inputClass('transactionId')}
                                        />
                                        {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Payment Method
                                        </label>
                                        <select
                                            id="paymentMethod"
                                            name="paymentMethod"
                                            value={form.paymentMethod}
                                            onChange={handleChange}
                                            className={`${inputClass('paymentMethod')} appearance-none cursor-pointer`}
                                        >
                                            <option value="">Select payment method</option>
                                            {paymentMethods.map((m) => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                        {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
                                    </div>

                                    {/* Amount & Date Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Amount (₹)
                                            </label>
                                            <input
                                                id="amount"
                                                type="number"
                                                name="amount"
                                                value={form.amount}
                                                onChange={handleChange}
                                                placeholder="e.g. 499"
                                                min="1"
                                                className={inputClass('amount')}
                                            />
                                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="dateOfPayment" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Date of Payment
                                            </label>
                                            <input
                                                id="dateOfPayment"
                                                type="date"
                                                name="dateOfPayment"
                                                value={form.dateOfPayment}
                                                onChange={handleChange}
                                                max={new Date().toISOString().split('T')[0]}
                                                className={inputClass('dateOfPayment')}
                                            />
                                            {errors.dateOfPayment && <p className="text-red-500 text-xs mt-1">{errors.dateOfPayment}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Brief summary of your issue"
                                    className={inputClass('subject')}
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Describe your issue in detail..."
                                    className={`${inputClass('description')} resize-none`}
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-sm"
                            >
                                Submit Ticket
                            </button>
                        </form>
                    </div>

                    {/* Submitted Tickets List */}
                    {tickets.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 text-sm">📋</span>
                                Your Tickets
                                <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{tickets.length}</span>
                            </h2>

                            <div className="space-y-4">
                                {tickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className={`rounded-xl border transition-all overflow-hidden ${ticket.issueType === 'Payment Issue' ? 'border-violet-200/80 bg-white shadow-md' : 'bg-gray-50 border-gray-200/60 hover:bg-gray-100'}`}
                                    >
                                        {/* Ticket Header */}
                                        <div className="p-4 flex items-start gap-4">
                                            <span className={`mt-0.5 shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold
                                                ${ticket.issueType === 'Payment Issue' ? 'bg-violet-100 text-violet-600' :
                                                  ticket.issueType === 'Service Issue' ? 'bg-orange-100 text-orange-600' :
                                                  ticket.issueType === 'Account Issue' ? 'bg-blue-100 text-blue-600' :
                                                  'bg-purple-100 text-purple-600'}`}
                                            >
                                                {ticket.issueType === 'Payment Issue' ? '💳' :
                                                 ticket.issueType === 'Service Issue' ? '🔧' :
                                                 ticket.issueType === 'Account Issue' ? '👤' : '❓'}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h4 className="font-semibold text-gray-900 text-sm truncate">{ticket.subject}</h4>
                                                    <span className="shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                                        {ticket.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ticket.description}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-xs text-gray-400">{ticket.createdAt}</span>
                                                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{ticket.issueType}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Details Card — highlighted separate section */}
                                        {ticket.issueType === 'Payment Issue' && (
                                            <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border border-violet-200/60">
                                                <h5 className="text-xs font-bold text-violet-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded-md bg-violet-200/70 flex items-center justify-center text-[10px]">💳</span>
                                                    Payment Information
                                                </h5>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Transaction ID</p>
                                                        <p className="text-sm font-bold text-gray-800 truncate">{ticket.transactionId}</p>
                                                    </div>
                                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Amount</p>
                                                        <p className="text-sm font-bold text-emerald-700">₹{ticket.amount}</p>
                                                    </div>
                                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Payment Method</p>
                                                        <p className="text-sm font-bold text-gray-800">{ticket.paymentMethod}</p>
                                                    </div>
                                                    <div className="bg-white/70 rounded-lg p-2.5 border border-violet-100">
                                                        <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-0.5">Date of Payment</p>
                                                        <p className="text-sm font-bold text-gray-800">{ticket.dateOfPayment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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

export default CustomerSupportPage;
