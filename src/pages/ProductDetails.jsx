import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigation, useParams } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { GrImage } from 'react-icons/gr';
import Modal from '../components/Modal';
import { useDispatch } from 'react-redux';
import { fetchSingleProduct } from '../slices/productSlice';



const ProductDetails = () => {
  const [originalProduct, setOriginalProduct] = useState({})
  const dispatch = useDispatch()
  const [product, setProduct] = useState(originalProduct);
  const [isDisabled, setIsDisabled] = useState(false);
  const { id } = useParams()
  console.log(product)

  const handleInputChange = (field, value) => {
    const updatedProduct = { ...product, [field]: value };
    setProduct(updatedProduct);
    const isModified = product.name !== originalProduct.name ||
      product.slug !== originalProduct.slug ||
      product.description !== originalProduct.description;

    setIsDisabled(isModified)
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchSingleProduct(id));
      setOriginalProduct(data.payload.data.product)
      setProduct(data.payload.data.product)
    };

    fetchData();

  }, []);

  // date correction in good formate
  function formatDate(dateString) {
    const dateObj = new Date(dateString);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
  }


  return (
    <>
      <Modal isDisabled={isDisabled} />
      <div className="mb-6">
        <span className="text-l inline-flex items-center dark:bg-customBlue bg-white p-2 pl-5 pr-5 rounded-full shadow-md">
          <Link to="/dashboard" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Dashboard<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link to="/products" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Products<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link className="items-center pointer-events-none inline-flex hover:text-btnBlue transition duration-200">
            Product Details
          </Link>
        </span>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-customBlue p-6 rounded-lg shadow-lg">
        <div className="flex justify-end mb-3">
          <button className="bg-red-500 flex items-center hover:bg-red-700 rounded-lg text-white pl-3 pr-3 pt-2 pb-2 mr-5">
            Delete
          </button>
          <button

            onClick={() => console.log("hello world")}
            disabled={isDisabled}
            className={` flex items-center ${isDisabled ? 'bg-btnBlue' : 'bg-blue-300'} 
         ${isDisabled ? 'hover:bg-blue-700 ' : ''} 
            rounded-lg text-white pl-3 pr-3 pt-2 pb-2`}
          >
            Update
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-100 gap-5">
          <div className="col-span-70">
            <div className="rounded-lg border p-5 dark:bg-slate-700">
              <div className="flex justify-between gap-5">
                <div className="w-full mb-5">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    Product name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={product?.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full text-slate-900 text-lg dark:bg-customBlue dark:text-white   *: border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={product?.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="mt-1 block w-full border text-slate-900 text-lg dark:bg-customBlue dark:text-white  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="Enter slug"
                  />
                </div>
              </div>
              <div className="w-full mb-12 rounded-lg">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <ReactQuill
                  className="dark:bg-customBlue dark:text-gray-700"
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      ['image', 'code-block'],
                      ['insert',]
                    ],
                  }}
                  style={{ height: '100px' }}
                  placeholder="Compose an epic..."
                  onChange={(value) => handleInputChange('description', value)}
                  value={product.description}
                />
              </div>
            </div>
            <div className="p-4 border mt-5 rounded-lg dark:bg-slate-700 bg-white shadow-md max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Assets</h2>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-1/3 h-48 dark:bg-customBlue border border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    {/* <GrImage size={'100%'} /> */}
                    <img src={product?.featuredAsset?.preview} alt="Product image" className="w-full mx-auto" />
                    {/* <p className="text-gray-500 mt-2">No featured asset</p> */}
                  </div>
                </div>
                {/* <button className="ml-4 dark:bg-btnBlue mt-35 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add asset
                </button> */}
                <div className="ml-4 mt-35">
                  <label className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer dark:bg-btnBlue">
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add asset
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 mt-5 border rounded-lg bg-white dark:bg-slate-700 shadow-md max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Product variants</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="option" className="block text-sm font-medium text-gray-700">Option</label>
                    <input
                      type="text"
                      id="option"
                      placeholder="e.g. Size"
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-700"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="option-values" className="block text-sm font-medium text-gray-700">Option values</label>
                    <input
                      type="text"
                      id="option-values"
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                  </div>
                </div>
                <button className="mt-2 px-4 py-2 border dark:bg-btnBlue border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add option
                </button>
                <div>
                  <label htmlFor="stock-location" className="block text-sm font-medium text-gray-700">Add stock to location</label>
                  <select
                    id="stock-location"
                    className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                  >
                    <option>Default Stock Location</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                    <input
                      type="text"
                      id="sku"
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">US$</span>
                      </div>
                      <input
                        type="text"
                        id="price"
                        className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="text"
                      id="stock"
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-30">
            <div className="items-center">
              {/* <div className="border p-3 mb-4 rounded-lg dark:bg-slate-700">
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                  Visibility
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id="visibility"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-700">Enabled</span>
                </div>
              </div>
              <div className="border p-3 rounded-lg dark:bg-slate-700">
                <label htmlFor="facets" className="block text-sm font-medium text-gray-700">
                  Facets
                </label>
                <button
                  type="button"
                  className="mt-1 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:bg-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  + Add facets
                </button>
              </div> */}
              <div className="border  p-3 rounded-lg dark:bg-slate-700">
                <div className="flex  text-sm font-medium">
                  <p className='text-gray-700'>ID: <span className='text-black-2'>{product?.id}</span></p>
                </div>
                <div className="flex mt-1 text-sm font-medium">
                  <p className="text-gray-700">
                    Created at: <span className="text-black-2">{formatDate(product?.createdAt)}</span>
                  </p>
                </div>
                <div className="flex mt-1 text-sm font-medium">
                  <p className='text-gray-700'>Updated at: <span className='text-black-2'>{formatDate(product?.updatedAt)}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
