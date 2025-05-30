import React, { useState } from "react";

const ItemForm = ({ category, onReload }) => {
  const [newItem, setNewItem] = useState({ name: "", price: "", description: "" });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [variants, setVariants] = useState([{ type: "", price: "" }]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => setVariants([...variants, { type: "", price: "" }]);

  const handleAddItem = async () => {
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    formData.append("description", newItem.description);
    formData.append("variants", JSON.stringify(variants.filter(v => v.type && v.price)));

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await fetch(`http://localhost:5000/Menu/${category._id}/items`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + (err.error || "Failed to add item"));
        return;
      }

      setNewItem({ name: "", price: "", description: "" });
      setImages([]);
      setPreviewUrls([]);
      setVariants([{ type: "", price: "" }]);
      onReload();
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        className="border p-2"
      />
      <textarea
        placeholder="Description (optional)"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        className="border p-2"
      />

      <div className="border p-2">
        <p className="font-bold mb-1">Variants (optional)</p>
        {variants.map((v, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="Type"
              value={v.type}
              onChange={(e) => handleVariantChange(i, "type", e.target.value)}
              className="border p-1"
            />
            <input
              type="number"
              placeholder="Price"
              value={v.price}
              onChange={(e) => handleVariantChange(i, "price", e.target.value)}
              className="border p-1"
            />
          </div>
        ))}
        <button onClick={addVariant} className="text-blue-600 text-sm">+ Add Variant</button>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2"
      />
      <div className="flex gap-2 mt-2">
        {previewUrls.map((url, index) => (
          <img key={index} src={url} alt="preview" className="w-16 h-16 object-cover border" />
        ))}
      </div>
      <button
        onClick={handleAddItem}
        className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
      >
        Add Item
      </button>
    </div>
  );
};

export default ItemForm;
