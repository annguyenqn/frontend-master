import { ASSET_STATUS } from 'constants/config';
import PropTypes from 'prop-types';

const thumbnail_wait = [ASSET_STATUS.PREPARE_FOR_SALE, ASSET_STATUS.WHITELIST_SOON, ASSET_STATUS.WHITELIST_OPENING];

const ThumbnailBackdrop = ({ status, className }) => {
  if (status === ASSET_STATUS.SUCCESS) {
    return (
      <div
        className={`absolute top-0 left-0 flex items-center justify-center w-full h-full text-4xl font-bold text-center bg-primary-70% z-9 bg-opacity-30 text-black-3 leading-tight ${className}`}
      >
        GỌI VỐN <br />
        THÀNH CÔNG
      </div>
    );
  }
  if (thumbnail_wait.includes(status)) {
    return (
      <div
        className={`absolute top-0 left-0 flex items-center justify-center w-full h-full text-4xl font-bold text-center bg-black z-9 bg-opacity-70 leading-tight ${className}`}
      >
        DỰ ÁN <br /> SẮP MỞ BÁN
      </div>
    );
  }
  return null;
};

ThumbnailBackdrop.propTypes = {
  status: PropTypes.string,
};

export default ThumbnailBackdrop;
