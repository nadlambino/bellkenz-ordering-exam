import * as React from "react";
import OrderForm from "./Orders/OrderForm";
import OrdersTable from "./Orders/OrdersTable";

export default function Home() {
    const [isOrderFormOpen, setIsOrderFormOpen] = React.useState(false);

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
                <OrdersTable orders={[]} />
            </div>
        </div>
    );
}
