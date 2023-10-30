import { Tooltip } from 'react-tippy';
// import ButtonRound from '../../../components/Button/ButtonRound';
import { useGetUserLogin } from '../../../store/userLogin/hook';
import { FiCopy } from 'react-icons/fi';
import { useState } from 'react';

const ProfileInformation = () => {
  const [tooltipText, setTooltipText] = useState('Copy mã giới thiệu');
  const { user } = useGetUserLogin();

  const handleCopyReferralCode = () => {
    navigator?.clipboard?.writeText(user?.inviterReferralId);
    setTooltipText('Đã lưu mã!');
  };

  return (
    <div className="flex flex-auto pt-4 pl-4 lg:pt-8 lg:pl-8">
      <div className="space-y-4">
        <h5 className="text-xl font-bold lg:text-4xl md:text-2xl">{user?.fullName}</h5>
        {user?.inviterReferralId && (
          <>
            <span>
              Mã giới thiệu: <b className="text-primary">{user?.inviterReferralId}</b>
            </span>
            <Tooltip position="top" title={tooltipText} trigger="mouseenter" hideOnClick={false}>
              <FiCopy
                data-tip=""
                data-for={`referral-code-tooltip`}
                size={'1.2rem'}
                className="inline-block mx-2 cursor-pointer hover:text-primary"
                onClick={handleCopyReferralCode}
              />
            </Tooltip>
          </>
        )}

        {/*<p>*/}
        {/*  Mã giới thiệu: <span className="font-bold"> 12536865</span>*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  <FiCopy className="inline mr-2 text-3xl" />{' '}*/}
        {/*  <span className=" text-sm-md-md"> 0x79b6930DEfb52d90EDF0c82880450e9808E841Dd</span>*/}
        {/*</p>*/}
      </div>
      {/*<div className="flex flex-col justify-end ml-auto">*/}
      {/*  <div className="flex justify-between pb-2 min-w-3xs">*/}
      {/*    <span>Ký quỹ</span>*/}
      {/*    <span className="font-bold text-primary">50,000</span>*/}
      {/*  </div>*/}
      {/*  <div className="flex justify-between pb-4 min-w-3xs">*/}
      {/*    <span>Lợi nhuận</span>*/}
      {/*    <span className="font-bold text-primary">10,000</span>*/}
      {/*  </div>*/}
      {/*  <div className="flex justify-end">*/}
      {/*    <ButtonRound className="font-bold px-7 hover:bg-white hover:text-black-2 hover:opacity-100">*/}
      {/*      Rút lợi nhuận*/}
      {/*    </ButtonRound>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default ProfileInformation;
