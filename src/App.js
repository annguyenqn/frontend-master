import WalletModal from 'components/Modal/ModalWallet/ModalWallet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { ToastContainer } from 'react-toastify';

import ComingSoonPage from 'views/ComingSoonPage';
import LayoutAccount from './components/LayoutAccount/LayoutAccount';

// import { usePollBlockNumber } from 'store/block/hook'
// This config is required for number formatting
import HomePage from 'views/Home/Home';
import LandPage from 'views/Land/Land';
import CallInvestmentPage from 'views/CallInvestment/CallInvestment';
import LandDetailPage from 'views/LandDetail/LandDetail';
import RegistorLoginPage from 'views/RegistorLogin/RegistorLogin';
import ForgetPasswordPage from 'views/ForgetPassword/ForgetPassword';
import AccountPage from 'views/Account/Account';
import SettingsPage from 'views/Settings/Settings';
import InvestmentProductsPage from 'views/InvestmentProducts/InvestmentProducts';
import ScollToTopButton from 'components/Button/ScrollToTopButton';
import AboutUsPage from 'views/AboutUs/AboutUs';
import QuyDinhPage from 'views/QuyDinh';
import PaymePaymentPage from 'views/PaymePayment';
import AdminPage from 'views/Admin/Admin';
import AdminLandPage from 'views/Admin/Land';
import TokenView from 'views/TokenViewTest/TokenView';
import AdminLandCreateEditPage from 'views/Admin/Land/LandCreateEdit';
import AdminUser from 'views/Admin/User/User';
import AdminReportPaymentHistory from 'views/Admin/Report/PaymentHistory';
import NotMatch from 'views/NotMatch';
import FAQ from 'views/FAQ/FAQ';
import ReferralPage from 'views/Referral';
import AdminRefund from 'views/Admin/Refund';
import AdminRefundList from 'views/Admin/Refund/RefundList';
import AdminExpiredAsset from 'views/Admin/Refund/ExpiredAsset';
import CoinCreateForm from 'views/TokenViewTest/CoinCreateForm';
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

function App() {
  // usePollBlockNumber();

  return (
    <Router>
      <ScollToTopButton />
      <Switch>
        <Route path="/TokenView" exact>
          <TokenView />
        </Route>
        <Route path="/TokenViewTest/CoinCreateForm" exact>
          <CoinCreateForm />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/land" exact>
          <LandPage />
        </Route>
        <Route path="/land/detail/:id">
          <LandDetailPage />
        </Route>
        <Route path="/call-investment/:id">
          <CallInvestmentPage />
        </Route>
        <Route path="/trade-p2p" exact>
          <ComingSoonPage />
        </Route>
        <Route path="/news" exact>
          <ComingSoonPage />
        </Route>
        <Route path="/about-us" exact>
          <AboutUsPage />
        </Route>
        <Route path="/quy-dinh" exact>
          <QuyDinhPage />
        </Route>
        <Route path="/register" exact>
          <RegistorLoginPage />
        </Route>
        <Route path="/login" exact>
          <RegistorLoginPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgetPasswordPage />
        </Route>
        <Route path="/payment/payme/:status" exact>
          <PaymePaymentPage />
        </Route>
        // account
        <Route path="/account" exact>
          <LayoutAccount>
            <AccountPage />
          </LayoutAccount>
        </Route>
        <Route path="/settings" exact>
          <LayoutAccount>
            <SettingsPage />
          </LayoutAccount>
        </Route>
        <Route path="/investment-products" exact>
          <LayoutAccount>
            <InvestmentProductsPage />
          </LayoutAccount>
        </Route>
        <Route path="/referral" exact>
          <LayoutAccount>
            <ReferralPage />
          </LayoutAccount>
        </Route>
        <Route path="/admin" exact>
          <AdminPage />
        </Route>
        <Route path="/admin/users" exact>
          <AdminUser />
        </Route>
        <Route path="/admin/lands" exact>
          <AdminLandPage />
        </Route>
        <Route path="/admin/lands/create" exact>
          <AdminLandCreateEditPage />
        </Route>
        <Route path="/admin/lands/:id/edit" exact>
          <AdminLandCreateEditPage />
        </Route>
        <Route path="/admin/report/payment-history" exact>
          <AdminReportPaymentHistory />
        </Route>
        <Route path="/admin/refund" exact>
          <AdminRefund />
        </Route>
        <Route path="/admin/refund/expired-asset" exact>
          <AdminExpiredAsset />
        </Route>
        <Route path="/admin/refund/:id" exact>
          <AdminRefundList />
        </Route>
        <Route path="/faq" exact>
          <FAQ />
        </Route>
        <Route>
          <NotMatch />
        </Route>
      </Switch>
      <ToastContainer newestOnTop />
      <WalletModal />
    </Router>
  );
}

export default App;
