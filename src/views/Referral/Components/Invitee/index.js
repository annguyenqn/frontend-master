import InveteeTable from './Table';
import PropTypes from 'prop-types';

const Invitee = ({ data, isDataLoaded }) => {
  const invitees = data?.data || [];

  if (invitees.length === 0) {
    return <p className="text-center">Chưa có người được giới thiệu</p>;
  }

  return (
    <InveteeTable
      invitees={invitees}
      totalPage={data?.totalPage || 1}
      currentPage={data?.currentPage || 1}
      isDataLoaded={isDataLoaded}
    />
  );
};

Invitee.propTypes = {
  data: PropTypes.array,
  isDataLoaded: PropTypes.bool,
};

Invitee.defaultProps = {
  data: [],
  isDataLoaded: false,
};

export default Invitee;
