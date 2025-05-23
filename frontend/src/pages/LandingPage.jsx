import React, { useRef, useState, useEffect } from 'react';
import Sidebar from '../components/Landing/Sidebar';
import Dashboard from '../components/Landing/Dashboard';
import About from '../components/Landing/About';
import Menu from '../components/Landing/Menu';
import SocialMedia from '../components/Landing/SocialMedia';

export default function LandingPage() {
  const dashboardRef = useRef(null);
  const aboutRef = useRef(null);
  const menuRef = useRef(null);
  const socialRef = useRef(null);

  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -60% 0px" });

    const sections = [
      { ref: dashboardRef, id: "dashboard" },
      { ref: aboutRef, id: "about" },
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

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans">
      <Sidebar
        refs={{ dashboardRef, about: aboutRef, menu: menuRef, social: socialRef }}
        activeSection={activeSection}
        onScrollTo={scrollToSection}
      />
      <div ref={dashboardRef}><Dashboard refs={{ menu: menuRef }} /></div>
      <div ref={aboutRef} ><About /></div>
      <div ref={menuRef} className="h-screen"><Menu /></div>
      <div ref={socialRef}><SocialMedia /></div>
    </div>
  );
}
