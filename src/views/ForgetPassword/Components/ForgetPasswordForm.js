import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import ButtonRound from 'components/Button/ButtonRound';
import { FiCheckCircle, FiChevronLeft, FiEye, FiEyeOff, FiLock, FiMail, FiXCircle } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';
import { validateEmail, validatePasswordNumber } from 'utils';
import usersApi from 'api/usersApi';
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import { useHistory } from 'react-router-dom';

const ForgetPasswordForm = () => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  // -----------------
  // HANDLE TOKEN QUERY
  const params = new URLSearchParams(history?.location?.search);
  const tokenQuery = params?.get('token');
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token && tokenQuery) {
      setToken(tokenQuery);
    }
    if (tokenQuery) {
      history.push({ pathname: history?.location?.pathname });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenQuery]);
  // ------------------
  // HANDLE STEP 1: SEND EMAIL, 2: VERIFY, 3:MESSAGE
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (token) {
      setStep(token ? 2 : 1);
    }
  }, [token]);
  // ------------------
  // HANDLE FORM
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch('password');

  const INPUT_EMAIL = {
    icon: <FiMail />,
    id: 'email',
    name: 'email',
    placeholder: 'Địa chỉ email khôi phục mật khẩu',
    type: 'email',
    className: 'py-3 pl-16 bg-black-1 border border-gray-1 rounded-xl w-full',
    rules: {
      required: 'Nhập thông tin',
      validate: {
        checkValie: (v) => validateEmail(v) || 'Thông tin này có thể không phải là địa chỉ email',
      },
    },
  };

  const CHANGE_PASSWORD_INPUTS = [
    {
      icon: <FiLock />,
      id: 'password',
      name: 'password',
      placeholder: 'Mật khẩu mới',
      type: showPassword ? 'text' : 'password',
      className: 'py-3 pl-16 bg-black-1 border border-gray-1 rounded-xl w-full',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValue: (v) => validatePasswordNumber(v) || 'Mật khẩu phải có ít nhất 8 ký tự',
        },
      },
    },
    {
      icon: <FiLock />,
      id: 're-password',
      name: 're-password',
      placeholder: 'Nhập lại mật khẩu mới',
      type: showPassword ? 'text' : 'password',
      className: 'py-3 pl-16 bg-black-1 border border-gray-1 rounded-xl w-full',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkPassword: (v) => v === password || 'Xác nhận mật khẩu chưa trùng với mật khẩu',
        },
      },
    },
  ];

  const onHandleSubmit = async (data) => {
    try {
      if (step == 1 && data?.email) {
        await usersApi.forgetPassword({ email: data?.email });
        await setMessage({
          status: 'success',
          content:
            'Chúng tôi đã gửi thông tin xác nhận đến email. Vui lòng kiểm tra và xác nhận thông tin nếu quý khách đã nhập đúng địa chỉ email đăng ký!',
        });
      }
      if (step == 2 && data?.password) {
        await usersApi.changePassword({ newPassword: data?.password }, { headers: { Authorization: token } });
        await setMessage({
          status: 'success',
          content: 'Thay đổi mật khẩu thành công.',
        });
      }
      await setStep(3);
    } catch (error) {
      console.error(error);
      if (step == 2 && (error?.response?.status == 403 || error?.response?.status == 401)) {
        setMessage({
          status: 'failed',
          content: (
            <>
              <span>Yêu cầu đổi mật khẩu của bạn đã hết hạn hoặc đường dẫn không hợp lệ. Vui lòng nhấn vào </span>
              <span
                className="px-1 text-red-400 underline cursor-pointer"
                onClick={() => {
                  setStep(1);
                }}
              >
                đây
              </span>
              <span>gửi lại yêu cầu mới</span>
            </>
          ),
        });
        setStep(3);
      } else {
        showToastError('', 'Kết nối thất bại. Vui lòng thử lại sau!');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl">
      <h5 className="flex justify-center py-6 text-2xl font-bold">
        {step == 1 && 'Quên mật khẩu'}
        {step == 2 && 'Xác nhận mật khẩu mới'}
        {step == 3 && 'Thông báo'}
      </h5>
      <ButtonRound
        className="absolute left-0 text-2xl -top-16 sm:top-0 hover:text-primary"
        onClick={() => {
          history.push('/login');
        }}
      >
        <FiChevronLeft className="mr-2 text-4xl" /> Đăng nhập
      </ButtonRound>
      <div className="px-4 pt-6 sm:px-12 pb-9">
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          {step == 1 && (
            <>
              <div className="relative mb-6">
                <Controller
                  control={control}
                  rules={INPUT_EMAIL?.rules}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      id={INPUT_EMAIL?.id}
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      placeholder={INPUT_EMAIL?.placeholder}
                      type={INPUT_EMAIL?.type}
                      disabled={''}
                      type={INPUT_EMAIL?.type}
                      placeholder={INPUT_EMAIL?.placeholder}
                      className={INPUT_EMAIL?.className}
                    />
                  )}
                  name={INPUT_EMAIL?.name}
                  autoComplete="off"
                  defaultValue={INPUT_EMAIL?.defaultValue}
                />
                {errors?.[INPUT_EMAIL?.name]?.message && (
                  <span className="text-xs text-red-400 ">* {errors?.[INPUT_EMAIL?.name]?.message || 'Invalid'} </span>
                )}

                <div className="absolute top-0 py-3 text-2xl left-6">{INPUT_EMAIL?.icon}</div>
              </div>
              <ButtonRound
                className="w-full font-bold border-0 bg-primary text-black-2 "
                type="submit"
                disabled={errors?.[INPUT_EMAIL?.name]?.message}
                isLoading={isSubmitting}
              >
                Tiếp tục
              </ButtonRound>
            </>
          )}
          {step == 2 && (
            <>
              {CHANGE_PASSWORD_INPUTS.map((item, index) => (
                <div key={`register-input-${index}`} className="relative mb-4">
                  <Controller
                    control={control}
                    rules={item.rules}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        id={item.id}
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        placeholder={item.placeholder}
                        type={item.type}
                        disabled={''}
                        type={item.type}
                        placeholder={item.placeholder}
                        className={item.className}
                      />
                    )}
                    name={item.name}
                    autoComplete="off"
                    defaultValue={item.defaultValue}
                  />
                  {errors?.[item.name]?.message && (
                    <span className="text-xs text-red-400 ">* {errors?.[item.name]?.message || 'Invalid'} </span>
                  )}

                  <div className="absolute top-0 py-3 text-2xl left-6">{item?.icon}</div>
                  <div
                    className="absolute top-0 py-3 text-2xl cursor-pointer right-6"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              ))}
              <ButtonRound
                className="w-full font-bold border-0 bg-primary text-black-2"
                type="submit"
                disabled={errors?.[CHANGE_PASSWORD_INPUTS?.[0]?.name]?.message}
                isLoading={isSubmitting}
              >
                Xác nhận
              </ButtonRound>
            </>
          )}
          {step == 3 && (
            <div className="text-center animate-fade-in">
              {message?.status === 'success' && (
                <div className="flex justify-center pt-2 pb-6">
                  <FiCheckCircle className="text-7xl text-primary" />
                </div>
              )}
              {message?.status === 'failed' && (
                <div className="flex justify-center pt-2 pb-6">
                  <FiXCircle className="text-red-400 text-7xl" />
                </div>
              )}
              {message?.content}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

ForgetPasswordForm.propTypes = {};

export default ForgetPasswordForm;
