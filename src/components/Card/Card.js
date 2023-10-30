import classNames from 'classnames';
import PropTypes from 'prop-types';

const Card = ({ children, className, color, minWidth, minHeight, maxWidth, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(className, 'rounded-xl bg-blue1 shadow-lg')}
      style={{
        ...(maxWidth && { maxWidth: maxWidth }),
        ...(minWidth && { minWidth: minWidth }),
        ...(minHeight && { minHeight: minHeight }),
        backgroundColor: color === 'primary' ? 'var(--color-primary)' : '',
      }}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
};

export default Card;
