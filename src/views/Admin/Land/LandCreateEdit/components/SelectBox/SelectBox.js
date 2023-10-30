import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import SelectMenu from 'components/SelectMenu/SelectMenu';

const SelectBox = ({ item }) => {
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
            <SelectMenu
              className=""
              iconAppend
              iconPrepend={item?.iconPrepend}
              classNameButton={`p-4 flex items-center ${item?.classNameInput || ''}`}
              menuList={item?.menu || []}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              size="lg"
              placeholder={item?.placeholder}
              disabled={item?.disabled}
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

SelectBox.propTypes = {
  item: PropTypes.any.isRequired,
};

export default SelectBox;
