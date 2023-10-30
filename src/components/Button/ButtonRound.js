import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from 'components/Loader/Loader';

const ButtonRound = ({ children, className = '', isLoading, disabled = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(
        'flex items-center rounded-full justify-center transition-opacity',
        disabled ? 'opacity-50 pointer-events-none' : 'hover:opacity-80',
        !className?.includes('border') && 'border border-white-1',
        !className?.includes('px') && 'px-5',
        !className?.includes('py') && 'py-2',
        className,
      )}
    >
      {children} {isLoading && <Loader className="ml-2" size="sm" color="white" />}
    </button>
  );
};

ButtonRound.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ButtonRound;
