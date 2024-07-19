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
export default CustomerOrderRow;