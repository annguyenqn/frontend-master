import ButtonRound from 'components/Button/ButtonRound';
import { FormProvider, useForm } from 'react-hook-form';
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import InputPricesToken from './components/InputPricesToken';
import InputFile from './components/InputFile';
import InputDate from './components/InputDatepicker/InputDate';
import InputEditor from './components/InputEditor';
import Checkbox from './components/Checkbox';
import InputText from './components/InputText/InputDefault';
import Container from 'components/Layout/Container/Container';
import assetsApi from 'api/assetsApi';
import dayjs from 'dayjs';
import { validateGoogleEmbed, validateNumber, validateYoutubeEmbed } from 'utils';
import { useHistory } from 'react-router-dom';
import InputTextObject from './components/InputText/InputTextObject';
import InputTextArrayAddable from './components/InputText/InputTextArrayAddable';
import { useState } from 'react';
import classNames from 'classnames';
import SelectBox from './components/SelectBox/SelectBox';
import InputsLocation from './components/InputLocation';
import InputCategory from './components/InputCategory';

const DEFAULT = {
  favorite: false,
  prices: [{ from: '', to: '', price: '' }],
  videoUrls: [{ value: '' }],
  referral: {
    percentInviter: 0,
    percentInvitee: 0,
    onlyInviter: false,
  },
};

