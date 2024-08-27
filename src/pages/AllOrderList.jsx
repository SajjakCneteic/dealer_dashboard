import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../slices/orderSlice'; // Import the action
import OrderList from '../components/OrderList';

const AllOrderList = () => {
  const dispatch = useDispatch();

  // Get orders and loading/error state from Redux
  const { orders, loading, error } = useSelector((state) => state.orders);

  // Dispatch action to fetch all orders when the component mounts
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <OrderList Heading="All Order List" show={false} customerOrders={orders} />
  );
};

export default AllOrderList;
