const steps = [
    {
        number: '01',
        title: 'Search & Discover',
        description: 'Browse through hundreds of services or search for exactly what you need.',
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        color: 'from-primary to-violet-500',
    },
    {
        number: '02',
        title: 'Book a Professional',
        description: 'Choose a date and time. View profiles, reviews, and pricing before you book.',
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-secondary to-indigo-500',
    },
    {
        number: '03',
        title: 'Get It Done',
        description: 'Your verified professional delivers quality work. Pay securely and review.',
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'from-emerald-500 to-teal-500',
    },
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-widest text-secondary uppercase bg-secondary/[0.07] rounded-full mb-4">
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Get Started in{' '}
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">3 Simple Steps</span>
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-lg mx-auto">
                        Hiring a professional has never been easier. Follow these simple steps.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-10 lg:gap-16 relative">
                    {/* Connector Line (desktop) */}
                    <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/15 via-secondary/15 to-emerald-500/15"></div>

                    {steps.map((step, index) => (
                        <div key={step.number} className="relative text-center group">
                            {/* Icon */}
                            <div className="relative inline-flex mb-6">
                                <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                                    {step.icon}
                                </div>
                                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-white border border-gray-200 text-gray-600 rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                                    {step.number}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>

                            {/* Arrow (mobile) */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center my-6">
                                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
