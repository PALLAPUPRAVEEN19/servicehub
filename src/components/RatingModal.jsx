import { useState } from 'react';

const RatingModal = ({ booking, isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');

    if (!isOpen || !booking) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit(booking.id, rating, review);
        setRating(0);
        setHoverRating(0);
        setReview('');
        onClose();
    };

    const displayRating = hoverRating || rating;

    const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease]">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl mb-3 border border-white/20">
                        ⭐
                    </div>
                    <h2 className="text-xl font-bold">Rate Your Experience</h2>
                    <p className="text-white/70 text-sm mt-1 truncate">{booking.service}</p>
                    <p className="text-white/50 text-xs mt-0.5">{booking.provider}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* Star Rating */}
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    className="cursor-pointer transition-transform hover:scale-125 active:scale-95"
                                >
                                    <svg
                                        className={`w-10 h-10 transition-colors ${star <= displayRating ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current'
                                            }`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                        {displayRating > 0 && (
                            <p className="text-sm font-semibold text-gray-600 animate-[fadeIn_0.15s_ease]">
                                {ratingLabels[displayRating]}
                            </p>
                        )}
                    </div>

                    {/* Review Text */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Write a review <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={3}
                            placeholder="Share your experience..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className="flex-1 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            Submit Rating
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;
