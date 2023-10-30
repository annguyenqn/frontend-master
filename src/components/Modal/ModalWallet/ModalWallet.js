import AccountDetails from 'components/AccountDetails/AccountDetails';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ModalTitle from 'components/Modal/ModalTitle';
import Option from 'components/Modal/ModalWallet/Option';
import PendingView from 'components/Modal/ModalWallet/PendingView';
import usePrevious from 'hooks/usePrevious';
import { useEffect, useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected, SUPPORTED_WALLETS } from 'connectors/index';

import { useModalWalletConnect } from 'store/modal/hooks';
import { isMobile } from 'react-device-detect';

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function WalletModal() {
  // console.log({ ENSName })
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error, deactivate } = useWeb3React();

  const { isOpen, onToggleConnectModal } = useModalWalletConnect();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState();

  const [pendingError, setPendingError] = useState();

  const previousAccount = usePrevious(account);

  const handleDisconnect = () => {
    deactivate();
    setWalletView(WALLET_VIEWS.OPTIONS);
  };

  // // close on connection, when logged out before
  useEffect(() => {
    if (!account && isOpen && walletView === WALLET_VIEWS.PENDING) {
      setPendingError(true);
    }
    if (account && !previousAccount && isOpen) {
      onToggleConnectModal();
    }
  }, [account, previousAccount, isOpen, walletView, onToggleConnectModal]);

  // always reset to account view
  useEffect(() => {
    if (isOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [isOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);

  useEffect(() => {
    if (isOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, isOpen, activePrevious, connectorPrevious]);

  const tryActivation = async (connector) => {
    // let name = ''
    let conn;
    if (connector === 'function') {
      await connector();
    }
    conn = connector;

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    setPendingWallet(conn); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    if (conn) {
      try {
        await activate(conn, undefined, true);
      } catch (error) {
        if (error instanceof UnsupportedChainIdError) {
          activate(conn); // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true);
        }
      }
    }
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      // check for mobile options
      if (isMobile) {
        return (
          <Option
            onClick={() => {
              option.connector !== connector && !option.href && tryActivation(option.connector);
            }}
            id={`connect-${key}`}
            key={key}
            active={option.connector && option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={'/images/wallets/' + option.iconName}
          />
        );
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon="/images/wallets/metamask.png"
              />
            );
          } else {
            return null; // dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} // use option.descriptio to bring back multi-line
            icon={'/images/wallets/' + option.iconName}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (error) {
      return (
        <div>
          <ModalTitle onClose={onToggleConnectModal}>
            {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}
          </ModalTitle>
          <div>
            {error instanceof UnsupportedChainIdError ? (
              <h5>Please connect to the appropriate Ethereum network.</h5>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
            <div style={{ marginTop: '1rem' }} />
            <Button className="mx-auto text-white" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>
      );
    }

    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={onToggleConnectModal}
          openOptions={() => {
            setWalletView(WALLET_VIEWS.OPTIONS);
          }}
        />
      );
    }

    return (
      <>
        <ModalTitle onClose={onToggleConnectModal}>Select a Wallet</ModalTitle>
        <div className="flex flex-col w-full space-y-6">
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <div className="flex flex-col space-y-5 overflow-y-auto">{getOptions()}</div>
          )}
        </div>
      </>
    );
  }

  return (
    <Modal
      size={account && walletView === WALLET_VIEWS.ACCOUNT ? '' : 'sm'}
      open={isOpen}
      onClose={onToggleConnectModal}
    >
      {getModalContent()}
    </Modal>
  );
}
