import * as React from "react";
import OrderForm from "./Orders/OrderForm";
import OrdersTable from "./Orders/OrdersTable";
import { useQuery } from "react-query";

export default function Home() {
    const [isOrderFormOpen, setIsOrderFormOpen] = React.useState(false);

    const { data: orders } = useQuery("orders", async () => {
        const orders = await window.axios.get(`${window.baseUrl}/orders/all`);

        return orders?.data ?? [];
    });

    return (
        <div className="container">
            <OrderForm
                isOpen={isOrderFormOpen}
                setIsOpen={setIsOrderFormOpen}
            />
            <div className="menu">
                <button onClick={() => setIsOrderFormOpen(true)}>
                    New Order
                </button>
            </div>
            <div className="content">
                <OrdersTable orders={orders ?? []} />
            </div>
        </div>
    );
}
