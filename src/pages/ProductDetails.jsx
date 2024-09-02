import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { GrImage } from 'react-icons/gr';
import Modal from '../components/Modal';
import { useDispatch } from 'react-redux';
import { deleteProductItem, fetchSingleProduct } from '../slices/productSlice';
import Loader from '../components/Loader';
import { RiH1 } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import ConfirmDeleteModal from './DeleteModal';
const rupees = process.env.REACT_APP_CURRENCY_SIGN;


const ProductDetails = () => {
  const [originalProduct, setOriginalProduct] = useState({})
  const dispatch = useDispatch()
  const [product, setProduct] = useState(originalProduct);
  const [isDisabled, setIsDisabled] = useState(false);
  const { id } = useParams()
  const [isLoader, setIsLoader] = useState(false)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
 
  const handleInputChange = (field, value) => {
    const updatedProduct = { ...product, [field]: value };
    setProduct(updatedProduct);
  
    // Normalize text comparison
    const normalizeHtml = (html) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    };
  
    const normalizedOriginalDescription = normalizeHtml(originalProduct.description || '');
    const normalizedUpdatedDescription = normalizeHtml(updatedProduct.description || '');
  
    const isModified = 
      updatedProduct.name !== originalProduct.name ||
      updatedProduct.slug !== originalProduct.slug ||
      normalizedUpdatedDescription !== normalizedOriginalDescription;
  
    setIsDisabled(isModified);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true)
      const data = await dispatch(fetchSingleProduct(id));
      setOriginalProduct(data.payload.product)
      setProduct(data.payload.product)
      setIsLoader(false)
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

  function formatPrice(price) {
    return price.toLocaleString('en-IN');
  }

  const handleDelete = () => {
    setIsOpen(true)
  }
  const confirmDeletion = async () => {

    // Dispatch delete action
    dispatch(deleteProductItem(product.id));


    toast.success('Product Deleted Successfully!');
    setTimeout(() => {

      navigate('/products');
    }, 1000)


    setIsOpen(false);

  };

  if (isLoader) {
    return <Loader />
  }

  return (
    <>
      <Toaster />
      <Modal isDisabled={isDisabled} />
      {isOpen && <ConfirmDeleteModal isOpen={isOpen} setIsOpen={setIsOpen} confirmDeletion={confirmDeletion} />}
      <div className="mb-6">
        <span className="text-l inline-flex items-center dark:bg-customBlue bg-white p-2 pl-5 pr-5 rounded-full shadow-md">
          <Link to="/dashboard" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Dashboard<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link to="/products" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Products<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link className="items-center pointer-events-none inline-flex text-blue-800 hover:text-btnBlue transition duration-200">
            {product?.name}
          </Link>
        </span>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-customBlue p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-3">
          <div><h4 className="font-bold text-xl">{product?.name}</h4></div>
          <div className='flex'>
            <button onClick={handleDelete} className="bg-red-500 flex items-center hover:bg-red-700 rounded-lg text-white pl-3 pr-3 pt-2 pb-2 mr-5">
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
              <div className="flex ">
                <div className="flex-shrink-0 w-1/3 h-48 dark:bg-customBlue border border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    {/* <GrImage size={'100%'} /> */}
                    <img src={product?.featuredAsset?.preview} alt="Product image" className="w-full mx-auto" />
                    {/* <p className="text-gray-500 mt-2">No featured asset</p> */}
                  </div>
                </div>

                <div className='h-full' >
                  <div className='flex flex-wrap'>
                    {product?.assets?.map((el) =>
                      <img src={el?.preview} alt="" className='ml-4 w-18 h-18' />
                    )}
                  </div>
                  <div className="  ml-4 flex mt-20">
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
            </div>
            <div className="p-4 mt-5 border rounded-lg bg-white dark:bg-slate-700 shadow-md max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Product Variants</h2>
              {(!product?.variants?.length) ? <h1>No Variants</h1> :
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-slate-600">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Options</th>
                      </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200">
                      {product?.variants?.map((variant, index) => (
                        <tr onClick={()=>navigate(`/product/${product.id}/varients/${variant?.id}`)} key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{variant?.sku}</td>
                          <td className="py-4 px-6 whitespace-nowrap text-zinc-700 dark:text-zinc-300">
                            {rupees} {formatPrice(Number(variant?.price) || 0)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{variant.stockOnHand}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {variant.options.map((option, optIndex) => (
                              <span key={optIndex} className="block">
                                {option.name}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </div>

          </div>
          <div className="col-span-30">
            <div className="items-center">
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
              <div className="border mt-5 p-3 mb-4 rounded-lg dark:bg-slate-700">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
