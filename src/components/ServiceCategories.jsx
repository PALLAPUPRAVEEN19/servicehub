const categories = [
    { icon: '🔧', name: 'Plumbing', count: '1,200+', color: 'bg-violet-50', iconHover: 'group-hover:bg-violet-100' },
    { icon: '⚡', name: 'Electrician', count: '980+', color: 'bg-amber-50', iconHover: 'group-hover:bg-amber-100' },
    { icon: '🧹', name: 'Cleaning', count: '2,500+', color: 'bg-emerald-50', iconHover: 'group-hover:bg-emerald-100' },
    { icon: '🎨', name: 'Painting', count: '750+', color: 'bg-rose-50', iconHover: 'group-hover:bg-rose-100' },
    { icon: '💇', name: 'Beauty & Spa', count: '3,100+', color: 'bg-purple-50', iconHover: 'group-hover:bg-purple-100' },
    { icon: '🏠', name: 'Home Repair', count: '1,800+', color: 'bg-orange-50', iconHover: 'group-hover:bg-orange-100' },
    { icon: '📦', name: 'Moving', count: '620+', color: 'bg-sky-50', iconHover: 'group-hover:bg-sky-100' },
    { icon: '💻', name: 'IT Support', count: '440+', color: 'bg-indigo-50', iconHover: 'group-hover:bg-indigo-100' },
];

const ServiceCategories = () => {
    return (
        <section id="services" className="py-20 lg:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-widest text-primary uppercase bg-primary/[0.07] rounded-full mb-4">
                        Our Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Popular Service{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Categories</span>
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-lg mx-auto">
                        Browse through our wide range of professional services and find exactly what you need.
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="group relative p-6 bg-white rounded-2xl border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-200"
                        >
                            <div className={`w-12 h-12 ${category.color} ${category.iconHover} rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors duration-300 group-hover:scale-105`}>
                                {category.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{category.count} experts</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCategories;
