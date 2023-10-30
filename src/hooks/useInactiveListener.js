import { useEffect } from 'react';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { useGetUserWallet } from 'store/userWallet/hook';
import { useDispatch } from 'react-redux';
import { setUserChainId } from 'store/userWallet';

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
function useInactiveListener(suppress = false) {
  const { active, error, activate, deactivate } = useWeb3ReactCore(); // specifically using useWeb3React because of what this hook does
  const { chainId } = useGetUserWallet(); // chain id current
  const dispatch = useDispatch();

  useEffect(() => {
    const { ethereum } = window;
    if (!chainId) {
      dispatch(setUserChainId(+ethereum?.chainId));
    }
    if (ethereum && ethereum.on && !error && !suppress) {
      const handleChainChanged = () => {
        if (chainId !== +ethereum?.chainId) {
          dispatch(setUserChainId(+ethereum?.chainId));
        }
        deactivate();
      };

      const handleAccountsChanged = () => {
        deactivate();
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate, deactivate, chainId, dispatch]);
}

export default useInactiveListener;
