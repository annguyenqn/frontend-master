import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';

const SelectMenu = ({
  className,
  classNameButton,
  classNameMenuList,
  label,
  iconAppend,
  iconPrepend,
  menuList,
  onChange,
  value,
  size = 'sm',
  placeholder,
  disabled = false,
}) => {
  const [selected, setSelected] = useState(menuList[0]);

  const hanldeChange = (value) => {
    setSelected(value);
    if (!!onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    if (value && value !== selected) {
      setSelected(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Listbox value={selected} onChange={hanldeChange}>
      {label && <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>}
      <div className={classNames(disabled && 'pointer-events-none opacity-70', 'relative', className)}>
        <Listbox.Button
          className={classNames(
            'relative w-full text-left border border-gray-200 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm-md',
            size === 'lg' ? 'p-4' : 'py-2 pl-3 pr-3',
            classNameButton,
            iconAppend && 'pr-12',
          )}
        >
          <span className="flex items-center">
            {selected?.image && (
              <div className="relative w-6 h-6 rounded-full">
                <img
                  src={selected?.image}
                  alt="select-menu"
                  className="absolute object-cover h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                />
              </div>
            )}
            {iconPrepend || ''}
            {selected?.icon || ''}
            <span className="block ml-1 truncate">{selected?.name || placeholder}</span>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
            {iconAppend && <FiChevronDown className="w-5 h-5" aria-hidden="true" />}
          </span>
        </Listbox.Button>

        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-black-3 max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {menuList.map((item, index) => (
              <Listbox.Option
                key={`select-memu-${index}`}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-black' : ' bg-black-3',
                    'cursor-pointer select-none relative py-2 pl-3 ',
                  )
                }
                value={item}
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      {item?.image && (
                        <div className="relative w-6 h-6 rounded-full">
                          <img
                            src={item?.image}
                            alt="select-menu"
                            className="absolute object-cover h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                          />
                        </div>
                      )}
                      {item?.icon || ''}
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          classNameMenuList,
                          'ml-3 block truncate',
                        )}
                      >
                        {item.name}
                      </span>
                    </div>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? 'text-white' : 'text-primary',
                          'absolute inset-y-0 right-0 flex items-center pr-2',
                        )}
                      >
                        <FiCheck className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

SelectMenu.propTypes = {
  className: PropTypes.string,
  classNameButton: PropTypes.string,
  classNameMenuList: PropTypes.string,
  label: PropTypes.string,
  iconAppend: PropTypes.bool,
  menuList: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any,
  iconPrepend: PropTypes.any,
  size: PropTypes.oneOf(['lg', 'sm']),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectMenu;
