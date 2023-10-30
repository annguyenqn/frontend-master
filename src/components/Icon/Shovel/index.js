import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Shovel = forwardRef(({ size = 100, className, ...props }, ref) => {
  return (
    <svg
      {...props}
      ref={ref}
      width={size}
      height={size}
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M49.521,69.336l-7.07-7.07l35.762-35.765l7.073,7.07L90,28.857L71.143,10l-4.714,4.714l7.07,7.073L37.737,57.552  l-7.073-7.073c-1.302-1.302-3.411-1.302-4.714,0l-8.047,8.047C12.637,63.789,10.007,70.7,10,77.607  c-0.003,3.522,0.69,7.024,2.054,10.342c3.305,1.36,6.813,2.054,10.339,2.051c6.901-0.003,13.812-2.64,19.082-7.903l8.047-8.047  C50.82,72.751,50.827,70.638,49.521,69.336z" />
    </svg>
  );
});

Shovel.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Shovel.displayName = 'Shovel';

export default Shovel;
