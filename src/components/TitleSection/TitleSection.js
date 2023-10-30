import PropTypes from 'prop-types';

const TitleSection = ({ title, sub, className, bgReverse }) => {
  return (
    <>
      {title && (
        <div
          className={`relative py-2 from-primary to-blue6 ${
            bgReverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
          } ${className}`}
        >
          <span className="absolute px-4 text-xl font-bold text-center uppercase transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2">
            {title}
          </span>
        </div>
      )}
      {sub && <div className="py-8 text-center md:px-20">{sub}</div>}
    </>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.string,
  className: PropTypes.string,
  bgReverse: PropTypes.bool,
};

export default TitleSection;
