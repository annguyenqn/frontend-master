import classnames from 'classnames';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ menu, children, className, classNameMenu, classNameMenuItem, onClick, isArrow = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <Menu as="div" className={classnames('relative inline-block', className)}>
      <Menu.Button
        className={classnames(' w-full shadow-sm  focus:outline-none focus:boxShadow:none', classNameMenu)}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <div className="flex items-center justify-center" onClick={onClick}>
          {menu}
          {isArrow && <FiChevronDown className="ml-1" size={16} />}
        </div>
      </Menu.Button>

      <Transition
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          static
          className={classnames(
            'origin-top-right absolute right-0 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50',
            classNameMenuItem,
          )}
        >
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  classNameMenu: PropTypes.string,
  classNameMenuItem: PropTypes.string,
  isArrow: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Dropdown;
