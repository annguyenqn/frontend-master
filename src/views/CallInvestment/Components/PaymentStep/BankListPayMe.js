import classNames from 'classnames';
import { PAYME_PAYMENT_METHOD } from 'constants/config';

const PayMeBankList = ({ payMenthod }) => {
  return (
    <>
      <div
        className={classNames(
          'max-w-3xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl animate-fade-in cursor-pointer',
          payMenthod !== PAYME_PAYMENT_METHOD.ATMCARD && 'hidden',
        )}
      >
        <h5 className="py-6 text-2xl font-bold text-center">Thanh toán bằng thẻ ngân hàng ATM</h5>
        <div className="px-4 pb-6 sm:px-12">
          <div className="flex flex-wrap p-2 bg-white rounded-xl">
            <button className="p-4 bg-white rounded-xl" type="submit">
              <img src="/images/atm-card-logo.jpg" alt="atm-card-logo" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'max-w-3xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl animate-fade-in',
          payMenthod !== PAYME_PAYMENT_METHOD.CREDITCARD && 'hidden',
        )}
      >
        <h5 className="py-6 text-2xl font-bold text-center">Thanh toán bằng VISA/MASTER/JCB card</h5>
        <div className="px-4 pb-6 sm:px-12">
          <div className="flex flex-wrap pt-8">
            <button className="p-4 bg-white rounded-xl" type="submit">
              <img src="/images/credit-card-logo.jpg" alt="credit-card-logo" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'max-w-3xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl animate-fade-in',
          payMenthod !== PAYME_PAYMENT_METHOD.BANKTRANSFER && 'hidden',
        )}
      >
        <h5 className="py-6 text-2xl font-bold text-center">Thanh toán bằng chuyển khoản ngân hàng</h5>
        <div className="px-4 pb-6 sm:px-12">
          <div className="flex flex-wrap pt-8">
            <button className="p-4 bg-white rounded-xl" type="submit">
              <img src="/images/bank-transfer-logo.jpg" alt="bank-transfer-logo" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayMeBankList;