const LandCreateEditForm = ({ land }) => {
  const [isOptional, setOptional] = useState(false);
  const history = useHistory();

  const methods = useForm({
    defaultValues: !!land?._id
      ? {
          name: land?.name,
          tokenName: land?.tokenName,
          value: land?.value,
          prices: land?.prices || DEFAULT?.prices,
          openTime: land?.openTime,
          closeTime: land?.closeTime,
          location: {
            ...land?.location,
            province: {
              ...land?.location?.province,
              label: land?.location?.province?.name_with_type,
              value: land?.location?.province?._id,
            },
            district: {
              ...land?.location?.district,
              label: land?.location?.district?.name_with_type,
              value: land?.location?.district?._id,
            },
          },
          category: {
            ...land?.category,
            value: land?.category?.slug,
            label: land?.category?.name,
          },
          description: land?.description,
          totalSlot: land?.totalSlot,
          videoUrls: land?.videoUrls?.length > 0 ? land?.videoUrls?.map((v) => ({ value: v })) : DEFAULT?.videoUrls,
          mapUrl: land?.mapUrl,
          favorite: land?.favorite,
          images: land?.images,
          documents: land?.documents,
          projectInfo: land?.projectInfo,
          referral: land?.referral,
        }
      : DEFAULT,
  });

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;
  const openTime = watch('openTime');

  const onHandleSubmit = async (value) => {
    const { images, documents, videoUrls, projectInfo, ...data } = value;
    try {
      const formData = new FormData();
      data.category = data?.category?._id;
      data.location.province = data?.location?.province?._id;
      data.location.district = data?.location?.district?._id;
      data.videoUrls = videoUrls.map((i) => i.value);
      data.projectInfo = projectInfo;
      data.openTime = dayjs(data.openTime).valueOf();
      data.closeTime = dayjs(data.closeTime).valueOf();
      formData.append('data', JSON.stringify(data));
      [...images].forEach((item) => {
        formData.append('images', item);
      });
      [...documents]?.forEach((item) => {
        formData.append('documents', item);
      });
      if (!!land?._id) {
        await assetsApi.edit({ id: land?._id, body: formData });
        showToastSuccess('', 'Thay đổi thành công');
      } else {
        await assetsApi.create(formData);
        showToastSuccess('', 'Tạo thành công');
        await history.push('/admin/lands');
      }
    } catch (e) {
      console.error(e);
      showToastError('', 'Lệnh không thực hiện được,  vui lòng thử lại sau.');
    }
  };

  const FORM_INPUT = [
    {
      id: 'name',
      name: 'name',
      label: 'Tên dự án',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4 sm:w-4/6 sm:pr-4 sm:inline-block',
      classNameInput: ` ${errors?.['name']?.message ? 'border-red-400' : ''}`,
      placeholder: 'vd: Happy house ...',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'tokenName',
      name: 'tokenName',
      label: 'Tên Token',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4 sm:w-2/6 sm:inline-block',
      classNameInput: ` ${errors?.['tokenName']?.message ? 'border-red-400' : ''}`,
      placeholder: 'vd: BTC ...',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'location',
      type: 'location',
    },
    {
      id: 'category',
      type: 'category',
    },
    {
      id: 'value',
      name: 'value',
      label: 'Tổng giá tiền',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkNumber: (v) => validateNumber(v) || 'Nhập số lớn hơn 0',
        },
      },
      className: 'mb-4 lg:w-1/4 sm:pr-4 lg:inline-block',
      classNameInput: ` ${errors?.['value']?.message ? 'border-red-400' : ''}`,
      placeholder: 'vd: 861000000 ...',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'totalSlot',
      name: 'totalSlot',
      label: 'Tổng số token',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkNumber: (v) => validateNumber(v) || 'Nhập số lớn hơn 0',
        },
      },
      className: 'mb-4 lg:w-1/4 sm:pr-4 lg:inline-block',
      classNameInput: ` ${errors?.['totalSlot']?.message ? 'border-red-400' : ''}`,
      placeholder: 'vd: 1000 ...',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'openTime',
      name: 'openTime',
      label: 'Ngày mở bán',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4 lg:w-1/4 sm:pr-4 lg:inline-block',
      classNameInput: ` ${errors?.['openTime']?.message ? 'border-red-400' : ''}`,
      placeholder: `vd: ${dayjs().format('DD-MM-YYYY HH:mm')}`,
      type: 'datepicker',
      defaultValue: '',
    },
    {
      id: 'closeTime',
      name: 'closeTime',
      label: 'Ngày kết thúc',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4 lg:w-1/4 sm:pr-4 lg:inline-block',
      classNameInput: ` ${errors?.['closeTime']?.message ? 'border-red-400' : ''}`,
      placeholder: `vd: ${dayjs().format('DD-MM-YYYY HH:mm')}`,
      type: 'datepicker',
      minDate: openTime,
      defaultValue: '',
    },
    {
      id: 'description',
      name: 'description',
      label: 'Mô tả tổng quan',
      rules: {
        required: 'Nhập thông tin',
      },
      className: '',
      placeholder: 'Thông tin dự án ...',
      type: 'texteditor',
      defaultValue: '',
    },
    {
      id: 'prices',
      type: 'prices',
    },
  ];

  const FORM_INPUT_OPTIONAL = [
    {
      id: 'hr-optional',
      type: 'hr',
      label: 'Tùy chọn',
    },
    {
      id: 'projectInfo',
      name: 'projectInfo',
      type: 'text-array',
      children: [
        { key: 'square', name: 'Diện tích sử dụng nhà ở', placeholder: 'vd: 91,9 m2' },
        { key: 'purposeOfUse', name: 'Mục đích sử dụng', placeholder: 'vd: Căn hộ chung cư' },
        { key: 'legal', name: 'Pháp lý', placeholder: 'vd: Sổ hồng chính chủ' },
        { key: 'totalInvestTime', name: 'Thời gian đầu tư', placeholder: 'vd: 1 năm' },
        { key: 'expectedProfit', name: 'Lợi nhuận kỳ vọng', placeholder: 'vd: 15 %' },
        { key: 'assetOwnTime', name: 'Thời hạn sở hữu', placeholder: 'vd: Lâu dài' },
        { key: 'usageForm', name: 'Hình thức sử dụng', placeholder: 'vd: 	Sử dụng riêng' },
      ],
      label: 'Thông tin dự án',
      className: 'mb-4',
      placeholder: '',
      defaultValue: '',
    },
    {
      id: 'videoUrls',
      name: 'videoUrls',
      label: 'Youtube Url',
      className: 'mb-4',
      placeholder: 'vd: https://www.youtube.com/watch?v=xcJtL7QggTI ...',
      type: 'text-array-addable',
      defaultValue: '',
      rules: {
        validate: {
          checkUrl: (v) => validateYoutubeEmbed(v) || 'Nhập đường link youtube',
        },
      },
    },
    {
      id: 'mapUrl',
      name: 'mapUrl',
      label: 'Google map URL',
      className: 'mb-4',
      classNameInput: ` ${errors?.['mapUrl']?.message ? 'border-red-400' : ''}`,
      rules: {
        validate: {
          checkUrl: (v) => validateGoogleEmbed(v) || 'Nhập đường link embed',
        },
      },
      placeholder: 'vd: https://www.google.com/maps/embed?pb=!1m18!1m12! ...',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'favorite',
      name: 'favorite',
      label: 'Dự án ưu tiên',
      className: '',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      id: 'images',
      name: 'images',
      label: 'Thư viện ảnh',
      className: 'mb-4 border-t border-black-1 pt-5',
      classNameInput: ` ${errors?.['images']?.message ? 'border-red-400' : ''}`,
      type: 'file',
      placeholder: 'Nhấn để tải lên',
      defaultValue: '',
      accept: 'image/*',
      multiple: true,
      previewType: 'image',
    },
    {
      id: 'documents',
      name: 'documents',
      label: 'Tài liệu pdf',
      className: 'mb-4 border-t border-black-1 pt-5',
      classNameInput: ` ${errors?.['documents']?.message ? 'border-red-400' : ''}`,
      type: 'file',
      placeholder: 'Nhấn để tải lên',
      defaultValue: '',
      accept: '.pdf',
    },
    {
      id: 'referral.percentInviter',
      name: 'referral.percentInviter',
      label: 'Tỷ suất lợi nhuận của người giới thiệu',
      rules: {
        validate: {
          checkNumber: (v) => validateNumber(v) || 'Nhập số lớn hơn hoặc bằng 0',
        },
      },
      className: 'mb-4 sm:pr-4 border-t border-black-1 pt-5',
      classNameInput: `lg:w-2/4 ${errors?.['referral']?.['percentInviter']?.message ? 'border-red-400' : ''}`,
      errorMessage: errors?.['referral']?.['percentInviter']?.message,
      placeholder: 'vd: 68 ...',
      type: 'number',
      defaultValue: '',
    },
    {
      id: 'referral.percentInvitee',
      name: 'referral.percentInvitee',
      label: 'Tỷ suất lợi nhuận của người được giới thiệu',
      rules: {
        validate: {
          checkNumber: (v) => validateNumber(v) || 'Nhập số lớn hơn hoặc bằng 0',
        },
      },
      className: 'mb-4 lg:w-2/4 sm:pr-4 ',
      classNameInput: ` ${errors?.['referral']?.['percentInvitee']?.message ? 'border-red-400' : ''}`,
      errorMessage: errors?.['referral']?.['percentInvitee']?.message,
      placeholder: 'vd: 68 ...',
      type: 'number',
      defaultValue: '',
    },
    {
      id: 'referral.onlyInviter',
      name: 'referral.onlyInviter',
      label: 'Chỉ tính lợi nhuận cho người giới thiệu',
      className: 'mb-4',
      classNameInput: ` ${errors?.['referral']?.['onlyInviter']?.message ? 'border-red-400' : ''}`,
      errorMessage: errors?.['referral']?.['onlyInviter']?.message,
      placeholder: 'vd: 68 ...',
      type: 'checkbox',
      defaultValue: false,
    },
  ];

  // const onHandleReset = () => {
  //   const defaultFormObject = {};
  //   FORM_INPUT.forEach((item) => {
  //     defaultFormObject[item.id] = item.defaultValue;
  //   });
  //   defaultFormObject.prices = DEFAULT.prices;
  //   defaultFormObject.favorite = DEFAULT.favorite;
  //   reset(defaultFormObject, {
  //     keepErrors: true,
  //     keepDirty: true,
  //     keepIsSubmitted: false,
  //     keepTouched: false,
  //     keepIsValid: false,
  //     keepSubmitCount: false,
  //   });
  // };

  const renderForm = (item) => {
    return item.type === 'hr' ? (
      <div key={`create-land-input-${item.id}`} className="relative mb-8">
        <span className="absolute top-0 left-0 w-full border-b-4 border-black-2 h-1/2" />
        <span className="relative px-4 py-2 ml-8 text-xl uppercase rounded-lg bg-black-1 z-1">{item?.label}</span>
      </div>
    ) : item.type === 'selectBox' ? (
      <SelectBox key={`create-land-input-${item.id}`} item={item} />
    ) : item.type === 'category' ? (
      <InputCategory key={`create-land-input-${item.id}`} />
    ) : item.type === 'location' ? (
      <InputsLocation key={`create-land-input-${item.id}`} />
    ) : item.type === 'prices' ? (
      <InputPricesToken key={`create-land-input-${item.id}`} />
    ) : item.type === 'file' ? (
      <InputFile key={`create-land-input-${item.id}`} item={item} />
    ) : item.type === 'datepicker' ? (
      <InputDate key={`create-land-input-${item.id}`} item={item} />
    ) : item.type === 'texteditor' ? (
      <InputEditor key={`create-land-input-${item.id}`} item={item} />
    ) : item.type === 'checkbox' ? (
      <Checkbox key={`create-land-input-${item.id}`} item={item} />
    ) : item.type === 'text-array-addable' ? (
      <InputTextArrayAddable key={`create-land-input-${item.id}`} item={item} />
    ) : item.type === 'text-array' ? (
      <InputTextObject key={`create-land-input-${item.id}`} item={item} />
    ) : (
      <InputText key={`create-land-input-${item.id}`} item={item} />
    );
  };

  const renderToggleOptional = () => {
    return (
      <button
        type="button"
        onClick={() => {
          setOptional(!isOptional);
        }}
        className="px-4 py-2 rounded-lg bg-black-1 hover:text-primary"
      >
        {isOptional ? 'Ẩn tùy chọn' : 'Hiện tùy chọn'}
      </button>
    );
  };

  return (
    <Container fluid={isOptional}>
      <div className="pt-16 mx-auto mt-4 shadow-2xl mb-14 break leading bg-black-3 rounded-xl max-w-screen-6xl">
        <h1 className="pb-6 text-3xl font-bold text-center uppercase">
          {land ? (
            <>
              Điều chỉnh dự án
              <p className="text-primary">{land?.name}</p>
            </>
          ) : (
            'Tạo dự án mới'
          )}
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="flex flex-col 4xl:flex-row">
              <div className="relative flex-1 px-4 py-4 sm:px-12 animate-fade-in 4xl:border-r border-black-2 z-2">
                {FORM_INPUT.map((item, index) => renderForm(item, index))}
              </div>
              <div
                className={classNames(
                  'flex-1 animate-fade-in relative z-1',
                  'transition-all duration-300',
                  isOptional ? 'px-4 pb-4 sm:px-12 4xl:pt-4' : 'overflow-hidden max-h-0 max-w-0 p-0',
                )}
              >
                {FORM_INPUT_OPTIONAL.map((item, index) => renderForm(item, index))}
              </div>
            </div>
            <div className="flex justify-between px-4 sm:px-12 py-9">
              <div className="flex border-t border-black-3-90% space-x-4">
                {/* <ButtonRound 
                className="font-bold uppercase min-w-40 bg-black-2" 
                type="button" 
                onClick={onHandleReset}
              >
                Nhập lại
              </ButtonRound> */}
                <ButtonRound
                  className="font-bold uppercase min-w-40 bg-black-2"
                  type="button"
                  onClick={() => {
                    history.push('/admin/lands');
                  }}
                >
                  Quay lại
                </ButtonRound>
                <ButtonRound
                  className="font-bold uppercase border-0 min-w-40 bg-primary text-black-2"
                  disabled={Object.keys(errors).length > 0 || isSubmitting}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Xác nhận
                </ButtonRound>
              </div>
              {renderToggleOptional()}
            </div>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
};

export default LandCreateEditForm;
