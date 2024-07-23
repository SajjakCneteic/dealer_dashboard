import { FaArrowLeft, FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { LuView } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  return (
    <>
    <div className='mb-3 '>
      <Link to='/products' className='text-xl inline-flex items-center bg-white p-2 pl-5 pr-5 rounded-full shadow-md hover:text-btnBlue transition duration-200'>
        <FaArrowLeft className='mr-2' /> Products
      </Link>
    </div>
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-customBlue rounded-lg shadow-lg mt-10">
      <div className="flex flex-col lg:flex-row">
        <img 
          src={'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} 
        //   alt={product.name} 
          className="w-full lg:w-1/2 h-auto object-cover rounded-md shadow-lg"
        />
        <div className="lg:ml-6 mt-6 lg:mt-0 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Name</h1>
            <p className="mt-2 text-lg text-zinc-700 dark:text-zinc-300">Category</p>
            <p className="mt-4 text-xl text-zinc-700 dark:text-zinc-300">Price</p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Description</h2>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              Description
            </p>
          </div>
          <div className="flex mt-6 space-x-4">
            <button
              className="flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
              title="Edit"
            >
              <FaRegEdit size={20} />
              <span className="ml-2">Edit</span>
            </button>
            <button
              className="flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
              title="Delete"
            >
              <AiOutlineDelete size={20} />
              <span className="ml-2">Delete</span>
            </button>
            <button
              className="flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
              title="View"
            >
              <LuView size={20} />
              <span className="ml-2">View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
