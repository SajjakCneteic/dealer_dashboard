import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVariantsById } from '../slices/productSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import PropTypes from 'prop-types';

// Shared tailwind classes
const inputClasses = "border border-zinc-300 rounded p-2 w-full bg-gray-100";
const buttonClasses = "bg-blue-600 text-white p-2 rounded hover:bg-blue-700";
const checkboxClasses = "mr-2";

const VarientDetails = () => {
    const [isLoader, setIsLoader] = useState(false);
    const [variantsData, setVariantsData] = useState({});
    const dispatch = useDispatch();
    const { varientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoader(true);
                const result = await dispatch(getVariantsById(varientId));
                setVariantsData(result.payload.data.data);
            } catch (error) {
                console.error("Failed to fetch variant data", error);
            } finally {
                setIsLoader(false);
            }
        };

        fetchData();
    }, [dispatch, varientId]);

    if (isLoader) {
        return <Loader />;
    }

    // Destructure the product data from variantsData
    const {
        id,
        name,
        sku,
        createdAt,
        updatedAt,
        options = [],
        price = 0,
        priceWithTax = 0,
        outOfStockThreshold = 0,
        taxCategory = { name: 'Zero Tax' },
    } = variantsData;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="text-right mb-4">
                <button className="bg-green-600 text-white hover:bg-green-700 p-2 rounded">Update</button>
            </div>
            <div className="flex justify-between gap-2">
                <div className="w-2/3 border border-zinc-300 rounded p-4 mb-2">
                    <h1 className="text-2xl font-bold mb-4">{name}</h1>
                    <div className="grid grid-cols-2 gap-4 mb-6 border border-zinc-300 rounded p-4">
                        <div className="col-span-2">
                            <label className="block mb-1" htmlFor="name">Name</label>
                            <input className={inputClasses} type="text" id="name" value={name} readOnly />
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="sku">SKU</label>
                            <input className={inputClasses} type="text" id="sku" value={sku} readOnly />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1">Assets</label>
                        <div className="border border-zinc-300 rounded p-4 mb-2">
                            <img aria-hidden="true" alt="No featured asset" src="https://openui.fly.dev/openui/150x150.svg?text=No+Featured+Asset" />
                            <p className="text-gray-500">No featured asset</p>
                        </div>
                        <button className={buttonClasses}>Add asset</button>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Price and Tax</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 border border-zinc-300 rounded p-4">
                        <div>
                            <label className="block mb-1" htmlFor="tax-category">Tax category</label>
                            <select className={inputClasses} id="tax-category" value={taxCategory.name} readOnly>
                                <option>{taxCategory.name}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="price">Price</label>
                            <input className={inputClasses} type="text" id="price" value={`$${(price / 100).toFixed(2)}`} readOnly />
                        </div>
                        <div>
                            <label className="block mb-1">Taxes</label>
                            <input className={inputClasses} type="text" readOnly value={`Inc. ${taxCategory.name === 'Zero Tax' ? '0%' : '20%'} tax: $${(priceWithTax / 100).toFixed(2)}`} />
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 border border-zinc-300 rounded p-4">
                        <div>
                            <label className="block mb-1" htmlFor="track-inventory">Track inventory</label>
                            <select className={inputClasses} id="track-inventory" value="Inherit from global settings" readOnly>
                                <option>Inherit from global settings</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="out-of-stock-threshold">Out-of-stock threshold</label>
                            <input className={inputClasses} type="number" id="out-of-stock-threshold" value={outOfStockThreshold} readOnly />
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="default-stock-location">Default Stock Location</label>
                            <input className={inputClasses} type="number" id="default-stock-location" value="100" readOnly />
                        </div>
                    </div>
                </div>
                <div className="w-1/3 border border-zinc-300 rounded p-4 mb-2">
                    <div className="mt-6 border border-zinc-300 rounded p-4 mb-2">
                        <h3 className="text-lg font-bold">Visibility</h3>
                        <label className="flex items-center">
                            <input type="checkbox" checked className={checkboxClasses} readOnly /> Enabled
                        </label>
                    </div>

                    <div className="mt-4 border border-zinc-300 rounded p-4 mb-2">
                        <h3 className="text-lg font-bold">Facets</h3>
                        <p>{options.map(opt => opt.name).join(', ')}</p>
                    </div>

                    <div className="mt-4 text-gray-500 border border-zinc-300 rounded p-4 mb-2">
                        <p>ID: {id}</p>
                        <p>Created at: {new Date(createdAt).toLocaleString()}</p>
                        <p>Updated at: {new Date(updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VarientDetails;
