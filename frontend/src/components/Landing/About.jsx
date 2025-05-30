import React from "react";

const About = () => {
  return (
    <section className="min-height: 900px bg-white px-20 py-16 flex flex-col md:flex-row items-center justify-center gap-10">


      <div className="w-full md:w-1/2 h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
      <iframe
        title="Kikuhana Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.5783793693526!2d121.18540197665726!3d16.518100084211803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33904104e36ea509%3A0x54cc57a383b75776!2z44Kr44O844K344On44OD44Kv44Oq44OD44KzIOODgeODpeODq-ODs-ODiQ!5e0!3m2!1sen!2sph!4v1716384710027!5m2!1sen!2sph"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

    </div>

      <div className="w-full md:w-1/2 text-justify animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-black text-[#b90005] mb-6 font-agrandir tracking-wide text-left">
          About Kikuhana
        </h2>

        <p className="mb-4 text-lg akziden-font">
          <span className="text-2xl"></span> <strong>キクハナ Kikuhana</strong> is a modern Japanese restaurant curated with care by <strong>Onze Kitchen</strong>.
        </p>

        <p className="mb-4 text-lg akziden-font">
          Our mission is to bring together authentic Japanese flavors, modern comfort, and heartfelt service.
        </p>

        <p className="mb-4 text-lg akziden-font">
          <span className="text-2xl">📍</span> Visit us at <strong>W. Ongtao Bldg. III</strong>, Nat'l HW, Brgy. Roxas, Solano, Nueva Vizcaya.
        </p>

        <p className="mb-4 text-lg akziden-font">
          <span className="text-2xl"></span> Open <strong>Tuesday–Sunday</strong>, 10:30 AM – 8:30 PM. Closed on Mondays.
        </p>

        <p className="mb-4 text-lg akziden-font">
          Whether you’re dining in, ordering out, or celebrating something special—Kikuhana offers a warm, flavorful experience every time.
        </p>
      </div>
    </section>
  );
};

export default About;
