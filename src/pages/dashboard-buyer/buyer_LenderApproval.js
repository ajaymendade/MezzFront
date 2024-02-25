import React from 'react';
import BuyerDashboardNav from './buyer_DashboardNav';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const BuyerLenderApproval = () => {
  // Static data for demonstration purposes
  const demoData = [
    {
      invoice_id: 'INV-001',
      total_amount: '$500.00',
      duedate: '2024-12-31',
      buyer_approval: 'Approved',
      lender_approval: 'Yes',
      lender_id: 'LEND-001',
      financed_amount: '$300.00'
    },
    {
      invoice_id: 'INV-002',
      total_amount: '$800.00',
      duedate: '2024-11-30',
      buyer_approval: 'Pending',
      lender_approval: 'No',
      lender_id: '',
      financed_amount: ''
    },
    {
      invoice_id: 'INV-003',
      total_amount: '$1200.00',
      duedate: '2024-10-15',
      buyer_approval: 'Approved',
      lender_approval: 'Yes',
      lender_id: 'LEND-002',
      financed_amount: '$800.00'
    },
    {
      invoice_id: 'INV-004',
      total_amount: '$600.00',
      duedate: '2024-09-28',
      buyer_approval: 'Approved',
      lender_approval: 'Yes',
      lender_id: 'LEND-003',
      financed_amount: '$450.00'
    },
    {
      invoice_id: 'INV-005',
      total_amount: '$950.00',
      duedate: '2024-08-20',
      buyer_approval: 'Pending',
      lender_approval: 'No',
      lender_id: '',
      financed_amount: ''
    },
    // Add more demo data as needed
  ];

  return (
    <>
      <BuyerDashboardNav />
      <div style={{ marginTop: '64px', padding: '16px', height: '100%' }}>
        <h2>Lender Approval</h2>
        <TableContainer component={Paper}>
          <Table>
          <TableHead>
  <TableRow style={{ height: '60px' }}>
    <TableCell style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Invoice ID</TableCell>
    <TableCell style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Total Amount</TableCell>
    <TableCell style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Due Date</TableCell>
    <TableCell style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Buyer Approval</TableCell>
    <TableCell style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Lender Approval</TableCell>
    <TableCell style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Lender ID</TableCell>
    <TableCell style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Financed Amount</TableCell>
  </TableRow>
</TableHead>


            <TableBody>
              {demoData.map((row) => (
                <TableRow key={row.invoice_id}>
                  <TableCell>{row.invoice_id}</TableCell>
                  <TableCell>{row.total_amount}</TableCell>
                  <TableCell>{row.duedate}</TableCell>
                  <TableCell>{row.buyer_approval}</TableCell>
                  <TableCell>{row.lender_approval}</TableCell>
                  <TableCell>{row.lender_id}</TableCell>
                  <TableCell>{row.financed_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default BuyerLenderApproval;
