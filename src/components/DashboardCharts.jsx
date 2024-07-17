import React from 'react';
import SalesAnalytics from './SalesAnalytics'; // Adjust the import according to your file structure
import SalesGraph from './SalesGraph'; // Adjust the import according to your file structure

const DashboardCharts = () => {
  return (
    <div className=" w-full p-4 my-2  lg:flex lg:gap-4">
        <div className="w-full lg:w-[55%]">
        <SalesAnalytics />

        </div>
        <div className="w-full lg:w-[45%]">
        <SalesGraph />

        </div>
    </div>
  );
};

export default DashboardCharts;
