import React from 'react'
import DashboardItem from '../components/DashboardItems'
import DashboardCharts from '../components/DashboardCharts'
import OrderListComponent from '../components/OrderListComponent'

const Dashboard = () => {
  return (

<main className="w-full  flex flex-col items-center mt-2">
        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">Dashboard</h2>
        <div className="w-full grid grid-cols-1  md:grid-cols-2  gap-6 justify-items-center px-2 sm:px-8 md:px-16 lg:px-2">
          <DashboardItem iconSrc="https://placehold.co/60x60/svg?text=🛍" icon="🛍" title="Order Pickup" bgColor="bg-teal-500" />
          <DashboardItem iconSrc="https://placehold.co/60x60/svg?text=📦" icon="📦" title="Order Shipping" bgColor="bg-green-500" />
          <DashboardItem iconSrc="https://placehold.co/60x60/svg?text=🛒" icon="🛒" title="Product" bgColor="bg-red-500" />
          <DashboardItem iconSrc="https://placehold.co/60x60/svg?text=📊" icon="📊" title="Sales" bgColor="bg-yellow-500" />
        </div>
        <div className="w-full">
        <DashboardCharts/>
        </div>
       < OrderListComponent/>
      </main>  )

}

export default Dashboard