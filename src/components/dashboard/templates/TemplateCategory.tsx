import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

interface TemplateCategoryProps {
  category: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const TemplateCategory = ({
  category,
  selectedCategory,
  setSelectedCategory,
}: TemplateCategoryProps) => {
  const { theme } = useTheme();

  return (
    <motion.button
      key={category}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setSelectedCategory(category)}
      className={clsx(
        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
        selectedCategory === category
          ? 'bg-blue-600 text-white'
          : theme === 'dark'
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      )}
    >
      {category}
    </motion.button>
  );
};

export default TemplateCategory;
