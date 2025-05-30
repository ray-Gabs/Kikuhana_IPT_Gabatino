import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use `useNavigate` for navigation
import CategoryForm from "../components/Admin/CategoryForm";
import CategoryList from "../components/Admin/CategoryList";
import { Button } from "@mui/material"; // Import Button for the Back to Home button

const AdminDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [newCategory, setNewCategory] = useState({ category: "", description: "" });
  const navigate = useNavigate(); // useNavigate hook for navigation

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

  // Handle the "Back to Home" button click
  const handleBackToHome = () => {
    navigate("/");  // Navigate directly to the home page
  };

  return (
    <section className="min-h-screen p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#b90005]">Admin Dashboard</h1>

        {/* Back to Home Button */}
        <div className="flex space-x-4">
          <Link
            to="/admin-manageUser"
            className="px-4 py-2 text-sm text-gray-800 transition bg-gray-200 rounded hover:bg-gray-300"
          >
            Manage Users
          </Link>

          <Button
            variant="outlined"
            onClick={handleBackToHome}
            className="px-4 py-2 text-sm text-gray-800 transition bg-gray-200 rounded hover:bg-gray-300"
          >
            ⬅ Back to Home
          </Button>
        </div>
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
