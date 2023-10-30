import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import CarouselGallary from 'components/Carousel/Gallery';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import classNames from 'classnames';
import { FiChevronRight, FiChevronLeft, FiFileText } from 'react-icons/fi';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const Preview = ({ data, type }) => {
  const [isOpen, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const renderPreviewDocumentList = (data) =>
    data?.map((item, index) => (
      <div
        key={`project-part-${index + 1}`}
        className={`cursor-pointer hover:underline hover:text-primary relative z-2 flex items-center`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <FiFileText size="1.2rem" /> {item?.name || item?.originalname}
      </div>
    ));

  const renderModalPreviewDocumentList = (data) =>
    data?.map((item, index) => (
      <div key={`project-carousel-${index + 1}`} className="max-h-screen pt-10 pb-20 mx-auto overflow-auto group">
        <Document
          loading={<div className="text-center"> Loading ...</div>}
          className="max-w-full"
          file={item}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <div
          className={classNames(
            'absolute transform translate-x-1/2 bottom-8 right-1/2 ',
            'px-6 py-3 bg-black bg-opacity-50 shadow-xl',
            'hidden group-hover:flex items-center space-x-2 animate-fade-in',
          )}
        >
          <FiChevronLeft
            className="cursor-pointer hover:text-primary"
            size={'1.5rem'}
            onClick={() => {
              setPageNumber(pageNumber > 2 ? pageNumber - 1 : 1);
            }}
          />
          <span>
            {pageNumber} of {numPages}
          </span>
          <FiChevronRight
            className="cursor-pointer hover:text-primary"
            size={'1.5rem'}
            onClick={() => {
              setPageNumber(pageNumber < numPages ? pageNumber + 1 : numPages);
            }}
          />
        </div>
      </div>
    ));

  const renderPreviewImageList = (data) => (
    <div className="flex flex-col w-full transform sm:flex-row md:flex-wrap md:-my-3">
      {data?.map(
        (item, index) =>
          index <= 3 && (
            <div
              key={`project-part-${index + 1}`}
              className={`w-full sm:w-1/4 cursor-pointer md:p-3 p-1`}
              onClick={() => {
                setOpen(true);
              }}
            >
              <div className="relative h-full">
                {/* backdrop more image */}
                {data?.length > 4 && index === 3 && (
                  <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-center bg-black rounded-lg md:text-4xl z-9 bg-opacity-70">
                    +{data?.length - 4}
                  </div>
                )}
                {/* render image */}
                <img
                  src={item?.url || '/images/default-image.png'}
                  alt={`project-part-${index + 1}`}
                  className="object-cover h-full rounded-lg"
                />
              </div>
            </div>
          ),
      )}
    </div>
  );

  const renderModalPreviewImageList = (data) =>
    data?.map((item, index) => (
      <div key={`project-carousel-${index + 1}`} className="pt-10 pb-20">
        <div className="relative max-w-screen-md mx-auto sm:h-142">
          <img
            src={item?.url || '/images/default-image.png'}
            alt={`project-part-${index + 1}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    ));

  return data?.length > 0 ? (
    <div className="relative flex flex-col overflow-hidden md:flex-row z-1 animate-fade-in">
      {/* preview */}
      <div className="w-full">{type === 'image' ? renderPreviewImageList(data) : renderPreviewDocumentList(data)}</div>
      {/* Modal */}
      <Modal open={isOpen} onClose={() => setOpen(false)} size="screen" className="">
        <div className="relative gallary-carousel">
          <CarouselGallary>
            {type === 'image' ? renderModalPreviewImageList(data) : renderModalPreviewDocumentList(data)}
          </CarouselGallary>
        </div>
      </Modal>
    </div>
  ) : null;
};

Preview.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
};

export default Preview;
