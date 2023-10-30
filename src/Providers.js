import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';

import { RefreshContextProvider } from 'contexts/RefreshContext';
import Web3ProviderNetwork from 'components/Web3ProviderNetwork/Web3ProviderNetwork';
import Web3ReactManager from 'components/Web3ReactManager/Web3ReactManager';
import { getLibrary } from 'utils/web3React';
import store from 'store';

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Web3ReactManager>
            <RefreshContextProvider>{children}</RefreshContextProvider>
          </Web3ReactManager>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
  );
};

export default Providers;
