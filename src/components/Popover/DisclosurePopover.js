import PropTypes from 'prop-types';
import { Disclosure, Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

const DisclosurePopover = ({
  iconPrepend,
  panelArray,
  className,
  classNameButton,
  classNamePanel,
  classNameDisclosure,
  selected = panelArray[0],
  onChange,
  isHideDefaultValue,
}) => {
  return panelArray ? (
    <div className={`relative ${className}`}>
      <Popover className="relative">
        {() => (
          <>
            <Popover.Button
              className={classNames(
                'focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
                'flex',
                !classNameButton?.includes('px-') && 'px-3',
                !classNameButton?.includes('py-') && 'py-2',
                !classNameButton?.includes('border') && 'border',
                !classNameButton?.includes('rounded') && 'rounded-lg',
                !classNameButton?.includes('w-') && 'w-full md:w-auto',
                classNameButton,
              )}
            >
              {iconPrepend || ''}
              <span>{selected?.label}</span>
              <FiChevronDown className="w-5 h-5 ml-2" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`absolute z-10 max-w-sm mt-1 px-0 lg:max-w-3xl ${classNamePanel || ''}`}>
                <div className="overflow-hidden shadow-around-20 w-72 rounded-xl bg-black-3 ">
                  {panelArray.map((category, indexCate) => {
                    const categoryChildSelected = category?.children?.find(
                      (child) => JSON.stringify(child) === JSON.stringify(selected),
                    );
                    const isCategorySelected = JSON.stringify(category) === JSON.stringify(selected);
                    return isHideDefaultValue && !category?.value ? null : (
                      <Disclosure defaultOpen={!!categoryChildSelected} key={`category-${indexCate}`}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                'flex justify-between w-full items-center hover:bg-black-2',
                                isCategorySelected && 'bg-black-2 text-primary',
                                category?.children && open && 'bg-black-2',
                              )}
                            >
                              <span
                                className="px-6 py-4"
                                onClick={() => {
                                  !category?.children && onChange(category);
                                }}
                              >
                                {category?.label}
                              </span>
                              {!!category?.children && (
                                <FiChevronUp
                                  className={classNames(
                                    'w-5 h-5 transition-transform duration-500 mr-6',
                                    open && 'transform rotate-180',
                                  )}
                                />
                              )}
                              {isCategorySelected && (
                                <FiCheck className="inline-block w-5 h-5 ml-auto mr-6" aria-hidden="true" />
                              )}
                            </Disclosure.Button>
                            {category?.children && (
                              <Disclosure.Panel className={`p-4 bg-black-2 ${classNameDisclosure || ''}`}>
                                {category?.children.map((children, indexChild) => {
                                  const isChildSelected =
                                    JSON.stringify(categoryChildSelected) === JSON.stringify(children);
                                  return (
                                    <div
                                      key={`${category?.label}-${indexChild}`}
                                      className={classNames(
                                        'py-4 pl-4 flex',
                                        isChildSelected
                                          ? 'pointer-events-none text-primary'
                                          : 'hover:bg-black-3 cursor-pointer',
                                      )}
                                      onClick={() => {
                                        onChange(children);
                                      }}
                                    >
                                      {children?.label}
                                      {isChildSelected && (
                                        <FiCheck className="inline-block w-5 h-5 ml-auto" aria-hidden="true" />
                                      )}
                                    </div>
                                  );
                                })}
                              </Disclosure.Panel>
                            )}
                          </>
                        )}
                      </Disclosure>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  ) : (
    'Miss panel array'
  );
};

DisclosurePopover.propTypes = {
  panelArray: PropTypes.array.isRequired,
  iconPrepend: PropTypes.any,
  className: PropTypes.string,
  classNameButton: PropTypes.string,
  classNamePanel: PropTypes.string,
  classNameDisclosure: PropTypes.string,
  selected: PropTypes.any,
  onChange: PropTypes.func,
  isHideDefaultValue: PropTypes.bool,
};

DisclosurePopover.defaultProps = {
  iconPrepend: null,
  className: '',
  classNameButton: '',
  classNamePanel: '',
  classNameDisclosure: '',
  selected: null,
  onChange: () => {},
  isHideDefaultValue: false,
};

export default DisclosurePopover;
