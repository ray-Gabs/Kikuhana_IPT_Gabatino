const Menu = () => {
  return (
    <section className="h-screen px-6 py-10 bg-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Menu</h2>
        {/* TODO: List of menu items fetched from database */}
        <div className="bg-gray-100 p-4 rounded-md text-gray-500 text-sm">Menu list goes here</div>
      </div>
      <div>
        {/* TODO: Show selected menu details */}
        <div className="bg-gray-200 p-4 rounded-md text-gray-600 text-sm">Menu item details here</div>
      </div>
    </section>
  );
};

export default Menu;
