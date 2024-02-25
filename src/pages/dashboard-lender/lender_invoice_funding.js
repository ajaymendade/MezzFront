import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import axiosInstance from '../axios';
import LenderDashboardNav from './lender_DashboardNav';

const LenderInvoiceFunding = ({ isLoggedIn }) => {
  const [invoices, setInvoices] = useState([]);
  const [fundingAmounts, setFundingAmounts] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axiosInstance.get('/lender/fund_invoice') // Make sure to create this endpoint or modify it according to your actual endpoint
        .then((response) => {
          setInvoices(response.data);
          const initialFundingAmounts = {};
          response.data.forEach(invoice => {
            initialFundingAmounts[invoice.id] = '';
          });
          setFundingAmounts(initialFundingAmounts);
        })
        .catch((error) => console.error('Error fetching invoices:', error));
    }
  }, []);

  const handleFundInvoice = (invoiceId) => {
    const amount = fundingAmounts[invoiceId];
    if (!amount) {
      alert('Please enter a funding amount.');
      return;
    }
    axiosInstance.post(`/lender/fund_invoice/${invoiceId}`, { amount })
      .then(() => {
        alert(`Invoice ${invoiceId} funded successfully with amount ${amount}`);
        // Optionally refresh the invoices list or update the status in the UI
      })
      .catch(error => {
        console.error('Error funding invoice:', error);
        alert('Error funding invoice. Please try again.');
      });
  };

  const handleChangeFundingAmount = (invoiceId, amount) => {
    setFundingAmounts(prev => ({ ...prev, [invoiceId]: amount }));
  };

  return (
    <div>
      <LenderDashboardNav isLoggedIn={isLoggedIn} />
      <Container>
        <h2>Fund Invoices</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Fund Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.invoice_id}</TableCell>
                  <TableCell>{invoice.total_amount}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={fundingAmounts[invoice.id]}
                      onChange={(e) => handleChangeFundingAmount(invoice.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleFundInvoice(invoice.id)}>
                      Fund
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default LenderInvoiceFunding;
