import { PAYMENT_HISTORY_STATUS } from '../../../../../constants/payment';

const StatusCell = ({ payment }) => {
  return (
    <div className="text-left">
      <p>{PAYMENT_HISTORY_STATUS[payment?.status]}</p>
    </div>
  );
};

export default StatusCell;
