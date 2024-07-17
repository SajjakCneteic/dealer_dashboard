import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FaBorderStyle } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { TbLineScan } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [activeLink, setActiveLink] = useState(null);

    const toggleAccordion = (accordionName) => {
        setActiveAccordion(activeAccordion === accordionName ? null : accordionName);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    return (
        <div className="bg-zinc-900 text-zinc-200 w-64 h-screen p-4">
            <div className="flex items-center mb-8">
                <img
                    src="https://openui.fly.dev/openui/24x24.svg?text=📊"
                    alt="logo"
                    className="mr-2"
                />
                <span className="text-3xl font-semibold">TailAdmin</span>
            </div>
            <nav>
                <div className="mb-4">
                    <Link 
                        to="/dashboard"
                        className={`flex items-center mb-4 text-l p-2 rounded-lg ${activeLink === 'dashboard' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                        onClick={() => handleLinkClick('dashboard')}
                    >
                        <LuLayoutDashboard className='text-xl' />
                        <span className="ml-3 text-l">Dashboard</span>
                    </Link>
                    <div>
                        <Link
                            to="#"
                            className={`flex justify-between items-center mb-4 text-l p-2 rounded-lg cursor-pointer ${activeAccordion === 'orders' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                            onClick={() => toggleAccordion('orders')}
                        >
                            <div className="flex items-center">
                                <FaBorderStyle className="text-xl" />
                                <span className="ml-3 text-l">Orders</span>
                            </div>
                            <div>{activeAccordion === 'orders' ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
                        </Link>
                        {activeAccordion === 'orders' && (
                            <div className="ml-10">
                                <Link 
                                    to="/orders/all"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'all-orders' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                                    onClick={() => handleLinkClick('all-orders')}
                                >
                                    All Orders
                                </Link>
                                <Link 
                                    to="/orders/pending"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'pending-orders' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                                    onClick={() => handleLinkClick('pending-orders')}
                                >
                                    Pending Orders
                                </Link>
                                <Link 
                                    to="/orders/completed"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'completed-orders' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                                    onClick={() => handleLinkClick('completed-orders')}
                                >
                                    Completed Orders
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <Link
                            to="#"
                            className={`flex justify-between items-center mb-4 text-l p-2 rounded-lg cursor-pointer ${activeAccordion === 'vendorInfo' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                            onClick={() => toggleAccordion('vendorInfo')}
                        >
                            <div className="flex items-center">
                                <GrStatusInfo className='text-xl' />
                                <span className="ml-3 text-l">Vendor Info</span>
                            </div>
                            <div>{activeAccordion === 'vendorInfo' ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
                        </Link>
                        {activeAccordion === 'vendorInfo' && (
                            <div className="ml-10">
                                <Link 
                                    to="/vendor/profile"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'vendor-profile' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                                    onClick={() => handleLinkClick('vendor-profile')}
                                >
                                    Profile
                                </Link>
                                <Link 
                                    to="/vendor/settings"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === 'vendor-settings' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                                    onClick={() => handleLinkClick('vendor-settings')}
                                >
                                    Settings
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link 
                        to="/products"
                        className={`flex items-center mb-4 text-l p-2 rounded-lg ${activeLink === 'products' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                        onClick={() => handleLinkClick('products')}
                    >
                        <AiOutlineProduct className='text-xl' />
                        <span className="ml-3 text-l">Products</span>
                    </Link>
                    <Link 
                        to="/scan-order"
                        className={`flex items-center mb-4 text-l p-2 rounded-lg ${activeLink === 'scan-order' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
                        onClick={() => handleLinkClick('scan-order')}
                    >
                        <TbLineScan className='text-xl' />
                        <span className="ml-3 text-l">Scan Order</span>
                    </Link>
                    <Link 
                        to="/logout"
                        className={`flex items-center mb-4 text-l p-2 rounded-lg ${activeLink === 'logout' ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
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
