import React, { useEffect, useState } from "react";
import logo from "../../assets/Transparrent_Logo_Kikuhana.png";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    fetch(`${API_BASE}/Menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        const defaults = {};
        data.forEach((cat) => {
          defaults[cat._id] = false;
        });
        setExpandedCategories(defaults);
      })
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="flex flex-col min-h-screen gap-6 px-6 py-10 bg-white md:flex-row">

      <div className="md:w-1/2 w-full overflow-y-auto max-h-[calc(100vh-5rem)] pr-4 space-y-6 border-r border-gray-200">
        <h2 className="mb-8 text-5xl font-black tracking-wide text-black">
          Our Menu
        </h2>

        {menuData.map((category) => (
          <div key={category._id}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleCategory(category._id)}
            >
              <h3 className="text-5xl font-bold tracking-wide text-[#b90005] agrandir-font uppercase">
                {category.category}
              </h3>
              <span className="text-[#b90005] text-3xl font-bold">
                {expandedCategories[category._id] ? "v" : ">"}
              </span>
            </div>

            {expandedCategories[category._id] && (
              <>
                {category.description && (
                  <p className="mb-4 text-2xl text-black agrandir-font">
                    {category.description}
                  </p>
                )}
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item._id} className="px-2 py-1 rounded">
                      <div className="flex justify-between">
                        {/* Make the item name clickable */}
                        <span
                          className="text-xl font-semibold cursor-pointer akziden-font"
                          onClick={() => setSelected(item)} // Make the item clickable even if no variants
                        >
                          {item.name}
                        </span>
                        {item.price && (
                          <span className="text-xl font-semibold akziden-font">
                            ₱{item.price}
                          </span>
                        )}
                      </div>

                      {/* Handle variants if present */}
                      {item.variants?.length > 0 ? (
                        <ul className="mt-1 ml-4 text-gray-700">
                          {item.variants.map((v, idx) => (
                            <li
                              key={idx}
                              className="flex justify-between px-2 py-1 text-xl transition rounded cursor-pointer hover:bg-gray-100 agrandir-font"
                              onClick={() =>
                                setSelected({ ...item, selectedVariant: v })
                              }
                            >
                              <span>{v.type}</span>
                              <span>₱{v.price}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Right side panel displaying selected item details */}
      <div className="md:w-1/2 w-full bg-[#fff0f0] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px] text-center overflow-auto">
        {selected ? (
          <div className="w-full max-w-2xl text-center">
            <h3 className="text-4xl font-bold text-[#b90005] agrandir-font mb-3">
              {selected.name}
            </h3>

            {selected.description && (
              <p className="mb-3 text-lg text-gray-700 agrandir-font">
                {selected.description}
              </p>
            )}

            {selected.selectedVariant ? (
              <p className="mb-2 text-2xl font-bold text-gray-800 agrandir-font">
                {selected.selectedVariant.type} - ₱{selected.selectedVariant.price}
              </p>
            ) : selected.price ? (
              <p className="mb-2 text-xl font-semibold text-gray-800 agrandir-font">
                ₱{selected.price}
              </p>
            ) : null}

            {(selected.selectedVariant?.images?.length > 0 ||
              selected.images?.length > 0) ? (
              <div className="flex justify-center max-w-full gap-4 pb-2 overflow-x-auto">
                {(selected.selectedVariant?.images || selected.images).map((img, i) => (
                  <img
                    key={i}
                    src={`${API_BASE}${img}`}
                    alt={`item-${i}`}
                    className="w-[500px] h-[500px] object-cover rounded-md border"
                  />
                ))}
              </div>
            ) : (
              <img
                src={logo}
                alt="Fallback Logo"
                className="object-contain w-40 h-40 mx-auto"
              />
            )}
          </div>
        ) : (
          <p className="text-lg text-gray-500">
            Click a dish or variant to see more details
          </p>
        )}
      </div>
    </section>
  );
};

export default Menu;
