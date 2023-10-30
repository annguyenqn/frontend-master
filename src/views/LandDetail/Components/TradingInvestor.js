import assetsApi from 'api/assetsApi';
import { showToastError } from 'components/CustomToast/CustomToast';
import TradingPagination from 'components/Pagination/TradingPagination';
import { LIMIT_ROW_PER_PAGE } from 'config/config';
import { useEffect, useState } from 'react';
import { formatTimePast } from 'utils/formatTime';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SpinnerLoading from 'components/SpinnerLoading';

const TradingInvestor = ({ id, totalSlot }) => {
  const history = useHistory();
  const params = new URLSearchParams(history?.location?.search);
  const historyTab = +params.get('historyTab') || 1;
  const historyPage = +params.get('historyPage') || 1;

  const [isLoading, setLoading] = useState(true);
  const [tab, setTab] = useState(historyTab);
  const [payments, setPayments] = useState(null);
  const [investors, setInvestors] = useState(null);

  const handleChangeTab = (newTab) => {
    params.set('historyTab', newTab);
    params.set('historyPage', 1);
    if (newTab !== tab) {
      setTab(newTab);
      history.push({
        pathname: history?.location?.pathname,
        search: params.toString(),
      });
    }
  };

  const handleChangePage = (newPage) => {
    params.set('historyPage', newPage);
    if (newPage != historyPage) {
      history.push({
        pathname: history?.location?.pathname,
        search: params.toString(),
      });
    }
  };

  const handleNext = () => {
    handleChangePage(historyPage + 1);
  };

  const handlePrevious = () => {
    handleChangePage(historyPage - 1);
  };
  // ------------
  // GET API FUNCTION
  const getApiInvestor = async (page) => {
    return await assetsApi.getInvestor({
      id,
      params: {
        rowPerPage: LIMIT_ROW_PER_PAGE,
        page: page,
      },
    });
  };

  const getApiPayment = async (page) => {
    return await assetsApi.getPayment({
      id,
      params: {
        rowPerPage: LIMIT_ROW_PER_PAGE,
        page: page < 0 ? 1 : page,
      },
    });
  };
  // --------------
  const getApiDataFirstLoad = async () => {
    if (!investors) {
      const resInvestors = await getApiInvestor(tab === 2 ? historyPage : 1);
      setInvestors(resInvestors);
    }
    if (!payments) {
      const resPayments = await getApiPayment(tab !== 2 ? historyPage : 1);
      setPayments(resPayments);
    }
  };

  const getApiDataAfterChangePage = async () => {
    if (tab === 2 && investors) {
      const resInvestors = await getApiInvestor(historyPage);
      // to check if API data hasn't page, we will call page 1
      if (historyPage < 0 || historyPage > resInvestors?.totalPage) {
        handleChangePage(1);
      }
      setInvestors(resInvestors);
    }
    if (tab !== 2 && payments) {
      const resPayments = await getApiPayment(historyPage);
      // to check if API data hasn't page, we will call page 1
      if (historyPage < 0 || historyPage > resPayments?.totalPage) {
        handleChangePage(1);
      }
      setPayments(resPayments);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await setLoading(true);
        await getApiDataFirstLoad();
        await getApiDataAfterChangePage();
        await setLoading(false);
      } catch (e) {
        await setLoading(false);
        showToastError('', 'Kết nối server thất bại');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, tab, historyPage]);

  return (
    <div className="h-full divide-y divide-black rounded-lg md:w-5/12 xl:w-4/12 bg-black-3">
      <div className="relative flex justify-between px-12 text-xl font-bold 2xl:text-2xl">
        <div
          className={`pt-6 pb-5 border-b-4 cursor-pointer ${tab === 1 ? 'border-primary' : 'border-transparent'}`}
          onClick={() => {
            handleChangeTab(1);
          }}
        >
          Giao dịch
          <span className="text-lg">{`(${
            !payments?.totalItems ? 0 : payments?.totalItems > 99 ? '+99' : payments?.totalItems
          })`}</span>
        </div>
        <div
          className={`pt-6 pb-5 tracking-tight border-b-4 cursor-pointer ${
            tab === 2 ? 'border-primary' : 'border-transparent'
          }`}
          onClick={() => {
            handleChangeTab(2);
          }}
        >
          Nhà đầu tư
          <span className="text-lg">{`(${
            !investors?.totalItems ? 0 : investors?.totalItems > 99 ? '+99' : investors?.totalItems
          })`}</span>
        </div>
      </div>
      <div className="relative overflow-y-auto">
        {isLoading && (
          <div className="h-full w-full bg-black-3-90% absolute top-0 left-0 z-10 animate-fade-in flex items-center justify-center">
            <SpinnerLoading className="h-10 text-primary" />
          </div>
        )}
        {tab === 1 &&
          payments?.data?.map((item, index) => (
            <div key={`trading-${index}`} className="flex justify-between px-12 py-6 animate-fade-in">
              <div className="text-sm">
                <p className="capitalize">{item?.user?.fullName}</p>
                <p className="mt-2 lowercase text-gray-1">{formatTimePast(item?.timestamp)}</p>
              </div>
              <div className="font-bold text-right">
                <p>{item?.slotFilled?.toLocaleString('vi-VN')} PHẦN</p>
                <p className="text-primary">
                  {item?.amount?.toLocaleString('vi-VN')} {item?.currency}
                </p>
              </div>
            </div>
          ))}
        {tab === 2 &&
          investors?.data?.map((item, index) => (
            <div key={`trading-${index}`} className="flex justify-between px-12 py-6 animate-fade-in">
              <div className="text-sm">
                <p className="capitalize">{item?.user?.fullName}</p>
                <p className="mt-2 text-gray-1">{formatTimePast(item?.timestamp)}</p>
              </div>
              <div className="font-bold text-right">
                <p>
                  {item?.totalSlotFilled?.toLocaleString('vi-VN')} / {totalSlot}
                </p>
                <p className="text-primary">
                  {(+item?.totalAmountFilled)?.toLocaleString('vi-VN')} {item?.currency || 'VND'}
                </p>
              </div>
            </div>
          ))}
      </div>

      {payments?.totalPage > 1 && tab === 1 && (
        <TradingPagination data={payments} onPrevious={handlePrevious} onNext={handleNext} />
      )}
      {investors?.totalPage > 1 && tab === 2 && (
        <TradingPagination data={investors} onPrevious={handlePrevious} onNext={handleNext} />
      )}
    </div>
  );
};

TradingInvestor.propTypes = {
  id: PropTypes.string,
  totalSlot: PropTypes.any,
};

export default TradingInvestor;
