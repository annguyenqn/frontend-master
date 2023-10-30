import ProductsTable from './ProductsTable/ProductsTable';

const Products = ({ data, isDataLoaded }) => {
  const products = data?.data || [];

  if (products.length === 0) {
    return <p className="text-center">Chưa có sản phẩm nào!</p>;
  }

  return (
    <ProductsTable
      products={products}
      totalPage={data.totalPage}
      currentPage={data.currentPage}
      isDataLoaded={isDataLoaded}
    />
  );
};

export default Products;
