import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerOrderRow = ({ customerName, customerEmail, productName, productDetails, orderNumber, orderDate, status  }) => {
    const [confirmationEnabled,setconfirmationEnabled]=useState(false);
    const Navigate = useNavigate();
    useEffect(()=>{
if(status=="Pending"){
    setconfirmationEnabled(true)
}
    },[])
    const handleClick = ()=>{
        Navigate(`/order/${orderNumber}`)
    }
    return (
        <tr onClick={handleClick}>
            <td className=" pl-2 pr-4 py-4 whitespace-nowrap">
                <div className="text-card-foreground font-semibold">{customerName}</div>
                <div className="text-muted-foreground">{customerEmail}</div>
            </td>
            <td className="pr-4 py-4 whitespace-nowrap">
                <div className="text-card-foreground">{productName}</div>
                {productDetails && <div className="text-muted-foreground">{productDetails}</div>}
            </td>
            <td className="pr-4 py-4 whitespace-nowrap text-card-foreground">#{orderNumber}</td>
            <td className="pr-4 py-4  whitespace-nowrap text-card-foreground">{orderDate}</td>
            <td className="pr-2 py-4 whitespace-nowrap">
                <span className={`py-1 px-2 inline-flex text-xs  leading-5 font-semibold rounded-full ${status === 'Pending' ? 'bg-orange-100 text-orange-500' : status === 'Cancelled' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                <div className={`w-2 h-2 m-auto mr-1 rounded-full ${status === 'Pending' ? 'bg-orange-500 text-orange-500 text-primary-foreground' : status === 'Cancelled' ? 'bg-red-500 text text-red-500' : 'bg-green-500 text-green-500'}`}></div>
                {status}
                </span>
            </td>
            <td className=" py-4 whitespace-nowrap">
             {confirmationEnabled?<button disabled={!confirmationEnabled} className={`px-4 py-2 bg-transparent border-primary ${confirmationEnabled ? 'border border-blue-500 hover:bg-blue-500 border-1 hover:text-white hover:text-primary-foreground' : 'cursor-not-allowed opacity-0.5'} rounded-lg`}>
                    Confirm Order
                </button>:" "}
            </td>
        </tr>
    );
};
export default CustomerOrderRow;