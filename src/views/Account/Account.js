import ButtonRound from 'components/Button/ButtonRound';
import { TableDummy1, TableDummy2 } from 'constants/DummyData';
import { useState } from 'react';
import { useGetUserLogin } from '../../store/userLogin/hook';
import { formatNumber } from '../../utils/formatBalance';
import useQuery from '../../hooks/useQuery';
import PaymentHistory from './Components/PaymentHistory/PaymentHistory';
import { useUserPaymentHistory } from '../../store/paymentHistory/hooks';
import { useHistory } from 'react-router-dom';

const TABS = {
  history: 'history',
};

const Account = () => {
  const history = useHistory();
  const query = useQuery();
  const [tab, setTab] = useState(query.get('tab') || TABS.history);
  const { user } = useGetUserLogin();
  const { data, isDataLoaded } = useUserPaymentHistory();

  const handleChangeTab = (tabSelect) => {
    history.push(`/account?tab=${tabSelect}`);
    setTab(tabSelect);
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h5 className="text-2xl font-bold lg:text-4xl">Tài khoản</h5>
        {/*<div>*/}
        {/*  <div className="flex justify-end ml-auto space-x-6">*/}
        {/*    <ButtonRound className="font-bold border hover:bg-primary hover:text-white hover:opacity-100 border-primary text-primary lg:min-w-40">*/}
        {/*      {' '}*/}
        {/*      Nạp{' '}*/}
        {/*    </ButtonRound>*/}
        {/*    <ButtonRound className="font-bold border hover:bg-primary hover:text-white hover:opacity-100 border-primary text-primary lg:min-w-40">*/}
        {/*      {' '}*/}
        {/*      Rút{' '}*/}
        {/*    </ButtonRound>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      {/* part 2 */}
      <div className="flex mb-6 divide-x bg-black-3 divide-black-2 rounded-xl">
        <div className="flex-1 py-6 text-center">
          <p className="text-gray-400">Tổng tài sản ước tính</p>
          <p className="text-xl font-bold leading-tight lg:text-4xl text-primary">
            {formatNumber(user?.totalAmountSpend || 0, 0, 0)}
          </p>
          <p>VND</p>
        </div>
        <div className="flex-1 py-6 text-center">
          <p className="text-gray-400">Số tiền đã đầu tư</p>
          <p className="text-xl font-bold leading-tight lg:text-4xl text-primary">
            {' '}
            {formatNumber(user?.totalAmountInvested || 0, 0, 0)}
          </p>
          <p>VND</p>
        </div>
        <div className="flex-1 py-6 text-center">
          <p className="text-gray-400">Số dư hiện tại</p>
          <p className="text-xl font-bold leading-tight lg:text-4xl text-primary">
            {formatNumber(user?.remainAmount || 0, 0, 0)}
          </p>
          <p>VND</p>
        </div>
      </div>
      {/* part 3 */}
      <div className="divide-y bg-black-3 divide-black-2 rounded-xl">
        <div className="flex px-3 space-x-6 text-sm font-bold lg:px-10 lg:text-2xl sm:text-xl lg:space-x-14">
          {/*<h5*/}
          {/*  className={`py-6 border-b-4 ${tab === 1 ? 'border-primary' : 'border-transparent cursor-pointer'}`}*/}
          {/*  onClick={() => {*/}
          {/*    setTab(1);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Tổng quan tài sản*/}
          {/*</h5>*/}
          <h5
            className={`cursor-pointer py-6 border-b-4 ${
              tab === TABS.history ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => handleChangeTab(TABS.history)}
          >
            Lịch sử giao dịch
          </h5>
        </div>
        <div className="p-3 animate-fade-in lg:p-10">
          {tab === TABS.history && <PaymentHistory data={data} isDataLoaded={isDataLoaded} />}
          {/*{tab === 2 && <TableTrading thead={TableDummy2.thead} tbody={TableDummy2.tbody} />}*/}
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {};

export default Account;
