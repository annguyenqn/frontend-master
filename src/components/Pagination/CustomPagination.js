import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/pagination.scss';
import PropsTypes from 'prop-types';

const CustomPagination = ({ pageCount, onChangePage, currentPage }) => {
  function handleChangePage({ selected }) {
    if (selected + 1 !== currentPage) {
      onChangePage(selected);
    }
  }

  return (
    <div className="flex flex-row-reverse items-center px-4 py-2 text-sm">
      <ReactPaginate
        previousLabel={<FiChevronLeft size={'1rem'} />}
        nextLabel={<FiChevronRight size={'1rem'} />}
        breakLabel="..."
        breakClassName="flex justify-center items-center h-8 w-8  ml-1 rounded-full"
        pageCount={pageCount}
        initialPage={currentPage - 1}
        forcePage={currentPage - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleChangePage}
        pageLabelBuilder={(p) => (
          <div className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer ">{p}</div>
        )}
        containerClassName="flex pagination"
        pageClassName="custom__pagination__item"
        previousClassName="custom__pagination__item"
        nextClassName="custom__pagination__item"
        subContainerClassName="pages pagination"
        activeClassName="custom__pagination__item custom__pagination__item--active"
      />
    </div>
  );
};

CustomPagination.propTypes = {
  pageCount: PropsTypes.number.isRequired,
  onChangePage: PropsTypes.func.isRequired,
  currentPage: PropsTypes.number.isRequired,
};

export default CustomPagination;
