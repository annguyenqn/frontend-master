import ButtonRound from '../../../components/Button/ButtonRound';
import { FiPlus } from 'react-icons/fi';
import Container from '../../../components/Layout/Container/Container';
import { useRef, useState } from 'react';
import SpinnerLoading from '../../../components/SpinnerLoading';
import { useGetUserLogin } from '../../../store/userLogin/hook';
import usersApi from '../../../api/usersApi';
import { setUserLogin } from '../../../store/userLogin';
import { useDispatch } from 'react-redux';
import { showToastSuccess } from '../../../components/CustomToast/CustomToast';

// 1 mb = 1000000 b
const maxFileSize = 1000000;

const ProfileCoverPhoto = () => {
  const dispatch = useDispatch();
  const { user } = useGetUserLogin();

  const [isLoading, setIsLoading] = useState(false);
  const inputFile = useRef(null);
  const [file, setFile] = useState(user.cover?.url || undefined);

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

      formData.append('cover', fileSelect);

      await usersApi.update(formData);

      await dispatch(setUserLogin(await usersApi.me()));

      showToastSuccess('Cập nhật thành công!');

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative z-1">
        {file ? (
          <img
            alt="cover"
            className="w-full min-h-3xs object-cover max-h-3xs"
            src={file?.preview ? file.preview : file}
          />
        ) : (
          <div className="bg-primary min-h-3xs bg-cover bg-center" id="cover" />
        )}
        {isLoading && (
          <div className="absolute top-0 left-0 bg-black bg-opacity-60 w-full min-h-3xs max-h-3xs flex justify-center">
            <SpinnerLoading className="h-8 text-white mt-4" />
          </div>
        )}
      </div>

      <Container>
        <div className="relative z-2">
          <label>
            <input
              className="hidden"
              type="file"
              accept="image/gif, image/jpeg, image/png, image/jpg"
              onChange={handleUpload}
              ref={inputFile}
            />
            <ButtonRound
              className="absolute right-0 border-0 px-7 bg-black-2 bottom-10"
              onClick={() => inputFile.current.click()}
            >
              {file ? (
                <>
                  Đổi ảnh <FiPlus className="ml-2" />
                </>
              ) : (
                <>
                  Thêm ảnh <FiPlus className="ml-2" />
                </>
              )}
            </ButtonRound>
          </label>
        </div>
      </Container>
    </>
  );
};

export default ProfileCoverPhoto;
