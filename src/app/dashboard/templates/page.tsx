'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Template } from '@/interfaces/Template';
import TemplatesCard from '@/components/dashboard/templates/TemplateCard';
import InputSearch from '@/components/dashboard/templates/InputSearch';
import TemplateCategories from '@/components/dashboard/templates/TemplateCategories';

const templates: Template[] = [
  {
    id: 'minimal-dev',
    name: 'Minimal Developer',
    image:
      'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Minimal',
    rating: 4.8,
  },
  {
    id: 'dark-tech',
    name: 'Dark Tech',
    image:
      'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Modern',
    rating: 4.5,
  },
  {
    id: 'code-creative',
    name: 'Code Creative',
    image:
      'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Creative',
    rating: 4.7,
  },
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTemplates =
    selectedCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='p-8 md:p-8'
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8'
      >
        <h1 className='text-2xl font-light'>Templates</h1>
        <motion.div whileHover={{ scale: 1.02 }} className='relative'>
          <InputSearch />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='flex flex-wrap gap-2 mb-6 md:mb-8'
      >
        <TemplateCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </motion.div>
      <motion.div
        layout
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'
      >
        {filteredTemplates.map((template, index) => (
          <TemplatesCard key={template.id} index={index} {...template} />
        ))}
      </motion.div>
    </motion.div>
  );
}
