import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Wallet = forwardRef(({ className, size = 24 }, ref) => {
  return (
    <svg
      className={className}
      id="WalletIcon"
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" />
      <circle cx="16" cy="12" r="1.5" />
    </svg>
  );
});

Wallet.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Wallet.displayName = 'Wallet';

export default Wallet;
