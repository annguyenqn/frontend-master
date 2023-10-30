import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import ButtonRound from '../../../components/Button/ButtonRound';
import { useState } from 'react';
import { handleToastError, validatePassword } from '../../../utils';
import usersApi from '../../../api/usersApi';
import { showToastSuccess } from '../../../components/CustomToast/CustomToast';

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const {
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });
  const [showPassword, setShowPassword] = useState(false);

  const INPUT_LIST = [
    {
      icon: <FiLock />,
      autoComplete: 'current-password',
      name: 'currentPassword',
      placeholder: 'Nhập mật khẩu hiện tại của bạn',
      type: showPassword ? 'text' : 'password',
      rules: {
        required: 'Thông tin bắt buộc',
        minLength: {
          value: 8,
          message: 'Mật khẩu phải có ít nhất 8 ký tự',
        },
      },
    },
    {
      icon: <FiLock />,
      autoComplete: 'new-password',
      name: 'newPassword',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Nhập mật khẩu mới',
      rules: {
        required: 'Thông tin bắt buộc',
        minLength: {
          value: 8,
          message: 'Mật khẩu phải có ít nhất 8 ký tự',
        },
        validate: {
          checkValid: (v) =>
            validatePassword(v) || 'Mật khẩu phải có ít nhất: 01 ký tự đặc biệt, 01 chữ hoa và 01 chữ số',
          notSameCurrent: (newPassword) => {
            const { currentPassword } = getValues();
            return (
              currentPassword !== newPassword ||
              'Mật khẩu mới không được trùng với mật khẩu cũ, vui lòng chọn mật khấu khác'
            );
          },
        },
      },
    },
    {
      icon: <FiLock />,
      autoComplete: 'new-password',
      name: 'confirmPassword',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Nhập lại mật khẩu',
      rules: {
        required: 'Thông tin bắt buộc',
        minLength: {
          value: 8,
          message: 'Mật khẩu phải có ít nhất 8 ký tự',
        },
        validate: {
          checkValid: (v) =>
            validatePassword(v) || 'Mật khẩu phải có ít nhất: 01 ký tự đặc biệt, 01 chữ hoa và 01 chữ số',
          sameNewPassword: (confirmPassword) => {
            const { newPassword } = getValues();
            return newPassword === confirmPassword || 'Mật khẩu xác nhận không khớp với mật khẩu đã nhập';
          },
        },
      },
    },
  ];

  const onSubmit = async ({ currentPassword, newPassword }) => {
    try {
      await usersApi.changePassword({ currentPassword, newPassword });
      reset(defaultValues);
      showToastSuccess('Cập nhật thành công!');
    } catch (e) {
      handleToastError(e);
    }
  };

  return (
    <div>
      {INPUT_LIST.map((item, index) => (
        <div key={`register-input-${index}`} className="mb-4">
          <div className="relative">
            <Controller
              defaultValue=""
              control={control}
              name={item.name}
              rules={item.rules}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <input
                  autoComplete={item.autoComplete}
                  type={item?.type || 'text'}
                  value={value}
                  onChange={(e) => onChange(e.target.value.trim())}
                  placeholder={item?.placeholder}
                  className="py-4 pl-10 bg-transparent rounded-xl h-12 w-full p-2 px-4 border-gray-200 border focus:outline-none"
                />
              )}
            />
            <div className="absolute top-0 flex items-center justify-center left-4 h-full">{item?.icon}</div>
            <div
              className="absolute top-0 flex items-center justify-center cursor-pointer right-6 h-full"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <p className="text-red-500 text-sm mt-1">{errors?.[item.name]?.message}</p>
        </div>
      ))}
      <ButtonRound
        disabled={isSubmitting}
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        className="w-full font-bold border-0 bg-primary text-black-2"
      >
        Cập nhật
      </ButtonRound>
    </div>
  );
};

export default ChangePassword;
