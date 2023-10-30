import { FaFacebookF, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import Zalo from 'components/Icon/Zalo';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import { FiMail, FiPhone } from 'react-icons/fi';

const LIST = [
  { icon: <FaTwitter className="text-3xl group-hover:text-primary" />, href: 'https://twitter.com/nanoreal_vn' },
  { icon: <FaTelegramPlane className="text-3xl group-hover:text-primary" />, href: 'https://t.me/nanoreal_vn' },
  { icon: <FaFacebookF className="text-3xl group-hover:text-primary" />, href: 'https://fb.me/nanoreal.io' },
  {
    noneBoder: true,
    icon: <Zalo size="50" className="group-hover:text-primary" />,
    href: 'https://zalo.me/g/hmpaaw397',
  },
  // { icon: <GrReddit className="text-md xl:text-3xl group-hover:text-primary" />, href: '' },
  // { icon: <FaYoutube className="text-md xl:text-3xl group-hover:text-primary" />, href: '' },
];

const Footer = () => {
  return (
    <footer className="relative pt-20 mx-auto pb-11 z-1 max-w-screen-2xl">
      <img src="/images/homepage/brand-1.png" alt="brand-nanoreal" className="w-auto mx-auto mb-12 h-25" />
      <div className="flex items-center justify-center space-x-8 xl:space-x-12">
        {LIST.map((item, index) => (
          <a
            key={`list-social-${index}`}
            className={classNames(
              'rounded-full group hover:border-primary hover:text-primary border',
              item?.noneBoder ? 'p-2' : 'p-4',
              item?.href && 'cursor-pointer',
            )}
            target={'_blank'}
            href={item.href}
          >
            {item.icon}
          </a>
        ))}
      </div>
      <Container>
        <div className="relative flex flex-col items-center justify-between h-16 mt-8">
          <div className="space-x-8">
            <Link to="/about-us" className="text-primary hover:underline">
              Giới thiệu
            </Link>
            <Link to="/quy-dinh?part=1" className="text-primary hover:underline">
              Điều khoản & Điều lệ
            </Link>
            <Link to="/faq" className="text-primary hover:underline">
              Câu hỏi thường gặp
            </Link>
          </div>
          <div className="flex flex-col items-center justify-between py-4 text-center">
            <p>CÔNG TY TNHH NANOREAL</p>
            <p>
              Giấy chứng nhận đăng ký doanh nghiệp số 0317117977 do Sở Kế hoạch và Đầu tư Thành Phố HCM cấp ngày 11
              tháng 01 năm 2022
            </p>
            <p>33 Trần Quý Khoách, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh</p>
            <div className="flex items-center space-x-2">
              <FiPhone />
              <span>(+84) 0933230991</span>
              <FiMail />
              <a href="mailto:support@nanoreal.io" className="hover:text-primary hover:underline">
                support@nanoreal.io
              </a>
            </div>
          </div>

          <p className="pb-4">© {new Date().getFullYear()} NANOREAL. All rights reserved</p>
          <div className="absolute top-0 right-0 h-full">
            {/* <SelectMenu
            menuList={MENULIST}
            iconAppend
            classNameButton="h-full border-0"
          /> */}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
