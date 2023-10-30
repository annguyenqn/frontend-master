import NFTAbi from 'config/abi/nft.json';
import MarketplaceAbi from 'config/abi/marketplace.json';

import { ethers } from 'ethers';
import { simpleRpcProvider } from 'utils/providers';
import { MARKETPLACE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from 'config/contractAddress';

const getContract = (abi, address, signer) => {
  const signerOrProvider = signer || simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getNFTContract = (signer) => {
  return getContract(NFTAbi, NFT_CONTRACT_ADDRESS, signer);
};

export const getNFTIface = () => {
  return new ethers.utils.Interface(NFTAbi);
};
export const getEventTopicEncoded = (event) => {
  const iface = new ethers.utils.Interface(NFTAbi);
  return iface.getEventTopic(event);
};

export const getEventTopicDecoded = (fragment, data, topics) => {
  const iface = new ethers.utils.Interface(NFTAbi);
  return iface.decodeEventLog(fragment, data, topics);
};

export const getMarketplaceContract = (signer) => {
  return getContract(MarketplaceAbi, MARKETPLACE_CONTRACT_ADDRESS, signer);
};
