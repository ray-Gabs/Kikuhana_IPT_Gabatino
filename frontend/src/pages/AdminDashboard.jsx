import React, { useEffect, useState } from "react";
import CategoryForm from "../components/Admin/CategoryForm";
import CategoryList from "../components/Admin/CategoryList";

const AdminDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [newCategory, setNewCategory] = useState({ category: "", description: "" });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () =>
    fetch("http://localhost:5000/Menu")
      .then((res) => res.json())
      .then(setMenu)
      .catch((err) => {
        console.error("Failed to load menu:", err);
        alert("Failed to load menu.");
      });

  const handleCreateCategory = async () => {
  console.log("🧪 Submitting category:", newCategory);

  if (!newCategory.category.trim()) {
    alert("⚠️ Category name is required.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/Menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newCategory, items: [] }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create category.");

    setNewCategory({ category: "", description: "" });
    fetchMenu();
  } catch (err) {
    console.error("Error creating category:", err.message);
    alert("Error: " + err.message);
  }
};

  const handleDeleteCategory = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/Menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category.");
      fetchMenu();
    } catch (err) {
      console.error("Error deleting category:", err.message);
      alert("Failed to delete category.");
    }
  };

  return (
    <section className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-[#b90005]">Admin Dashboard</h1>
      <a
        href="/"
        className="bg-gray-200 text-sm text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        ⬅ Back to Home
      </a>
    </div>
      <CategoryForm
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        onCreate={handleCreateCategory}
      />
      <CategoryList
        menu={menu}
        onReload={fetchMenu}
        onDelete={handleDeleteCategory}
      />
    </section>
  );
};

export default AdminDashboard;
