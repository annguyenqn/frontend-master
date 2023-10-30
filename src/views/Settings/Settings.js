import { useState } from 'react';
import ChangeInfor from './components/ChangeInfor';
import ChangePassword from './components/ChangePassword';
import UpdateBank from './components/UpdateBank';
import { useGetUserLogin } from '../../store/userLogin/hook';
import { useHistory } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';

const TABS = {
  changeInfor: 'infor',
  changePassword: 'password',
  updateBank: 'bank',
};

const Settings = () => {
  const history = useHistory();
  const query = useQuery();
  const [tab, setTab] = useState(query.get('tab') || TABS.changeInfor);
  const { user } = useGetUserLogin();

  const handleChangeTab = (tabSelect) => {
    history.push(`/settings?tab=${tabSelect}`);
    setTab(tabSelect);
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h5 className="text-2xl font-bold lg:text-4xl">Thay đổi thông tin</h5>
      </div>
      <div className="divide-y bg-black-3 divide-black-2 rounded-xl">
        <div className="flex justify-between px-3 space-x-2 text-sm font-bold sm:justify-start lg:px-10 lg:text-2xl sm:text-xl lg:space-x-14 sm:space-x-6">
          <h5
            className={`py-6 border-b-4 ${
              tab === TABS.changeInfor ? 'border-primary' : 'border-transparent cursor-pointer'
            }`}
            onClick={() => {
              handleChangeTab(TABS.changeInfor);
            }}
          >
            Thông tin cá nhân
          </h5>
          <h5
            className={`cursor-pointer py-6 border-b-4 ${
              tab === TABS.changePassword ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => {
              handleChangeTab(TABS.changePassword);
            }}
          >
            Đổi mật khẩu
          </h5>
          <h5
            className={`cursor-pointer py-6 border-b-4 ${
              tab === TABS.updateBank ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => {
              handleChangeTab(TABS.updateBank);
            }}
          >
            Liên kết tài khoản
          </h5>
        </div>
        <div className="p-3 animate-fade-in lg:p-10">
          {tab === TABS.changeInfor && user?._id && <ChangeInfor />}
          {tab === TABS.changePassword && <ChangePassword />}
          {tab === TABS.updateBank && <UpdateBank />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
