import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import HomeInvoice from './pages/home-invoice';
import Navbar from './components/Navbar';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './components/Footer';
import Invoice from './pages/dashboard/invoice/Invoice';
import ProfilePage from './pages/dashboard/Profilepage';
import InvoicesForApproval from './pages/dashboard/invoice/InvoicesForApproval';
import ApprovedPDFs from './pages/dashboard/invoice/ApprovedPDFs';
import PendingApprovalPDFs from './pages/dashboard/invoice/PendingApproval';
import EarlyPayment from './pages/dashboard/EarlyPayment';
import Settings from './pages/dashboard/Settings';
import Tokens from './pages/dashboard/Tokens'; // Import the Tokens component
import Support from './pages/dashboard/Support';
import AdminDashboard from './pages/dashboard-admin/admin_dashboard';
import AddUser from './pages/dashboard-admin/add_user';
import TotalUsers from './pages/dashboard-admin/Total_Users';
import TotalInvoices from './pages/dashboard-admin/Total_Invoices';
import SellerDashboard from './pages/dashboard-seller/seller_Dashboard';
import SellerApprovedPDFs from './pages/dashboard-seller/invoice/seller_ApprovedPDFs'
import SellerInvoice from './pages/dashboard-seller/seller_Invoice'
import SellerInvoicesForApproval from './pages/dashboard-seller/seller_InvoicesForApproval'
import SellerPendingApprovalPDFs from './pages/dashboard-seller/invoice/seller_PendingApproval'
import seller_EarlyPayments from './pages/dashboard-seller/seller_EarlyPayment'
import SellerProfilePage from './pages/dashboard-seller/seller_Profilepage';
import SellerSupport from './pages/dashboard-seller/seller_Support';
import SellerTokens from './pages/dashboard-seller/seller_Tokens';
import BuyerDashboard from './pages/dashboard-buyer/buyer_dashboard';
import BuyerLenderApproval from './pages/dashboard-buyer/buyer_LenderApproval';
import BuyerStatus from './pages/dashboard-buyer/buyer_Status';
import BuyerReminderPage from './pages/dashboard-buyer/buyer_ReminderPage';
import BuyerInvoiceForApproval from './pages/dashboard-buyer/buyer_InvoiceForApproval';
import LenderDashboard from './pages/dashboard-lender/lender_dashboard';
import LenderProfilePage from './pages/dashboard-lender/lender_profile';
import ViewBuyers from './pages/dashboard-lender/view_buyers';
import LenderInvoiceFunding from './pages/dashboard-lender/lender_invoice_funding';
import PaymentStatus from './pages/dashboard-lender/Payment_status';
import EscrowDashboard from './pages/dashboard-escrow-bank/dashboard_escrow_bank';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    setIsLoggedIn(true);
    history.push('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    history.push('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isLoggedIn ? null : <Navbar />}
      <Container
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/login">
            <LoginForm handleLogin={handleLogin} />
          </Route>
          {isLoggedIn && (
            <Route exact path="/dashboard">
              <Dashboard handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </Route>
          )}


          //admin-dashboard 
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/admin-dashboard/business-list" component={AddUser} />
          <Route exact path="/admin-dashboard/fi-list" component={TotalUsers} />
          <Route exact path="/admin-dashboard/invoices-list" component={TotalInvoices} />
          {/* <Route exact path="/admin-dashboard/transaction" component={} />
          <Route exact path="/admin-dashboard/mezzpro-tokens" component={} />
          <Route exact path="/admin-dashboard/escrow-account" component={} /> */}
          <Route exact path="/admin-dashboard/admins" component={AddUser} />

          
          //seller-dashboard
          <Route exact path="/biz-dashboard" component={SellerDashboard} />
          <Route exact path="/biz-invoice-generated" component={SellerInvoice} />
          <Route exact path="/biz-invoice-recieved" component={SellerInvoicesForApproval} />
          <Route exact path="/biz-tokens" component={SellerTokens} />
          <Route exact path="/biz-escrow-account" component={SellerTokens} />
          <Route exact path="/biz-admin" component={SellerSupport} />
          


          {/* //buyer-dashboard
          <Route exact path="/buyer-dashboard" component={BuyerDashboard} />
          <Route exact path="/buyer-dashboard/invoice-for-approval" component={BuyerInvoiceForApproval} />
          <Route exact path="/buyer-dashboard/status" component={BuyerStatus} />
          <Route exact path="/buyer-dashboard/lender-invoice" component={BuyerLenderApproval} />
          <Route exact path="/buyer-dashboard/reminder-page" component={BuyerReminderPage} /> */}

          //Lender-dashboard
          <Route exact path="/lender-dashboard" component={LenderDashboard} />
          <Route exact path="/lender-dashboard/lender-profile" component={LenderProfilePage} />
          <Route exact path="/lender-dashboard/view-buyers" component={ViewBuyers} />
          <Route exact path="/lender-dashboard/lender-invoice-funding" component={LenderInvoiceFunding} />
          <Route exact path="/lender-dashboard/Payment-status" component={PaymentStatus} />

          {/* //Escrow-dashboard
          <Route exact path="/dashboard-escrow-bank" component={EscrowDashboard} /> */}





          <Route exact path="/home-invoice" component={HomeInvoice} />
          <Route exact path="/dashboard/profile">
            <ProfilePage isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices">
            <Invoice isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/invoiceforapproval">
            <InvoicesForApproval isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/approved_invoices">
            <ApprovedPDFs isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/pending_approval_pdfs">
            <PendingApprovalPDFs isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/earlypayment">
            <EarlyPayment isLoggedIn={isLoggedIn} />
          </Route>
          {/* Include the Tokens route */}
          <Route exact path="/dashboard/tokens">
            <Tokens isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/support">
            <Support isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/settings">
            <Settings isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
