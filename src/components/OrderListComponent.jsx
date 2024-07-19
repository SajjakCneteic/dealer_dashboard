import React from 'react';
import OrderList from './OrderList';





const OrderListComponent = () => {
    const customerOrders = [
        { id:1,
            customerName: 'Musharof Chowdhury',
            customerEmail: 'musharof@gmail.com',
            productName: 'Apple Macbook Pro M1',
            productDetails: '8/256 GB',
            orderNumber: '#WE234343',
            orderDate: '25 Dec 2024',
            status: 'Pending',
            confirmationEnabled: true
        },
        {   id:2,
            customerName: 'Shafiq Hammad',
            customerEmail: 'shafiq@gmail.com',
            productName: 'iPhone 13 Pro Max',
            productDetails: '4/256 GB',
            orderNumber: '#WE234343',
            orderDate: '25 Dec 2024',
            status: 'Pending',
            confirmationEnabled: true
        },
        {    id:3,
            customerName: 'Naimur Rahman',
            customerEmail: 'naim@gmail.com',
            productName: 'Apple watch series 7',
            productDetails: '',
            orderNumber: '#WE234343',
            orderDate: '25 Dec 2024',
            status: 'Cancelled',
            confirmationEnabled: false
        },
        {    id:4,
            customerName: 'Jhon Smith',
            customerEmail: 'smith@gmail.com',
            productName: 'Apple Macbook air M1',
            productDetails: '8/256 GB',
            orderNumber: '#WE234343',
            orderDate: '25 Dec 2024',
            status: 'Shipped',
            confirmationEnabled: false
        }
    ];

    return (
        <OrderList Heading={"All Order List"} show="true" customerOrders={customerOrders}/>
          
    );
};

export default OrderListComponent;
