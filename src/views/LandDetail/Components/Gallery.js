import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import CarouselGallary from 'components/Carousel/Gallery';

const Gallery = ({ images }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col mt-10 overflow-hidden md:flex-row z-1">
      {/* show less than 5 items */}
      {images?.length <= 4 &&
        images?.map((item) => (
          <div
            className={`cursor-pointer p-4 md:w-1/${images?.length}`}
            onClick={() => {
              setOpen(true);
            }}
          >
            <img src={item?.url} alt="project-part-0" className="object-cover w-full h-full rounded-lg" />
          </div>
        ))}
      {/* show more 5 items */}
      {images?.length > 4 && images?.[0]?.url && (
        <div
          className="cursor-pointer md:w-1/2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src={images?.[0]?.url} alt="project-part-0" className="object-cover w-full h-full rounded-lg" />
        </div>
      )}

      {images?.length > 4 && (
        <div className="flex transform md:flex-wrap md:translate-x-3 md:-my-3 md:w-1/2">
          {images?.map(
            (item, index) =>
              index <= 4 &&
              index !== 0 && (
                <div
                  key={`project-part-${index + 1}`}
                  className={`w-1/2 cursor-pointer md:p-3 p-1`}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <div className="relative h-full">
                    {/* backdrop more image */}
                    {images?.length > 5 && index === 4 && (
                      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-center bg-black rounded-lg md:text-4xl z-9 bg-opacity-70">
                        +{images?.length - 5}
                      </div>
                    )}
                    {/* render image */}
                    <img
                      src={item?.url || '/images/default-image.png'}
                      alt={`project-part-${index + 1}`}
                      className="object-cover w-full h-full rounded-lg max-h-14 md:max-h-44 m"
                    />
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Modal */}
      <Modal open={isOpen} onClose={() => setOpen(false)} size="screen" className="">
        <div className="gallary-carousel">
          <CarouselGallary>
            {images?.map((item, index) => (
              <div key={`project-carousel-${index + 1}`} className="pt-10 pb-20">
                <div className="relative max-w-screen-md mx-auto h-142">
                  <img
                    src={item?.url || '/images/default-image.png'}
                    alt={`project-part-${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            ))}
          </CarouselGallary>
        </div>
      </Modal>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.array,
};

export default Gallery;
