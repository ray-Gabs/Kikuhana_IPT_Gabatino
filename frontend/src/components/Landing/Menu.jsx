import React, { useEffect, useState } from "react";
import logo from "../../assets/Transparrent_Logo_Kikuhana.png";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // { item, variant }

  useEffect(() => {
    fetch("http://localhost:5000/Menu") // or just "/Menu" if same domain
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen px-6 py-10 bg-white flex flex-col md:flex-row gap-6">
      {/* LEFT: Menu List */}
      <div className="md:w-1/2 w-full overflow-y-auto max-h-[90vh] pr-4">
        <h2 className="text-4xl font-black text-[#b90005] mb-6">Our Menu</h2>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <img src={logo} alt="Loading..." className="animate-spin w-20 h-20 opacity-30" />
          </div>
        ) : menuData.length === 0 ? (
          <p className="text-center text-gray-400">No menu available at the moment.</p>
        ) : (
          <div className="space-y-6">
            {menuData.map((category) => (
              <div key={category._id}>
                <h3 className="text-2xl font-semibold mb-1">{category.category}</h3>
                {category.description && (
                  <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                )}
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item._id}>
                      <div className="font-semibold">{item.name}</div>
                      {item.variants?.map((variant, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelected({ item, variant })}
                          className="ml-4 text-sm flex justify-between cursor-pointer hover:bg-[#fff0f0] px-3 py-1 rounded transition"
                        >
                          <span>• {variant.type}</span>
                          <span>₱{variant.price}</span>
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Variant Card */}
      <div className="md:w-1/2 w-full bg-[#fff0f0] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[300px] text-center">
        {selected ? (
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-bold text-[#b90005] mb-2">{selected.item.name}</h3>
            <p className="text-gray-700 font-medium mb-1">{selected.variant.type}</p>
            <p className="text-gray-600 mb-4">₱{selected.variant.price}</p>

            {selected.variant.images && selected.variant.images.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto">
                {selected.variant.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`variant-${idx}`}
                    className="w-40 h-40 object-cover rounded-md border"
                  />
                ))}
              </div>
            ) : (
              <img
                src={logo}
                alt="Fallback Logo"
                className="w-32 h-32 object-contain mx-auto"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500">Click a variant to see details</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
