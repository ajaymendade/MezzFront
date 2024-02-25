import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Snackbar,
  Grid,
} from '@mui/material';
import axiosInstance from '../axios';
import LenderDashboardNav from './lender_DashboardNav';


const PaymentStatus = () => {
  const [settlementAmount, setSettlementAmount] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [escrowBalance, setEscrowBalance] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);
  
  // Function to get the auth token from storage
  const getAuthToken = () => localStorage.getItem('token');

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = () => {
    const authToken = getAuthToken();
    axiosInstance.get('/get_balances', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((response) => {
      setEscrowBalance(response.data.escrow_balance);
      setBankBalance(response.data.bank_balance);
    })
    .catch((error) => {
      console.error('Error fetching balances:', error);
      if (error.response && error.response.status === 401) {
        setSnackbarMessage('Authentication failed. Please log in again.');
        setSnackbarOpen(true);
      }
    });
  };

  const handleSettleToBank = () => {
    if (!settlementAmount) {
      setSnackbarMessage('Please enter a settlement amount');
      setSnackbarOpen(true);
      return;
    }

    const authToken = getAuthToken();
    axiosInstance.post('/settle_to_bank', { settlement_amount: settlementAmount }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((response) => {
      setSnackbarMessage('Settlement completed successfully');
      setSnackbarOpen(true);
      fetchBalances(); // Refresh balances after settlement
    })
    .catch((error) => {
      console.error('Error during settlement:', error);
      setSnackbarMessage('Error during settlement. Please try again later.');
      setSnackbarOpen(true);
      if (error.response && error.response.status === 401) {
        // Handle specific 401 Unauthorized response
        setSnackbarMessage('Session expired. Please log in again.');
        setSnackbarOpen(true);
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Settlement
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Settlement Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            value={settlementAmount}
            onChange={(e) => setSettlementAmount(e.target.value)}
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSettleToBank}
          >
            Settle to Bank
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Escrow Balance: {escrowBalance}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Bank Balance: {bankBalance}
      </Typography>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default PaymentStatus;
