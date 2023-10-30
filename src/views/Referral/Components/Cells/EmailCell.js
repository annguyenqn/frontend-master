const EmailCell = ({ data }) => {
  return (
    <div className="text-left">
      <p className="">{data?.email}</p>
    </div>
  );
};

export default EmailCell;
