import React, { useState } from "react";

const ItemCard = ({ item, categoryId, onReload }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: item.name,
    price: item.price,
  });
  const [newImages, setNewImages] = useState([]); // file input
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const handleEdit = async () => {
    let body;
    let headers = {};

    if (newImages.length > 0) {
      body = new FormData();
      body.append("name", editData.name);
      body.append("price", editData.price);
      newImages.forEach(img => body.append("images", img));
    } else {
      body = JSON.stringify({
        name: editData.name,
        price: editData.price,
        images: item.images // keep existing images
      });
      headers["Content-Type"] = "application/json";
    }

    await fetch(`http://localhost:5000/Menu/${categoryId}/item/${item._id}`, {
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
            className="border p-1 mb-1"
          />
          <input
            value={editData.price}
            type="number"
            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
            className="border p-1 mb-1"
          />
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
          <div className="flex gap-2 mt-2">
            <button onClick={handleEdit} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
            <button onClick={() => setEditMode(false)} className="text-gray-500">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm">₱{item.price}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditMode(true)} className="text-blue-600 text-sm underline">Edit</button>
              <button onClick={async () => {
                const res = await fetch(`http://localhost:5000/Menu/${categoryId}`);
                const category = await res.json();
                const updatedItems = category.items.filter(i => i._id !== item._id);
                await fetch(`http://localhost:5000/Menu/${categoryId}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...category, items: updatedItems }),
                });
                onReload();
              }} className="text-red-600 text-sm underline">Delete</button>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {item.images?.map((img, i) => (
              <img key={i} src={img} alt="item" className="w-16 h-16 object-cover border" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
