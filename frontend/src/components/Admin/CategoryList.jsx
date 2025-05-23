import CategoryCard from "./CategoryCard";

const CategoryList = ({ menu, onReload }) => {
  return menu.map((cat) => (
    <CategoryCard key={cat._id} category={cat} onReload={onReload} />
  ));
};

export default CategoryList;
