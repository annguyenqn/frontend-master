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
import { ASSET_STATUS, COLOR_BADGE, STATUS_PROJECT } from 'constants/config';
import assetsApi from 'api/assetsApi';
import TimeCell from 'components/Table/TableCells/TimeCell';
import TruncateCell from 'components/Table/TableCells/TruncateCell';
import ModalConfirm from 'components/Modal/ModalConfirm';
import { CgUserList } from 'react-icons/cg';
import { Tooltip } from 'react-tippy';
import { handleToastError } from 'utils';

const breadcrumb = [
  { name: 'Dự án hoàn tiền', link: '/admin/refund' },
  { name: 'Dự án hết hạn', isActive: true },
];

const ExpiredAsset = () => {
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
      const res = await assetsApi.get({
        params: {
          page: pageQuery || 1,
          rowPerPage: LIMIT_ROW_PER_PAGE,
          status: ASSET_STATUS.EXPIRED,
        },
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
  //-------------------
  const handleChangePage = async (page) => {
    queryParse.page = page;
    await setLoading(true);
    await history?.push({
      search: queryString.stringify(queryParse),
    });
  };
  // ----------------
  // HANDLE CHANGE STATUS
  const [itemId, setItemId] = useState('');
  const handleClose = () => {
    setItemId(null);
  };
  const handleEdit = (id) => {
    setItemId(id);
  };
  const handleConfirmChangeStatus = async () => {
    try {
      await assetsApi.changeStatusToFail(itemId);
      await handleClose();
      await getDataApi();
    } catch (error) {
      console.log(error);
      handleToastError(error);
    }
  };
  // ---------------------
  const tableColumns = [
    {
      Header: '#',
      Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.id} />,
    },
    {
      Header: 'Dự án',
      Cell: ({ row }) => (
        <TruncateCell
          className="flex items-center"
          data={row?.original?.name}
          image={row?.original?.images?.[0]?.url || '/images/default-image.png'}
        />
      ),
    },
    {
      Header: 'Ngày mở bán',
      Cell: ({ row }) => <TimeCell time={row?.original?.openTime} />,
    },
    {
      Header: 'Ngày ngừng bán',
      Cell: ({ row }) => <TimeCell time={row?.original?.closeTime} />,
    },
    {
      Header: 'Nhà đầu tư',
      Cell: ({ row }) => <SimpleCell className="text-right" data={row?.original?.investors} />,
    },
    {
      Header: 'Giá tổng',
      Cell: ({ row }) => <NumberCell data={row?.original?.value} />,
    },
    {
      Header: 'Trạng thái',
      Cell: ({ row }) => (
        <BadgeCell data={STATUS_PROJECT[row?.original?.status]} color={COLOR_BADGE[row?.original?.status]} />
      ),
    },
    {
      Header: 'Tùy chọn',
      Cell: ({ row }) => (
        <>
          <Tooltip position="top" title="Xuất bản danh sách hoàn tiền">
            <CgUserList
              data-tip=""
              data-for={`delete-btn-tooltip`}
              size={'1.2rem'}
              className="mx-auto transition-transform duration-300 transform outline-none cursor-pointer hover:text-primary hover:-translate-y-1"
              onClick={() => handleEdit(row?.original?._id)}
            />
          </Tooltip>
        </>
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
      <ModalConfirm
        open={!!itemId}
        onClose={handleClose}
        onConfirm={handleConfirmChangeStatus}
        onCancel={handleClose}
        title="Xuất bản danh sách hoàn tiền"
        message="Chú ý : Xuất bản danh sách hoàn tiền sẽ chuyển trạng thái dự án thành Thất bại. Hãy chọn xác nhận để tiếp tục."
      />
    </div>
  );
};

export default withAuthAdmin(ExpiredAsset);
