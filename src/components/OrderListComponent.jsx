import React from 'react';
import { Link } from 'react-router-dom';

const OrderList = ({customerOrders}) => {
    return (
        <div className="max-w-full p-4 bg-card rounded-lg shadow-lg">
            <div className="flex justify-between">

            <div>

            <h2 className="text-2xl font-bold text-card-foreground">Order List</h2>
            <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies lectus sem.</p>
            </div>
            <div>
                <Link to="/all-orders">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">View More</button>
                </Link>
            </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full mt-6 bg-card border-border rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Confirmation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {/* Customer Orders */}
                        {/* Map each row as a separate component */}
                        {customerOrders.map((order)=>{
                            return <CustomerOrderRow key={order.id} {...order}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CustomerOrderRow = ({ customerName, customerEmail, productName, productDetails, orderNumber, orderDate, status, confirmationEnabled }) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-card-foreground font-semibold">{customerName}</div>
                <div className="text-muted-foreground">{customerEmail}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-card-foreground">{productName}</div>
                {productDetails && <div className="text-muted-foreground">{productDetails}</div>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-card-foreground">{orderNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap text-card-foreground">{orderDate}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`py-1 px-4 inline-flex text-xs  leading-5 font-semibold rounded-full ${status === 'Pending' ? 'bg-orange-100 text-orange-500' : status === 'Cancelled' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                <div className={`w-2 h-2 m-2 rounded-full ${status === 'Pending' ? 'bg-orange-500 text-orange-500 text-primary-foreground' : status === 'Cancelled' ? 'bg-red-500 text text-red-500' : 'bg-green-500 text-green-500'}`}></div>
                {status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button disabled={!confirmationEnabled} className={`px-4 py-2 bg-transparent border-primary ${confirmationEnabled ? 'hover:bg-blue-500 border-1 hover:text-white hover:text-primary-foreground' : 'cursor-not-allowed'} rounded-lg`}>
                    Confirm Order
                </button>
            </td>
        </tr>
    );
};

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
        <OrderList customerOrders={customerOrders}/>
          
    );
};

export default OrderListComponent;
