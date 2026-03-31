import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceCategories from '../components/ServiceCategories';
import HowItWorks from '../components/HowItWorks';
import FeaturedServices from '../components/FeaturedServices';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <ServiceCategories />
            <HowItWorks />
            <FeaturedServices />
            <Footer />
        </div>
    );
};

export default HomePage;
