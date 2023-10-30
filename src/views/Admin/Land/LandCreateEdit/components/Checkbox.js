import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import InputSelect from 'components/Input/InputSelect';
import Input from 'components/Input/Input';

const Checkbox = ({ item }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={item.className}>
      <Controller
        control={control}
        rules={item.rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputSelect
            label={item.label}
            id={item.id}
            onBlur={onBlur}
            checked={value}
            onChange={onChange}
            className={item.classNameInput}
            placeholder={item.placeholder}
            type={item.type}
            disabled={item?.disabled}
          />
        )}
        name={item.name}
        defaultValue={item.defaultValue}
        autoComplete="off"
      />
      <Input.errorText message={errors?.[item.name]?.message} />
    </div>
  );
};

Checkbox.propTypes = {
  item: PropTypes.any.isRequired,
};

export default Checkbox;
