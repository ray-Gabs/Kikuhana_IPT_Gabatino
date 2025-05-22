const SocialMedia = () => {
  return (
    <section className="flex justify-between items-center px-10 py-20 bg-[#e2222f] text-white">
      <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
      <ul className="flex space-x-8 items-center text-sm font-semibold">
        <li><a href="https://www.facebook.com/kikuhana.nv" className="underline">Facebook</a></li>
        <li><a href="https://www.instagram.com/kikuhana.nv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="underline">Instagram</a></li>
      </ul>
    </section>
  );
};

export default SocialMedia;
