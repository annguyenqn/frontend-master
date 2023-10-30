import dayjs from 'dayjs';

const InfoCell = ({ product }) => {
  return (
    <div className="text-left">
      <p>{product.investors} nhà đầu tư</p>
      <p className="text-gray-1">Mở bán: {dayjs(product.openTime).format('DD/MM/YYYY')}</p>
    </div>
  );
};

export default InfoCell;
