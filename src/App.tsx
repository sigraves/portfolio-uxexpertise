import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCaseStudies from './components/FeaturedCaseStudies';
import ResearchPhilosophy from './components/ResearchPhilosophy';
import AIResearchVideo from './components/AIResearchVideo';
import ExpertiseCards from './components/ExpertiseCards';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import WarUCaseStudy from './pages/WarUCaseStudy';
import CPSEnergyCaseStudy from './pages/CPSEnergyCaseStudy';
import { AISingleMoms } from './pages/AISingleMoms';
import ResearchApproach from './pages/ResearchApproach';
import UTSACaseStudy from './pages/UTSACaseStudy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content">
              <Hero />
              <FeaturedCaseStudies />
              <ResearchPhilosophy />
              <AIResearchVideo />
              <ExpertiseCards />
              <ContactCTA />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/waru" element={<WarUCaseStudy />} />
        <Route path="/energy" element={<CPSEnergyCaseStudy />} />
        <Route path="/ai-singlemoms" element={<AISingleMoms />} />
        <Route path="/research" element={<ResearchApproach />} />
        <Route path="/utsa" element={<UTSACaseStudy />} />
      </Routes>
    </Router>
  );
}

export default App;
