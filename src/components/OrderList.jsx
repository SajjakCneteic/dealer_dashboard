import CustomerOrderRow from "./CustomOrderRow";
import { Link } from 'react-router-dom';

const OrderList = ({Heading,show,customerOrders}) => {
    return (
        <div className="w-full p-4 bg-card rounded-lg shadow-lg">
            <div className="flex justify-between">

            <div>

            <h2 className="text-2xl font-bold text-card-foreground">{Heading}</h2>
            <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies lectus sem.</p>
            </div>
            <div>
               {show ? <Link to="/all-orders">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">View More</button>
                </Link>:""}
            </div>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full mt-6 bg-card border-border rounded-lg">
                    <thead className="">
                        <tr className="border-b-[1px]">
                            <th className="pl-2 pr-4 py-3 text-left text-s font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                            <th className="pr-4 py-3 text-left text-s font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                            <th className="pr-4 py-3 text-left text-s font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                            <th className="pr-4 py-3  text-left text-s font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                            <th className="pr-2 py-3 text-left text-s font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="pr-1 py-3 text-left text-s font-medium text-muted-foreground uppercase tracking-wider">Confirmation</th>
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

export default OrderList;