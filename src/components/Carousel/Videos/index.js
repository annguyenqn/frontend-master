import PropTypes from 'prop-types';
import { FiPlay } from 'react-icons/fi';
import Slider from 'react-slick';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} carousel-btn-bg`}
      style={{
        ...style,
        display: 'absolute',
        right: 0,
        width: 90,
        height: '100%',
      }}
      onClick={onClick}
    >
      <div
        className="absolute right-0 p-2 bg-white rounded-full shadow-around-20 top-1/2"
        style={{ transform: 'translate(0, -100px)' }}
      >
        <FiPlay size="24px" style={{ transform: 'translateX(2px)' }} fill="var(--color-primary)" />
      </div>
    </div>
  );
};
const PreArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} carousel-btn-bg`}
      style={{
        ...style,
        display: 'absolute',
        left: 0,
        width: 90,
        height: '100%',
        zIndex: 1,
        transform: 'translate(0, -50%) rotate(180deg)',
      }}
      onClick={onClick}
    >
      <div
        className="absolute right-0 p-2 bg-white rounded-full shadow-around-20 top-full"
        style={{ transform: 'translate(0, -140px)' }}
      >
        <FiPlay size="24px" style={{ transform: 'translateX(2px)' }} fill="var(--color-primary)" />
      </div>
    </div>
  );
};

const CarouselVideo = ({ children, centerMode, className, autoplay }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    centerMode: !!centerMode,
    centerPadding: '180px',
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreArrow />,
    autoplay: !!autoplay,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: 'ease-in',
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          centerPadding: '140px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1281,
        settings: {
          centerPadding: '50px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '100px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1,
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

CarouselVideo.propTypes = {
  children: PropTypes.node,
};

export default CarouselVideo;
