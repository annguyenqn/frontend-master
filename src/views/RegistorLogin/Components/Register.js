import { useState } from 'react';
import ButtonRound from 'components/Button/ButtonRound';
import InputSelect from 'components/Input/InputSelect';
import { FiCheckCircle, FiEye, FiEyeOff, FiLock, FiMail, FiPhone, FiUnlock, FiUser, FiShare2 } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';
import { validateEmail, validateName, validatePasswordNumber, validatePhone } from 'utils/index';
import usersApi from 'api/usersApi';
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import { Link, useHistory } from 'react-router-dom';
import { useGetUserLogin } from 'store/userLogin/hook';
import classNames from 'classnames';
import zxcvbn from 'zxcvbn';

const STRENGTH_LEVEL = {
  0: 'Rất kém',
  1: 'Kém',
  2: 'Trung bình',
  3: 'Khá',
  4: 'Tốt',
};

const STRENGTH_LEVEL_COLOR = {
  0: 'text-red-600',
  1: 'text-yellow-700',
  2: 'text-yellow-500',
  3: 'text-green-600',
  4: 'text-green-400',
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAgree, setAgree] = useState(false);
  const [isSucceed, setSucceed] = useState(false);
  const [scorePasswordStrength, setScorePasswordStrength] = useState(null);
  const history = useHistory();
  const userLogin = useGetUserLogin();

  if (userLogin?.user?._id) {
    history.push('/account');
  }

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting, submitCount },
  } = useForm();

  const password = watch('password');

  const handleStrengthPassword = (value) => {
    setScorePasswordStrength(value ? zxcvbn(value)?.score : null);
  };

  const FORM_INPUT = [
    {
      id: 'fullName',
      name: 'fullName',
      label: 'Họ tên',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validateName(v) || 'Thông tin này có thể không phải là họ tên người',
        },
      },
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['fullName']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Họ tên *',
      type: 'text',
      defaultValue: '',
      prependIcon: <FiUser />,
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validateEmail(v) || 'Thông tin này có thể không phải là địa chỉ email',
        },
      },
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['email']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Địa chỉ email *',
      type: 'text',
      defaultValue: '',
      prependIcon: <FiMail />,
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'Phone',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validatePhone(v) || 'Thông tin này có thể không phải là số di động',
        },
      },
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['phone']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Số di động *',
      type: 'text',
      defaultValue: '',
      prependIcon: <FiPhone />,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Mật khẩu',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValue: (v) => validatePasswordNumber(v) || 'Mật khẩu phải có ít nhất 8 ký tự',
        },
      },
      className: '',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['password']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Mật khẩu *',
      type: showPassword ? 'text' : 'password',
      defaultValue: '',
      prependIcon: showPassword ? <FiUnlock /> : <FiLock />,
      appendIcon: (
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
      ),
    },
    {
      id: 're-password',
      name: 're-password',
      label: 'Xác nhận mật khẩu',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkPassword: (v) => v === password || 'Xác nhận mật khẩu chưa trùng với mật khẩu',
        },
      },
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['re-password']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Xác nhận mật khẩu *',
      type: showPassword ? 'text' : 'password',
      defaultValue: '',
      prependIcon: showPassword ? <FiUnlock /> : <FiLock />,
    },
    {
      id: 'referral',
      name: 'referral',
      label: 'Mã người giới thiệu',
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['referral']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Mã giới thiệu',
      type: 'text',
      defaultValue: '',
      prependIcon: <FiShare2 />,
    },
  ];

  const onHandleSubmit = async (data) => {
    try {
      await usersApi.create(data, 1);
      setSucceed(true);
      showToastSuccess('', 'Đăng ký thành công');
    } catch (e) {
      console.error(e.response);
      if (e?.response?.status == 403 && e?.response?.data?.errors[0]?.param === 'email') {
        showToastError('', 'Email đã đăng ký, Vui lòng đổi email khác.');
      } else {
        showToastError('', 'Đăng ký thất bại');
      }
    }
  };

  return isSucceed ? (
    <div className="py-20 text-4xl font-bold text-center text-primary">
      <FiCheckCircle className="mx-auto" size={'5rem'} />
      Đăng ký thành công
    </div>
  ) : (
    <form autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="px-4 sm:px-12 py-9 animate-fade-in">
        {FORM_INPUT.map((item, index) => (
          <>
            <div key={`register-input-${index}`} className={`${item.className} relative `}>
              <div className="absolute top-0 py-4 text-2xl left-6">{item?.prependIcon}</div>
              <div className="absolute top-0 py-4 text-2xl right-6">{item?.appendIcon}</div>
              <div className={item.className}>
                <Controller
                  control={control}
                  rules={item.rules}
                  render={({ field: { onChange, onBlur, value } }) =>
                    item.id === 'password' || item.id === 're-password' ? (
                      <input
                        id={item.id}
                        onBlur={onBlur}
                        value={value}
                        onChange={async (e) => {
                          const value = e.target.value.trim();
                          await onChange(value);
                          if (submitCount >= 1) {
                            await trigger('password');
                            await trigger('re-password');
                          }
                          if (item.id === 'password') {
                            handleStrengthPassword(value);
                          }
                        }}
                        className={item.classNameInput}
                        placeholder={item.placeholder}
                        type={item.type}
                        disabled={item?.disabled}
                        autoComplete="off"
                      />
                    ) : item.id === 'phone' ? (
                      <input
                        id={item.id}
                        onBlur={onBlur}
                        value={value}
                        onChange={(e) => {
                          const updateValue = e.target.value.trim();
                          onChange(Number.isNaN(+updateValue) ? value : updateValue);
                        }}
                        className={item.classNameInput}
                        placeholder={item.placeholder}
                        type={item.type}
                        disabled={item?.disabled}
                        autoComplete="off"
                      />
                    ) : (
                      <input
                        id={item.id}
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        className={item.classNameInput}
                        placeholder={item.placeholder}
                        type={item.type || 'text'}
                        min={0}
                        disabled={item?.disabled}
                        autoComplete="off"
                      />
                    )
                  }
                  name={item.name}
                  defaultValue={item.defaultValue}
                  autoComplete="off"
                />
                {errors?.[item.name]?.message && (
                  <span className="text-xs text-red-400 ">* {errors?.[item.name]?.message || 'Invalid'} </span>
                )}
              </div>
            </div>
            {/* PASSWORD STRENGTH BAR */}
            {item.id === 'password' && (
              <div className="mt-2 mb-4">
                <p className="mb-1">
                  Độ bảo mật
                  <span className={classNames('font-bold ml-2', STRENGTH_LEVEL_COLOR[scorePasswordStrength])}>
                    {STRENGTH_LEVEL[scorePasswordStrength]}
                  </span>
                </p>
                <div className="relative w-full h-1 mb-2 rounded-lg bg-black-2">
                  <div
                    className={classNames(
                      'absolute h-1 mb-2 rounded-lg transition-all',
                      STRENGTH_LEVEL_COLOR[scorePasswordStrength],
                    )}
                  />
                </div>
              </div>
            )}
          </>
        ))}

        <div className="mb-6">
          <InputSelect
            id="term-agree"
            onChange={(e) => {
              setAgree(e.target.checked);
            }}
            label={
              <div className="leading-tight text-left">
                Tôi đồng ý với{' '}
                <Link to="/quy-dinh" className="mx-1 text-primary hover:underline whitespace-nowrap">
                  Điều khoản
                </Link>{' '}
                và{' '}
                <Link to="/quy-dinh?part=2" className="mx-1 whitespace-nowrap text-primary hover:underline">
                  Chính sách bảo mật
                </Link>{' '}
                của NANOREAL
              </div>
            }
          />
        </div>
        <ButtonRound
          className="w-full py-3 font-bold border-0 bg-primary text-black-2"
          disabled={!isAgree || Object.keys(errors).length > 0 || isSubmitting}
          isLoading={isSubmitting}
        >
          Đăng ký
        </ButtonRound>
      </div>
    </form>
  );
};

Register.propTypes = {};

export default Register;
