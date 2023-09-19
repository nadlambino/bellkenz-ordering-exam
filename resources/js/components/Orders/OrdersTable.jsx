import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMutation } from "react-query";

export default function OrdersTable({ orders }) {
    const { mutate: cancelOrder, isSuccess } = useMutation(async (orderId) => {
        return window.axios.put(`${window.baseUrl}/orders/cancel/${orderId}`);
    });

    React.useEffect(() => {
        if (isSuccess) {
            alert("Order cancelled");
        }
    }, [isSuccess]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Order Number</TableCell>
                        <TableCell>Gross Sales</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{row.customer.customer_name}</TableCell>
                            <TableCell>Order {row.order_number}</TableCell>
                            <TableCell>{row.gross_sales}</TableCell>
                            <TableCell>
                                <button disabled={row.status === "cancelled"}>
                                    Edit
                                </button>
                                <button
                                    disabled={row.status === "cancelled"}
                                    onClick={() =>
                                        cancelOrder(row.order_number)
                                    }
                                >
                                    Cancel
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
