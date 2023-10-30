import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserPaymentHistoryDataAsync } from './index';

export const useUserPaymentHistory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPaymentHistoryDataAsync({ page: 1 }));
  }, []);

  const { data, isDataLoaded } = useSelector((state) => ({
    data: state.paymentHistory.data,
    isDataLoaded: state.paymentHistory.isDataLoaded,
  }));

  return { data, isDataLoaded };
};
