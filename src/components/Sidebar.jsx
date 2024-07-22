import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FaBorderStyle } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { TbLineScan } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({sidebarOpen,setSidebarOpen}) => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [activeLink, setActiveLink] = useState(null);
    // const [sidebarOpen , setSidebarOpen] = useState(true)


    const toggleAccordion = (accordionName) => {
        setActiveAccordion(activeAccordion === accordionName ? null : accordionName);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    return (

        // <div className=  {`bg-zinc-900 text-zinc-200 w-60 h-screen hidden p-4 lg:block`}>
        <div  style={{zIndex:100,width:'280px'}}
        className={`absolute left-0 p-8 top-0 z-9999 flex h-screen shadow-xl w-96.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:text-textColor dark:bg-customBlue lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
            {sidebarOpen&&<div onClick={()=>setSidebarOpen(!sidebarOpen)}><RxCross2 className='text-3xl text-zinc-200'/></div>}
            <div className="flex items-center mb-8">
                <img
                    src="https://openui.fly.dev/openui/24x24.svg?text=📊"
                    alt="logo"
                    className="mr-2"
                />
                <span className="text-3xl font-semibold"> Dashboard </span>
            </div>
            <nav className='mt-5 TEXT-xl'>
                <div className="mb-4">
                    <Link 
                        to="/dashboard"
                        className={`flex items-center text-xl mb-4  p-2 rounded-lg ${activeLink === 'dashboard' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'dashboard' ? 'text-white' : 'hover:text-white'} `}
                        onClick={() => handleLinkClick('dashboard')}
                    >
                        <LuLayoutDashboard className='' />
                        <span className="ml-3 ">Dashboard</span>
                    </Link>
                    <div>
                        <Link
                            to="#"
                            className={`flex justify-between items-center mb-4 text-xl p-2 rounded-lg cursor-pointer ${activeLink === 'orders' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'orders' ? 'text-white' : 'hover:text-white'}`}
                            onClick={() => toggleAccordion('orders')}
                        >
                            <div className="flex items-center">
                                <FaBorderStyle className="" />
                                <span className="ml-3 ">Orders</span>
                            </div>
                            <div>{activeAccordion === 'orders' ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
                        </Link>
                        {activeAccordion === 'orders' && (
                            <div className="ml-10 text-l">
                                <Link 
                                    to="/all-orders"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'all-orders' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'all-orders' ? 'text-white' : 'hover:text-white'}`}
                                    onClick={() => handleLinkClick('all-orders')}
                                >
                                    All Orders
                                </Link>
                                <Link 
                                    to="/orders/pending"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'pending-orders' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'pending-orders' ? 'text-white' : 'hover:text-white'}`}
                                    onClick={() => handleLinkClick('pending-orders')}
                                >
                                    Pending Orders
                                </Link>
                                <Link 
                                    to="/orders/completed"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'completed-orders' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'completed-orders' ? 'text-white' : 'hover:text-white'}`}
                                    onClick={() => handleLinkClick('completed-orders')}
                                >
                                    Completed Orders
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className='text-xl'>
                        <Link
                            to="#"
                            className={`flex justify-between items-center mb-4 text-l p-2 rounded-lg cursor-pointer ${activeLink === '#' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '#' ? 'text-white' : 'hover:text-white'}`}
                            onClick={() => toggleAccordion('vendorInfo')}
                        >
                            <div className="flex items-center">
                                <GrStatusInfo className='text-xl' />
                                <span className="ml-3 text-l">Dealer Info</span>
                            </div>
                            <div>{activeAccordion === 'vendorInfo' ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
                        </Link>
                        {activeAccordion === 'vendorInfo' && (
                            <div className="ml-10 text-l">
                                <Link 
                                    to="/profile"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'vendor-profile' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'vendor-profile' ? 'text-white' : 'hover:text-white'}`}
                                    onClick={() => handleLinkClick('vendor-profile')}
                                >
                                    Profile
                                </Link>
                               
                            </div>
                        )}
                    </div>
                    <Link 
                        to="/products"
                        className={`flex items-center mb-4 text-xl p-2 rounded-lg ${activeLink === 'products' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'products' ? 'text-white' : 'hover:text-white'}`}
                        onClick={() => handleLinkClick('products')}
                    >
                        <AiOutlineProduct className='text-xl' />
                        <span className="ml-3 text-l">Products</span>
                    </Link>
                    <Link 
                        to="/scan-order"
                        className={`flex items-center mb-4 text-xl p-2 rounded-lg ${activeLink === 'scan-order' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'scan-order' ? 'text-white' : 'hover:text-white'}`}
                        onClick={() => handleLinkClick('scan-order')}
                    >
                        <TbLineScan className='text-xl' />
                        <span className="ml-3 text-l">Scan Order</span>
                    </Link>
                    <Link 
                      
                        className={`flex items-center mb-4 text-xl p-2 rounded-lg ${activeLink === 'logout' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'logout' ? 'text-white' : 'hover:text-white'}`}
                        onClick={() => handleLinkClick('logout')}
                    >
                        <MdLogout className='text-xl' />
                        <span className="ml-3 text-l">Logout</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
