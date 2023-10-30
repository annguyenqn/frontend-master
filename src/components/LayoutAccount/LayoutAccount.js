import Navbar from '../Layout/Navbar/Navbar';
import ProfileCoverPhoto from '../../views/Account/Components/ProfileCoverPhoto';
import Container from '../Layout/Container/Container';
import ProfileAvatar from '../../views/Account/Components/ProfileAvatar';
import ProfileInformation from '../../views/Account/Components/ProfileInformation';
import { NavLink } from 'react-router-dom';
import { FiEdit, FiGrid, FiLogOut, FiUser, FiShare2 } from 'react-icons/fi';
import Footer from '../Layout/Footer/Footer';
import ModalLogout from '../Modal/ModalLogout';
import { useState } from 'react';
import { useGetUserLogin } from '../../store/userLogin/hook';
import withAuthUser from 'hoc/withAuthUser';

const LayoutAccount = ({ children }) => {
  const { user } = useGetUserLogin();

  const [openModalLogout, setOpenModalLogout] = useState(false);

  const toggleModalLogout = () => setOpenModalLogout(!openModalLogout);

  const LIST_MENU = [
    {
      label: 'Tài khoản',
      icon: <FiUser />,
      route: '/account',
    },
    { label: 'Thay đổi thông tin', icon: <FiEdit />, route: '/settings' },
    { label: 'Sản phẩm đầu tư', icon: <FiGrid />, route: '/investment-products' },
    { label: 'Giới thiệu', icon: <FiShare2 />, route: '/referral' },
    { label: 'Thoát', icon: <FiLogOut />, onClick: toggleModalLogout },
  ];

  const renderMenu = () => {
    return LIST_MENU.map((item, index) => {
      if (item.onClick) {
        return (
          <div
            key={`list-account-${index}`}
            className="flex items-center p-3 cursor-pointer lg:px-10 lg:py-5 whitespace-nowrap"
            onClick={item.onClick}
          >
            <span className="text-xl font-bold md:mr-4 lg:text-2xl">{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
          </div>
        );
      }

      return (
        <NavLink
          to={item.route}
          isActive={(match, location) => {
            const pathString = location?.pathname?.split('/')?.[1];
            if (item?.activeRoute && item?.activeRoute?.includes(`/${pathString}`)) return true;
            return location.pathname === item.route;
          }}
          activeClassName="font-bold text-primary"
          key={`list-account-${index}`}
          className="flex items-center p-3 lg:px-10 lg:py-5 whitespace-nowrap"
        >
          <span className="text-xl font-bold md:mr-4 lg:text-2xl">{item.icon}</span>
          <span className="hidden md:block">{item.label}</span>
        </NavLink>
      );
    });
  };

  return (
    <div>
      <ModalLogout isOpen={openModalLogout} toggleModal={toggleModalLogout} />
      <Navbar />
      <div className="min-h-screen break leading bg-black-2 pt-25">
        {/* banner + add banner  */}
        {user?._id && <ProfileCoverPhoto />}
        {/* Info user */}
        <Container className="relative z-2">
          <div className="block md:flex z-2">
            {user?._id && <ProfileAvatar />}
            <ProfileInformation />
          </div>
        </Container>
        {/* Info Main */}
        <Container className="relative mt-10 sm:flex">
          {/* left */}
          <div className="mb-4 lg:pr-8 sm:pr-3 sm:mb-0">
            <div className="flex justify-between divide-y sm:block bg-black-3 divide-black-2 rounded-xl">
              <div className="hidden p-3 text-xl font-bold lg:px-10 lg:py-5 lg:text-2xl md:block">
                Thông tin cá nhân
              </div>
              {/*<div className="block p-3 text-xl font-bold cursor-pointer lg:px-10 lg:py-5 lg:text-xl md:hidden">*/}
              {/*  <FiMenu />*/}
              {/*</div>*/}
              {renderMenu()}
            </div>
          </div>
          {/* right */}
          <div className="flex-auto overflow-auto">
            {children}
            {/* part 1 */}
          </div>
        </Container>
        {/*  */}
      </div>
      <Footer />
    </div>
  );
};

export default withAuthUser(LayoutAccount);
