import { useSelector } from 'react-redux';

export const useGetUserLogin = () => {
  return useSelector((state) => state.userLogin);
};
