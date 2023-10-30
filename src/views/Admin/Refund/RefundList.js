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
import { useLocation, useHistory } from 'react-router-dom';
import withAuthAdmin from 'hoc/withAuthAdmin';
import { COLOR_BADGE, REFUND_STATUS } from 'constants/config';
import refundApi from 'api/refundApi';
import { useParams } from 'react-router-dom';
import ActionCells from 'components/Table/TableCells/ActionCell';
import ModalRefund from './ModalRefund';

const breadcrumb = [
  { name: 'Dự án hoàn tiền', link: '/admin/refund' },
  { name: 'Danh sách', isActive: true },
];

const RefundList = () => {
  const history = useHistory();
  const location = useLocation();
  const search = location?.search;
  const { id: assetId } = useParams();

  const queryParse = queryString.parse(search);
  const pageQuery = queryParse.page;
  const [usersData, setUsersData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getDataApi = async () => {
    await setLoading(true);
    try {
      const res = await refundApi.get({
        params: {
          page: pageQuery || 1,
          rowPerPage: LIMIT_ROW_PER_PAGE,
        },
        id: assetId,
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
  // -----------------
  // HANDLE EDIT REFUND STATUS
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleResetDataAfterChange = () => {
    getDataApi();
  };
  // ---------------------
  const tableColumns = [
    {
      Header: '#',
      Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.id || +row?.id + 1} />,
    },
    {
      Header: 'Họ tên',
      Cell: ({ row }) => <SimpleCell data={row?.original?.user?.fullName} />,
    },
    {
      Header: 'Email',
      Cell: ({ row }) => <SimpleCell data={row?.original?.user?.email} />,
    },
    {
      Header: 'Tổng hoàn tiền',
      Cell: ({ row }) => <NumberCell data={row?.original?.totalAmountRefund} currency={row?.original?.currency} />,
    },
    {
      Header: 'Ghi chú',
      Cell: ({ row }) => <SimpleCell className="truncate max-w-56" data={row?.original?.note} />,
    },
    {
      Header: 'Trạng thái',
      Cell: ({ row }) => (
        <BadgeCell data={REFUND_STATUS[row?.original?.status]} color={COLOR_BADGE[row?.original?.status]} />
      ),
    },
    {
      Header: 'Tùy chọn',
      Cell: ({ row }) => (
        <ActionCells
          onEdit={() => {
            handleEdit(row?.original);
          }}
        />
      ),
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
      <ModalRefund
        open={!!editItem}
        onClose={() => setEditItem(null)}
        editItem={editItem}
        resetData={handleResetDataAfterChange}
      />
    </div>
  );
};

export default withAuthAdmin(RefundList);
