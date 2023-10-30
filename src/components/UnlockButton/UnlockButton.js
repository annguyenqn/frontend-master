import classnames from 'classnames';
import Button from 'components/Button/Button';
import { useModalWalletConnect } from 'hooks/modal/index';

const UnlockButton = ({ className }) => {
  const { onToggleConnectModal } = useModalWalletConnect();

  return (
    <Button className={classnames(className, 'w-full')} onClick={onToggleConnectModal}>
      Connect wallet
    </Button>
  );
};

export default UnlockButton;
