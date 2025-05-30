const SocialMedia = () => {
  return (
    <section className="bg-[#e2222f] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-4xl font-bold mb-6 md:mb-0 tracking-wide">Follow Us</h2>
        <ul className="flex flex-wrap gap-6 text-base font-semibold underline underline-offset-4">
          <li>
            <a
              href="https://www.facebook.com/kikuhana.nv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/kikuhana.nv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SocialMedia;
