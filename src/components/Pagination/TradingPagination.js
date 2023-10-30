import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TradingPagination = ({ data, onPrevious, onNext }) => {
  return (
    <div className="flex items-center justify-center px-12 py-6 space-x-4">
      <FiChevronLeft
        className={`text-4xl cursor-pointer hover:text-primary ${data?.currentPage <= 1 ? 'pointer-events-none' : ''}`}
        onClick={onPrevious}
      />
      <div>
        {data?.currentPage}/{data?.totalPage}
      </div>
      <FiChevronRight
        className={`text-4xl cursor-pointer hover:text-primary ${
          data?.currentPage >= data?.totalPage ? 'pointer-events-none' : ''
        }`}
        onClick={onNext}
      />
    </div>
  );
};

TradingPagination.propTypes = {
  data: PropTypes.object,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
};

export default TradingPagination;
