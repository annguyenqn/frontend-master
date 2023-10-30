import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Facebook = forwardRef(({ size = 41 }, ref) => {
  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M20.5002 0.993408C9.45459 0.993408 0.500122 9.94788 0.500122 20.9935C0.500122 30.9002 7.71056 39.1046 17.1646 40.6933V25.1661H12.34V19.5785H17.1646V15.4584C17.1646 10.6779 20.0844 8.07286 24.3495 8.07286C26.3923 8.07286 28.1478 8.22508 28.6574 8.29212V13.289L25.6992 13.2904C23.3802 13.2904 22.9331 14.3922 22.9331 16.0095V19.5756H28.4665L27.7448 25.1632H22.9331V40.8269C32.8285 39.6225 40.5001 31.2091 40.5001 20.9878C40.5001 9.94788 31.5457 0.993408 20.5002 0.993408Z"
          fill="white"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width={40} height={40} fill="white" transform="translate(0.500122 0.910156)"></rect>
        </clipPath>
      </defs>
    </svg>
  );
});

Facebook.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Facebook.displayName = 'Facebook';

export default Facebook;
