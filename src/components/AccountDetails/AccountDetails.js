import Button from 'components/Button/Button';
import ModalTitle from 'components/Modal/ModalTitle';
import { injected, SUPPORTED_WALLETS } from 'connectors/index';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useGetUserWallet } from 'store/userWallet/hook';
import { formatAddress } from 'utils/addressHelpers';

const AccountDetails = ({ toggleWalletModal, openOptions }) => {
  const { account, connector } = useActiveWeb3React();
  const { balance } = useGetUserWallet();

  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK')),
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];
    return <div className="font-medium text-baseline text-secondary">Connected with {name}</div>;
  }
  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <ModalTitle onClose={toggleWalletModal}>
          <span className="font-bold"> Your wallet</span>
        </ModalTitle>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {formatConnectorName()}
            <div className="flex space-x-3">
              <Button
                className="text-white"
                size="sm"
                onClick={() => {
                  openOptions();
                }}
              >
                Change
              </Button>
            </div>
          </div>
          <div id="web3-account-identifier-row" className="flex flex-col justify-center space-y-3">
            <div className="text-center">
              <p className="hidden text-gray-400 break-words sm:block">{account}</p>
              <p className="block text-gray-400 break-words sm:hidden">{account ? formatAddress(account) : ''}</p>
              <p className="break-words">
                Balance: <span className="text-gray-400">{(+balance)?.toFixed(7)} ETH</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
