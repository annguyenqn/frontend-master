import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import { FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import classNames from 'classnames';
import ButtonRound from 'components/Button/ButtonRound';
import { useFormContext } from 'react-hook-form';
import { PAYMENT_TYPES, PAYME_PAYMENT_METHOD } from 'constants/config';
import BankListPayMe from './BankListPayMe';

// wait accept from MOMO and VNPAY
// const LIST_LOGO_PAYMENT = [
//   { type: 'PAYME', image: '/images/logo/payme.svg', className: 'h-24 w-48 px-2' },
//   { type: 'MOMO', image: '/images/logo/momo.svg', className: 'w-24 h-24' },
// ];

const LIST_LABEL_PAYMENT = [
  {
    type: PAYMENT_TYPES.PAYME,
    payMenthod: PAYME_PAYMENT_METHOD.ATMCARD,
    lable: 'ATM/INTERNET BANKING',
    subText: 'by PayME',
  },
  {
    type: PAYMENT_TYPES.PAYME,
    payMenthod: PAYME_PAYMENT_METHOD.CREDITCARD,
    lable: 'VISA/MASTER/JCB CARD',
    subText: 'by PayME',
  },
  {
    type: PAYMENT_TYPES.PAYME,
    payMenthod: PAYME_PAYMENT_METHOD.BANKTRANSFER,
    lable: 'BANK TRANSFER',
    subText: 'by PayME',
  },
];

const PaymentStep = ({ onGoBack }) => {
  const [state, setState] = useState(PAYME_PAYMENT_METHOD.ATMCARD);
  const { setValue } = useFormContext();

  const handleChangePaymentMode = (mode, payMethod) => {
    setValue('bankCode', '');
    setValue('paymentType', mode);
    setValue('payMethod', payMethod);
    setState(payMethod);
  };

  return (
    <div className="animate-fade-in">
      <div className="relative my-10 text-center">
        <h3 className="px-4 pt-16 text-4xl font-bold lg:pt-0"> Phương thức thanh toán </h3>
        <Button
          className="absolute top-0 left-0 flex items-center text-2xl hover:text-primary"
          type="button"
          color=""
          onClick={onGoBack}
        >
          <FiChevronLeft className="mt-1 mr-1" />
          Quay lại
        </Button>
      </div>

      <div className="flex flex-col flex-wrap items-center justify-between max-w-3xl px-4 mx-auto mb-10 sm:py-4 sm:flex-row bg-black-3 rounded-xl">
        {LIST_LABEL_PAYMENT.map((item) => (
          <div
            className={classNames(
              'h-24 py-4 my-4 sm:m-4 text-xl font-bold cursor-pointer rounded-xl text-center leading-none',
              'hover:scale-105 transition-transform duration-500 transform',
              'flex flex-col items-center justify-center flex-1  w-full',
              state === item?.payMenthod ? 'bg-primary text-black-3' : 'border',
            )}
            onClick={() => {
              handleChangePaymentMode(item?.type, item?.payMenthod);
            }}
          >
            {item.lable}
            <p className="mt-2 text-md">{item.subText}</p>
          </div>
        ))}

        {/* {LIST_LOGO_PAYMENT.map((item) => (
          <div
            key={item?.type}
            className={classNames(
              'h-24 my-4 sm:m-4 text-2xl font-bold cursor-pointer rounded-xl text-center',
              'transition-transform duration-500 transform hover:scale-105',
              'flex items-center justify-center flex-1  w-full',
            )}
            onClick={() => {
              handleChangePaymentMode(PAYMENT_TYPES[item?.type]);
            }}
          >
            <div
              className={classNames(
                'items-center justify-center transition-transform duration-500 transform bg-white rounded-lg cursor-pointer flex xl:hover:scale-105',
                'filter',
                item?.className,
                state === PAYMENT_TYPES[item?.type] ? '' : 'grayscale',
              )}
            >
              <img src={item?.image} alt={`logo-${item?.type}`} className="object-contain h-full" />
            </div>
          </div>
        ))} */}
      </div>
      <BankListPayMe payMenthod={state} />
      {/* <BankListVNPay payMenthod={state} /> */}
      <div className="mb-10">
        <ButtonRound
          className="mx-auto font-bold uppercase border-0 bg-primary text-black-3"
          disabled={!state}
          type={'submit'}
        >
          Xác nhận
        </ButtonRound>
      </div>
    </div>
  );
};

PaymentStep.propTypes = {
  onGoBack: PropTypes.func,
  onNext: PropTypes.func,
};
PaymentStep.defaultProps = {
  onGoBack: () => {},
  onNext: () => {},
};

export default PaymentStep;
