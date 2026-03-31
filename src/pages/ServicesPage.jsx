import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { useBookings } from '../context/BookingContext';

const allServices = [
    { id: 1, title: 'Full Home Deep Cleaning', category: 'Cleaning', provider: 'CleanPro Services', rating: 4.9, reviews: 2340, price: '₹1,499', originalPrice: '₹2,499', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop' },
    { id: 2, title: 'AC Service & Repair', category: 'Repair', provider: 'CoolTech Experts', rating: 4.8, reviews: 1850, price: '₹599', originalPrice: '₹999', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop' },
    { id: 3, title: 'Professional Painting', category: 'Painting', provider: 'ColorCraft Studios', rating: 4.7, reviews: 960, price: '₹12/sqft', originalPrice: '₹18/sqft', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=300&fit=crop' },
    { id: 4, title: 'Plumbing Solutions', category: 'Plumbing', provider: 'QuickFix Plumbers', rating: 4.8, reviews: 1420, price: '₹299', originalPrice: '₹599', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop' },
    { id: 5, title: 'Electrical Wiring & Repair', category: 'Electrical', provider: 'VoltMaster', rating: 4.6, reviews: 780, price: '₹399', originalPrice: '₹699', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop' },
    { id: 6, title: 'Bridal Makeup Package', category: 'Beauty', provider: 'GlowUp Studio', rating: 4.9, reviews: 3100, price: '₹4,999', originalPrice: '₹8,999', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop' },
    { id: 7, title: 'Pest Control Treatment', category: 'Cleaning', provider: 'SafeHome Pest', rating: 4.5, reviews: 620, price: '₹899', originalPrice: '₹1,499', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop' },
    { id: 8, title: 'Carpentry & Furniture', category: 'Repair', provider: 'WoodCraft Pro', rating: 4.7, reviews: 890, price: '₹499', originalPrice: '₹899', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop' },
];

const categories = ['All', 'Cleaning', 'Repair', 'Painting', 'Plumbing', 'Electrical', 'Beauty'];

const ServicesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addBooking } = useBookings();

    const filteredServices = allServices.filter((service) => {
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.provider.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleHire = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleConfirmBooking = (bookingData) => {
        addBooking(bookingData);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-12 lg:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                            All <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
                        </h1>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
                            Browse our complete catalog of professional services
                        </p>

                        {/* Search */}
                        <div className="mt-8 max-w-xl mx-auto">
                            <div className="flex items-center bg-white rounded-xl shadow-md border border-gray-200/80 px-4 py-2.5 gap-3">
                                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search services..."
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${selectedCategory === cat
                                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    {filteredServices.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
                            <p className="text-gray-500">Try a different category or search term</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{service.category}</span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                                        <p className="text-sm text-gray-400 mb-3">{service.provider}</p>
                                        <div className="flex items-center gap-1 mb-3">
                                            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <span className="text-sm font-semibold text-gray-800">{service.rating}</span>
                                            <span className="text-sm text-gray-400">({service.reviews.toLocaleString()})</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-gray-900">{service.price}</span>
                                                <span className="text-sm text-gray-400 line-through">{service.originalPrice}</span>
                                            </div>
                                            <button
                                                onClick={() => handleHire(service)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-sm shadow-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                                Hire
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />

            {/* Booking Modal */}
            <BookingModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setSelectedService(null); }}
                onConfirm={handleConfirmBooking}
            />
        </div>
    );
};

export default ServicesPage;
