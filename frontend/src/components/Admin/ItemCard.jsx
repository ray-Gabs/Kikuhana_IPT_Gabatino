import React, { useState } from "react";

const ItemCard = ({ item, categoryId, onReload }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: item.name,
    price: item.price || "",
    description: item.description || "",
    variants: item.variants || [],
    images: item.images || [],
  });

  const [newImages, setNewImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveExistingImage = (index) => {
    setEditData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...editData.variants];
    updated[index][field] = value;
    setEditData({ ...editData, variants: updated });
  };

  const addVariant = () => {
    setEditData((prev) => ({
      ...prev,
      variants: [...prev.variants, { type: "", price: "" }],
    }));
  };

  const removeVariant = (index) => {
    setEditData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = async () => {
    let body;
    let headers = {};

    if (newImages.length > 0) {
      body = new FormData();
      body.append("name", editData.name);
      body.append("price", editData.price);
      body.append("description", editData.description);
      body.append("variants", JSON.stringify(editData.variants));
      editData.images.forEach((img) => body.append("existingImages", img));
      newImages.forEach((img) => body.append("images", img));
    } else {
      body = JSON.stringify({
        name: editData.name,
        price: editData.price,
        description: editData.description,
        variants: editData.variants,
        images: editData.images,
      });
      headers["Content-Type"] = "application/json";
    }

    await fetch(`${API_BASE}/Menu/${categoryId}/item/${item._id}`, {
      method: "PUT",
      headers,
      body,
    });

    setEditMode(false);
    setNewImages([]);
    setPreviewUrls([]);
    onReload();
  };

  return (
    <div className="mt-2 ml-4 border p-3 rounded bg-gray-50">
      {editMode ? (
        <>
          <input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="border p-1 mb-1 w-full"
            placeholder="Item Name"
          />
          <input
            value={editData.price}
            type="number"
            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
            className="border p-1 mb-1 w-full"
            placeholder="Price"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="border p-1 mb-2 w-full"
            placeholder="Description"
          />

          {/* VARIANTS */}
          <div className="mb-2">
            <p className="font-semibold mb-1">Variants</p>
            {editData.variants.map((variant, i) => (
              <div key={i} className="flex gap-2 mb-1">
                <input
                  value={variant.type}
                  onChange={(e) => handleVariantChange(i, "type", e.target.value)}
                  placeholder="Type"
                  className="border p-1 w-1/2"
                />
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                  placeholder="Price"
                  className="border p-1 w-1/2"
                />
                <button
                  onClick={() => removeVariant(i)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <button onClick={addVariant} className="text-blue-600 text-sm">+ Add Variant</button>
          </div>

          {/* EXISTING IMAGES */}
          <div className="flex flex-wrap gap-2 mb-2">
            {editData.images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={`${API_BASE}${img}`}
                  alt="existing"
                  className="w-16 h-16 object-cover border"
                />
                <button
                  onClick={() => handleRemoveExistingImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* NEW IMAGES */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border p-1 mb-1"
          />
          <div className="flex gap-2 mt-2">
            {previewUrls.map((url, idx) => (
              <img key={idx} src={url} alt="preview" className="w-16 h-16 object-cover border" />
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 mt-2">
            <button onClick={handleEdit} className="bg-green-600 text-white px-3 py-1 rounded">
              Save
            </button>
            <button onClick={() => setEditMode(false)} className="text-gray-500">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.name}</p>
              {item.price !== undefined && item.price !== "" && (
                <p className="text-sm">₱{item.price}</p>
              )}
              {item.description && (
                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              )}
              {item.variants?.length > 0 && (
                <ul className="mt-2 text-sm text-gray-700">
                  {item.variants.map((v, idx) => (
                    <li key={idx}>• {v.type} - ₱{v.price}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditMode(true)} className="text-blue-600 text-sm underline">
                Edit
              </button>
              <button
                onClick={async () => {
                  const res = await fetch(`${API_BASE}/Menu/${categoryId}`);
                  const category = await res.json();
                  const updatedItems = category.items.filter((i) => i._id !== item._id);
                  await fetch(`${API_BASE}/Menu/${categoryId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...category, items: updatedItems }),
                  });
                  onReload();
                }}
                className="text-red-600 text-sm underline"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {item.images?.map((img, i) => (
              <img
                key={i}
                src={`${API_BASE}${img}`}
                alt="item"
                className="w-16 h-16 object-cover border"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
