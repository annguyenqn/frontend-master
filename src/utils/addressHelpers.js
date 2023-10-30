export const formatAddress = (address) => `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;

export const scanEtherAddress = (address) => {
  if (address && window) {
    window.open(`https://rinkeby.etherscan.io/address/${address}`);
  }
};
