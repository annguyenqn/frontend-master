import { formatNumber } from '../../../../../utils/formatBalance';

const QuantityCell = ({ product }) => {
  return (
    <div className="text-right">
      <p className="font-bold">
        {product.investedSlot.toFixed(2)}/{product.totalSlot}
      </p>
      <p className="text-primary font-bold">{formatNumber(product.value, 0, 0)}</p>
    </div>
  );
};

export default QuantityCell;
