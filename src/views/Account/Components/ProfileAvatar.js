import ButtonRound from '../../../components/Button/ButtonRound';
import { FiPlus } from 'react-icons/fi';
import { useRef, useState } from 'react';
import SpinnerLoading from '../../../components/SpinnerLoading';
import usersApi from '../../../api/usersApi';
import { setUserLogin } from '../../../store/userLogin';
import { useDispatch } from 'react-redux';
import { useGetUserLogin } from '../../../store/userLogin/hook';
import { showToastSuccess } from '../../../components/CustomToast/CustomToast';

// 1 mb = 1000000 b
const maxFileSize = 1000000;

const ProfileAvatar = () => {
  const dispatch = useDispatch();
  const { user } = useGetUserLogin();

  const [isLoading, setIsLoading] = useState(false);
  const inputFile = useRef(null);
  const [file, setFile] = useState(user.avatar?.url || undefined);

  const handleUpload = async (e) => {
    const fileSelect = e?.target?.files[0];
    // handle review file
    if (!fileSelect) return;
    try {
      setIsLoading(true);
      Object.assign(fileSelect, {
        preview: URL.createObjectURL(fileSelect),
      });

      // check file size
      if (fileSelect.size > maxFileSize) {
        return alert('File is too big!');
      }

      setFile(fileSelect);

      const formData = new FormData();

      formData.append('avatar', fileSelect);

      await usersApi.update(formData);

      await dispatch(setUserLogin(await usersApi.me()));

      showToastSuccess('Cập nhật thành công!');

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative account-avatar">
      {file ? (
        <div
          className="avatar-img border-8 border-black-3 cursor-pointer"
          onClick={() => {
            if (file) {
              inputFile.current.click();
            }
          }}
        >
          <img className="w-full object-cover bg-white" alt="avatar" src={file?.preview ? file.preview : file} />
        </div>
      ) : (
        <div className="avatar-img bg-black-3">
          {/*<img src="/images/logo/logo.svg" alt="avatar" className="w-full p-12 sm:p-16 lg:p-24" />*/}
        </div>
      )}
      {isLoading && (
        <div className="avatar-loader bg-black bg-opacity-60 w-full w-full flex justify-center items-center h-full">
          <SpinnerLoading className="h-8 text-white mt-4" />
        </div>
      )}
      <input
        className="hidden"
        type="file"
        accept="image/gif, image/jpeg, image/png, image/jpg"
        onChange={handleUpload}
        ref={inputFile}
      />
      {!file && (
        <div className="absolute md:bottom-12 -bottom-6 w-full ">
          <ButtonRound
            onClick={() => inputFile.current.click()}
            className="transform hover:text-primary right-1/2 sm:px-7 px-3 whitespace-nowrap border-2 border-black hover:border-primary mx-auto"
          >
            <span className="hidden md:block">Thêm ảnh</span> <FiPlus className="md:ml-2" />
          </ButtonRound>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
