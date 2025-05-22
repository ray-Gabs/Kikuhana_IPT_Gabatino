// components/Dashboard.jsx
import React from "react";

const Dashboard = ({ refs }) => {
  const handleScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen bg-white flex">
      <div className="text-left bg-amber-50 px-10 z-10">
        <h1 className="text-[5rem] md:text-[7rem] font-black mb-6 uppercase text-black">
          キクハナ<br />
          Kikuhana
        </h1>
        <p className="text-black text-xl font-[Akziden] mb-6">
          Savor the tradition, love the flavor.
        </p>
        <button
          className="bg-[#b90005] text-white px-6 py-3 rounded-md hover:bg-[#e2222f] transition-all"
          onClick={() => handleScroll(refs.menu)}
        >
          View Menu
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
