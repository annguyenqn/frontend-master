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
import ActionCells from 'components/Table/TableCells/ActionCell';
import { Link } from 'react-router-dom';
import ButtonRound from 'components/Button/ButtonRound';
import classNames from 'classnames';

const breadcrumb = [{ name: 'Dự án hoàn tiền', isActive: true }];

const Refund = () => {
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
          status: ASSET_STATUS.FAIL,
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
  const handleEdit = (id) => {
    history?.push(`/admin/refund/${id}`);
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
          className={classNames(
            'flex items-center',
            row?.original?.investors > 0 && 'cursor-pointer hover:text-primary',
          )}
          data={row?.original?.name}
          image={row?.original?.images?.[0]?.url || '/images/default-image.png'}
          onClick={() => {
            if (row?.original?.investors > 0) {
              handleEdit(row?.original?._id);
            }
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
      Cell: ({ row }) =>
        row?.original?.investors > 0 ? (
          <ActionCells
            editText="Danh sách hoàn tiền"
            onEdit={() => {
              handleEdit(row?.original?._id);
            }}
          />
        ) : null,
    },
  ];

  return (
    <div>
      <Navbar />
      <Container>
        <div className="min-h-screen pt-25 break leading">
          <Breadcrumb breadcrumb={breadcrumb} />
          <div className="text-sm rounded-lg shadow-2xl bg-black-3">
            <div className="px-4 py-2 ">
              <Link to={'/admin/refund/expired-asset'}>
                <ButtonRound className="font-bold border hover:bg-primary hover:border-primary hover:text-black hover:opacity-100">
                  Dự án hết hạn
                </ButtonRound>
              </Link>
            </div>
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

export default withAuthAdmin(Refund);
