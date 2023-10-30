import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import classNames from 'classnames';
import Input from 'components/Input/Input';
import dayjs from 'dayjs';
import InputTimeCustom from './InputTimeCustom';

const InputDate = ({ item }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={item.className}>
      {item.label && (
        <label htmlFor={item?.id}>
          <p className="mb-2">{item.label}</p>
        </label>
      )}
      <div>
        <Controller
          control={control}
          rules={item.rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <div className="datepicker-custom">
              <ReactDatePicker
                selected={value}
                className={classNames(
                  item?.classNameInput,
                  'p-4 bg-transparent rounded-xl w-full border focus:outline-none',
                  errors?.[item.name]?.message && 'border-red-400',
                )}
                onChange={onChange}
                onBlur={onBlur}
                dateFormat={'dd-MM-yyyy HH:mm'}
                minDate={item?.minDate || dayjs().toDate()}
                placeholderText={item?.placeholder || 'Select your time'}
                showPopperArrow={false}
                shouldCloseOnSelect={false}
                showTimeInput
                customTimeInput={<InputTimeCustom />}
                timeIntervals={15}
              />
            </div>
          )}
          name={item.name}
          defaultValue={item.defaultValue}
        />

        <Input.errorText message={errors?.[item.name]?.message} />
      </div>
    </div>
  );
};

InputDate.propTypes = {
  item: PropTypes.any.isRequired,
};

export default InputDate;
