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
    <section className="min-h-screen px-6 py-10 bg-white flex flex-col md:flex-row gap-6">

      <div className="md:w-1/2 w-full overflow-y-auto max-h-[calc(100vh-5rem)] pr-4 space-y-6 border-r border-gray-200">
        <h2 className="text-5xl font-black tracking-wide mb-8 text-black">
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
                  <p className="text-2xl text-black agrandir-font mb-4">
                    {category.description}
                  </p>
                )}
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item._id} className="px-2 py-1 rounded">
                      <div className="flex justify-between">
                        <span className="font-semibold akziden-font text-xl">
                          {item.name}
                        </span>
                        {item.price && (
                          <span className="font-semibold akziden-font text-xl">
                            ₱{item.price}
                          </span>
                        )}
                      </div>

    
                      {item.variants?.length > 0 ? (
                        <ul className="ml-4 text-gray-700 mt-1">
                          {item.variants.map((v, idx) => (
                            <li
                              key={idx}
                              className="flex justify-between text-xl cursor-pointer hover:bg-gray-100 px-2 py-1 transition rounded agrandir-font"
                              onClick={() =>
                                setSelected({ ...item, selectedVariant: v })
                              }
                            >
                              <span>{v.type}</span>
                              <span>₱{v.price}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <li
                          className="cursor-pointer hover:bg-gray-100 px-2 py-1 mt-1 rounded transition"
                          onClick={() => setSelected(item)}
                        >
                          <div className="flex flex-col">
                            {item.description && (
                              <p className="text-gray-600 text-sm">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </li>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>


      <div className="md:w-1/2 w-full bg-[#fff0f0] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px] text-center overflow-auto">
        {selected ? (
          <div className="w-full max-w-2xl text-center">
            <h3 className="text-4xl font-bold text-[#b90005] agrandir-font mb-3">
              {selected.name}
            </h3>

            {selected.description && (
              <p className="text-lg text-gray-700 mb-3 agrandir-font">
                {selected.description}
              </p>
            )}


            {selected.selectedVariant ? (
              <p className="text-gray-800 mb-2 text-2xl agrandir-font font-bold">
                {selected.selectedVariant.type} - ₱{selected.selectedVariant.price}
              </p>
            ) : selected.price ? (
              <p className="text-gray-800 mb-2 text-xl font-semibold agrandir-font">
                ₱{selected.price}
              </p>
            ) : null}


            {(selected.selectedVariant?.images?.length > 0 ||
              selected.images?.length > 0) ? (
              <div className="flex gap-4 overflow-x-auto max-w-full pb-2 justify-center">
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
                className="w-40 h-40 object-contain mx-auto"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            Click a dish or variant to see more details
          </p>
        )}
      </div>
    </section>
  );
};

export default Menu;
