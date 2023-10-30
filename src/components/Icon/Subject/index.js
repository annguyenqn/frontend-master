import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Subject = forwardRef(({ size = 24, className }, ref) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" />
    </svg>
  );
});

Subject.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Subject.displayName = 'Subject';

export default Subject;
