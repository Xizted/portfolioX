import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface TemplateCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  index: number;
}

const TemplatesCard = ({
  category,
  id,
  image,
  index,
  name,
  rating,
}: TemplateCardProps) => {
  const { theme } = useTheme();
  return (
    <motion.div
      key={id}
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
          src={image}
          alt={name}
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
          <h3 className='font-medium text-lg'>{name}</h3>
          <div className='flex items-center'>
            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
            <span className='ml-1 text-sm'>{rating}</span>
          </div>
        </div>
        <p
          className={clsx(
            'text-sm mt-1',
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          )}
        >
          {category}
        </p>
      </div>
    </motion.div>
  );
};

export default TemplatesCard;
