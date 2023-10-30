import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from './NetworkConnector';

export const ChainId = {
  MAINNET: 1,
  RINKEBY: 4,
};

export const RPC = {
  [ChainId.MAINNET]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};

export const network = new NetworkConnector({
  defaultChainId: 1,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: [
    1, // mainnet
    4, // rinkeby
  ],
});

export const SUPPORTED_WALLETS = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'injected.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
};
