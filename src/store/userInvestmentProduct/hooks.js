import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserInvestmentProductsDataAsync, fetchUserInvestmentProductsFinishedDataAsync } from './index';

export const useUserInvestmentProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInvestmentProductsDataAsync({ page: 1 }));
  }, []);

  const { data, isDataLoaded } = useSelector((state) => ({
    data: state.userInvestmentProducts.products,
    isDataLoaded: state.userInvestmentProducts.isDataLoadedProducts,
  }));

  return { data, isDataLoaded };
};

export const useUserInvestmentProductsFinished = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInvestmentProductsFinishedDataAsync({ page: 1 }));
  }, []);

  const { data, isDataLoaded } = useSelector((state) => ({
    data: state.userInvestmentProducts.productsFinished,
    isDataLoaded: state.userInvestmentProducts.isDataLoadedProductsFinished,
  }));

  return { data, isDataLoaded };
};
