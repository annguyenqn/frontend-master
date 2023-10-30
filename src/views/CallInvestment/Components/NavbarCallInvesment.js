import PropTypes from 'prop-types';
import Container from 'components/Layout/Container/Container';
import { Link } from 'react-router-dom';

const DATA = [{ label: 'Đầu tư' }, { label: 'Xác nhận' }, { label: 'Thanh toán' }, { label: 'Hoàn tất' }];

const NavbarCallInvesment = ({ step = 1 }) => {
  return (
    <div className="fixed top-0 z-50 shadow-xl w-screen-show-scroll bg-black-1">
      <Container className="flex items-center around-20 h-25">
        <div className="relative flex items-center justify-center flex-auto h-full ">
          <div className="absolute top-0 left-0 flex items-center flex-shrink-0 h-full">
            <Link to="/">
              <img src="/images/logo/brand.png" alt="brand-nanoreal" className="w-auto h-12" />
            </Link>
          </div>
          <div className="w-full overflow-hidden sm:w-auto sm:ml-auto xl:ml-0 mt-28 sm:mt-0">
            <div className="relative flex items-center h-full py-4 sm:justify-end sm:py-0 xl:-mx-6 xl:justify-center bg-black-1">
              {DATA.map((item, index) => (
                <div
                  key={`nav-call-investment-${index}`}
                  className="relative flex items-center px-4 xl:mx-4 bg-black-1 z-1"
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 mr-2 font-bold rounded-full text-black-3 ${
                      step == index + 1 ? 'bg-primary ' : 'bg-white'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className={step == index + 1 ? 'whitespace-nowrap text-primary ' : 'xl:inline hidden'}>
                    {item?.label}
                  </p>
                </div>
              ))}
              <div className="absolute top-0 left-0 hidden w-full border-b h-1/2 sm:inline" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

NavbarCallInvesment.propTypes = {
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NavbarCallInvesment;
