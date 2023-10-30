// import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

const InputSearch = ({ placeholder, className, onChange, value, type }) => {
  return (
    <div className={classNames('relative flex items-center flex-none h-full rounded-xl', className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FiSearch className="text-gray-400 sm:text-sm" />
      </div>
      <input
        type={type || 'text'}
        value={value}
        onChange={onChange}
        name="price"
        id="price"
        className="block w-full h-8 py-5 pl-10 pr-12 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary sm:text-sm-md"
        placeholder={placeholder || 'Search ...'}
      />
    </div>
  );
};

InputSearch.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  type: PropTypes.any,
};

export default InputSearch;
