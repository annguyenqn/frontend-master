import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiCheckCircle, FiChevronDown, FiX } from 'react-icons/fi';
import classNames from 'classnames';

const SelectMenuSelectable = ({ className, classNameButton, label, iconAppend, menuList, title }) => {
  const [selected, setSelected] = useState([menuList[0], menuList[1]]);

  const handleChange = (e) => {
    setSelected((pre) => {
      const newData = pre.filter((item) => item.id !== e.id);
      if (pre.length === newData.length) {
        newData.push(e);
      }
      return newData;
    });
  };

  const handleClear = (id) => {
    setSelected((pre) => pre.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setSelected([]);
  };

  return (
    <div>
      <Listbox onChange={handleChange}>
        <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
        <div className={`relative ${className}`}>
          <Listbox.Button
            className={classNames(
              'relative w-full py-1 pl-3 pr-3 text-left  border border-gray-200 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm',
              classNameButton,
              iconAppend && 'pr-12',
            )}
          >
            <span className="flex items-center">
              <span className="block ml-1 truncate">{title}</span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
              {iconAppend && <FiChevronDown className="w-5 h-5" aria-hidden="true" />}
            </span>
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {menuList.map((item) => {
                const isSelected = selected.find((i) => i.id === item.id);
                return (
                  <Listbox.Option
                    key={item.id}
                    className={classNames(
                      isSelected ? 'text-blue5' : 'pl-10',
                      'cursor-pointer select-none relative py-3 pl-3 hover:bg-gray-100',
                    )}
                    value={item}
                  >
                    {isSelected && <FiCheckCircle size="1.2rem" className="inline-block mr-2 text-primary" />}
                    {item.name}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <div className="flex space-x-2 text-sm-md">
        {selected.map((item) => (
          <div
            key={item?.id}
            className="flex items-center px-4 py-2 my-2 bg-white border border-gray-200 rounded-lg max-w-max"
          >
            {item.name}
            <div onClick={() => handleClear(item.id)}>
              <FiX size="1.2rem" className="ml-2 cursor-pointer hover:text-red-400" />
            </div>
          </div>
        ))}

        {selected?.length > 1 && (
          <span
            className="flex items-center px-4 py-2 my-2 text-red-400 cursor-pointer hover:text-red-900 max-w-max"
            onClick={handleClearAll}
          >
            Clear all
          </span>
        )}
      </div>
    </div>
  );
};

SelectMenuSelectable.propTypes = {
  className: PropTypes.string,
  classNameButton: PropTypes.string,
  label: PropTypes.string,
  iconAppend: PropTypes.bool,
  menuList: PropTypes.array,
  tilte: PropTypes.string,
};

export default SelectMenuSelectable;
