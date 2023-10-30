import { useSelector } from 'react-redux';

export const useGetLands = () => {
  return useSelector((state) => state.lands);
};
