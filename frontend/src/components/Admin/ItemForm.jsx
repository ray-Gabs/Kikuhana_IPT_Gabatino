import React, { useState } from "react";

const ItemForm = ({ category, onReload }) => {
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Generate preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleAddItem = async () => {
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    images.forEach((image) => {
      formData.append("images", image);
    });

    await fetch(`http://localhost:5000/Menu/${category._id}/items`, {
        method: "POST",
        body: formData
        });
    setNewItem({ name: "", price: "" });
    setImages([]);
    setPreviewUrls([]);
    onReload();
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
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2"
      />
      <div className="flex gap-2 mt-2">
        {previewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Preview ${index}`}
            className="w-16 h-16 object-cover border"
          />
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
