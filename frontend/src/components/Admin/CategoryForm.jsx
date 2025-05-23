const CategoryForm = ({ newCategory, setNewCategory, onCreate }) => (
  <div className="mb-6 flex gap-2">
    <input
      type="text"
      placeholder="Category"
      className="border p-2"
      value={newCategory.category}
      onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
    />
    <input
      type="text"
      placeholder="Description"
      className="border p-2"
      value={newCategory.description}
      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
    />
    <button
      onClick={onCreate}
      className="bg-[#e2222f] text-white px-4 py-2 rounded"
    >
      Add Category
    </button>
  </div>
);

export default CategoryForm;
