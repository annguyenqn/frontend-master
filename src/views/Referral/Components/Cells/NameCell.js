const NameCell = ({ data }) => {
  return (
    <div className="text-left">
      <p className="">{data?.fullName}</p>
    </div>
  );
};

export default NameCell;
