import { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { usePagination, useTable } from 'react-table/dist/react-table.development';
import NameCell from '../Cells/NameCell';
import InfoCell from '../Cells/ProfitCell';
import EmailCell from '../Cells/EmailCell';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import Loader from 'components/Loader/Loader';
import { fetchInviteeDataAsync } from 'store/referral';
import CustomPagination from 'components/Pagination/CustomPagination';

const InveteeTable = ({ invitees, totalPage, currentPage, isDataLoaded }) => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        id: 'fullName',
        Header: 'Họ Tên',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <NameCell data={row.original} />,
      },
      {
        id: 'email',
        Header: 'Email',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <EmailCell data={row.original} />,
      },
      {
        id: 'price',
        Header: 'Lợi nhuận',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <InfoCell data={row.original} />,
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    visibleColumns,
    page,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: invitees,
      manualPagination: true,
      pageCount: totalPage,
      initialState: { pageIndex: currentPage - 1, pageSize: 20 },
    },
    usePagination,
  );

  const handleChangePage = async (page) => {
    try {
      dispatch(fetchInviteeDataAsync({ page: 1 }));
      gotoPage(page);
    } catch (e) {
      console.log(e);
    }
  };

  if (page.length === 0) {
    return <p className="text-center">Chưa có người được giới thiệu</p>;
  }

  return (
    <div className="overflow-auto">
      <table {...getTableProps()} className="min-w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <th
                    scope="col"
                    className={classNames(
                      'px-1 sm:px-4 py-2 sm:py-4 sm:text-md text-white whitespace-nowrap text-left',
                      `header-cell-table-${index}`,
                    )}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {isDataLoaded ? (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <tr className="bg-blue1" {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          key={cell?.id}
                          colSpan={cell.column.id === 'expander' ? 1 : 0}
                          className={classNames('px-2 sm:px-4 py-2 sm:py-4 sm:text-md text-white whitespace-nowrap')}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                  {i !== invitees.length - 1 && (
                    <tr className="bg-black-2">
                      <td colSpan={visibleColumns.length} />
                    </tr>
                  )}
                </Fragment>
              );
            })
          ) : (
            <tr>
              <td colSpan={visibleColumns.length}>
                <div className="w-full mx-auto">
                  <Loader className="w-12 h-12 mx-auto my-4" />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <CustomPagination pageCount={pageCount} onChangePage={handleChangePage} currentPage={pageIndex + 1} />
    </div>
  );
};

InveteeTable.propTypes = {
  invitees: PropTypes.array,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  isDataLoaded: PropTypes.bool,
};

InveteeTable.defaultProps = {
  invitees: [],
  totalPage: 0,
  currentPage: 0,
  isDataLoaded: false,
};

export default InveteeTable;
