import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Snackbar,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import SellerDashboardNav from './seller_DashboardNav';
import axiosInstance from '../axios';

const SellerEarlyPayment = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    axiosInstance
      .get('/get_transaction_details')
      .then((response) => {
        console.log('Received transaction details:', response.data);
        setTransactions(response.data.received_transactions); // Assuming the backend only sends received transactions
      })
      .catch((error) => {
        console.error('Error fetching transaction details:', error);
      });
  }, []);

  const handleRequestEarlyPayment = () => {
    axiosInstance
      .post('/request_early_payment', { invoice_id: invoiceId })
      .then((response) => {
        setSnackbarMessage('Early payment requested successfully');
        setSnackbarOpen(true);
        // Optionally fetch updated transactions here if needed
      })
      .catch((error) => {
        console.error('Error requesting early payment:', error);
        setSnackbarMessage('Error requesting early payment. Please try again later.');
        setSnackbarOpen(true);
      });
  };

  const handleSettlePayment = (transactionId) => {
    axiosInstance
      .post(`/settle_payment/${transactionId}`)
      .then((response) => {
        setSnackbarMessage('Payment settled successfully');
        setSnackbarOpen(true);
        setUserBalance(response.data.bank_balance); // Update user balance with response from backend
      })
      .catch((error) => {
        console.error('Error settling payment:', error);
        setSnackbarMessage('Error settling payment. Please try again later.');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <SellerDashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h2" gutterBottom>
          Early Payment Page
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Invoice ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequestEarlyPayment}
            >
              Request Early Payment
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" gutterBottom>
          Received Transactions
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell align="right">Sender ID</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Transaction Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell component="th" scope="row">
                    {transaction.transaction_id}
                  </TableCell>
                  <TableCell align="right">{transaction.sender_id}</TableCell>
                  <TableCell align="right">{transaction.amount}</TableCell>
                  <TableCell align="right">{transaction.transaction_date}</TableCell>
                  <TableCell align="right">{transaction.status}</TableCell>
                  <TableCell align="right">
                    {transaction.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSettlePayment(transaction.transaction_id)}
                      >
                        Settle Payment
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" sx={{ mt: 2 }}>
          User Balance: {userBalance}
        </Typography>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Container>
    </div>
  );
};

export default SellerEarlyPayment;

          