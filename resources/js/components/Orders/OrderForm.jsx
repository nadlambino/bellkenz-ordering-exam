import * as React from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQuery } from "react-query";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function OrderForm({ isOpen, setIsOpen }) {
    const { data: products } = useQuery("products", async () => {
        const response = await window.axios.get(
            `${window.baseUrl}/products/all`
        );
        return response?.data ?? [];
    });
    const { data: customers } = useQuery("customers", async () => {
        const response = await window.axios.get(
            `${window.baseUrl}/customers/all`
        );
        return response?.data ?? [];
    });

    const [productId, setProductId] = React.useState("");
    const [customerId, setCustomerId] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const grossSales = React.useMemo(() => {
        if (!productId || quantity === 0) return 0;

        let product = products.filter(
            (product) => product.product_code === productId
        );

        if (product.length === 0) return 0;

        return product[0].product_price * quantity;
    }, [quantity, productId]);

    const {
        mutate: createOrder,
        isSuccess,
        isError,
    } = useMutation(async () => {
        return await window.axios.post(`${window.baseUrl}/orders`, {
            product_code: productId,
            customer_code: customerId,
            quantity: quantity,
        });
    });

    React.useEffect(() => {
        if (isSuccess) {
            alert("Order created successfully");
            setIsOpen(false);
        }
    }, [isSuccess]);

    React.useEffect(() => {
        if (isError) {
            alert("Failed to create an order. Please try again.");
        }
    }, [isError]);

    const handleCreate = () => {
        createOrder();
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose}>
                <DialogTitle>New Order</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="products">Product</InputLabel>
                        <Select
                            labelId="products"
                            label="Product"
                            defaultValue=""
                            value={productId}
                            onChange={({ target }) =>
                                setProductId(target.value)
                            }
                        >
                            {products?.map((product) => (
                                <MenuItem
                                    value={product.product_code}
                                    key={product.product_code}
                                >
                                    {product.product_name}- PHP{" "}
                                    {product.product_price}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="customers">Customer</InputLabel>
                        <Select
                            labelId="customers"
                            label="Customer"
                            defaultValue=""
                            value={customerId}
                            onChange={({ target }) =>
                                setCustomerId(target.value)
                            }
                        >
                            {customers?.map((customer) => (
                                <MenuItem
                                    value={customer.customer_code}
                                    key={customer.customer_code}
                                >
                                    {customer.customer_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="quantity">Quantity</InputLabel>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={({ target }) => setQuantity(target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="gross-sales">Gross Sales</InputLabel>
                        <Input
                            type="number"
                            value={grossSales}
                            disabled={true}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
