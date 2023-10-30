import PropTypes from 'prop-types';
import { FiChevronRight } from 'react-icons/fi';
import Slider from 'react-slick';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} carousel-btn-bg  text-white hover:text-primary`}
      style={{
        ...style,
        display: 'absolute',
        right: -5,
        width: 160,
        height: '100%',
      }}
      onClick={onClick}
    >
      <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-40%, -50%)' }}>
        <FiChevronRight className="w-12 h-12 " />
      </div>
    </div>
  );
};
const PreArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} carousel-btn-bg text-white hover:text-primary`}
      style={{
        ...style,
        display: 'absolute',
        left: -5,
        width: 160,
        height: '100%',
        zIndex: 1,
        transform: 'translate(0, -50%) rotate(180deg)',
      }}
      onClick={onClick}
    >
      <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-40%, -50%)' }}>
        <FiChevronRight className="w-12 h-12 " />
      </div>
    </div>
  );
};

const CarouselGallary = ({ children, className, autoplay }) => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots bottom-8 text-lg',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreArrow />,
    appendDots: (dots) => {
      const activePage = dots.find((dot) => dot.props.className === 'slick-active');
      return (
        <div className="">
          {+activePage.key + 1} / {dots.length}
        </div>
      );
    },
    autoplay: !!autoplay,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: 'ease-in',
    responsive: [
      {
        breakpoint: 1028,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  return (
    <Slider className={`relative ${className}`} {...settings}>
      {children}
    </Slider>
  );
};

CarouselGallary.propTypes = {
  children: PropTypes.node,
};

export default CarouselGallary;
