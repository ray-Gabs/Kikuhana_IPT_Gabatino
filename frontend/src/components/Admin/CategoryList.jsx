import CategoryCard from "./CategoryCard";

const CategoryList = ({ menu, onReload }) => {
  if (!Array.isArray(menu)) return <div>No categories available.</div>;

  return menu.map((cat) => (
    <CategoryCard key={cat._id} category={cat} onReload={onReload} />
  ));
};

export default CategoryList;
