const Location = () => {
  return (
    <section className="h-screen px-6 py-10 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-300 h-64 flex items-center justify-center rounded-md">
          {/* Replace with image tag later */}
          <span className="text-gray-600">Map Placeholder</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">Our Location</h2>
          <p>W. Ongtao Bldg. III, National Highway, Barangay Roxas, Solano, Philippines</p>
        </div>
      </div>
    </section>
  );
};

export default Location;
