import SelectSearchable from 'components/SelectMenu/SelectSearchable';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

const SelectSearchBox = ({ item }) => {
  const {
    control,
    // formState: { errors },
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
            <SelectSearchable
              isClearable
              className={`w-full p-2 flex items-center ${item?.classNameInput || ''}`}
              options={item?.menu}
              placeholder={item?.placeholder}
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
          name={item.name}
          defaultValue={item.defaultValue}
          autoComplete="off"
        />
        <span className={`text-xs text-red-400 ${item?.errorMessage ? '' : 'opacity-0'}`}>
          * {item?.errorMessage || 'Invalid'}
        </span>
      </div>
    </div>
  );
};

SelectSearchBox.propTypes = {
  item: PropTypes.any.isRequired,
};

export default SelectSearchBox;
