// import React from 'react';
// import PropTypes from 'prop-types'

const starFall = [
  { top: 'top-0 ', left: '-left-1/4' },
  { top: ' top-36', left: 'left-36' },
  { top: 'top-1/4  ', left: 'left-1/4' },
  { top: 'top-0 ', left: '-left-1/4' },
  { top: 'top-0 ', left: '-left-2/3 ' },
  { top: 'top-2/4 ', left: '-left-1/4' },
  { top: 'top-0 ', left: '-left-1/2' },
];

const StarFall = () => {
  return (
    <div className="fixed top-0 left-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 left-0 z-0 w-full h-full star-large"
        style={{
          backgroundImage: `url(/images/homepage/s1.png)`,
          backgroundSize: 'contain',
        }}
      />
      <div
        className="absolute top-0 left-0 z-0 w-full h-full star-medium"
        style={{
          backgroundImage: `url(/images/homepage/s2.png)`,
          backgroundSize: 'contain',
        }}
      />
      <div
        className="absolute top-0 left-0 z-0 w-full h-full star-small"
        style={{
          backgroundImage: `url(/images/homepage/s3.png)`,
          backgroundSize: 'contain',
        }}
      />
      {starFall.map((item, index) => (
        <div key={`starfall-${index}`} className={`absolute ${item.top} ${item.left} star-fall pointer-events-none`}>
          <img src="/images/homepage/starfall.png" className="w-auto h-20" />
        </div>
      ))}
    </div>
  );
};

// StarFall.propTypes = {

// }

export default StarFall;
