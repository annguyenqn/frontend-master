import Navbar from 'components/Layout/Navbar/Navbar';
import Container from 'components/Layout/Container/Container';
import { useEffect, useState } from 'react';
import usersApi from 'api/usersApi';
import { LIMIT_ROW_PER_PAGE } from 'config/config';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Table from 'components/Table/Table';
import queryString from 'query-string';
import BadgeCell from 'components/Table/TableCells/BadgeCell';
import SimpleCell from 'components/Table/TableCells/SimpleCell';
import NumberCell from 'components/Table/TableCells/NumberCell';
import { useLocation, useHistory } from 'react-router-dom';
import withAuthAdmin from 'hoc/withAuthAdmin';
import { COLOR_BADGE, STATUS_USER } from 'constants/config';

const breadcrumb = [{ name: 'Danh sách người dùng', isActive: true }];

const AdminUser = () => {
  const history = useHistory();
  const location = useLocation();
  const search = location?.search;
  const queryParse = queryString.parse(search);
  const pageQuery = +queryParse?.page || 1;
  const [usersData, setUsersData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getDataApi = async () => {
    await setLoading(true);
    try {
      const res = await usersApi.getAllAdmin({
        params: {
          page: pageQuery || 1,
          rowPerPage: LIMIT_ROW_PER_PAGE,
        },
      });
      await setUsersData(res);
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
  //-------------------
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
      Cell: ({ row }) => {
        console.log(row);
        return <SimpleCell className="text-center" data={+row?.id + 1 + (pageQuery - 1) * 10} />;
      },
    },
    {
      Header: 'Họ tên',
      Cell: ({ row }) => <SimpleCell data={row?.original?.fullName} />,
    },
    {
      Header: 'Email',
      Cell: ({ row }) => <SimpleCell data={row?.original?.email} />,
    },
    {
      Header: 'Điện thoại',
      Cell: ({ row }) => <SimpleCell data={row?.original?.phone} />,
    },
    {
      Header: 'Trạng thái',
      Cell: ({ row }) => (
        <BadgeCell data={STATUS_USER[row?.original?.status]} color={COLOR_BADGE[row?.original?.status]} />
      ),
    },
    {
      Header: 'Tổng đầu tư',
      Cell: ({ row }) => <NumberCell data={row?.original?.totalAmountInvested} />,
    },
    {
      Header: 'Tổng giao dịch',
      Cell: ({ row }) => <NumberCell data={row?.original?.totalAmountSpend} />,
    },
    {
      Header: 'Số dư',
      Cell: ({ row }) => <NumberCell data={row?.original?.remainAmount} />,
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
              data={usersData?.data}
              headCellsClassName="bg-primary text-black-1 font-bold border border-black-1 uppercase"
              bodyCellsClassName="border-b border-black-3"
              tableClassName={''}
              // pagination keys
              totalPage={usersData?.totalPage}
              currentPage={usersData?.currentPage}
              totalItems={usersData?.totalItems}
              onChangePage={handleChangePage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withAuthAdmin(AdminUser);
