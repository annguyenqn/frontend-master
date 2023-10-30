import { Link } from 'react-router-dom';

const AssetsCell = ({ product }) => {
  return (
    <Link to={`/land/detail/${product?.id}`}>
      <div className="text-left cursor-pointer">
        <p>{product?.name}</p>
        <p className="text-gray-1">
          {`${product?.location?.street}, ${product?.location?.district?.name}, ${product?.location?.province?.name}`}
        </p>
      </div>
    </Link>
  );
};

export default AssetsCell;
