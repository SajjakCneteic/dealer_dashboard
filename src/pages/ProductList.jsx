import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const ProductList = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: true });
  const dropdownRef = useRef(null);

  const handleDropdownToggle = (index, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    const dropdownHeight = 120; // Approximate height of the dropdown
    const isTooCloseToBottom = buttonRect.bottom + dropdownHeight > window.innerHeight;
    setDropdownIndex(dropdownIndex === index ? null : index);
    setDropdownPosition({ top: !isTooCloseToBottom });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const products = [
    {
      name: 'Apple Watch Series 7',
      category: 'Electronics',
      price: '$269',
      sold: 22,
      profit: '$45',
      img: 'https://placehold.co/50',
    },
    {
      name: 'Macbook Pro M1',
      category: 'Electronics',
      price: '$546',
      sold: 34,
      profit: '$125',
      img: 'https://placehold.co/50',
    },
    {
      name: 'Dell Inspiron 15',
      category: 'Electronics',
      price: '$444',
      sold: 64,
      profit: '$247',
      img: 'https://placehold.co/50',
    },
  ];

  return (
    <div className="overflow-x-auto h-screen bg-white dark:bg-customBlue p-6 rounded-lg shadow-lg">
      <table className="min-w-full bg-white dark:bg-customBlue rounded-lg overflow-hidden">
        <thead className='border-b '>
          <tr className="bg-zinc-100 dark:bg-customBlue">
            <th className="py-4 px-6 text-left text-l font-medium text-zinc-700 dark:text-zinc-300">Product Name</th>
            <th className="py-4 px-6 text-left text-l font-medium text-zinc-700 dark:text-zinc-300">Category</th>
            <th className="py-4 px-6 text-left text-l font-medium text-zinc-700 dark:text-zinc-300">Price</th>
            <th className="py-4 px-6 text-left text-l font-medium text-zinc-700 dark:text-zinc-300"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-slate-800 transition duration-300">
              <td className="py-4 px-6 flex items-center">
                <img src={product.img} alt={product.name} className="w-20 h-20 object-cover mr-4 rounded-sm shadow-md" />
                <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
              </td>
              <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{product.category}</td>
              <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{product.price}</td>
              <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300 relative">
                <button
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none"
                  onClick={(event) => handleDropdownToggle(index, event)}
                >
                  ...
                </button>
                {dropdownIndex === index && (
                  <div
                    ref={dropdownRef}
                    className={`absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-10 transition-all duration-300 ${dropdownPosition.top ? 'top-full' : 'bottom-full mt-0'}`}
                  >
                    <a href="#" className="block px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition duration-300">Edit</a>
                    <a href="#" className="block px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition duration-300">Delete</a>
                    <a href="#" className="block px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition duration-300">View</a>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
