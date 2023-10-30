import { FiMail, FiPhone, FiPlus, FiUser } from 'react-icons/fi';
import ButtonRound from '../../../components/Button/ButtonRound';
import { useForm } from 'react-hook-form';
import { handleToastError, validateEmail, validatePhone } from '../../../utils';
import { useRef, useState } from 'react';
import { useGetUserLogin } from '../../../store/userLogin/hook';
import usersApi from '../../../api/usersApi';
import { showToastSuccess } from '../../../components/CustomToast/CustomToast';
import { setUserLogin } from '../../../store/userLogin';
import { useDispatch } from 'react-redux';

const maxFileSize = 1000000;

const INPUT_LIST = [
  {
    icon: <FiUser />,
    name: 'fullName',
    placeholder: 'Họ tên',
    type: 'text',
    rules: {
      required: 'Thông tin bắt buộc',
    },
  },
  {
    icon: <FiMail />,
    name: 'email',
    placeholder: 'Địa chỉ email',
    type: 'email',
    rules: {
      required: 'Thông tin bắt buộc',
      validate: {
        checkEmail: (v) => validateEmail(v) || 'Thông tin này có thể không phải là địa chỉ email',
      },
    },
  },
  {
    icon: <FiPhone />,
    name: 'phone',
    placeholder: 'Số điện thoại',
    type: 'text',
    rules: {
      required: 'Thông tin bắt buộc',
      validate: {
        checkPhone: (v) => validatePhone(v) || 'Thông tin này có thể không phải là số di động',
      },
    },
  },
];

const ChangeInfor = () => {
  const dispatch = useDispatch();
  const { user } = useGetUserLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      phone: user?.phone,
    },
  });

  const inputFrontFile = useRef(null);
  const inputEndFile = useRef(null);
  const [frontFile, setFrontFile] = useState(user.identityCardFront?.url || undefined);
  const [endFile, setEndFile] = useState(user.identityCardBack?.url || undefined);

  const handleUpload = (e, type = 'end') => {
    const fileSelect = e?.target?.files[0];
    // handle review file
    if (!fileSelect) return;
    try {
      Object.assign(fileSelect, {
        preview: URL.createObjectURL(fileSelect),
      });

      // check file size
      if (fileSelect.size > maxFileSize) {
        return alert('File is too big!');
      }

      if (type === 'front') {
        setFrontFile(fileSelect);
      } else {
        setEndFile(fileSelect);
      }

      // return onUpload(fileSelect, name);
    } catch (e) {}
  };

  const onSubmit = async ({ fullName, email, phone }) => {
    try {
      const formData = new FormData();
      const data = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };

      if (frontFile?.preview) {
        formData.append('identityCardFront', frontFile);
      }

      if (endFile?.preview) {
        formData.append('identityCardBack', endFile);
      }

      formData.append('data', JSON.stringify(data));
      await usersApi.update(formData);

      await dispatch(setUserLogin(await usersApi.me()));

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
            <input
              {...register(item.name, item.rules)}
              type={item?.type || 'text'}
              placeholder={item?.placeholder}
              className="py-4 pl-10 bg-transparent rounded-xl h-12 w-full p-2 px-4 border-gray-200 border focus:outline-none"
            />
            <div className="absolute top-0 flex items-center justify-center left-4 h-full">{item?.icon}</div>
          </div>
          <p className="text-red-500 text-sm mt-1">{errors?.[item.name]?.message}</p>
        </div>
      ))}

      <p>CMND/CCCD:</p>

      <div>
        <p className="text-center mb-1">Mặt trước</p>
        {frontFile ? (
          <div>
            <img
              className="sm:w-80 w-full h-52 border border-white rounded-lg object-cover mx-auto cursor-pointer"
              onClick={() => {
                if (frontFile) {
                  inputFrontFile.current.click();
                }
              }}
              alt="avatar"
              src={frontFile?.preview ? frontFile.preview : frontFile}
            />
          </div>
        ) : (
          <div className="sm:w-80 w-full h-52 mx-auto border border-white rounded-lg flex justify-center items-center">
            <ButtonRound
              onClick={() => inputFrontFile.current.click()}
              className="transform hover:text-primary px-7 whitespace-nowrap border-2 border-black hover:border-primary"
            >
              Thêm ảnh <FiPlus className="ml-2" />
            </ButtonRound>
          </div>
        )}
      </div>
      <div>
        <p className="text-center mb-1 mt-2">Mặt sau</p>
        {endFile ? (
          <div>
            <img
              onClick={() => {
                if (endFile) {
                  inputEndFile.current.click();
                }
              }}
              className="sm:w-80 w-full h-52 border border-white rounded-lg object-cover mx-auto cursor-pointer"
              alt="avatar"
              src={endFile?.preview ? endFile.preview : endFile}
            />
          </div>
        ) : (
          <div className="sm:w-80 w-full h-52 mx-auto border border-white rounded-lg flex justify-center items-center">
            <ButtonRound
              onClick={() => inputEndFile.current.click()}
              className="transform hover:text-primary px-7 whitespace-nowrap border-2 border-black hover:border-primary"
            >
              Thêm ảnh <FiPlus className="ml-2" />
            </ButtonRound>
          </div>
        )}
      </div>

      <input
        className="hidden"
        type="file"
        accept="image/gif, image/jpeg, image/png, image/jpg"
        onChange={(e) => handleUpload(e, 'front')}
        ref={inputFrontFile}
      />
      <input
        className="hidden"
        type="file"
        accept="image/gif, image/jpeg, image/png, image/jpg"
        onChange={handleUpload}
        ref={inputEndFile}
      />

      <ButtonRound
        disabled={isSubmitting}
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        className="w-full font-bold border-0 bg-primary text-black-2 mt-4"
      >
        Hoàn tất
      </ButtonRound>
    </div>
  );
};

export default ChangeInfor;
