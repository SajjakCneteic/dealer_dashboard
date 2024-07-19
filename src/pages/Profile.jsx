import React from 'react';

const Profile = () => {
  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4">
      <div className="dark:bg-customBlue shadow-lg rounded-lg w-full max-w-lg p-6">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative">
            <img 
              src="https://via.placeholder.com/100" 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </span>
          </div>
          {/* User Details */}
          <h2 className="text-2xl font-semibold mt-4">John Doe</h2>
          <p className="text-gray-600 mt-2">johndoe@example.com</p>
          <p className="text-gray-500 mt-1">Joined: January 2021</p>
          {/* Button Group */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
