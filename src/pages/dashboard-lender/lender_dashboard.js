import React, { useState, useEffect } from 'react';
import LenderDashboardNav from './lender_DashboardNav';
import axiosInstance from '../axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material';

const LenderDashboard = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    axiosInstance.get('/lender/list_buyers')
      .then(response => {
        setBuyers(response.data);
      })
      .catch(error => {
        console.error('Error fetching buyer data', error);
      });
  }, []);

  return (
    <>
      <LenderDashboardNav />
      <div style={{ marginTop: '64px', padding: '16px', height: '100%' }}>
        <Typography variant="h2" gutterBottom>
          Lender Dashboard
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Buyer ID</TableCell>
                <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Total Balance</TableCell>
                <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Buyer Category</TableCell>
                <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Funded Amount</TableCell>
                <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Funding Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buyers.map((buyer, index) => (
                <TableRow key={index}>
                  <TableCell>{buyer.buyer_id}</TableCell>
                  <TableCell>{buyer.total_balance}</TableCell>
                  <TableCell>{buyer.buyer_category}</TableCell>
                  <TableCell>{buyer.funded_amount}</TableCell>
                  <TableCell>{buyer.funding_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default LenderDashboard;
