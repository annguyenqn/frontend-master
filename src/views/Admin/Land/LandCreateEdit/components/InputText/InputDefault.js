import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Input from 'components/Input/Input';

const InputDefault = ({ item }) => {
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
            <Input
              id={item.id}
              onBlur={onBlur}
              value={value}
              onChange={(e) => {
                onChange(
                  item?.type === 'number'
                    ? Number.isNaN(+e?.target?.value)
                      ? e?.target?.value
                      : +e?.target?.value
                    : e,
                );
              }}
              className={item.classNameInput}
              placeholder={item.placeholder}
              type={'text'}
              min={0}
              disabled={item?.disabled}
              isValid={!!errors?.[item.name]?.message}
            />
          )}
          name={item.name}
          defaultValue={item.defaultValue}
          autoComplete="off"
        />
        <Input.errorText message={item?.errorMessage || errors?.[item.name]?.message} />
      </div>
    </div>
  );
};

InputDefault.propTypes = {
  item: PropTypes.any.isRequired,
};

export default InputDefault;
