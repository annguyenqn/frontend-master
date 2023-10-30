import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ breadcrumb = [] }) => {
  return (
    <nav className="flex px-2 py-6 sm:px-0" aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
        {breadcrumb.length > 0 ? (
          <Link to={'/admin'} className="text-2xl hover:text-primary">
            Trang quản lý
          </Link>
        ) : (
          <span className="text-2xl font-bold">Trang quản lý</span>
        )}
        {breadcrumb?.map((item, index) => (
          <li key={`breadcrumb-${index}`}>
            <div className="flex items-center">
              <FiChevronRight />
              {item?.link ? (
                <Link to={item?.link} className="ml-1 text-2xl hover:text-primary md:ml-2">
                  {item?.name}
                </Link>
              ) : (
                <span
                  className={classNames(
                    'ml-1 text-2xl font-bold hover:text-primary md:ml-2',
                    item?.isActive && 'text-primary',
                  )}
                >
                  {item?.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  breadcrumb: PropTypes.array,
};

export default Breadcrumb;
