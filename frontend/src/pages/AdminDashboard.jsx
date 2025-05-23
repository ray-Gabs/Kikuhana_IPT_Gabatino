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
      .catch(console.error);

  const handleCreateCategory = async () => {
    await fetch("http://localhost:5000/Menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newCategory, items: [] }),
    });
    setNewCategory({ category: "", description: "" });
    fetchMenu();
  };

  const handleDeleteCategory = async (id) => {
    await fetch(`http://localhost:5000/Menu/${id}`, { method: "DELETE" });
    fetchMenu();
  };

  return (
    <section className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#b90005]">Admin Dashboard</h1>
      <CategoryForm
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        onCreate={handleCreateCategory}
      />
      <CategoryList menu={menu} onReload={fetchMenu} onDelete={handleDeleteCategory} />
    </section>
  );
};

export default AdminDashboard;
