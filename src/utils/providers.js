import { showToastError } from 'components/CustomToast/CustomToast';
import { ChainId, RPC } from 'connectors/index';
import { ethers } from 'ethers';

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC[ChainId.RINKEBY]);

export const switchChain = async (provider, chainId) => {
  try {
    if ((provider, chainId)) {
      await provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    }
  } catch (e) {
    console.error(e?.message || 'Error wallet_switchEthereumChain');
    if (e?.code === -32002) {
      showToastError('', 'Your request is already. Please checkout your wallet or wait a moment');
    }
  }
};
