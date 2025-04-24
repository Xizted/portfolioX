'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Star } from 'lucide-react';
import Image from 'next/image';
import { Template } from '@/interfaces/Template';
import clsx from 'clsx';

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

export default function Dashboard() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFocused, setSearchFocused] = useState(false);
  const categories = ['All', 'Minimal', 'Modern', 'Creative'];

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
          <Search
            size={18}
            className={clsx(
              'absolute left-3 top-1/2 -translate-y-1/2 transition-colors',
              searchFocused
                ? theme === 'dark'
                  ? 'text-blue-400'
                  : 'text-blue-600'
                : theme === 'dark'
                ? 'text-gray-400'
                : 'text-gray-500'
            )}
          />
          <input
            type='text'
            placeholder='Search templates...'
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={clsx(
              'w-full md:w-64 pl-10 pr-4 py-2 rounded-full border transition-all',
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            )}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='flex flex-wrap gap-2 mb-6 md:mb-8'
      >
        {categories.map((category) => (
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
        ))}
      </motion.div>

      <motion.div
        layout
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'
      >
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className={clsx(
              'rounded-xl overflow-hidden',
              theme === 'dark' ? 'bg-gray-800' : 'bg-white',
              'shadow-lg'
            )}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='relative aspect-video'
            >
              <Image
                src={template.image}
                alt={template.name}
                className='w-full h-full object-cover'
                width={500}
                height={300}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className='absolute inset-0 bg-black/50 flex items-center justify-center'
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-6 py-2 bg-white text-gray-900 rounded-full font-medium flex items-center'
                >
                  Preview <ExternalLink className='ml-2 h-4 w-4' />
                </motion.button>
              </motion.div>
            </motion.div>
            <div className='p-4'>
              <div className='flex justify-between items-start'>
                <h3 className='font-medium text-lg'>{template.name}</h3>
                <div className='flex items-center'>
                  <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                  <span className='ml-1 text-sm'>{template.rating}</span>
                </div>
              </div>
              <p
                className={clsx(
                  'text-sm mt-1',
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                )}
              >
                {template.category}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
