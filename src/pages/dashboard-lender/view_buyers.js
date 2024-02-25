import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  CircularProgress, // Import to show loading state
} from '@mui/material';
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';
import axiosInstance from '../axios';
import LenderDashboardNav from './lender_DashboardNav';

const ViewBuyers = ({ isLoggedIn }) => {
  const [buyers, setBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axiosInstance
        .get('/lender/list_buyers')
        .then((response) => {
          setBuyers(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching buyers data:', error);
          setIsLoading(false);
        });
    } else {
      console.error('No valid JWT token found.');
      setIsLoading(false);
    }
  };

  const handleApproveBuyer = (buyerId, fundedAmount) => {
    if (!fundedAmount || fundedAmount <= 0) {
      alert('Please enter a valid funded amount.');
      return;
    }
    
    axiosInstance
      .post(`/lender/approve_buyer/${buyerId}`, { funded_amount: fundedAmount })
      .then((response) => {
        alert(`Buyer with ID ${buyerId} has been approved with amount ${fundedAmount}.`);
        fetchBuyers(); // Re-fetch buyers to update the list
      })
      .catch((error) => {
        console.error(`Error approving buyer with ID ${buyerId}:`, error);
        alert(`Error approving buyer with ID ${buyerId}. Please try again later.`);
      });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <LenderDashboardNav isLoggedIn={isLoggedIn} />
      <Container style={{ marginTop: '90px', marginBottom: '20px' }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Buyers for Approval
        </Typography>
        <TableContainer component={Paper} style={{ marginTop: '25px' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#2196f3' }}>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Buyer ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Total Balance</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Funded Amount</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buyers.map((buyer) => (
                <TableRow key={buyer.buyer_id}>
                  <TableCell>{buyer.buyer_id}</TableCell>
                  <TableCell>{buyer.total_balance}</TableCell>
                  <TableCell>{buyer.buyer_category}</TableCell>
                  <TableCell>
                    {/* Add TextField for funded amount */}
                    {buyer.buyer_category !== 'Approved' ? (
                      <TextField
                        type="number"
                        label="Funded Amount"
                        value={buyer.funded_amount}
                        onChange={(e) =>
                          setBuyers((currentBuyers) =>
                            currentBuyers.map((b) =>
                              b.buyer_id === buyer.buyer_id
                                ? { ...b, funded_amount: e.target.value }
                                : b
                            )
                          )
                        }
                      />
                    ) : (
                      <Typography>{buyer.funded_amount}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => alert(`View Buyer ID: ${buyer.buyer_id}`)}>
                      <Visibility />
                    </IconButton>
                    {buyer.buyer_category !== 'Approved' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApproveBuyer(buyer.buyer_id, buyer.funded_amount)}
                      >
                        Approve
                      </Button>
                    )}
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

export default ViewBuyers;
