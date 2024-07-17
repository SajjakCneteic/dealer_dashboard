import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { TbMessageCircle2 } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarOpen , setSidebarOpen] = useState(false)
  const toggleTheme= ()=>{
    setIsDarkMode(!isDarkMode)
  }
  return (
    <div className="flex items-center justify-between p-4 bg-card text-card-foreground">
      {sidebarOpen && <div className="flex items-center space-x-4">
        <button className="p-2">
          <GiHamburgerMenu className='text-3xl'/>
        </button>
        <img aria-hidden="true" alt="logo" src="http://localhost:5173/src/images/user/user-01.png" />
      </div>}
      <div className="flex items-center space-x-4 flex-grow mx-4">
        <div className="relative flex items-center w-full">
          <span className="absolute left-3 text-muted-foreground">
           <BsSearch className='text-2xl'/>
          </span>
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
      <button
      className="relative p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
      onClick={toggleTheme}
    >
      {isDarkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
        <button className="relative p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
          <HiOutlineBellAlert className='text-2xl'/>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <button className="relative p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
        <TbMessageCircle2 className='text-2xl'/>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className='flex'>
            <span></span>
            <span></span>
          </div>
          <img aria-hidden="true" alt="user-avatar" src="https://placehold.co/32x32" className="rounded-full" />
          <button className="p-2">
            <IoIosArrowDown className='text-2xl'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
