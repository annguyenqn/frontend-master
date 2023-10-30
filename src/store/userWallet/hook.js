import { useSelector } from 'react-redux';

export const useGetUserWallet = () => {
  return useSelector((state) => state.userWallet);
};
