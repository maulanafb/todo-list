// TodoCard component
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import trash from '@/public/trash.png';

type TodoType = {
  id: number;
  title: string;
  status: boolean;
  onToggleStatus: (id: number) => void;
  onDelete: () => void;
};

const TodoCard = ({ id, title, status, onToggleStatus, onDelete }: TodoType) => {
  const handleToggleStatus = () => {
    onToggleStatus(id);
  };

  return (
    <div className='flex flex-row items-center p-4 bg-[#333333] rounded-[8px] mt-3 w-full justify-between'>
      <div className='flex'>
        <button
          onClick={handleToggleStatus}
          className={`w-6 h-6 rounded-full border-2 border-[#4EA8DE] ${status ? 'bg-green-500' : ''} duration-300`}
        >
          {status && <FontAwesomeIcon icon={faCheck} className='text-white' />}
        </button>
        <div className={`text-white ml-4 text-center ${status ? 'line-through' : ''} duration-300`}>
          {title}
        </div>
      </div>
      <button onClick={onDelete}>
        <Image src={trash} alt='trash' width={20} height={14} className='hover:w-[24px] duration-300 ml-[18px]' />
      </button>
    </div>
  );
};

export default TodoCard;
