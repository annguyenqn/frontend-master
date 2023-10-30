const ProfitCell = ({ data }) => {
  return (
    <div className="text-left">
      <p className="">{data?.totalAmountReferral?.toLocaleString('vi-VN') || 0}</p>
    </div>
  );
};

export default ProfitCell;
