import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.08),transparent)]"></div>
            <div className="absolute top-32 right-10 w-72 h-72 bg-primary/[0.06] rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/[0.04] rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto" style={{ animation: 'slideUp 0.8s ease-out' }}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/[0.08] text-primary rounded-full text-xs font-semibold mb-8 tracking-wide">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                        #1 Service Platform in India
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                        Find & Hire
                        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-2">
                            Trusted Professionals
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                        From home repairs to beauty services — connect with verified experts near you. Quality service, guaranteed satisfaction.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-10 max-w-xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-200 p-1.5 gap-1.5">
                            <div className="flex items-center flex-1 gap-3 px-4 py-2">
                                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for services..."
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                                />
                            </div>
                            <Link
                                to="/services"
                                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 text-sm cursor-pointer whitespace-nowrap text-center no-underline"
                            >
                                Search
                            </Link>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
                        {[
                            { icon: '✓', text: '10,000+ Professionals' },
                            { icon: '★', text: '4.8 Average Rating' },
                            { icon: '🛡', text: '100% Verified' },
                            { icon: '⚡', text: 'Same Day Service' },
                        ].map((badge) => (
                            <div key={badge.text} className="flex items-center gap-2 text-gray-500 text-sm">
                                <span className="text-primary/80 text-sm">{badge.icon}</span>
                                <span className="font-medium">{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
