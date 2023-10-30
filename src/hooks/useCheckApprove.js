import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import { MARKETPLACE_CONTRACT_ADDRESS } from 'config/contractAddress';
import { useEffect, useState } from 'react';
import { getNFTContract } from 'utils/contractHelper';
import useActiveWeb3React from './useActiveWeb3React';

const useCheckApprove = (nftId = '') => {
  const [isApproved, setApproved] = useState(false);
  const [isApproving, setApproving] = useState(false);
  const { library } = useActiveWeb3React();
  useEffect(() => {
    (async () => {
      try {
        const NFTContract = await getNFTContract(library);
        const tx = await NFTContract.getApproved(nftId);
        setApproved(tx === MARKETPLACE_CONTRACT_ADDRESS);
      } catch (e) {
        setApproved(false);
        console.error(e?.message || e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -----------------------------
  // call transation to arrpove nft
  const setApprove = async () => {
    try {
      await setApproving(true);
      const signer = await library.getSigner();
      const NFTContract = await getNFTContract(signer);
      const tx = await NFTContract.approve(MARKETPLACE_CONTRACT_ADDRESS, nftId);
      await tx.wait();
      await setApproved(!!tx.hash);
      showToastSuccess('Message', 'NFt be approved');
    } catch (e) {
      console.error('Error set approve :>> ', e?.message || e);
      showToastError('Error', e?.error?.message || 'Transation approve fail');
    } finally {
      setApproving(false);
    }
  };

  return [isApproved, setApprove, isApproving];
};

export default useCheckApprove;
