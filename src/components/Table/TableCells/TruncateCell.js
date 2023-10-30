import PropTypes from 'prop-types';

const TruncateCell = ({ className, data, image, ...props }) => {
  return (
    <div className={className} {...props}>
      <img src={image} alt={image} className="object-cover w-20 h-12 mr-2" />
      <p className="truncate">{data}</p>
    </div>
  );
};

TruncateCell.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  data: PropTypes.any,
};

export default TruncateCell;
