import { useState } from 'react';

const BookingModal = ({ service, isOpen, onClose, onConfirm }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen || !service) return null;

    const validate = () => {
        const newErrors = {};
        if (!date) newErrors.date = 'Please select a date';
        if (!time) newErrors.time = 'Please select a time';
        if (!address.trim()) newErrors.address = 'Please enter your address';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const [hours, minutes] = time.split(':');
            const h = parseInt(hours);
            const formattedTime = `${h > 12 ? h - 12 : h}:${minutes} ${h >= 12 ? 'PM' : 'AM'}`;

            onConfirm({
                service: service.title,
                provider: service.provider,
                price: service.price,
                date: formattedDate,
                time: formattedTime,
                address,
                notes,
                image: service.image,
            });

            setIsSubmitting(false);
            setSuccess(true);
        }, 800);
    };

    const handleClose = () => {
        setDate('');
        setTime('');
        setAddress('');
        setNotes('');
        setErrors({});
        setSuccess(false);
        setIsSubmitting(false);
        onClose();
    };

    // Get tomorrow as min date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[fadeInUp_0.3s_ease]">

                {success ? (
                    /* ─── Success State ─── */
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h3>
                        <p className="text-gray-500 text-sm mb-1">Your booking for <strong>{service.title}</strong> has been placed.</p>
                        <p className="text-gray-400 text-xs mb-6">You'll receive a confirmation from {service.provider} shortly.</p>
                        <button
                            onClick={handleClose}
                            className="px-8 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Book Service</h2>
                            <button
                                onClick={handleClose}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Service Info */}
                        <div className="px-6 pt-5">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <img src={service.image} alt={service.title} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm truncate">{service.title}</h3>
                                    <p className="text-xs text-gray-400">{service.provider}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-bold text-primary">{service.price}</p>
                                    <p className="text-xs text-gray-400 line-through">{service.originalPrice}</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="px-6 py-5 space-y-4">
                            {/* Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Date *</label>
                                <input
                                    type="date"
                                    value={date}
                                    min={minDate}
                                    onChange={(e) => { setDate(e.target.value); setErrors({ ...errors, date: '' }); }}
                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${errors.date ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                />
                                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Time *</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => { setTime(e.target.value); setErrors({ ...errors, time: '' }); }}
                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${errors.time ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                />
                                {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Address *</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value); setErrors({ ...errors, address: '' }); }}
                                    placeholder="Enter your full address"
                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${errors.address ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                />
                                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any special instructions..."
                                    rows={2}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl flex items-center justify-between gap-3">
                            <button
                                onClick={handleClose}
                                className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Booking...
                                    </>
                                ) : (
                                    'Confirm Booking'
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
