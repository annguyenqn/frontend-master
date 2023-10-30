import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import { FiArrowRight, FiChevronLeft } from 'react-icons/fi';
import ButtonRound from 'components/Button/ButtonRound';
import InputSelect from 'components/Input/InputSelect';
import { Controller, useFormContext } from 'react-hook-form';
import { getFee, getTotal, replaceWith, searchRegExp } from 'utils';
import { useGetUserLogin } from 'store/userLogin/hook';
import { useEffect } from 'react';
import bankAccountApi from 'api/bankApi';
import { useState } from 'react';
import Dots from 'components/Loader/Dots';
import { formatTokenDecimal } from 'utils/formatBalance';
import { Link } from 'react-router-dom';

const InfoStep = ({ onGoBack, onNext, project }) => {
  const {
    control,
    trigger,
    getValues,
    formState: { dirtyFields, errors },
  } = useFormContext();

  const investAmount = getValues('invest');
  const feeInvestAmount = getFee(getValues('invest'), 1.5);
  const totalAmount = getTotal(investAmount, feeInvestAmount);
  const userLogin = useGetUserLogin();
  const [totalSlotFilled, setTotalSlotFilled] = useState('loading');
  const [priceTokenRealTime, setPriceTokenRealtime] = useState('loading');
  const [profit, setProfit] = useState('loading');
  const [valuePerSlot, setValuePerSlot] = useState('loading');

  useEffect(() => {
    (async () => {
      try {
        const res = await bankAccountApi.estimate({
          asset: project?._id,
          amount: +investAmount?.replace(searchRegExp, replaceWith),
        });
        setTotalSlotFilled(formatTokenDecimal(res?.totalSlotFilled));
        // ------------
        // update price token realtime
        await setPriceTokenRealtime(+res?.averagePrice);
        await setProfit(+res?.profit);
        await setValuePerSlot(+res?.valuePerSlot);
      } catch (e) {
        console.error(e);
        setTotalSlotFilled('N/A');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="relative my-10 text-center">
        <h3 className="pt-16 text-4xl font-bold lg:pt-0"> Xác nhận thông tin </h3>
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
      <div className="max-w-3xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl">
        <h5 className="py-4 text-2xl font-bold text-center">Kiểm tra thông tin</h5>
        <div className="flex flex-col justify-between px-12 py-6 sm:flex-row">
          <div className="flex flex-col divide-y sm:w-5/12 divide-black-3 bg-black-2 rounded-xl">
            <div className="px-8 py-6">
              <p>Tài khoản</p>
              <p className="overflow-hidden text-2xl font-bold break-all min-h line-clamp-2 text-primary overflow-ellipsis">
                {userLogin?.user?.fullName}
              </p>
            </div>
            {/* <div className="px-8 py-3 mt-auto">{formatAddress('0x79b6930DEfb52d90EDF0c82880450e9808E841Dd')}</div> */}
          </div>
          <div className="flex items-center justify-center py-8 sm:w-2/12">
            <FiArrowRight className="text-4xl transform rotate-90 sm:transform-none" />
          </div>
          <div className="divide-y sm:w-5/12 divide-black-3 bg-black-2 rounded-xl">
            <div className="px-8 py-6">
              <p>Dự án góp vốn</p>
              <p className="overflow-hidden text-2xl font-bold break-words line-clamp-2 text-primary overflow-ellipsis ">
                {project?.name}
              </p>
            </div>
            {/* <div className="px-8 py-3">{formatAddress('0x79b6930DEfb52d90EDF0c82880450e9808E841Dd')}</div> */}
          </div>
        </div>
        <div className="px-12 py-6">
          <div className="flex justify-between ">
            <div className="">
              <p className="mt-4">Số phần đầu tư (ước tính)</p>
            </div>
            <div className="text-right">
              <div className="flex justify-end mt-4 space-x-2 font-bold">
                <span className=" text-primary">
                  {totalSlotFilled === 'loading' ? <Dots /> : totalSlotFilled?.toLocaleString('vi-VN')}
                </span>
                <span>PHẦN</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between italic ">
            <div className="">
              <p className="mt-2 ml-4 ">{' - Giá gốc'}</p>
            </div>
            <div className="text-right">
              <div className="flex justify-end mt-2 space-x-2">
                <span className="text-primary">
                  {totalSlotFilled === 'loading' ? <Dots /> : valuePerSlot?.toLocaleString('vi-VN')}
                </span>
                <span>VND</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between italic">
            <div className="">
              <p className="mt-2 ml-4">{' - Giá đầu tư (ước tính)'}</p>
            </div>
            <div className="text-right">
              <div className="flex justify-end mt-2 space-x-2">
                <span className="text-primary">
                  {priceTokenRealTime === 'loading' ? <Dots /> : priceTokenRealTime?.toLocaleString('vi-VN')}
                </span>
                <span>VND</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <p className="mt-2">{'Lợi nhuận (ước tính)'}</p>
              {/* (ước tính):  (giá gốc x số phần - giá đầu tư x số phần) VND */}
            </div>
            <div className="text-right">
              <div className="flex justify-end mt-2 space-x-2 font-bold">
                <span className=" text-primary">
                  {profit === 'loading' ? <Dots /> : profit?.toLocaleString('vi-VN')}
                </span>
                <span>VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-12">
          <div className="flex justify-between py-6">
            <div className="">
              <p className="">Số tiền đầu tư</p>
              <p className="mt-4">Phí giao dịch</p>
            </div>
            <div className="text-right">
              <div className="flex justify-end space-x-2 font-bold">
                <span className=" text-primary">{investAmount}</span>
                <span>VND</span>
              </div>
              <div className="flex justify-end mt-4 space-x-2 font-bold">
                <span className=" text-primary">{feeInvestAmount}</span>
                <span>VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-12 pb-6">
          <div className="flex justify-between py-6">
            <div className="">
              <p className="">Tổng cộng</p>
            </div>
            <div className="text-right">
              <div className="flex space-x-2 font-bold">
                <span className=" text-primary">{totalAmount}</span>
                <span>VND</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <Controller
              control={control}
              rules={{ required: 'Cần đồng ý điều khoản và chính sách' }}
              name="term-agree"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputSelect
                  id="term-agree"
                  checked={value}
                  onChange={async (e) => {
                    await onChange(e);
                    await trigger('term-agree');
                  }}
                  onBlur={onBlur}
                  label={
                    <div className="leading-tight text-left">
                      Tôi đồng ý với{' '}
                      <Link to="/quy-dinh" className="mx-1 text-primary hover:underline whitespace-nowrap">
                        Điều khoản
                      </Link>{' '}
                      và{' '}
                      <Link to="/quy-dinh?part=2" className="mx-1 whitespace-nowrap text-primary hover:underline">
                        Chính sách bảo mật
                      </Link>{' '}
                      của NANOREAL
                    </div>
                  }
                />
              )}
              defaultValue={false}
            />
            {errors?.['term-agree']?.message && (
              <span className="text-xs text-red-400 ">* {errors?.['term-agree']?.message || 'Invalid'} </span>
            )}
          </div>
          <ButtonRound
            className="w-full font-bold border-0 bg-primary text-black-2 "
            type="button"
            disabled={errors?.['term-agree']?.message || !dirtyFields?.['term-agree']}
            onClick={onNext}
          >
            Xác nhận
          </ButtonRound>
        </div>
      </div>
    </div>
  );
};

InfoStep.propTypes = {
  onGoBack: PropTypes.func,
  onNext: PropTypes.func,
  project: PropTypes.object,
};

export default InfoStep;
