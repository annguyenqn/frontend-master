import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { FiCheck } from 'react-icons/fi';

const SelectSearchable = ({ iconPrepend, options, placeholder, className, onChange, selected, ...props }) => {
  const CustomControl = ({ children, ...props }) => (
    <components.Control {...props}>
      {iconPrepend || <span className="mr-4" />}
      {children}
    </components.Control>
  );

  const CustomOption = ({ children, isSelected, ...props }) => {
    return (
      <components.Option isSelected={isSelected} {...props}>
        <div className="flex pl-2">
          {children}
          {isSelected ? <FiCheck className="inline-block w-5 h-5 ml-auto" aria-hidden="true" /> : null}
        </div>
      </components.Option>
    );
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'var(--color-primary)' : '',
      fontWeight: state.isSelected ? 'bold' : '',
      backgroundColor: state.isFocused ? 'var(--color-black-1)' : 'transparent',
      ':active': {
        backgroundColor: 'var(--color-black-3)',
      },
    }),
    input: (provided) => ({
      ...provided,
      background: 'transparent',
      color: 'white',
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      color: 'white',
      background: 'transparent',
      boxShadow: 'none',
      width: '100%',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
      marginLeft: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--color-white-1)',
    }),
    valueContainer: (provided) => ({
      ...provided,
      color: 'white',
      padding: 0,
      margin: 0,
    }),
    menu: (provided) => ({
      ...provided,
      background: 'var(--color-black-3)',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--color-white-1)',
      ':hover': {
        color: 'var(--color-gray-1)',
      },
    }),
  };

  return (
    <Select
      {...props}
      options={options}
      onChange={onChange}
      styles={customStyles}
      type="text"
      placeholder={placeholder}
      className={classNames(
        'relative text-left border border-gray-200 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm-md',
        className,
      )}
      value={selected}
      components={{
        IndicatorSeparator: () => null,
        Control: CustomControl,
        Option: CustomOption,
      }}
    />
  );
};

SelectSearchable.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  iconPrepend: PropTypes.any,
  onChange: PropTypes.func,
  selected: PropTypes.object,
};

SelectSearchable.defaultProps = {
  options: [],
  placeholder: '',
  className: '',
  iconPrepend: null,
  onChange: () => {},
  selected: {},
};

export default SelectSearchable;
