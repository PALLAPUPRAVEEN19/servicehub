import { Link } from 'react-router-dom';

const services = [
    {
        title: 'Full Home Deep Cleaning',
        provider: 'CleanPro Services',
        rating: 4.9,
        reviews: 2340,
        price: '₹1,499',
        originalPrice: '₹2,499',
        badge: 'Bestseller',
        badgeColor: 'bg-amber-500',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    },
    {
        title: 'AC Service & Repair',
        provider: 'CoolTech Experts',
        rating: 4.8,
        reviews: 1850,
        price: '₹599',
        originalPrice: '₹999',
        badge: 'Top Rated',
        badgeColor: 'bg-primary',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    },
    {
        title: 'Professional Painting',
        provider: 'ColorCraft Studios',
        rating: 4.7,
        reviews: 960,
        price: '₹12/sqft',
        originalPrice: '₹18/sqft',
        badge: 'Popular',
        badgeColor: 'bg-emerald-500',
        image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=300&fit=crop',
    },
    {
        title: 'Plumbing Solutions',
        provider: 'QuickFix Plumbers',
        rating: 4.8,
        reviews: 1420,
        price: '₹299',
        originalPrice: '₹599',
        badge: 'Fast Service',
        badgeColor: 'bg-secondary',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop',
    },
];

const FeaturedServices = () => {
    return (
        <section id="featured" className="py-20 lg:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-widest text-primary uppercase bg-primary/[0.07] rounded-full mb-4">
                        Featured
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Most Booked{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-lg mx-auto">
                        Top-rated services loved by thousands of customers across the country.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-200"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-44">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                                <span className={`absolute top-3 left-3 ${service.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                                    {service.badge}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 text-sm mb-0.5 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-xs text-gray-400 mb-3">{service.provider}</p>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-gray-700">{service.rating}</span>
                                    <span className="text-xs text-gray-400">({service.reviews.toLocaleString()})</span>
                                </div>

                                {/* Price + CTA */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-base font-bold text-gray-900">{service.price}</span>
                                        <span className="text-xs text-gray-400 line-through">{service.originalPrice}</span>
                                    </div>
                                    <Link
                                        to="/services"
                                        className="p-2 rounded-lg bg-primary/[0.08] text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer no-underline"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5 shadow-sm cursor-pointer no-underline text-sm"
                    >
                        View All Services
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;
