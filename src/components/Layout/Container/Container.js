import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Container = ({ fluid, className, ...props }) => {
  return (
    <div className={classNames('mx-auto xl:px-25 md:px-8 px-2', !fluid && 'max-w-screen-2xl', className)} {...props} />
  );
};

Container.propTypes = {
  className: PropTypes.string,
};

export default React.memo(Container);
