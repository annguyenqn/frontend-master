import PropTypes from 'prop-types';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import Input from 'components/Input/Input';
import classNames from 'classnames';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const InputTextArrayAddable = ({ item }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: item?.id });

  return (
    <div className={classNames(item.className, 'max-h-100 overflow-auto p-4 border-b border-black-1')}>
      {item.label && (
        <label>
          <p className="mb-2">{item.label}</p>
        </label>
      )}
      {fields?.map((field, index) => (
        <div key={field?.id} className="mb-2">
          <Controller
            control={control}
            rules={item.rules}
            name={`${item?.id}.${index}.value`}
            render={({ field: { onChange, onBlur, value } }) => (
              <div className="flex">
                <Input
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  className={item.classNameInput}
                  placeholder={item.placeholder}
                  type={'text'}
                  isValid={!!errors?.[item?.id]?.[index]?.value?.message}
                />
                <button
                  type="button"
                  onClick={() => {
                    append({ value: '' });
                  }}
                  className={classNames('mx-4', index !== fields?.length - 1 && 'opacity-0 pointer-events-none')}
                >
                  <FaPlusCircle size={'2rem'} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  className={classNames(fields?.length <= 1 && 'opacity-0 pointer-events-none')}
                >
                  <FaMinusCircle size={'2rem'} />
                </button>
              </div>
            )}
            defaultValue={item.defaultValue}
            autoComplete="off"
          />
          <Input.errorText message={errors?.[item?.id]?.[index]?.value?.message} />
        </div>
      ))}
    </div>
  );
};

InputTextArrayAddable.propTypes = {
  item: PropTypes.any.isRequired,
};

export default InputTextArrayAddable;
