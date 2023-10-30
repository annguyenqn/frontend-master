import { configureStore } from '@reduxjs/toolkit';

import blockReducer from './block';
import modalReducer from './modal';
import userWalletReducer from './userWallet';
import userLoginReducer from './userLogin';
import banksReducer from './banks';
import landsReducer from './lands';
import paymentHistoryReducer from './paymentHistory';
import userInvestmentProductsReducer from './userInvestmentProduct';
import userReferralReducer from './referral';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    userWallet: userWalletReducer,
    userLogin: userLoginReducer,
    block: blockReducer,
    modal: modalReducer,
    banks: banksReducer,
    lands: landsReducer,
    paymentHistory: paymentHistoryReducer,
    userInvestmentProducts: userInvestmentProductsReducer,
    userReferral: userReferralReducer,
  },
});

export default store;
