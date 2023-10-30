import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

function DropdownClick({ children, menu, className, classNameMenu, classNameButton }) {
  return (
    <Menu as="div" className={`relative ${className}`}>
      <div>
        <Menu.Button className={`${classNameButton}`}>{menu}</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className={classNameMenu}>{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

DropdownClick.propTypes = {
  userNavigation: PropTypes.array,
  isLogin: PropTypes.bool,
};

export default DropdownClick;
