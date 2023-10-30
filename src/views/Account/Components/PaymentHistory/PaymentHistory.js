import PaymentTable from './PaymentTable';

const PaymentHistory = ({ data, isDataLoaded }) => {
  const payments = data?.data || [];

  if (payments.length === 0) {
    return <p className="text-center">Chưa có giao dịch nào!</p>;
  }

  return (
    <PaymentTable
      payments={payments}
      totalPage={data.totalPage}
      currentPage={data.currentPage}
      isDataLoaded={isDataLoaded}
    />
  );
};

export default PaymentHistory;
