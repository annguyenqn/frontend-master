import Navbar from 'components/Layout/Navbar/Navbar';
import Container from 'components/Layout/Container/Container';
import { useEffect, useState } from 'react';
import { LIMIT_ROW_PER_PAGE } from 'config/config';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Table from 'components/Table/Table';
import queryString from 'query-string';
import BadgeCell from 'components/Table/TableCells/BadgeCell';
import SimpleCell from 'components/Table/TableCells/SimpleCell';
import NumberCell from 'components/Table/TableCells/NumberCell';
import TimeCell from 'components/Table/TableCells/TimeCell';
import { useLocation, useHistory } from 'react-router-dom';
import withAuthAdmin from 'hoc/withAuthAdmin';
import paymentHistoryApi from 'api/paymentHistoryApi';
import { PAYMENT_HISTORY_STATUS } from 'constants/payment';
import { COLOR_BADGE } from 'constants/config';

const breadcrumb = [{ name: 'Lịch sử thanh toán', isActive: true }];

const AdminReportPaymentHistory = () => {
  const history = useHistory();
  const location = useLocation();
  const search = location?.search;
  const queryParse = queryString.parse(search);
  const pageQuery = queryParse.page;
  const [state, setState] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getDataApi = async () => {
    await setLoading(true);
    try {
      const res = await paymentHistoryApi.getAllAdmin({
        page: pageQuery || 1,
        rowPerPage: LIMIT_ROW_PER_PAGE,
      });
      await setState(res);
    } catch (e) {
      console.log(e);
    } finally {
      await setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      getDataApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  // --------------
  const handleChangePage = async (page) => {
    queryParse.page = page;
    await setLoading(true);
    await history?.push({
      search: queryString.stringify(queryParse),
    });
  };
  // ---------------------
  const tableColumns = [
    {
      Header: '#',
      Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.id} />,
    },
    {
      Header: 'Dự án',
      Cell: ({ row }) => <SimpleCell data={row?.original?.asset?.name} className="min-w-40" />,
    },

    {
      Header: 'Phương thức',
      Cell: ({ row }) => <SimpleCell data={row?.original?.paymentType} className="text-center" />,
    },
    {
      Header: 'Số tiền',
      Cell: ({ row }) => (
        <NumberCell data={row?.original?.amount} currency={row?.original?.currency} className="text-right" />
      ),
    },
    {
      Header: 'Lệ phí',
      Cell: ({ row }) => (
        <NumberCell data={row?.original?.fee} currency={row?.original?.currency} className="text-right" />
      ),
    },
    {
      Header: 'Trạng thái',
      Cell: ({ row }) => (
        <BadgeCell
          data={PAYMENT_HISTORY_STATUS[row?.original?.status]}
          className="text-center"
          color={COLOR_BADGE[row?.original?.status]}
        />
      ),
    },
    {
      Header: 'Ngày giao dịch',
      Cell: ({ row }) => <TimeCell time={row?.original?.createdAt} />,
    },
  ];

  return (
    <div>
      <Navbar />
      <Container>
        <div className="min-h-screen pt-25 break leading">
          <Breadcrumb breadcrumb={breadcrumb} />
          <div className="text-sm rounded-lg shadow-2xl bg-black-3">
            <Table
              isLoading={isLoading}
              columns={tableColumns}
              data={state?.data}
              headCellsClassName="bg-primary text-black-1 font-bold border border-black-1 uppercase"
              bodyCellsClassName="border-b border-black-3"
              tableClassName={''}
              // pagination keys
              totalPage={state?.totalPage}
              currentPage={state?.currentPage}
              totalItems={state?.totalItems}
              onChangePage={handleChangePage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withAuthAdmin(AdminReportPaymentHistory);
