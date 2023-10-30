import dayjs from 'dayjs';

const TimeCell = ({ payment }) => {
  return (
    <div className="text-left">
      <p>{dayjs(payment.timestamp || payment.createdAt).format('DD-MM-YYYY HH:mm')}</p>
    </div>
  );
};

export default TimeCell;
