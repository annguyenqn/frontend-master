import Dots from 'components/Loader/Dots';
import { useUserInviter, useUserInvitee } from 'store/referral/hooks';
import Invitee from './Components/Invitee';

const Referral = () => {
  const { data: inviteesData, isDataLoaded: isInviteesDataLoaded } = useUserInvitee();
  const { data: inviter, isDataLoaded: isInviterLoaded } = useUserInviter();

  return (
    <div>
      <div className="divide-y bg-black-3 divide-black-2 rounded-xl">
        <div className="flex px-3 space-x-6 text-sm font-bold lg:px-10 lg:text-2xl sm:text-xl lg:space-x-14">
          <h5 className="py-6 border-b-4 border-primary">Người giới thiệu</h5>
        </div>
        <div className="p-3 space-y-2 animate-fade-in lg:p-10">
          <div className="flex">
            <p className="w-1/3">Họ và tên</p>
            <p>{isInviterLoaded ? inviter?.fullName : <Dots />}</p>
          </div>
          <div className="flex">
            <p className="w-1/3">Email</p>
            <p>{isInviterLoaded ? inviter?.email : <Dots />}</p>
          </div>
          <div className="flex">
            <p className="w-1/3">Lợi nhuận</p>
            <p>{isInviterLoaded ? inviter?.totalAmountReferral : <Dots />}</p>
          </div>
        </div>
      </div>
      <div className="divide-y bg-black-3 divide-black-2 rounded-xl">
        <div className="flex px-3 space-x-6 text-sm font-bold lg:px-10 lg:text-2xl sm:text-xl lg:space-x-14">
          <h5 className="py-6 border-b-4 border-primary">Người được giới thiệu</h5>
        </div>
        <div className="p-3 animate-fade-in lg:p-10">
          <Invitee data={inviteesData} isDataLoaded={isInviteesDataLoaded} />
        </div>
      </div>
    </div>
  );
};

export default Referral;
