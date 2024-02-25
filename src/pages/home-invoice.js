import React, { useState } from 'react';
import { Typography, Button, TextField, Container, Box, Paper } from '@mui/material';
import axiosInstance from './axios.js';

const HomeInvoice = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('invoice_file', file);

      axiosInstance
        .post('/test_invoice', formData)
        .then((response) => {
          console.log('Response from the backend:', response.data);
          const {
            invoice_id,
            total_amount,
            seller_company_name,
            buyer_company_name,
            gstin_valid,
            seller_gstin,
            buyer_gstin,
            seller_gstin_valid,
            buyer_gstin_valid,
          } = response.data;

          const extractedData = {
            invoice_id,
            total_amount,
            seller_company_name,
            buyer_company_name,
            seller_gstin,
            buyer_gstin,
            seller_gstin_valid,
            buyer_gstin_valid,
            gstin_valid,
          };
          setExtractedData(extractedData);
        })
        .catch((error) => {
          console.error('Error from the backend:', error);
          alert('Failed to extract data from the PDF. Please try again.');
        });
    } else {
      setSelectedFile(null);
      alert('Please select a PDF file.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={3} textAlign="center">
        <Typography variant="h4">Invoice Testing Page</Typography>
      </Box>

      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span">
              Upload PDF
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body2" color="text.secondary" mt={2}>
              Selected File: {selectedFile.name}
            </Typography>
          )}

          {extractedData && (
            <Box mt={3}>
              <Typography variant="subtitle1">Extracted Data:</Typography>
              {/* Display the fields extracted from the invoice */}
              <TextField
                label="Invoice ID"
                variant="outlined"
                margin="normal"
                value={extractedData.invoice_id || ''}
                fullWidth
                disabled
              />
              <TextField
                label="Total Amount"
                variant="outlined"
                margin="normal"
                value={extractedData.total_amount || ''}
                fullWidth
                disabled
              />
              <TextField
                label="Seller Company Name"
                variant="outlined"
                margin="normal"
                value={extractedData.seller_company_name || ''}
                fullWidth
                disabled
              />
              <TextField
                label="Buyer Company Name"
                variant="outlined"
                margin="normal"
                value={extractedData.buyer_company_name || ''}
                fullWidth
                disabled
              />
              <TextField
                label="Seller GSTIN"
                variant="outlined"
                margin="normal"
                value={extractedData.seller_gstin || ''}
                fullWidth
                disabled
              />
              <TextField
                label="Buyer GSTIN"
                variant="outlined"
                margin="normal"
                value={extractedData.buyer_gstin || ''}
                fullWidth
                disabled
              />
              {/* Display GSTIN details for Seller */}
              <Typography variant="subtitle1">Seller GSTIN Details:</Typography>
              <Typography variant="body1">
                GSTIN: {extractedData.seller_gstin || 'N/A'}
              </Typography>
              <Typography
                variant="body1"
                color={extractedData.seller_gstin_valid ? 'green' : 'red'}
              >
                Status: {extractedData.seller_gstin_valid ? 'Valid' : 'Invalid'}
              </Typography>

              {/* Display GSTIN details for Buyer */}
              <Typography variant="subtitle1">Buyer GSTIN Details:</Typography>
              <Typography variant="body1">
                GSTIN: {extractedData.buyer_gstin || 'N/A'}
              </Typography>
              <Typography
                variant="body1"
                color={extractedData.buyer_gstin_valid ? 'green' : 'red'}
              >
                Status: {extractedData.buyer_gstin_valid ? 'Valid' : 'Invalid'}
              </Typography>

              {/* Invitation to the platform */}
              {extractedData?.seller_gstin_valid && extractedData?.buyer_gstin_valid && (
                <Box mt={3}>
                  <Typography variant="h6" color="primary">
                    Congratulations! This Invoice Can be tokenized.
                  </Typography>
                  <Typography variant="body1">
                    You are invited to the MezzPro platform to avail its benefits.
                  </Typography>
                  <Button
                    component="a"
                    href="http://localhost:3000/register"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    style={{ width: '80%', marginTop: 20 }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default HomeInvoice;
