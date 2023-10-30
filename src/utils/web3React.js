import { Web3Provider } from '@ethersproject/providers';

export const getLibrary = (provider) => {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any',
  );
  library.pollingInterval = 15_000;

  return library;
};

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (provider, account, message) => {
  return provider.getSigner(account).signMessage(message);
};
