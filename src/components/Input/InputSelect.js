import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';

const InputSelect = ({ id, label, className, onChange, size, ...props }) => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        className={classNames(
          'hidden w-4 h-4 text-indigo-600 border-gray-300 rounded input-select focus:ring-indigo-500',
          className,
        )}
        onChange={onChange}
        {...props}
      />

      <label htmlFor={id} className="flex items-center my-1 font-medium leading-none ">
        <div className={classNames(size === 'sm' && 'small', 'relative flex-none check')}>
          <FiCheck
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            strokeWidth="3px"
          />
        </div>
        {label}
      </label>
    </>
  );
};

InputSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
};

export default InputSelect;
