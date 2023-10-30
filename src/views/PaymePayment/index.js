import SpinnerLoading from 'components/SpinnerLoading';
import { useHistory, useParams } from 'react-router-dom';

const PaymePayment = () => {
  const history = useHistory();
  const { status } = useParams();
  const urlParams = new URLSearchParams(history?.location.search);
  urlParams.set('status', status);
  history.push({
    pathname: `/call-investment/payment-result`,
    search: urlParams.toString(),
  });

  return (
    <div className="flex items-center justify-center h-screen bg-black-2">
      <SpinnerLoading className="h-20 text-primary" />
    </div>
  );
};

export default PaymePayment;
