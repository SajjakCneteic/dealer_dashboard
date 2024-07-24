import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';

const Breadcrumb = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <span className='text-l inline-flex items-center dark:bg-customBlue bg-white p-2 pl-5 pr-5 rounded shadow-md'>
      <Link to='#' onClick={handleGoBack} className='items-center inline-flex hover:text-btnBlue transition duration-200'>
         OrdersList<MdArrowForwardIos className='ml-2 mr-2' />
      </Link>
      <Link className='items-center pointer-events-none inline-flex hover:text-btnBlue transition duration-200'>
        Order Details
      </Link>
    </span>
  );
};

export default Breadcrumb;
