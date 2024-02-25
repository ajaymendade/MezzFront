import React from 'react';
import AdminDashboardNav from './admin_DashboardNav';
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

const AdminDashboardCard = ({ title, value }) => {
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

const AdminDashboard = ({ isLoggedIn }) => {
  // Static data for the admin dashboard
  const adminDetails = {
    totalUsers: 150,
    totalBuyers: 100,
    totalLenders: 50,
    totalTransactions: 500,
    buyersApproved: 75,
    buyersQualified: 90,
    invoicesTokenized: 200,
    invoicesPending: 30,
  };

  return (
    <>
      <AdminDashboardNav />
      <div style={{ marginTop: isLoggedIn ? '64px' : 0, padding: '16px', height: '100%' }}>
        <Typography variant="h2" gutterBottom>
          Mezzpro Admin Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Total Users" value={adminDetails.totalUsers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Total Buyers" value={adminDetails.totalBuyers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Total Lenders" value={adminDetails.totalLenders} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Total Transactions" value={adminDetails.totalTransactions} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Buyers Approved" value={adminDetails.buyersApproved} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Buyers Qualified" value={adminDetails.buyersQualified} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Invoices Tokenized" value={adminDetails.invoicesTokenized} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AdminDashboardCard title="Invoices Pending" value={adminDetails.invoicesPending} />
          </Grid>
        </Grid>
        {/* Additional components or data can be added as needed */}
      </div>
    </>
  );
};

export default AdminDashboard;
