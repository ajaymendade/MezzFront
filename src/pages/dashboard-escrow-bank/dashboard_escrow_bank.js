import React, { useState, useEffect } from 'react';
import EscrowDashboardNav from './escrow_bank_DashboardNav'; // Assume you have a similar navigation component for Escrow
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
  CircularProgress,
} from '@mui/material';

const EscrowDashboard = () => {
  const [escrowAccount, setEscrowAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/escrow/get_account')
      .then(response => {
        setEscrowAccount(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching escrow account data', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <EscrowDashboardNav />
      <div style={{ marginTop: '64px', padding: '16px', height: '100%' }}>
        <Typography variant="h2" gutterBottom>
          Escrow Dashboard
        </Typography>
        {escrowAccount ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Escrow ID</TableCell>
                  <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Balance</TableCell>
                  <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Bank Name</TableCell>
                  <TableCell style={{ backgroundColor: '#2196f3', color: '#fff' }}>Account Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{escrowAccount.id}</TableCell>
                  <TableCell>{escrowAccount.balance}</TableCell>
                  <TableCell>{escrowAccount.bank_name}</TableCell>
                  <TableCell>{escrowAccount.account_number}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">
            No escrow account information available.
          </Typography>
        )}
      </div>
    </>
  );
};

export default EscrowDashboard;
