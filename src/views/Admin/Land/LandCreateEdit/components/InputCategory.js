import categoryApi from 'api/categoryApi';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SelectSearchMultiLayerBox from './SelectBox/SelectSearchMultiLayerBox';

const InputCategory = () => {
  const [categoryMenu, setCategoryMenu] = useState(null);
  const {
    formState: { errors },
  } = useFormContext();

  const inputItem = {
    id: 'category',
    name: 'category',
    label: 'Loại bất động sản',
    rules: {
      required: 'Nhập thông tin',
    },
    className: 'mb-4 lg:w-2/4 lg:pr-4 relative z-9',
    classNameButton: ` ${errors?.['category']?.message ? 'border-red-400' : ''}`,
    errorMessage: errors?.['category']?.message,
    type: 'selectSearchBox',
    menu: categoryMenu,
    defaultValue: '',
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await categoryApi.get();
        // console.log(res)
        const updateRes = res?.map((item) =>
          item?.subCategories?.length > 0
            ? {
                ...item,
                label: item?.name,
                value: item?.slug,
                children: item?.subCategories?.map((child) => ({
                  ...child,
                  label: child?.name,
                  value: child?.slug,
                })),
              }
            : {
                ...item,
                label: item?.name,
                value: item?.slug,
              },
        );
        await updateRes.unshift({
          label: 'Chọn loại bất động sản',
          value: '',
        });
        await setCategoryMenu(updateRes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <SelectSearchMultiLayerBox item={inputItem} />;
};

InputCategory.propTypes = {};

export default InputCategory;
