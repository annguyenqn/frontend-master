import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import ButtonRound from 'components/Button/ButtonRound';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { validateEmail, validateName, validatePhone, validateSocical } from 'utils/index';
import { showToastError } from 'components/CustomToast/CustomToast';
import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import whitelistApi from 'api/whitelistApi';

const WhiteListModal = ({ isShow, setShow }) => {
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const { id } = useParams();

  const FORM_WHITELIST = [
    {
      id: 'userFullName',
      name: 'userFullName',
      label: 'Họ và tên',
      placeholder: 'Nhập Họ tên ...',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validateName(v) || 'Thông tin này có thể không phải là họ tên người',
        },
      },
      className: 'flex flex-auto flex-col mb-4',
      classNameInput:
        'mt-2 flex-1 block p-2 pl-4 border border-gray-200 rounded-md min-w-3xs border-primary bg-black-3',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'userEmail',
      name: 'userEmail',
      label: 'Địa chỉ email',
      placeholder: 'Nhập địa chỉ email ...',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validateEmail(v) || 'Thông tin này có thể không phải là địa chỉ email',
        },
      },
      className: 'flex flex-auto flex-col mb-4',
      classNameInput:
        'mt-2 flex-1 block p-2 pl-4 border border-gray-200 rounded-md min-w-3xs border-primary bg-black-3',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'userPhone',
      name: 'userPhone',
      label: 'Số điện thoại',
      placeholder: 'Nhập số điện thoại ...',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validatePhone(v) || 'Thông tin này có thể không phải là số di động',
        },
      },
      className: 'flex flex-auto flex-col mb-4',
      classNameInput:
        'mt-2 flex-1 block p-2 pl-4 border border-gray-200 rounded-md min-w-3xs border-primary bg-black-3',
      type: 'text',
      defaultValue: '',
    },
    {
      id: 'userSocialAccount',
      name: 'userSocialAccount',
      label: 'Telegram hoặc Facebook',
      placeholder: 'Nhập tên tài khoản ...',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validateSocical(v) || 'Chưa đúng định dạng. Ví dụ: https://fb.me/hannaFame',
        },
      },
      className: 'flex flex-auto flex-col mb-4',
      classNameInput:
        'mt-2 flex-1 block p-2 pl-4 border border-gray-200 rounded-md min-w-3xs border-primary bg-black-3',
      type: 'text',
      defaultValue: '',
    },
  ];

  const {
    handleSubmit,
    control,
    reset,
    // setValue,
    // setError,
    // clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const body = {
        ...data,
        assetId: id,
      };
      await whitelistApi.create(body);
      await setSubmitSuccessful(true);
    } catch (e) {
      console.error(e);
      showToastError('', 'Đăng ký thất bại, xin thử lại sau');
    }
  };

  const handleClose = () => {
    setShow(false);
    reset(['userFullName', 'userEmail', 'userPhone', 'userSocialAccount']);
    setTimeout(() => {
      setSubmitSuccessful(false);
    }, 1000);
  };

  return (
    <Modal open={isShow} onClose={handleClose} className="">
      <h5 className="px-8 py-4 text-xl border-b md:text-2xl border-black-2">Đăng ký Whitelist</h5>
      {isSubmitSuccessful ? (
        <div className="py-10 text-3xl font-bold text-center text-primary animate-fade-in">
          <FiCheckCircle size={'3rem'} className="mx-auto" />
          Đăng ký thành công
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="px-8 py-4">
            {FORM_WHITELIST.map((item) => (
              <div key={`form-whitelist-${item?.id}`} className="mb-4">
                <label htmlFor={item?.id}>{item?.label}</label>
                <div className={`${item?.className} `}>
                  <Controller
                    control={control}
                    rules={item?.rules}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        id={item?.id}
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        className={classNames(item?.classNameInput, errors?.[item?.name]?.message && 'border-red-400')}
                        placeholder={item?.placeholder}
                        type={item?.type || 'text'}
                        min={0}
                        disabled={item?.disabled}
                        autoComplete="off"
                      />
                    )}
                    name={item?.name}
                    defaultValue={item?.defaultValue}
                  />
                  {errors?.[item?.name]?.message && (
                    <span className="mt-1 text-xs text-red-400 ">* {errors?.[item?.name]?.message || 'Invalid'} </span>
                  )}
                </div>
              </div>
            ))}
            <ButtonRound
              className="px-12 mx-auto mt-4 mb-2 border hover:border-primary hover:text-primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Đăng ký
            </ButtonRound>
          </div>
        </form>
      )}
    </Modal>
  );
};

WhiteListModal.propTypes = {
  isShow: PropTypes.bool,
  setShow: PropTypes.func,
};

export default WhiteListModal;
