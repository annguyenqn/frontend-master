import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBanksDataAsync } from './index';

export const useBanks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanksDataAsync());
  }, []);

  const { banks, isDataLoaded } = useSelector((state) => ({
    banks: state.banks.data,
    isDataLoaded: state.banks.isDataLoaded,
  }));

  return { banks, isDataLoaded };
};
