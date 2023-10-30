import { Link } from 'react-router-dom';

const AssetsCell = ({ payment }) => {
  return (
    <Link to={`/land/detail/${payment.asset?.id}`}>
      <div className="text-left cursor-pointer">
        <p>{payment.asset.name}</p>
      </div>
    </Link>
  );
};

export default AssetsCell;
