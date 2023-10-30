import classnames from 'classnames';
import PropTypes from 'prop-types';

export const ErrorSpan = ({ message }) => {
  return <span className={`text-xs text-red-400 ${message ? '' : 'opacity-0'}`}>* {message || 'Invalid'}</span>;
};

ErrorSpan.propTypes = {
  message: PropTypes.string,
};

const Input = ({ className, isValid = false, ...props }) => {
  return (
    <input
      {...props}
      className={classnames(
        className,
        'p-4 bg-transparent rounded-xl w-full border focus:outline-none',
        props.disabled && 'opacity-70',
        isValid && 'border-red-400',
      )}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  isValid: PropTypes.bool,
};
Input.errorText = ErrorSpan;

export const InputCustom = ({ className, register, label, rules, ...rest }) => {
  return (
    <input
      {...rest}
      {...register(label, rules)}
      className={classnames(
        'w-full p-2 px-4 border-gray-200 border focus:outline-none',
        rest.disabled && 'opacity-70',
        className,
      )}
    />
  );
};

InputCustom.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  register: PropTypes.any,
};

export default Input;
