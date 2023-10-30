import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BADGE_PROJECT, STATUS_PROJECT } from 'constants/config';

import RibbonProject from './RibbonProject';

const BadgeProject = ({ status, time }) => {
  return (
    <>
      <div
        className={classNames(
          'absolute z-10 flex items-center py-1 bg-black-3 px-4 rounded-r-3xl',
          BADGE_PROJECT[status]?.text,
        )}
        style={{ left: -1 }}
      >
        <div className={classNames('w-3 h-3 mr-2 rounded-full', BADGE_PROJECT[status]?.bg)} />
        <span className="text-sm-md">{STATUS_PROJECT[status]}</span>
      </div>
      <RibbonProject status={status} time={time} />
    </>
  );
};

BadgeProject.propTypes = {
  status: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(BadgeProject);
