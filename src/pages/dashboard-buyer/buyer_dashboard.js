import React, { useState, useEffect } from 'react';
import BuyerDashboardNav from './buyer_DashboardNav';
import axiosInstance from '../axios';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
  Box,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const BuyerDashboardCard = ({ title, value }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Card style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant={isSmallScreen ? 'h5' : 'h4'}>{value}</Typography>
      </CardContent>
    </Card>
  );
};

const BuyerLast10Transactions = () => {
  const transactions = [
    { id: 1, name: 'John Doe', amount: '₹150.00' },
    { id: 2, name: 'Jane Smith', amount: '₹300.00' },
    // Add more transactions as needed
  ];

  return (
    <Card style={{ marginBottom: '20px', height: '100%', maxWidth: '600px' }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="#4caf50"
          padding="16px"
        >
          <Typography variant="h6" style={{ color: '#fff' }}>
            Last 10 Transactions
          </Typography>
        </Box>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                      Transaction ID: {transaction.id} | User ID: {transaction.name}
                    </Typography>
                    <Typography variant="h6">{transaction.amount}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const BuyerInvoices = () => {
  const invoices = [
    { id: 'INV-001', status: 'Paid' },
    { id: 'INV-002', status: 'Pending' },
    // Add more invoices as needed
  ];

  return (
    <Card style={{ marginBottom: '20px', height: '100%', maxWidth: '600px' }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="#3f51b5"
          padding="16px"
        >
          <Typography variant="h6" style={{ color: '#fff' }}>
            Invoices
          </Typography>
        </Box>
        <List>
          {invoices.map((invoice) => (
            <ListItem key={invoice.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                      <span style={{ marginRight: '10px' }}>Invoice ID: {invoice.id}</span>
                    </Typography>
                    <Typography variant="h6">{invoice.status}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const BuyerDashboard = () => {
  // Assume these are the buyer details from your API
  const buyerDetails = {
    username: 'JohnDoe',
    balance: '₹437645.45',
    pendingInvoices: 2,
    Category : 'Approved'
  };

  return (
    <>
      <BuyerDashboardNav />
      <div style={{ marginTop: '64px', padding: '16px', height: '100%' }}>
        <h2>Buyer Dashboard</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <BuyerDashboardCard title="Username" value={buyerDetails.username} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BuyerDashboardCard title="Balance" value={buyerDetails.balance} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BuyerDashboardCard title="Pending invoices" value={buyerDetails.pendingInvoices} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BuyerDashboardCard title="Category" value={buyerDetails.Category} />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <BuyerLast10Transactions />
          </Grid>
          <Grid item xs={12} md={6}>
            <BuyerInvoices />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BuyerDashboard;

// const BuyerDashboard = ({ history }) => {
//   const [buyerInfo, setBuyerInfo] = useState({
//     total_balance: 0,
//     buyer_category: '',
//     invoices: []
//   });

//   const formatCurrency = (amount) => {
//     return `$${Number(amount).toFixed(2)}`;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   useEffect(() => {
//     const fetchBuyerData = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         if (token) {
//           // Set the token in Axios instance headers for authorization
//           axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//           // Fetch buyer data using the token
//           const [dashboardResponse, invoicesResponse] = await Promise.all([
//             axiosInstance.get('/buyer_dashboard'),
//             axiosInstance.get('/buyer_invoices')
//           ]);

//           setBuyerInfo({
//             ...dashboardResponse.data,
//             invoices: invoicesResponse.data.invoices
//           });
//         } else {
//           // No valid token found, redirect to the login page
//           history.push('/login');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchBuyerData();
//   }, [history]);

//   const renderInvoiceRows = () => {
//     return buyerInfo.invoices.map((invoice) => (
//       <tr key={invoice.invoice_id}>
//         <td>{invoice.invoice_id}</td>
//         <td>{formatCurrency(invoice.total_amount)}</td>
//         <td>{formatDate(invoice.due_date)}</td>
//         <td>{invoice.approval_status ? 'Approved' : 'Pending Approval'}</td>
//         <td>{invoice.seller_info.seller_company_name}</td>
//         <td>{invoice.seller_info.seller_email}</td>
//         <td>{invoice.seller_info.seller_contact}</td>
//         <td>
//           <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
//             View Invoice
//           </a>
//         </td>
//       </tr>
//     ));
//   };

//   return (
//     <>
//       <BuyerDashboardNav />
//       <div style={{ marginTop: '64px', padding: '16px', height: '100%' }}>
//         <h2>Buyer Dashboard</h2>
//         <div>
//           <span>Balance: {formatCurrency(buyerInfo.total_balance)}</span>
//           <span>Category: {buyerInfo.buyer_category}</span>
//           <span>
//             Pending Invoices: {buyerInfo.invoices.filter((invoice) => !invoice.approval_status).length}
//           </span>
//         </div>
//         <div>
//           <h3>Invoices</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Invoice ID</th>
//                 <th>Total Amount</th>
//                 <th>Due Date</th>
//                 <th>Status</th>
//                 <th>Seller Company</th>
//                 <th>Seller Email</th>
//                 <th>Seller Contact</th>
//                 <th>View</th>
//               </tr>
//             </thead>
//             <tbody>{renderInvoiceRows()}</tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BuyerDashboard;
