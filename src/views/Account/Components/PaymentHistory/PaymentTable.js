import { useTable, usePagination } from 'react-table';
import { Fragment, useMemo } from 'react';
import classnames from 'classnames';
import TimeCell from './Cells/TimeCell';
import AmountCell from './Cells/AmountCell';
import AssetsCell from './Cells/AssetsCell';
import StatusCell from './Cells/StatusCell';
import IdCell from './Cells/IdCell';
import CustomPagination from '../../../../components/Pagination/CustomPagination';
import { fetchUserPaymentHistoryDataAsync } from '../../../../store/paymentHistory';
import { useDispatch } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';

const PaymentTable = ({ payments, totalPage, currentPage, isDataLoaded }) => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        id: 'id',
        Header: 'ID',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <IdCell payment={row.original} />,
      },
      {
        id: 'currency',
        Header: 'Tài sản',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <AssetsCell payment={row.original} />,
      },
      {
        id: 'amount',
        Header: 'Số tiền',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <AmountCell payment={row.original} />,
      },
      {
        id: 'status',
        Header: 'Trạng thái',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <StatusCell payment={row.original} />,
      },
      {
        id: 'time',
        Header: 'Thời gian',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <TimeCell payment={row.original} />,
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    page,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: payments,
      manualPagination: true,
      pageCount: totalPage,
      initialState: { pageIndex: currentPage - 1, pageSize: 20 },
    },
    usePagination,
  );

  const handleChangePage = async (page) => {
    try {
      await dispatch(fetchUserPaymentHistoryDataAsync({ page: page + 1 }));
      gotoPage(page);
    } catch (e) {}
  };

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
                    className={classnames(
                      'px-1 sm:px-4 py-2 sm:px-6 sm:py-4 sm:text-md text-white whitespace-nowrap text-left',
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
                    {row.cells.map((cell, index) => {
                      return (
                        <td
                          colSpan={cell.column.id === 'expander' ? 1 : 0}
                          className={classnames(
                            'px-2 sm:px-4 py-2 sm:px-6 sm:py-4 sm:text-md text-white whitespace-nowrap',
                          )}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                  {i !== payments.length - 1 && (
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

export default PaymentTable;
