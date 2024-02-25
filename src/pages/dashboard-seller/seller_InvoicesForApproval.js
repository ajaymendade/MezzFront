import React, { useState, useEffect } from 'react';
import { useMediaQuery, Container, IconButton, Grid, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import axiosInstance from '../axios.js'; // Ensure this points to your configured Axios instance
import SellerDashboardNav from './SellerDashboardNav'; // Adjust the import path as necessary

const SellerInvoicesForApproval = ({ isLoggedIn }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [invoicesData, setInvoicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axiosInstance.get('/came_for_approval')
        .then(response => {
          setInvoicesData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching invoices data:', error);
          setIsLoading(false);
        });
    } else {
      console.error('No valid JWT token found.');
    }
  }, []);

  const handleApproveInvoice = (invoiceId) => {
    axiosInstance.post(`/approve_invoice/${invoiceId}`)
      .then((response) => {
        console.log(response.data);
        alert(`Invoice with ID ${invoiceId} has been approved.`);
      })
      .catch((error) => {
        console.error(`Error approving invoice with ID ${invoiceId}:`, error);
        alert(`Error approving invoice with ID ${invoiceId}. Please try again later.`);
      });
  };

  return (
    <div>
      <SellerDashboardNav isLoggedIn={isLoggedIn} />
      <Container style={{ marginTop: "90px", marginBottom: '20px' }}>
        <h2>Invoices for Approval</h2>
        <TableContainer component={Paper} style={{ width: '100%', marginTop: '25px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mezzpro ID</TableCell>
                <TableCell>Invoice No</TableCell>
                <TableCell>Invoice Amount</TableCell>
                <TableCell>Payment Due Date</TableCell>
                <TableCell>Seller Details</TableCell>
                <TableCell>Invoice Approval Status</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoicesData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.mezzpro_id}</TableCell>
                  <TableCell>{invoice.invoice_id}</TableCell>
                  <TableCell>{invoice.total_amount}</TableCell>
                  <TableCell>{invoice.due_date}</TableCell>
                  <TableCell>{invoice.seller_details}</TableCell>
                  <TableCell>{invoice.approval_status ? 'Approved' : 'Pending'}</TableCell>
                  <TableCell>{invoice.payment_status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => alert(`View Invoice ID: ${invoice.invoice_id}`)}>
                      <Visibility />
                    </IconButton>
                    <Button variant="contained" color="secondary" onClick={() => handleApproveInvoice(invoice.id)}>
                      Approve
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

export default SellerInvoicesForApproval;
