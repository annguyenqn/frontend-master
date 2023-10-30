import { usePagination, useTable } from 'react-table';
import AssetsCell from './Cells/AssetsCell';
import { useMemo, Fragment } from 'react';
import classnames from 'classnames';
import InfoCell from './Cells/InfoCell';
import QuanityCell from './Cells/QuantityCell';
import CustomPagination from '../../../../components/Pagination/CustomPagination';
import {
  fetchUserInvestmentProductsDataAsync,
  fetchUserInvestmentProductsFinishedDataAsync,
} from '../../../../store/userInvestmentProduct';
import Loader from '../../../../components/Loader/Loader';
import { useDispatch } from 'react-redux';

const ProductsTable = ({ products, totalPage, currentPage, isDataLoaded, isFinished = false }) => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        id: 'asset',
        Header: 'asset',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <AssetsCell product={row.original} />,
      },
      {
        id: 'info',
        Header: 'info',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <InfoCell product={row.original} />,
      },
      {
        id: 'price',
        Header: 'price',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <QuanityCell product={row.original} />,
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
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: products,
      manualPagination: true,
      pageCount: totalPage,
      initialState: { pageIndex: currentPage - 1, pageSize: 20 },
    },
    usePagination,
  );

  const handleChangePage = async (page) => {
    console.log(page);
    try {
      if (isFinished) {
        await dispatch(fetchUserInvestmentProductsFinishedDataAsync({ page: page + 1 }));
      } else {
        await dispatch(fetchUserInvestmentProductsDataAsync({ page: page + 1 }));
      }
      gotoPage(page);
    } catch (e) {}
  };

  return (
    <div className="overflow-auto">
      <table {...getTableProps()} className="min-w-full">
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
                  {i !== products.length - 1 && (
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

export default ProductsTable;
