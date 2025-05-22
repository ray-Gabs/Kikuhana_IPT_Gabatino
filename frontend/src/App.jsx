import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Landing/Sidebar';
import Dashboard from './components/Landing/Dashboard';
import About from './components/Landing/About';
import Location from './components/Landing/Location';
import Menu from './components/Landing/Menu';
import SocialMedia from './components/Landing/SocialMedia';
import Login from './Pages/LoginPage';

function App() {
  const dashboardRef = useRef(null);
  const aboutRef = useRef(null);
  const locationRef = useRef(null);
  const menuRef = useRef(null);
  const socialRef = useRef(null);

  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -60% 0px", // triggers earlier when scrolling up
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = [
      { ref: dashboardRef, id: "dashboard" },
      { ref: aboutRef, id: "about" },
      { ref: locationRef, id: "location" },
      { ref: menuRef, id: "menu" },
      { ref: socialRef, id: "social" },
    ];

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.id = id;
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const headerOffset = 80;
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="font-sans">
            <Sidebar
              refs={{
                dashboardRef,
                about: aboutRef,
                location: locationRef,
                menu: menuRef,
                social: socialRef,
              }}
              activeSection={activeSection}
              onScrollTo={scrollToSection}
            />
            <div ref={dashboardRef} className="min-h-screen">
              <Dashboard />
            </div>
            <div ref={aboutRef} className="min-h-screen">
              <About />
            </div>
            <div ref={locationRef} className="min-h-screen">
              <Location />
            </div>
            <div ref={menuRef} className="min-h-screen">
              <Menu />
            </div>
            <div ref={socialRef} className="py-20">
              <SocialMedia />
            </div>
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
