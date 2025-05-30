import React from "react";
import logo from '../../assets/Transparrent_Logo_Kikuhana.png';
import food from '../../assets/food/Sushibox.png';

const Dashboard = ({ refs }) => {
  const handleScroll = (ref) => {
    if (ref && ref.current) {
      const offset = 80;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen relative flex px-10 bg-gradient-to-br from-[#fff0f0] to-[#ffe6e6] overflow-hidden">


      <div className="w-1/2 flex flex-col justify-center items-start px-12 gap-4 z-10 mr-8">
        <h1 className="text-[4rem] md:text-[7rem] font-black uppercase text-black leading-tight drop-shadow-sm">
          キクハナ<br />
          KIKUHANA
        </h1>

        <p className="text-black text-x font-[Akziden]">
          Savor the tradition, love the flavor.
        </p>

        <button
          onClick={() => handleScroll(refs.menu)}
          className="bg-[#b90005] text-white px-6 py-3 rounded-md hover:bg-[#e2222f] transition-all shadow-lg"
        >
          View Menu
        </button>
      </div>


      <div className="w-1/2 relative flex items-center justify-center">
        <img
          src={logo}
          alt="Kikuhana Logo"
          className="absolute w-[1000px] opacity-10 top-1/2 -translate-y-1/2 pointer-events-none z-0"
        />
        <img
          src={food}
          alt="Sushi Box"
          className="relative w-[1000px] z-10"
        />
      </div>
    </section>
  );
};

export default Dashboard;
