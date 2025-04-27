import TemplateCategory from './TemplateCategory';

interface TemplateCategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = ['All', 'Minimal', 'Modern', 'Creative'];

const TemplateCategories = ({
  selectedCategory,
  setSelectedCategory,
}: TemplateCategoriesProps) => {
  return (
    <>
      {categories.map((category) => (
        <TemplateCategory
          key={category}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </>
  );
};

export default TemplateCategories;
