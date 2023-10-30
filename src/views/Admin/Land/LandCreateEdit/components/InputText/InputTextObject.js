import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Input from 'components/Input/Input';
import classNames from 'classnames';

const InputTextObject = ({ item }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classNames(item.className, 'border-b border-black-1')}>
      {item.label && (
        <label>
          <p className="mb-2">{item.label}</p>
        </label>
      )}
      <div className="flex flex-wrap">
        {item?.children?.map((child, index) => (
          <div key={`${item?.id} ${index}`} className="flex items-center w-full px-4 mb-2 lg:w-1/2">
            <div className="flex-1 h-full pt-4">{child?.name}</div>
            <div className="flex-1">
              <Controller
                control={control}
                rules={item.rules}
                name={`${item?.id}.${child?.key}`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div className="flex">
                    <Input
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      className={item.classNameInput}
                      placeholder={child.placeholder}
                      type={'text'}
                      isValid={!!errors?.[item?.id]?.[child?.key]?.message}
                    />
                  </div>
                )}
                defaultValue={item.defaultValue}
                autoComplete="off"
              />
              <Input.errorText message={errors?.[item?.id]?.[child?.key]?.message} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

InputTextObject.propTypes = {
  item: PropTypes.any.isRequired,
};

export default InputTextObject;
