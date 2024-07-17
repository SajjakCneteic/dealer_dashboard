import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainPage = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-grow'>
        <Navbar />
        <div className='flex-grow p-4 bg-gray-100'>
          {/* Main content goes here */}
          <h1 className='text-2xl font-bold'>Welcome to the Main Page</h1>
          <p>Here is the main content of the page.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
