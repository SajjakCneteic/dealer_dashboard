import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleOrder } from '../slices/orderSlice'; 
import OrderProductTable from '../components/OrderProductTable';
import TaxSummary from '../components/TaxSummary';
import QRCodeComponent from '../components/QrCode';
import Breadcrumb from '../components/Breadcrumb';

const mutedFgClass = 'text-muted-foreground dark:text-muted-foreground';

const formatCurrency = (amount) => {
  const currency = process.env.REACT_APP_CURRENCY || 'INR'; // Default to USD
  const symbol = 
    currency === 'USD' ? '$' : 
    currency === 'EUR' ? '€' : 
    currency === 'GBP' ? '£' : 
    currency === 'INR' ? '₹' : ''; // Added support for INR

  return `${symbol}${amount}`; // No value conversion, just appending the symbol
};



const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orders);
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchSingleOrder(id)); // Fetch order by ID
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setStatus(order.order.state); // Set initial state
    }
  }, [order]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  const {
    customer,
    state,
    lines,
    total,
    subTotal,
    shipping,
    taxSummary,
    payments,
    shippingAddress,
    createdAt,
    updatedAt,
    nextStates,
  } = order.order;

  return (
    <div className="p-2 bg-white dark:bg-black rounded-lg">
      <div className="mb-6">
        <Breadcrumb />
      </div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold dark:text-card-foreground">OrderNumber : #{id}</h2>
        <button 
          disabled={state === status}
          className={`${state !== status ? "bg-primary" : "bg-blue-300 text-black"} text-white dark:bg-primary-foreground dark:text-primary-foreground px-4 py-2 rounded-md`}
        >
          Fulfill order
        </button>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-grow md:mr-4">
          <div className="mt-6">
            <OrderProductTable
              items={lines?.map((line) => ({
                name: line.productVariant.name,
                sku: line.productVariant.sku,
                unitPrice: formatCurrency(line.linePrice),
                quantity: line.quantity,
                total: formatCurrency(line.linePrice),
                image: line.featuredAsset.preview,
              }))}
              summary={{
                subTotal: formatCurrency(subTotal),
                shipping: formatCurrency(shipping),
                total: formatCurrency(total),
              }}
            />
          </div>
          <div className="mt-6">
            <TaxSummary
              taxSummary={taxSummary?.map((tax) => ({
                description: tax.description,
                taxRate: `${tax.taxRate}%`,
                taxBase: formatCurrency(tax.taxBase),
                taxTotal: formatCurrency(tax.taxTotal),
              }))}
            />
          </div>
        </div>
        <div className="rounded-lg bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
          <div className="p-4 mb-4 bg-card border border-border rounded-lg md:mt-6">
            <div className="text-muted font-semibold">State</div>
            <hr />
            <div className="flex items-center justify-between mt-2">
              <select
                className={`w-full px-4 py-2 font-semibold border ${
                  state === "Delivered" ? "bg-orange-500" :
                  state === "Shipped" ? "bg-green-500" :
                  state === "Cancelled" ? "bg-red-500" : "bg-blue-500"
                } text-white rounded`}
                name="state"
                id="state"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option  value={state}>{state}</option>
                {
                (nextStates?.map((state, i) => (
                  <option key={i} value={state}>{state}</option>
                )))
              }
              </select>
            </div>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Customer</h2>
            <hr />
            <div className="flex items-center my-4">
              <img alt="user-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👤" className="w-6 h-6 mr-2" />
              <span className="text-primary font-medium">{customer?.firstName} {customer?.lastName}</span>
            </div>
            <h3 className="text-md font-semibold mb-1">Shipping address</h3>
            <hr />
            <p className="text-muted-foreground">
              {shippingAddress?.company}
              <br />
              {shippingAddress?.streetLine1} {shippingAddress?.streetLine2}
              <br />
              {shippingAddress?.city}, {shippingAddress?.province} {shippingAddress?.postalCode}
              <br />
              📍 {shippingAddress?.country}
              <br />
              📞 {shippingAddress?.phoneNumber}
            </p>
          </div>
          <div className="my-4 p-4 rounded-lg border border-border">
            <h2 className="text-lg pb-2 font-semibold">Payments</h2>
            <hr />
            <div className="bg-card mt-2 text-muted-foreground dark:bg-card dark:text-muted-foreground">
              <div className="flex justify-between">
                <p>
                  Payment <span className="font-semibold text-primary dark:text-primary">{formatCurrency(payments?.[0]?.amount)}</span>
                </p>
                <p>
                  <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full dark:bg-green-500 dark:text-white">
                    Settled
                  </span>
                </p>
              </div>
              <p>Payment method: {payments?.[0]?.method}</p>
              <p>Amount: <span className="font-semibold dark:text-primary">{formatCurrency(payments?.[0]?.amount)}</span></p>
              <p>Transaction ID: <span className="font-semibold">{payments?.[0]?.transactionId}</span></p>
            </div>
          </div>
          <div className={`rounded-lg border border-border p-4 ${mutedFgClass}`}>
            <p className="py-2">ID: <span className="font-semibold">{id}</span></p>
            <hr />
            <p className="pt-2">Created at: <span className="font-semibold">{new Date(createdAt).toLocaleString()}</span></p>
            <p>Updated at: <span className="font-semibold">{new Date(updatedAt).toLocaleString()}</span></p>
            {status === "Ready To PickUp" && <QRCodeComponent orderId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
