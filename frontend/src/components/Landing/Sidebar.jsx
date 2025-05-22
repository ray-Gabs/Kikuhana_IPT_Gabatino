import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ refs, activeSection, onScrollTo }) => {
  const linkClasses = (id) =>
    `relative cursor-pointer hover:text-[#b90005] transition-all duration-300
    after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full
    after:bg-[#b90005] after:transition-transform after:duration-300 after:origin-left
    ${activeSection === id ? "after:scale-x-100 text-[#b90005]" : "after:scale-x-0"}`;

  return (
    <header className="w-full bg-white text-black sticky top-0 z-50">
      <nav className="flex justify-between items-center px-8 py-5 shadow-md bg-white">
        <div
          className="text-xl font-bold tracking-widest"
          style={{ fontFamily: "Agrandir" }}
        >
          キクハナ Kikuhana
        </div>

        <ul className="akziden-font tracking-widest flex space-x-8 items-center text-base">
          <li className={linkClasses("dashboard")} onClick={() => onScrollTo(refs.dashboardRef)}>Home</li>
          <li className={linkClasses("about")} onClick={() => onScrollTo(refs.about)}>About</li>
          <li className={linkClasses("location")} onClick={() => onScrollTo(refs.location)}>Location</li>
          <li className={linkClasses("menu")} onClick={() => onScrollTo(refs.menu)}>Menu</li>
          <li>
            <Link to="/login">
              <button className="bg-[#b90005] text-white px-4 py-2 rounded-md hover:bg-[#e2222f] transition-all">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Sidebar;
