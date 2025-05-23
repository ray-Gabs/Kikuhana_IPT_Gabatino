import React, { useState } from "react";
import ItemForm from "./ItemForm";
import ItemCard from "./ItemCard";

const CategoryCard = ({ category, onReload }) => {
  const [editMode, setEditMode] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [editData, setEditData] = useState({
    category: category.category,
    description: category.description,
  });

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/Menu/${category._id}`, { method: "DELETE" });
    onReload();
  };

  const handleEdit = async () => {
    await fetch(`http://localhost:5000/Menu/${category._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditMode(false);
    onReload();
  };

  return (
    <div className="border p-4 rounded mb-6 shadow">
      <div className="flex justify-between items-start">
        <div>
          {editMode ? (
            <>
              <input
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="border p-2 mb-2"
              />
              <input
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="border p-2"
              />
              <div className="flex gap-2 mt-2">
                <button onClick={handleEdit} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                <button onClick={() => setEditMode(false)} className="text-gray-600">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold">{category.category}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-1 items-end">
          <button
            onClick={() => setMinimized(!minimized)}
            className="text-sm text-gray-600 underline"
          >
            {minimized ? "Expand" : "Minimize"}
          </button>
          <button
            onClick={() => setEditMode(true)}
            className="text-blue-600 text-sm underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 text-sm underline"
          >
            Delete
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          <ItemForm category={category} onReload={onReload} />
          {category.items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              categoryId={category._id}
              onReload={onReload}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryCard;
