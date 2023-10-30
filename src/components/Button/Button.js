import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from 'components/Loader/Loader';

const Button = ({
  children,
  onClick,
  color = 'primary',
  outline = false,
  className,
  isLoading,
  size = 'md',
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        'flex items-center rounded-lg justify-center',
        size === 'md' && 'py-2 px-5',
        size === 'sm' && 'p-2 h-10',
        color === 'primary' && `bg-primary`,
        color === 'secondary' && 'bg-white1 text-white ',
        color === 'blue' && 'bg-blue1 text-white ',
        color === 'danger' && 'bg-red-600 text-white ',
        outline && 'text-primary bg-blue1',
        className,
      )}
      onClick={onClick}
    >
      {children} {isLoading && <Loader className="ml-2" size="sm" color="white" />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
