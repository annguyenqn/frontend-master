import Navbar from 'components/Layout/Navbar/Navbar';
import { Link } from 'react-router-dom';

import Container from 'components/Layout/Container/Container';
import { useEffect, useState } from 'react';
import ButtonRound from 'components/Button/ButtonRound';
import assetsApi from 'api/assetsApi';
import { LIMIT_ROW_PER_PAGE } from 'config/config';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Table from 'components/Table/Table';
import queryString from 'query-string';
import ActionCells from 'components/Table/TableCells/ActionCell';
import BadgeCell from 'components/Table/TableCells/BadgeCell';
import SimpleCell from 'components/Table/TableCells/SimpleCell';
import NumberCell from 'components/Table/TableCells/NumberCell';
import TimeCell from 'components/Table/TableCells/TimeCell';
import TruncateCell from 'components/Table/TableCells/TruncateCell';
import { FiPlus } from 'react-icons/fi';
import { useLocation, useHistory } from 'react-router-dom';
import withAuthAdmin from 'hoc/withAuthAdmin';
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import ModalConfirm from 'components/Modal/ModalConfirm';
import ActivateCell from 'components/Table/TableCells/ActivateCell';
import { ASSET_STATUS, COLOR_BADGE, STATUS_PROJECT } from 'constants/config';

const breadcrumb = [{ name: 'Danh sách Dự án', isActive: true }];
const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
};

const AdminLand = () => {
  const history = useHistory();
  const location = useLocation();
  const search = location?.search;
  const queryParse = queryString.parse(search);
  const pageQuery = queryParse.page;
  const [landsData, setLandsData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(MODAL_INIT);

  const resetModal = () => {
    setModal(MODAL_INIT);
  };

  const getDataApi = async () => {
    await setLoading(true);
    try {
      const res = await assetsApi.getAllAdmin({
        params: {
          page: pageQuery || 1,
          rowPerPage: LIMIT_ROW_PER_PAGE,
        },
      });
      await setLandsData(res);
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
  // HANDLE EDIT
  const handleEdit = (id) => {
    history?.push(`/admin/lands/${id}/edit`);
  };
  // ------------------
  // HANDLE DELETE
  const handleDelete = async (id) => {
    try {
      await assetsApi.delete(id);
      await getDataApi();
      showToastSuccess('', 'Dự án đã được xóa');
    } catch (e) {
      console.log(e);
      showToastError('Lệnh xóa dự án thất bại', 'Xóa dự án trạng thái Inactive hoặc thử lại sau');
    } finally {
      resetModal();
    }
  };

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa dự án',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa dự án </p>
          <p className="mt-4 text-xl font-bold text-center text-primary">{item?.name}</p>
        </>
      ),
      onConfirm: () => {
        handleDelete(item?._id);
      },
    });
  };
  // ------------------
  // HANDLE ACTIVATE
  const handleActivate = async (id, isActive) => {
    console.log(isActive);
    try {
      if (isActive) {
        await assetsApi.deactivate(id);
        showToastSuccess('', 'Dự án đã được khóa');
      } else {
        await assetsApi.activate(id);
        showToastSuccess('', 'Dự án đã được kích hoạt');
      }
      await getDataApi();
    } catch (e) {
      console.log(e);
      showToastError('Yêu cầu thất bại', 'Vui lòng thử lại sau');
    } finally {
      resetModal();
    }
  };

  const handleClickActivate = (item) => {
    const isActive = item?.status !== ASSET_STATUS.NEW && item?.status !== ASSET_STATUS.INACTIVE;
    setModal({
      isOpen: true,
      title: isActive ? 'Khóa dự án' : 'Kích hoạt dự án',
      children: (
        <>
          <p>
            <span className="mr-1">Bạn có chắc chắn muốn</span>
            {isActive ? 'khóa' : 'kích hoạt'}
          </p>
          <p className="mt-4 text-xl font-bold text-center text-primary">{item?.name}</p>
        </>
      ),
      onConfirm: () => {
        handleActivate(item?._id, isActive);
      },
    });
  };
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
      Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.id} />,
    },
    {
      Header: 'Dự án',
      Cell: ({ row }) => (
        <TruncateCell
          className="flex items-center cursor-pointer hover:text-primary"
          data={row?.original?.name}
          image={row?.original?.images?.[0]?.url || '/images/default-image.png'}
          onClick={() => {
            handleEdit(row?.original?.id);
          }}
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
      Cell: ({ row }) => <SimpleCell data={row?.original?.investors} />,
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
      Cell: ({ row }) => {
        const isActive = row?.original?.status !== ASSET_STATUS.NEW && row?.original?.status !== ASSET_STATUS.INACTIVE;
        return (
          <div className="flex space-x-4">
            <ActivateCell
              id={row?.original?._id}
              onActive={() => {
                handleClickActivate(row?.original);
              }}
              isActive={isActive}
            />
            <ActionCells
              onEdit={() => {
                handleEdit(row?.original?.id);
              }}
              onDelete={() => {
                onClickDelete(row?.original);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <Container>
        <div className="min-h-screen pt-25 break leading">
          <Breadcrumb breadcrumb={breadcrumb} />
          <div className="text-sm rounded-lg shadow-2xl bg-black-3">
            <div className="flex px-6 py-4">
              <Link to="/admin/lands/create">
                <ButtonRound className="flex items-center py-2 font-bold leading-none uppercase transition-transform duration-300 transform border-none text-black-1 bg-primary hover:-translate-y-1">
                  <FiPlus size={'1.1rem'} />
                  <span>Tạo mới</span>
                </ButtonRound>
              </Link>
            </div>
            <Table
              isLoading={isLoading}
              columns={tableColumns}
              data={landsData?.data}
              headCellsClassName="bg-primary text-black-1 font-bold border border-black-1 uppercase"
              bodyCellsClassName="border-b border-black-3"
              tableClassName={''}
              // pagination keys
              totalPage={landsData?.totalPage}
              currentPage={landsData?.currentPage}
              totalItems={landsData?.totalItems}
              onChangePage={handleChangePage}
            />
          </div>
        </div>
      </Container>
      <ModalConfirm
        open={modal?.isOpen}
        onClose={resetModal}
        onConfirm={modal?.onConfirm}
        onCancel={resetModal}
        title={modal?.title}
      >
        {modal.children}
      </ModalConfirm>
    </div>
  );
};

export default withAuthAdmin(AdminLand);
