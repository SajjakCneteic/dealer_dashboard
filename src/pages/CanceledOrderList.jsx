import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../slices/orderSlice';
import OrderList from '../components/OrderList';

const CanceledOrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders('cancelled')); // Fetch canceled orders
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error}</div>;
  }

  return (
    <OrderList Heading="Canceled Orders" show={false} customerOrders={orders.orders} />
  );
};

export default CanceledOrderList;
