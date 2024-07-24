import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderProductTable from '../components/OrderProductTable';
import TaxSummary from '../components/TaxSummary';
import OrderHistory from '../components/OrderHistory';
import { MdArrowForwardIos } from 'react-icons/md';
import Breadcrumb from '../components/Breadcrumb';
import QRCodeComponent from '../components/QrCode';

const orderData = {
  orderId: "2EAWJDZJHGEN9A6E",
  customer: {
    name: "Rio Zephyr",
    address: "253 North Avenue",
    city: "Malibu",
    state: "California",
    zip: "93092",
    country: "United States of America"
  },
  state: "Payment settled",
  items: [
    {
      name: "Spilly Cactus",
      sku: "SC101001",
      unitPrice: "$18.60",
      quantity: 1,
      total: "$18.60",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      name: "Clacky Keyboard",
      sku: "A4TKL45535",
      unitPrice: "$89.87",
      quantity: 1,
      total: "$89.87",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      name: "Balloon Chair",
      sku: "34-BCB2444",
      unitPrice: "$78.00",
      quantity: 1,
      total: "$78.00",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
  ],
  summary: {
    subTotal: "$186.47",
    shipping: "$5.00",
    total: "$191.47"
  },
  taxSummary: [
    {
      description: "Standard Tax Europe",
      taxRate: "20%",
      taxBase: "$165.39",
      taxTotal: "$31.08"
    },
    {
      description: "Shipping Tax",
      taxRate: "0%",
      taxBase: "$5.00",
      taxTotal: "$0.00"
    }
  ],
  orderHistory: {
    note: "private",
    status: "Payment settled",
    amount: "$191.47",
    transactionId: "zc0basbkpl",
    createdAt: "7/22/24, 2:46 PM",
    updatedAt: "7/22/24, 2:46 PM"
  }
};

const cardClass = ' rounded-lg bg-card text-card-foreground dark:bg-card dark:text-card-foreground';
const primaryBgClass = 'bg-primary rounded-full dark:bg-primary/80';
const mutedFgClass = 'text-muted-foreground dark:text-muted-foreground';

const OrderDetails = () => {
  const { id } = useParams();
const [status,setStatus]=useState(orderData.state)
  return (
    <div className="p-2 bg-card dark:bg-card-foreground rounded-lg">
       <div className='mb-6'>
        
        <Breadcrumb/>
      </div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold dark:text-card-foreground">#{id}</h2>
        <button disabled={orderData.state==status} className={`${orderData.state!==status?" bg-primary" :"bg-blue-300 text-black"} text-white dark:bg-primary-foreground dark:text-primary-foreground px-4 py-2 rounded-md`}>
          Fulfill order
        </button>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-grow md:mr-4">
          <div className="mt-6">
            <OrderProductTable items={orderData.items} summary={orderData.summary} />
          </div>
          <div className="mt-6">
            <TaxSummary taxSummary={orderData.taxSummary} />
          </div>
          <div className="mt-6">
            {/* <OrderHistory orderHistory={orderData.orderHistory} /> */}
          </div>
        </div>
        <div className={cardClass}>
          <div className="p-4 mb-4 bg-card border border-border rounded-lg md:mt-6">
            <div className="text-muted font-semibold">State</div>
            <hr />
            <div className="flex items-center justify-between mt-2 ">
              
                <select className="w-full px-2 py-2 mr-1  font-semibold text-yellow-700 border bg-yellow-200 rounded" name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                  <option value="Payment settled">Payment Settled</option>
                  <option value="Ready To PickUp">Ready To PickUp</option>
                  <option value="Shipped">Shipped</option>
                </select>
              
{/* {status==orderData.state?" ":
               <button className="p-2 bg-primary text-white text-sm rounded hover:bg-muted/80">
               <img alt="icon" src="https://openui.fly.dev/openui/24x24.svg?text=📄" />
                 Update
              </button> 
} */}
            </div>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Customer</h2>
            <hr />
            <div className="flex items-center my-4">
              <img alt="user-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👤" className="w-6 h-6 mr-2" />
              <span className="text-primary font-medium">{orderData.customer.name}</span>
              <button className="ml-auto text-muted hover:text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6 5l-3 3-3-3m6-5l3-3 3 3-3 3-3-3z" />
                </svg>
              </button>
            </div>
            <h3 className="text-md font-semibold mb-1">Shipping address</h3>
            <hr />
            <p className="text-muted-foreground">
              {orderData.customer.name}
              <br />
              {orderData.customer.address}
              <br />
              {orderData.customer.city}, {orderData.customer.state} {orderData.customer.zip}
              <br />
              📍 {orderData.customer.country}
              <br />
              📞 03342 448822
            </p>
          </div>
          <div className="my-4 p-4 rounded-lg border border-border">
            <h2 className="text-lg pb-2 font-semibold">Payments</h2>
            <hr />
            <div className=" bg-card mt-2 text-muted-foreground dark:bg-card dark:text-muted-foreground">
              <div className="flex justify-between">

              <p>Payment <span className="font-semibold text-primary dark:text-primary">{orderData.summary.total}</span></p>
              <p>
              <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full dark:bg-green-500 dark:text-white">Settled</span>
              </p> </div>

              <p className="">Payment method: standard-payment</p>
              <p>Amount: <span className="font-semibold dark:text-primary">{orderData.summary.total}</span></p>
              <p>Transaction ID: <span className="font-semibold">{orderData.orderHistory.transactionId}</span></p>
              <p>Payment metadata</p>
              <button className={`mt-2 ${mutedFgClass} hover:${mutedFgClass}/80 dark:text-muted-foreground dark:hover:text-muted-foreground/80`} aria-label="More details">
                <span>...</span>
              </button>
            </div>
          </div>
          <div className={`rounded-lg border border-border p-4 ${mutedFgClass}`}>
            <p className='py-2'>ID: <span className="font-semibold">{id}</span></p>
            <hr />
            <p className='pt-2'>Created at: <span className="font-semibold">{orderData.orderHistory.createdAt}</span></p>
            <p>Updated at: <span className="font-semibold">{orderData.orderHistory.updatedAt}</span></p>
           {status=="Ready To PickUp"? <QRCodeComponent orderId={id}/>:""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
