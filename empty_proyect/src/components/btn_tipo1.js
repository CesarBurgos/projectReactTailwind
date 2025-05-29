import React from 'react';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const ButtonTipo1 = ({ text, url }) => {
  return (
    <Link 
      to={url}
      className="group relative inline-flex items-center justify-center px-6 py-3 
                 bg-[#2C9B8B1A] rounded-[35px] 
                 transition-all duration-300 hover:bg-[#2C9B8B33]"
    >
      <span className="text-[#2C9B8B] text-[14px] font-medium">
        {text}
      </span>
      
      <div className="ml-2 flex items-center justify-center w-8 h-8 
                    rounded-full bg-[#2C9B8B26]">
        <IconArrowNarrowRight 
          size={20} 
          className="text-[#2C9B8B] transition-transform 
                     group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
};

export default ButtonTipo1;