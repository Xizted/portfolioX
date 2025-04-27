import Input from '@/components/common/Input';
import { Search } from 'lucide-react';

const InputSearch = () => {
  return (
    <Input
      type='text'
      Icon={Search}
      placeholder='Search templates...'
      iconSize={18}
      className='md:w-64 rounded-full'
    />
  );
};

export default InputSearch;
