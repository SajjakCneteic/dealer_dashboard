import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { LuView } from "react-icons/lu";
import { Link } from 'react-router-dom';


const ProductList = () => {


  const products = [
    {
      name: 'Apple Watch Series 7',
      category: 'Electronics',
      price: '$269',
      img: 'https://placehold.co/50',
    },
    {
      name: 'Macbook Pro M1',
      category: 'Electronics',
      price: '$546',
      img: 'https://placehold.co/50',
    },
    {
      name: 'Dell Inspiron 15',
      category: 'Electronics',
      price: '$444',
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
                <img src={'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt={product.name} className="w-20 h-20 object-cover mr-4 rounded-sm shadow-md" />
                <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
              </td>
              <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{product.category}</td>
              <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{product.price}</td>

              <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300 relative">
                <div className="flex space-x-4">
                  <button
                    className="flex items-center text-blue-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
                    title="Edit"
                    about='Edit'
                  >
                   <FaRegEdit/>
                  </button>
                  <button
                    className="flex items-center text-red-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
                    title="Delete"
                    about='Delete'
                  >
                    <AiOutlineDelete/>
                  </button>
                  <Link
                    className="flex items-center text-teal-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
                    title="View"
                    to='/product/1'
                    about='View'
                  >
                    <LuView/>
                  </Link>
                </div>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
