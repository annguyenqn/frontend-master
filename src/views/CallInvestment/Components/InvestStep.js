import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import { FiChevronLeft } from 'react-icons/fi';
import ButtonRound from 'components/Button/ButtonRound';
import ProgressBarPriceStep from 'components/ProgessBar/ProgressBarPriceStep';
import { Controller, useFormContext } from 'react-hook-form';
import { formatCurrencyVND, validateMinInvest, validateMultiplesInvest } from 'utils';

// eslint-disable-next-line no-undef
const LIMIT_INVEST_AMOUNT = +process.env.REACT_APP_LIMIT_INVEST_AMOUNT || 1e4;

const InvestStep = ({ onGoBack, onNext, project }) => {
  const {
    control,
    trigger,
    formState: { dirtyFields, errors },
  } = useFormContext();

  const FORM_INPUT = {
    id: 'invest',
    name: 'invest',
    label: 'Mật khẩu',
    rules: {
      required: 'Nhập thông tin',
      validate: {
        checkValie: (v) =>
          validateMinInvest(v, LIMIT_INVEST_AMOUNT) ||
          `Nhập số tiền trên mức ${LIMIT_INVEST_AMOUNT.toLocaleString('vi-VN')} VND`,
        checkValieMultiples: (v) => validateMultiplesInvest(v) || 'Nhập số tiền bội số của 1.000',
      },
    },
    className: 'mb-4',
    classNameInput: `py-4 pl-28 bg-transparent rounded-xl w-full border focus:outline-none ${
      errors?.['password']?.message ? 'border-red-400' : ''
    }`,
    placeholder: 'Nhập số tiền ... ',
    type: 'text',
    defaultValue: '',
    prependIcon: (
      <div className="flex items-center font-bold bg-black-3">
        <span> VND </span>
      </div>
    ),
  };

  return (
    <div className="animate-fade-in">
      <div className="relative my-10 text-center ">
        <h3 className="pt-16 text-4xl font-bold lg:pt-0"> Góp vốn đầu tư </h3>
        <Button
          className="absolute top-0 left-0 flex items-center text-2xl hover:text-primary"
          type="button"
          color="none"
          onClick={onGoBack}
        >
          <FiChevronLeft className="mt-1 mr-1" />
          Quay lại Trang chi tiết
        </Button>
      </div>
      <div className="max-w-4xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl">
        <h5 className="px-4 py-4 text-2xl font-bold text-center">Số lượng vốn muốn đầu tư bất động sản</h5>
        <div className="px-4 py-6 sm:px-12 ">
          <div className={`${FORM_INPUT.className} relative `}>
            <label htmlFor={FORM_INPUT.id} className="absolute top-0 py-4 pr-4 border-r left-6">
              {FORM_INPUT?.prependIcon}
            </label>
            <div className="absolute top-0 py-4 right-6">{FORM_INPUT?.appendIcon}</div>
            <div className={FORM_INPUT.className}>
              <Controller
                control={control}
                rules={FORM_INPUT.rules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <input
                    id={FORM_INPUT.id}
                    onBlur={onBlur}
                    value={value}
                    onKeyPress={async (e) => {
                      const res = await trigger(FORM_INPUT.id);
                      if (e.key === 'Enter' && res) {
                        await onNext();
                      }
                    }}
                    onChange={async (e) => {
                      const currencyVND = formatCurrencyVND(e.target.value);
                      await onChange(currencyVND);
                      await trigger(FORM_INPUT.id);
                    }}
                    className={FORM_INPUT.classNameInput}
                    placeholder={FORM_INPUT.placeholder}
                    type={FORM_INPUT.type}
                    disabled={FORM_INPUT?.disabled}
                    autoComplete="off"
                  />
                )}
                name={FORM_INPUT.name}
                defaultValue={FORM_INPUT.defaultValue}
              />
              {errors?.[FORM_INPUT.id]?.message && (
                <span className="text-xs text-red-400 ">* {errors?.[FORM_INPUT.id]?.message || 'Invalid'} </span>
              )}
            </div>
          </div>
        </div>
        <div className="px-12 py-6">
          <h5 className="mb-4 text-lg font-bold">Mức giá theo bậc thang</h5>
          <ProgressBarPriceStep prices={project?.prices} />
        </div>
        <div className="px-12 py-6">
          <ButtonRound
            className="w-full mx-auto font-bold border-0 bg-primary text-black-2"
            disabled={!!errors?.[FORM_INPUT.id]?.message || !dirtyFields?.[FORM_INPUT.id]}
            type="button"
            onClick={onNext}
          >
            Đầu tư
          </ButtonRound>
        </div>
      </div>
    </div>
  );
};

InvestStep.propTypes = {
  onGoBack: PropTypes.func,
  onNext: PropTypes.func,
  project: PropTypes.object,
};

export default InvestStep;
