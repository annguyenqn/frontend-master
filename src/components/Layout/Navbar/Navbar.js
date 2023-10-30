import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import ButtonRound from 'components/Button/ButtonRound';
import Container from '../Container/Container';
// import PropTypes from 'prop-types'
import { FiX, FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import { useGetUserLogin } from 'store/userLogin/hook';
import ModalLogout from 'components/Modal/ModalLogout';
import { FaPlus } from 'react-icons/fa';
import { ROLE_USER } from 'constants/config';
// eslint-disable-next-line no-undef

const Navbar = () => {
  const history = useHistory();
  const { pathname } = history?.location;
  const userLogin = useGetUserLogin();
  const isAdmin = userLogin?.user?.role === ROLE_USER.ADMIN;
  // -------------
  // HANDLE LOGOUT
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const toggleModalLogout = () => setOpenModalLogout(!openModalLogout);
  // --------------
  const navigation = [
    { name: 'Trang chủ', href: '/', current: true },
    { name: 'Bất động sản', href: '/land', current: false },
    { name: 'Giao dịch P2P', href: '/trade-p2p', current: false },
    { name: 'Hỏi đáp (FAQ)', href: '/faq', current: false },
  ];

  const userNavigation = [
    { name: 'Đăng ký', href: '/register' },
    { name: 'Đăng nhập', href: '/login' },
  ];

  const userNavigationLogin = [
    { name: 'Quản lý chung', href: '/admin', isHide: !isAdmin, icon: <FaPlus className="inline mr-2" size="1rem" /> },
    { name: 'Tài khoản', href: '/account', icon: <FiUser className="inline mr-2" size="1rem" /> },
    {
      name: 'Đăng xuất',
      href: '#',
      onClick: toggleModalLogout,
      icon: <FiLogOut className="inline mr-2" size="1rem" />,
    },
  ];

  return (
    <>
      <ModalLogout isOpen={openModalLogout} toggleModal={toggleModalLogout} />
      <div className="fixed z-50 w-screen-show-scroll bg-black-1 animate-fade-in">
        <Container className="flex items-center around-20 h-25">
          <Disclosure as="nav" className="w-full h-full">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center flex-auto h-full">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img src="/images/logo/brand.png" alt="brand-nanoreal" className="w-auto h-12" />
                      </Link>
                    </div>
                    <div className="items-center justify-center flex-auto hidden h-full xl:space-x-12 2xl:space-x-16 xl:flex">
                      {navigation.map((item) => (
                        <div
                          key={`nav-pc-${item.name}`}
                          className={classNames(
                            pathname === item.href ? 'border-primary' : 'border-transparent hover:text-primary',
                            'h-full flex items-center border-b-4',
                          )}
                        >
                          <Link to={item.href}>{item.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden xl:block">
                    {/* Show avatar after login on pc */}
                    {userLogin?.user?.email ? (
                      <div className="flex items-center ml-4 xl:ml-6">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative px-6 py-4 border border-gray-700 rounded-lg ">
                          <div>
                            <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none">
                              <span className="sr-only">Open user menu</span>
                              <div className="mr-2 text-left">
                                <p>{userLogin?.user?.fullName}</p>
                              </div>
                              <img
                                className="w-8 h-8 ml-2 bg-white rounded-full"
                                src={userLogin?.user?.avatar?.url || '/images/user-default.png'}
                                alt="avatar"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 w-48 py-1 mt-2 text-white origin-top-right rounded-md shadow-lg bg-black-3 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigationLogin.map(
                                (item) =>
                                  !item?.isHide && (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <Link
                                          to={item?.href}
                                          onClick={item?.onClick}
                                          className={classNames(
                                            active ? 'text-primary' : '',
                                            'block px-5 py-3 text-sm  ',
                                          )}
                                        >
                                          {item?.icon}
                                          {item?.name}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ),
                              )}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    ) : (
                      <div className="flex flex-none pr-1 space-x-4">
                        {userNavigation.map((item, index) => (
                          <Link to={item?.href} key={`user-nav-pc-${index}`}>
                            <ButtonRound className="border min-w-32 hover:border-primary hover:text-primary">
                              {item?.name}
                            </ButtonRound>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex xl:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-300 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 ">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <FiX className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <FiMenu className="block w-6 h-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
                {/* Mobile menu button dropdown */}
                <Disclosure.Panel className="xl:hidden bg-black-2 animate-fade-in">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={`nav-${item.name}`}
                        as={Link}
                        to={item.href}
                        className={classNames(
                          pathname === item.href
                            ? 'bg-gray-900 text-primary'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium',
                        )}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    {userLogin?.user?.email ? (
                      <>
                        <div className="flex items-center px-5 mb-3">
                          <div className="flex-shrink-0">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={userLogin?.user?.avatar?.url || '/images/user-default.png'}
                              alt="avatar-mobile"
                            />
                          </div>
                          <div className="ml-4 text-left">
                            <p>{userLogin?.user?.fullName}</p>
                          </div>
                        </div>
                        <div className="px-2 space-y-1">
                          {userNavigationLogin.map(
                            (item) =>
                              !item?.isHide && (
                                <Disclosure.Button
                                  key={`user-nav-${item.name}`}
                                  as={'button'}
                                  className="block w-full text-left "
                                >
                                  <Link
                                    to={item?.href}
                                    disable={!item?.href}
                                    onClick={item.onClick}
                                    className="block w-full px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                                  >
                                    {item?.icon}
                                    {item?.name}
                                  </Link>
                                </Disclosure.Button>
                              ),
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={`user-nav-${item.name}`}
                            as={Link}
                            to={item?.href}
                            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </Container>
      </div>
    </>
  );
};

// Navbar.propTypes = {

// }

export default Navbar;
