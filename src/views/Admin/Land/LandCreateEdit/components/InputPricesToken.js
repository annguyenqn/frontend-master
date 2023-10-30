import classNames from 'classnames';
import Input from 'components/Input/Input';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { validateNumber } from 'utils';

const initData = {
  from: '',
  to: '',
  price: '',
};

const INIT_FORM = [
  {
    id: 'from',
    label: 'Từ',
    placeholder: 'vd: 1',
    rule: ({ prevItem, index }) => ({
      required: 'Nhập thông tin',
      validate: {
        checkNumber: (v) => validateNumber(v) || 'Nhập số lớn hơn hoặc bằng 0',
        min: (v) => {
          return index === 0 || +prevItem?.to <= +v || `Lớn hơn ${+prevItem?.to}`;
        },
      },
    }),
  },
  {
    id: 'to',
    label: 'Đến',
    placeholder: 'vd: 10',
    rule: ({ currentItem }) => ({
      required: 'Nhập thông tin',
      validate: {
        checkNumber: (v) => validateNumber(v) || 'Nhập số lớn hơn hoặc bằng 0',
        min: (v) => {
          return +currentItem?.from < +v || `Lớn hơn ${+currentItem?.from}`;
        },
      },
    }),
  },
  {
    id: 'price',
    label: 'Giá',
    placeholder: 'vd: 10000',
    rule: () => ({
      required: 'Nhập thông tin',
      validate: {
        checkNumber: (v) => validateNumber(v) || 'Nhập số lớn hơn 0',
      },
    }),
  },
];

const InputPricesToken = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'prices' });
  const pricesUpdated = watch('prices');

  return (
    <>
      <label>
        <p className="mb-2">Giá token cho từng bậc</p>
      </label>
      <div className="flex flex-col min-w-full p-2 pr-4 mb-4 overflow-auto rounded-lg max-h-screen-2/4">
        {fields?.map((item, index) => {
          const prevItem = pricesUpdated?.[index - 1];
          const currentItem = pricesUpdated?.[index];
          return (
            <div
              key={`input-prices-token-${item?.id}`}
              className="flex items-center my-4 min-w-screen-lg lg:min-w-screen-md animate-fade-in"
            >
              {INIT_FORM.map((i) => (
                <div key={`price-form-${i?.id}`} className="flex items-center w-full mx-2 my-2">
                  <label>
                    <p className="mr-4 whitespace-nowrap">{i?.label}</p>
                    <p className="text-sm text-red-400">{errors?.prices?.[index]?.[i?.id]?.message}</p>
                  </label>
                  <div className="w-full">
                    <Controller
                      control={control}
                      rules={i?.rule({ prevItem, index, currentItem })}
                      name={`prices.${index}.${i?.id}`}
                      render={({ field: { onChange, onBlur, value, field } }) => (
                        <Input
                          value={value}
                          onChange={(e) => {
                            onChange(Number.isNaN(+e?.target?.value) ? e?.target?.value : +e?.target?.value);
                          }}
                          onBlur={onBlur}
                          isValid={!!errors?.prices?.[index]?.[i?.id]?.message}
                          type={'text'}
                          placeholder={i?.placeholder}
                          {...field}
                          readOnly={i?.readOnly}
                        />
                      )}
                      defaultValue={''}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  append({ ...initData });
                }}
                className={classNames('mx-2', index !== fields?.length - 1 && 'opacity-0 pointer-events-none')}
              >
                <FaPlusCircle size={'2rem'} className="" />
              </button>

              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
                className={classNames(fields?.length <= 1 && 'opacity-0 pointer-events-none')}
              >
                <FaMinusCircle size={'2rem'} className="" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

InputPricesToken.propTypes = {};

export default InputPricesToken;
