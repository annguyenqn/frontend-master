import Button from 'components/Button/Button';
import Dots from 'components/Loader/Dots';
import Option from './Option';
import { injected, SUPPORTED_WALLETS } from 'connectors/index';

export default function PendingView({ connector, error = false, setPendingError, tryActivation }) {
  const isMetamask = window?.ethereum?.isMetaMask;

  return (
    <div>
      <div>
        <div className="pt-3 py-5">
          {error ? (
            <div>
              <div>Error connecting.</div>
              <Button
                className="mt-2"
                onClick={() => {
                  setPendingError(false);
                  connector && tryActivation(connector);
                }}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <Dots>Initializing</Dots>
          )}
        </div>
      </div>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key];
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null;
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null;
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={'/images/wallets/' + option.iconName}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
