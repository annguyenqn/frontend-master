import locationApi from 'api/locationApi';
import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import InputDefault from '../InputText/InputDefault';
import SelectSearchBox from '../SelectBox/SelectSearchBox';

const InputsLocation = () => {
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);

  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const provinceSelected = watch('location.province');
  const districtSelected = watch('location.district');

  const inputs = [
    {
      id: 'location.province',
      name: 'location.province',
      label: 'Tỉnh Thành',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4 lg:w-1/4 lg:pr-4 lg:inline-block relative z-20',
      classNameInput: ` ${errors?.['location']?.['province']?.message ? 'border-red-400' : ''}`,
      errorMessage: errors?.['location']?.['province']?.message,
      placeholder: 'Chọn Tỉnh Thành',
      type: 'selectSearchBox',
      menu: province?.data,
      defaultValue: '',
    },
    {
      id: 'location.district',
      name: 'location.district',
      label: 'Quận Huyện',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4 lg:w-1/4 lg:pr-4 lg:inline-block relative z-10',
      classNameInput: ` ${errors?.['location']?.['district']?.message ? 'border-red-400' : ''}`,
      errorMessage: errors?.['location']?.['district']?.message,
      placeholder: 'Chọn Quận Huyện',
      type: 'selectSearchBox',
      menu: district?.data,
      defaultValue: '',
      disabled: !provinceSelected?.value && !provinceSelected,
    },
    {
      id: 'location.street',
      name: 'location.street',
      label: 'Dịa chỉ',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4 lg:w-2/4 lg:pr-4 lg:inline-block',
      classNameInput: ` ${errors?.['location']?.['street']?.message ? 'border-red-400' : ''}`,
      errorMessage: errors?.['location']?.['street']?.message,
      placeholder: 'vd: 163 Nguyễn Văn Trỗi ...',
      type: 'text',
      defaultValue: '',
      disabled: !districtSelected?.value && !districtSelected,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const resProvince = await locationApi.getProvince();
        const updateResProvince = {
          ...resProvince,
          data: resProvince?.data?.map((item) => ({
            ...item,
            label: item?.name,
            value: item?.slug,
          })),
        };
        setProvince(updateResProvince);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (provinceSelected?.value) {
        try {
          const resDistrict = await locationApi.getDistrict({ provinceSlug: provinceSelected?.slug });
          const updateResDistrict = {
            ...resDistrict,
            data: resDistrict?.data?.map((item) => ({
              ...item,
              label: item?.name,
              value: item?.slug,
            })),
          };
          setDistrict(updateResDistrict);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [provinceSelected]);

  return inputs.map((item) =>
    item.type === 'selectSearchBox' ? (
      <SelectSearchBox key={`create-land-input-${item.id}`} item={item} />
    ) : (
      <InputDefault key={`create-land-input-${item.id}`} item={item} />
    ),
  );
};

InputsLocation.propTypes = {};

export default InputsLocation;
