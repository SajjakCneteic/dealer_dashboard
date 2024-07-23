import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from "react-icons/md";
const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log({ productName, description, price, category, stock, images });
  };

  return (
    <>
    <div className='mb-6 '>
      <span  className='text-l inline-flex items-center dark:bg-customBlue bg-white p-2 pl-5 pr-5 rounded-full shadow-md '>
       <Link to='/dashboard' className='items-center inline-flex hover:text-btnBlue transition duration-200'>Dashboard<MdArrowForwardIos className='ml-2 mr-2' /></Link>  
       <Link to='/products' className='items-center inline-flex hover:text-btnBlue transition duration-200'> Products<MdArrowForwardIos className='ml-2 mr-2' /></Link>  
       <Link className='items-center pointer-events-none inline-flex hover:text-btnBlue transition duration-200'> New Product</Link>  
      </span>
    </div>
    <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-customBlue dark:text-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>Create New Product</h2>
      <form onSubmit={handleSubmit} className='dark:text-black'>
        <div className='mb-4 '>
          <label className='block text-gray-700 dark:text-white font-bold mb-2' htmlFor='productName'>Product Name</label>
          <input
            id='productName'
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label className='block dark:text-white text-gray-700 font-bold mb-2' htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label className='block dark:text-white text-gray-700 font-bold mb-2' htmlFor='price'>Price</label>
          <input
            id='price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label className='block dark:text-white text-gray-700 font-bold mb-2' htmlFor='category'>Category</label>
          <input
            id='category'
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label className='block dark:text-white text-gray-700 font-bold mb-2' htmlFor='stock'>Stock Quantity</label>
          <input
            id='stock'
            type='number'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label className='block dark:text-white text-gray-700 font-bold mb-2' htmlFor='images'>Product Images</label>
          <input
            id='images'
            type='file'
            multiple
            onChange={handleImageUpload}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='bg-btnBlue flex items-center hover:bg-blue-700 hover:scale-105 transition-transform duration-200 rounded-lg text-white pl-3 pr-3 pt-2 pb-2'>
            <FaPlus className='mr-2' /> Create Product
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateProduct;
