import React from 'react';
import SellerDashboardNav from './seller_DashboardNav';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const SellerDashboardCard = ({ title, value }) => {
  return (
    <Card style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

const SellerDashboard = ({ isLoggedIn }) => {
  // Assume these are the seller details from your API
  const sellerDetails = {
    userId: 'User123',
    balance: '₹437645.45',
    pendingInvoices: 2,
    tokens: 56521,
  };

  return (
    <>
      <SellerDashboardNav isLoggedIn={isLoggedIn} />
      <div style={{ marginTop: isLoggedIn ? '64px' : 0, padding: '16px', height: '100%' }}>
        <Typography variant="h2" gutterBottom>
          BIZ Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <SellerDashboardCard title="User ID" value={sellerDetails.userId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SellerDashboardCard title="Balance" value={sellerDetails.balance} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SellerDashboardCard title="Pending Invoices" value={sellerDetails.pendingInvoices} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SellerDashboardCard title="Tokens" value={sellerDetails.tokens} />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            {/* Use SellerLast10Transactions instead of Last10Transactions */}
            <SellerLast10Transactions />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Use SellerInvoices instead of Invoices */}
            <SellerInvoices />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const SellerLast10Transactions = () => {
  const transactions = [
    { id: 1, name: 'John Doe', amount: '₹150.00' },
    { id: 2, name: 'Jane Smith', amount: '₹300.00' },
    { id: 3, name: 'Michael Johnson', amount: '₹50.00' },
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

const SellerInvoices = () => {
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

export default SellerDashboard;
