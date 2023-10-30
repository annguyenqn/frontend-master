import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';

const Pagination = (props) => {
  const location = useLocation();
  const history = useHistory();
  const queryURL = new URLSearchParams(location?.search);
  const { pageCount = 0, currentPage = 1, limit = 0, totalItems = 0 } = props;
  const [isRendered, setRendered] = useState(false);
  const [_currentPage, setPage] = useState(currentPage < 1 ? 0 : currentPage - 1);

  const _totalItem = limit * (_currentPage + 1) > totalItems ? totalItems : limit * (_currentPage + 1);

  // -----------------
  // Change page url
  function handleChangePage({ selected }) {
    setPage(selected);
    // check if first render url dont change
    if (isRendered) {
      const page = selected + 1;
      if (queryURL.has('page')) {
        queryURL.set('page', page);
      } else {
        queryURL.append('page', page);
      }
      history.push({
        pathname: location.pathname,
        search: `?${queryURL?.toString()}`,
      });
    }
  }
  // ---------------

  useEffect(() => {
    setRendered(true);
    setPage(currentPage - 1);
  }, [currentPage]);

  return (
    <div className="flex flex-row-reverse items-center px-4 py-2 text-sm">
      <ReactPaginate
        previousLabel={<FiChevronLeft size={'1rem'} />}
        nextLabel={<FiChevronRight size={'1rem'} />}
        breakLabel="..."
        breakClassName="flex justify-center items-center h-8 w-8  ml-1 rounded-full"
        pageCount={pageCount}
        initialPage={_currentPage}
        forcePage={_currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleChangePage}
        containerClassName=" flex items-center"
        pageLabelBuilder={(p) => (
          <div className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer ">{p}</div>
        )}
        pageClassName="ml-1 hover:bg-blue5 hover:text-white overflow-hidden rounded-md border border-gray-300"
        previousClassName=" flex justify-center items-center h-8 w-8 border border-gray-300 ml-1 rounded-md hover:bg-blue5 hover:text-white cursor-pointer"
        nextClassName=" flex justify-center items-center h-8 w-8 border border-gray-300 ml-1 rounded-md hover:bg-blue5 hover:text-white cursor-pointer"
        activeClassName=" bg-blue1 text-white "
      />
      {props.showTotalItems && (
        <span className="px-5">
          {currentPage > 0 && `${_currentPage * limit + 1} - ${_totalItem} of ${totalItems}`}
        </span>
      )}
    </div>
  );
};

Pagination.propTypes = {
  limit: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  totalItems: PropTypes.number,
};

export default Pagination;
