import classnames from 'classnames';
import PropTypes from 'prop-types';

const Switch = ({ label, checked, onChange, classNameLabel, className, id = 'idDefault' }) => {
  return (
    <div className={classnames('flex items-center justify-center', className)}>
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input checked={checked} value={checked} onChange={onChange} type="checkbox" id={id} className="sr-only" />
          <div
            className={classnames(
              'block  w-10 h-6 rounded-full transition-all duration-300',
              checked ? 'bg-primary' : 'bg-gray-600',
            )}
          ></div>
          <div
            className={classnames(
              'dot absolute top-1 bg-white w-4 h-4 rounded-full transition-all duration-300',
              checked ? 'left-5' : 'left-1',
            )}
          ></div>
        </div>
        <div className={classnames(classNameLabel, 'ml-3 font-medium')}>{label}</div>
      </label>
    </div>
  );
};

Switch.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  classNameLabel: PropTypes.string,
  className: PropTypes.string,
};

export default Switch;
