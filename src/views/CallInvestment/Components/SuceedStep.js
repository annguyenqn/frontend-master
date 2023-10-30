import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ButtonRound from 'components/Button/ButtonRound';
import {
  MOMO_RESPONSE_CODE_MESSAGE,
  MOMO_RESPONSE_CODE_STATUS,
  PAYME_RESPONSE_STATUS,
  VN_PAY_RESPONSE_CODE_MESSAGE,
  VN_PAY_RESPONSE_CODE_STATUS,
} from 'constants/payment';
import { useHistory } from 'react-router-dom';

const SuceedStep = () => {
  const history = useHistory();
  const paramsSearch = new URLSearchParams(history.location.search);
  const paramsVnPay = {
    status:
      VN_PAY_RESPONSE_CODE_STATUS?.[paramsSearch.get('vnp_ResponseCode')] ||
      MOMO_RESPONSE_CODE_STATUS?.[paramsSearch.get('resultCode')] ||
      PAYME_RESPONSE_STATUS?.[paramsSearch.get('status')],
    message:
      VN_PAY_RESPONSE_CODE_MESSAGE?.[paramsSearch.get('vnp_ResponseCode')] ||
      MOMO_RESPONSE_CODE_MESSAGE?.[paramsSearch.get('resultCode')],
    orderInfo: paramsSearch.get('vnp_OrderInfo') || paramsSearch.get('orderInfo') || paramsSearch.get('desc'),
  };

  const handleBack = () => {
    history.push('/');
  };

  return (
    <div className="animate-fade-in">
      <div className="relative my-10 text-center">
        <Button
          className="absolute top-0 left-0 flex items-center text-2xl hover:text-primary"
          type="button"
          color=""
          onClick={handleBack}
        >
          <FiChevronLeft className="mt-1 mr-1" />
          <span className="leading-">Trở về trang chủ</span>
        </Button>
      </div>
      <div className="mb-24 ">
        <h5 className="px-20 py-4 pt-16 text-5xl font-bold leading-tight text-center lg:pt-16 text-primary">
          {paramsVnPay?.status || ''}
        </h5>
        <p className="pb-4 text-center">{paramsVnPay?.message || ''}</p>
        <p className="pb-4 text-center">{paramsVnPay?.orderInfo || ''}</p>

        <ButtonRound
          className="flex items-center mx-auto bg-transparent border-0 hover:text-primary"
          type="button"
          onClick={() => {
            history.push('/account');
          }}
        >
          <span> Xem lịch sử</span>
          <FiChevronRight className="mt-1 ml-1" />
        </ButtonRound>
      </div>
    </div>
  );
};

SuceedStep.propTypes = {
  onGoBack: PropTypes.func,
  onNext: PropTypes.func,
};

export default SuceedStep;
