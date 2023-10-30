import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Badge = ({ color, children, className, ...props }) => {
  const type = {
    primary: 'bg-primary text-black-1',
    secondary: 'bg-gray-1 text-black-1',
    light: 'bg-white text-black-1',
    danger: 'bg-rose-400 text-black-1',
    info: 'bg-indigo-300 text-black-1',
    warning: 'bg-yellow-400 text-black-1',
    success: 'bg-green-400 text-black-1',
    dark: 'bg-black text-white-1',
  };
  return (
    <span
      className={classNames(
        'rounded-full text-center font-bold px-2 leading-none max-w-full truncate ',
        className,
        type[color] || 'bg-none border',
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(Badge);
