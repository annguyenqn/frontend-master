import classNames from 'classnames';
import { PAYMENT_TYPES } from 'constants/config';
import { BANK_LIST as VNPAY_BANK_LIST } from 'constants/payment';
import { FiCheckCircle } from 'react-icons/fi';
import { Tooltip } from 'react-tippy';
import { useFormContext } from 'react-hook-form';

const BankListVNPay = ({ payMenthod }) => {
  const { setValue, watch } = useFormContext();
  const selectedBankCode = watch('bankCode');

  const handleSelectBank = (bankCode) => {
    setValue('bankCode', selectedBankCode === bankCode ? '' : bankCode);
  };

  return (
    <div
      className={classNames(
        'max-w-3xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl animate-fade-in',
        payMenthod === PAYMENT_TYPES.VNP ? 'block' : 'hidden',
      )}
    >
      <h5 className="py-6 text-2xl font-bold text-center">Thanh toán bằng thẻ ngân hàng ATM</h5>
      <div className="px-12 pb-6">
        <div className="flex flex-wrap pt-8">
          {VNPAY_BANK_LIST.map((bank, index) => (
            <div
              key={`payment-bank-${index}`}
              className={classNames('relative flex justify-center w-full p-1 mx-auto sm:mx-0 sm:w-2/12')}
            >
              {/* check icon for selected bank card */}
              {bank?.bankCode === selectedBankCode && (
                <span className="absolute z-10 top-2 right-2 text-primary">
                  <FiCheckCircle strokeWidth={4} />
                </span>
              )}
              {/* ------------------ */}
              <Tooltip title={bank?.name} className="hidden xl:w-full xl:block">
                <div
                  className={`hidden xl:flex items-center justify-center w-full h-12 py-1 overflow-hidden transition-transform duration-500 transform bg-white rounded cursor-pointer xl:hover:scale-105 ${
                    bank?.bankCode === selectedBankCode
                      ? 'border-2 border-primary'
                      : selectedBankCode
                      ? 'opacity-40'
                      : ''
                  }`}
                  onClick={() => handleSelectBank(bank?.bankCode)}
                >
                  <img src={bank?.image} alt={bank?.name} className="object-contain" />
                </div>
              </Tooltip>
              <div
                className={`xl:hidden flex items-center justify-center w-full sm:h-12 h-16 py-1 overflow-hidden bg-white rounded ${
                  bank?.bankCode === selectedBankCode ? 'border-2 border-primary' : selectedBankCode ? 'opacity-40' : ''
                }`}
                onClick={() => handleSelectBank(bank?.bankCode)}
              >
                <img src={bank?.image} alt={bank?.name} className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankListVNPay;
