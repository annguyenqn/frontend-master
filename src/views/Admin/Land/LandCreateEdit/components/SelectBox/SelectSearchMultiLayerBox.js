import classNames from 'classnames';
import DisclosurePopover from 'components/Popover/DisclosurePopover';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

const SelectSearchMultiLayerBox = ({ item }) => {
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
            <DisclosurePopover
              classNameButton={classNames(
                'rounded-xl whitespace-nowrap flex items-center justify-between px-4 py-4 w-full',
                item?.errorMessage && 'border-red-400 border',
              )}
              panelArray={item?.menu}
              selected={value || item?.menu?.[0]}
              onChange={onChange}
              onBlur={onBlur}
              isHideDefaultValue
            />
          )}
          name={item.name}
          defaultValue={item.defaultValue}
          autoComplete="off"
        />
        <span className={` text-xs text-red-400 ${item?.errorMessage ? '' : 'opacity-0'}`}>
          * {item?.errorMessage || 'Invalid'}
        </span>
      </div>
    </div>
  );
};

SelectSearchMultiLayerBox.propTypes = {
  item: PropTypes.any.isRequired,
};

export default SelectSearchMultiLayerBox;
