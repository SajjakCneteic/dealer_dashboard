import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";


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
        <img aria-hidden="true" alt="logo" src="https://openui.fly.dev/openui/32x32.svg?text=📊" />
      </div>}
      <div className="flex items-center space-x-4 flex-grow mx-4">
        <div className="relative flex items-center w-full">
          <span className="absolute left-3 text-muted-foreground">
            <img aria-hidden="true" alt="search-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔍" />
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
          <img aria-hidden="true" alt="notifications-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔔" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <button className="relative p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
          <img aria-hidden="true" alt="messages-icon" src="https://openui.fly.dev/openui/24x24.svg?text=💬" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <div className="flex items-center space-x-2">
          <img aria-hidden="true" alt="user-avatar" src="https://placehold.co/32x32" className="rounded-full" />
          <button className="p-2">
            <img aria-hidden="true" alt="dropdown-icon" src="https://openui.fly.dev/openui/24x24.svg?text=▾" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
