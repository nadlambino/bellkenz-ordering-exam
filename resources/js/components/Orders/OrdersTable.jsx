import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function OrdersTable({ orders }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Gross Sales</TableCell>
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
                            <TableCell>{row.product_name}</TableCell>
                            <TableCell>{row.product_price}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.gross_sales}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow
                        sx={{
                            "&:last-child td, &:last-child th": {
                                border: 0,
                            },
                        }}
                    >
                        <TableCell colSpan={3}>Gross Sales</TableCell>
                        <TableCell>
                            {orders.reduce((acc, cur) => {
                                return acc + cur.gross_sales;
                            }, 0)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
