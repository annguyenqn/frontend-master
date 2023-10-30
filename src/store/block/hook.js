import { useDispatch, useSelector } from 'react-redux';
import useRefresh from 'hooks/useRefresh';
import { simpleRpcProvider } from 'utils/providers';
import { setBlock } from './index';
import { useEffect } from 'react';
import { fetchPricesDataAsync } from '../prices';

export const usePollBlockNumber = () => {
  const dispatch = useDispatch();
  const { fastRefresh } = useRefresh();

  const fetchBlock = async () => {
    const blockNumber = await simpleRpcProvider.getBlockNumber();
    dispatch(setBlock(blockNumber));
  };

  useEffect(() => {
    fetchBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchBlock();
    }, 6000);

    dispatch(fetchPricesDataAsync());

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fastRefresh]);
};

export const useBlock = () => {
  return useSelector((state) => state.block);
};

export const useCurrentBlock = () => {
  return useSelector((state) => state.block.currentBlock);
};
