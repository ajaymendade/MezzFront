import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery, Button, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import InvoiceModal from '../../components/dashboard/invoice/InvoiceModal'; // Adjust the import path as necessary
import SellerDashboardNav from './seller_DashboardNav';

const DetailPopUp = ({ open, onClose, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const SellerInvoice = ({ isLoggedIn }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [detailPopUpOpen, setDetailPopUpOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('/biz-invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('There was an error fetching the invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  const handleDetailPopUpOpen = (title, content) => {
    setPopUpContent({ title, content });
    setDetailPopUpOpen(true);
  };

const handleDetailPopUpClose = () => setDetailPopUpOpen(false);
const handleOpenPopUp = (title, content) => {
  setPopUpContent({ title, content });
  handleOpenPopUp(true);
};

const handleClosePopUp = () => {
  handleOpenPopUp(false);
};


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };



  return (
    <>
      <SellerDashboardNav isLoggedIn={isLoggedIn} />
      <div style={{ marginTop: '89px', padding: '16px', height: '100%', position: 'relative' }}>
        {isSmallScreen && (
          <IconButton
            color="primary"
            aria-label="menu"
            onClick={handleMenuOpen}
            style={{
              position: 'absolute',
              top: '0',
              right: '16px',
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {!isSmallScreen && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            style={{
              position: 'absolute',
              top: '0',
              right: '56px',
            }}
          >
            Upload Invoice
          </Button>
        )}

        {isSmallScreen && (
          <Menu
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            style={{ marginTop: '0px' }}
          >
            <MenuItem onClick={handleOpenModal}>Upload Invoice</MenuItem>
          </Menu>
        )}


<TableContainer component={Paper} style={{ marginTop: '20px', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
        <TableCell>Mezzpro ID</TableCell>
        <TableCell>Invoice No</TableCell>
        <TableCell>Invoice Amount</TableCell>
        <TableCell>Payment Due Date</TableCell>
        <TableCell>Buyer Details</TableCell>
        <TableCell>Invoice Approval Status</TableCell>
        <TableCell>Amount Tokenized</TableCell>
        <TableCell>Tokens Eligible for Transfer</TableCell>
        <TableCell>Tokens Available for Early Payment</TableCell>
        <TableCell>Tokens Redeemable on Buyer Payment</TableCell>
        <TableCell>Payment Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {invoices.map((invoice) => (
                <TableRow key={invoice.id} hover onClick={() => handleDetailPopUpOpen('Invoice Details', `Invoice ID: ${invoice.invoice_id}, Total Amount: ${invoice.total_amount}, Due Date: ${invoice.due_date}`)}>
                  <TableCell>{invoice.invoice_id}</TableCell>
                  <TableCell>{invoice.total_amount}</TableCell>
                  <TableCell>{invoice.due_date}</TableCell>
                  <TableCell>{invoice.buyer_details_id}</TableCell>
                  <TableCell>{invoice.approval_status}</TableCell>
                  {/* <TableCell>{invoice.}</TableCell>
                  <TableCell>{invoice.}</TableCell>
                  <TableCell>{invoice.}</TableCell>
                  <TableCell>{invoice.}</TableCell> */}
                  <TableCell>{invoice.status}</TableCell>
                  {/* Render other cells as needed */}
                </TableRow>
              ))}
    </TableBody>
  </Table>
</TableContainer>

<DetailPopUp open={handleOpenPopUp} onClose={handleClosePopUp} title={popUpContent.title}>
  {popUpContent.content}
</DetailPopUp>
      </div>

      <InvoiceModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default SellerInvoice;