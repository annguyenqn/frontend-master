// import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const ProgressBar = ({ successRate = 0 }) => {
  return (
    <div className="relative h-2 overflow-hidden bg-black rounded-md">
      <div
        className={classNames('absolute top-0 left-0 h-2 rounded-md bg-primary')}
        style={{
          width: `${successRate * 100}%`,
        }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  successRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProgressBar;
