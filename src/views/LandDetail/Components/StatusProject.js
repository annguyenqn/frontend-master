import PropTypes from 'prop-types';
import ButtonRound from 'components/Button/ButtonRound';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ASSET_STATUS, BADGE_PROJECT, FORMAT_TIME_KEY, STATUS_PROJECT } from 'constants/config';
import { useGetUserLogin } from 'store/userLogin/hook';
import CheckLoginModal from './Modal/CheckLogin';
import useRefresh from 'hooks/useRefresh';
import { formatDurationOpening } from 'utils/formatTime';
import dayjs from 'dayjs';
import classNames from 'classnames';
import assetsApi from 'api/assetsApi';
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import whitelistApi from 'api/whitelistApi';

const StatusProject = ({ status, time, whitelistEnabled, isWhitelisted, projectId }) => {
  const history = useHistory();
  const { id } = useParams();
  const userLogin = useGetUserLogin();
  const [isShow, setShow] = useState({
    checkLogin: false,
  });
  const [isRegistedWhitelist, setRegistedWhitelist] = useState(isWhitelisted);

  // -------------
  // HANDLE STATUS WHITELIST_OPENING
  const handleRegisterWhiteList = async () => {
    try {
      await whitelistApi.create({ asset: projectId });
      showToastSuccess('', 'Đăng ký thành công');
      setRegistedWhitelist(true);
    } catch (e) {
      setRegistedWhitelist(false);
      console.error(e);
      showToastError('', 'Đăng ký thất bại, xin thử lại sau');
    }
  };

  const handleClickWhitelist = () => {
    if (userLogin?.user?._id) {
      handleRegisterWhiteList();
    } else {
      setShow({ ...isShow, checkLogin: true });
    }
  };

  const checkRegistedWhitelist = async () => {
    try {
      const res = await assetsApi.get({ id });
      setRegistedWhitelist(res?.isWhitelisted);
    } catch (e) {
      console.error(e);
      setRegistedWhitelist(false);
    }
  };
  // -------------
  // HANDLE STATUS OPENING
  const handleClickPayment = (isLoginSuccess) => {
    if (!(userLogin?.user?.email || isLoginSuccess)) {
      setShow({ ...isShow, checkLogin: true });
    } else if (whitelistEnabled && !isWhitelisted) {
      showToastError('', 'Bạn không thể đầu tư vì không đăng ký Whitelist');
    } else {
      history.push(`/call-investment/${id}`);
    }
  };
  //------------
  // HANDLE STATUS SUCCESS
  const handleClickAccount = () => {
    history.push(`/account`);
  };
  // -----------
  // HANDLE LOGIN SUCCESS
  const handleLoginSuccess = (isSuccess) => {
    if (isSuccess) {
      setShow({ ...isShow, checkLogin: false });
    }
    if (status === ASSET_STATUS?.WHITELIST_OPENING) {
      checkRegistedWhitelist();
    }
  };
  // ------------
  // HANDLE COUNTDOWN
  const [duration, setDuration] = useState({});
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    if (BADGE_PROJECT[status]?.isCountdown) {
      const durationObj = formatDurationOpening(dayjs().valueOf(), time);
      if (durationObj) {
        setDuration(durationObj);
      } else {
        history.go(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh]);

  const renderCountdown = (duration) => {
    return Object.keys(duration)?.length === 0
      ? ''
      : Object.keys(duration)?.map((key) => (
          <div className="relative flex-1 pl-4 pr-3" key={`duration-${key}`}>
            {Object.keys(duration)[0] !== key && <p className="absolute left-0 text-lg top-1/3">:</p>}
            <p>{duration[key] < 10 ? `0${duration[key]}` : duration[key]}</p>
            <p className="text-sm leading-0">{FORMAT_TIME_KEY[key]}</p>
          </div>
        ));
  };
  // -------------
  return (
    <>
      {status === ASSET_STATUS.OPENING && (
        <>
          <div className="flex-col items-center justify-center flex-none hidden text-4xl font-bold text-center uppercase rounded-lg xl:flex w-80 bg-yellow-1 text-black-3">
            Đang <br /> mở bán
            <ButtonRound
              className="px-8 mt-2 text-lg border-0 text-yellow-1 bg-black-3"
              onClick={() => {
                handleClickPayment();
              }}
            >
              Đầu tư ngay
            </ButtonRound>
            <div className="flex w-full px-4 mt-2">
              {!time ? (
                ''
              ) : BADGE_PROJECT[status]?.isCountdown ? (
                renderCountdown(duration)
              ) : (
                <span>{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
              )}
            </div>
          </div>
          {/* mobile view */}
          <div className="mb-6">
            <ButtonRound
              className="px-8 mx-auto mt-2 text-lg border border-yellow-1 text-yellow-1 bg-black-3 xl:hidden"
              onClick={() => {
                handleClickPayment();
              }}
            >
              Đầu tư ngay
            </ButtonRound>
          </div>
          {/* ------------- */}
        </>
      )}

      {status === ASSET_STATUS.SUCCESS && (
        <>
          <div className="flex-col items-center justify-center flex-none hidden text-4xl font-bold text-center uppercase rounded-lg xl:flex w-80 bg-primary text-black-3">
            Gọi vốn
            <br /> thành công
            <ButtonRound className="px-8 mt-2 text-lg border-0 text-primary bg-black-3" onClick={handleClickAccount}>
              Quản lý tài sản
            </ButtonRound>
          </div>
          {/* mobile view */}
          <div className="mb-6">
            <ButtonRound
              className="px-8 mx-auto mt-2 text-lg border border-primary text-primary bg-black-3 xl:hidden"
              onClick={handleClickAccount}
            >
              Quản lý tài sản
            </ButtonRound>
          </div>
          {/* ------------- */}
        </>
      )}
      {(status === ASSET_STATUS.EXPIRED || status === ASSET_STATUS.FAIL) && (
        <>
          <div className="flex-col items-center justify-center flex-none hidden text-4xl font-bold text-center uppercase bg-gray-300 rounded-lg xl:flex w-80 text-black-3">
            Gọi vốn
            <br /> Không thành công
          </div>
          {/* mobile view */}
          <span className="px-8 py-4 mx-auto mt-2 mb-8 text-lg font-bold bg-gray-300 rounded-lg text-black-3 bg-black-3 xl:hidden">
            Gọi vốn không thành công
          </span>
          {/* ------------- */}
        </>
      )}
      {status === ASSET_STATUS.PREPARE_FOR_SALE && (
        <>
          <div className="flex-col items-center justify-center flex-none hidden text-4xl font-bold text-center uppercase rounded-lg xl:flex w-80 bg-white-1 text-black-3">
            Dự án <br /> sắp mở bán
            <div className="flex w-full px-4 mt-2">
              {!time ? (
                ''
              ) : BADGE_PROJECT[status]?.isCountdown ? (
                renderCountdown(duration)
              ) : (
                <span>{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
              )}
            </div>
          </div>
          {/* mobile view */}
          <span className="px-4 py-2 mx-auto mb-8 text-lg font-bold text-center rounded-lg bg-white-1 text-black-3 xl:hidden">
            <div className="flex w-full px-4 xl:hidden">
              {!time ? (
                ''
              ) : BADGE_PROJECT[status]?.isCountdown ? (
                renderCountdown(duration)
              ) : (
                <span className="w-full">{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
              )}
            </div>
          </span>
          {/* ------------- */}
        </>
      )}
      {status === ASSET_STATUS?.WHITELIST_OPENING && (
        <>
          <div className="flex-col items-center justify-center flex-none hidden text-4xl font-bold text-center uppercase rounded-lg xl:flex w-80 bg-white-1 text-black-3">
            Dự án <br /> sắp mở bán
            {whitelistEnabled && isRegistedWhitelist ? (
              <ButtonRound className="px-8 mt-2 text-lg text-white bg-black-3" disabled>
                Đã đăng ký Whitelist
              </ButtonRound>
            ) : whitelistEnabled ? (
              <ButtonRound className="px-8 mt-2 text-lg text-white bg-black-3" onClick={handleClickWhitelist}>
                Đăng ký Whitelist
              </ButtonRound>
            ) : (
              ''
            )}
            <div className="flex w-full px-4 mt-2">
              {!time ? (
                ''
              ) : BADGE_PROJECT[status]?.isCountdown ? (
                renderCountdown(duration)
              ) : (
                <span>{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
              )}
            </div>
          </div>
          {/* mobile view */}
          <div className="mb-6">
            {whitelistEnabled && isRegistedWhitelist ? (
              <ButtonRound className="px-8 mx-auto mt-2 text-lg text-white bg-black-3 xl:hidden" disabled>
                Đã đăng ký Whitelist
              </ButtonRound>
            ) : whitelistEnabled ? (
              <ButtonRound
                className="px-8 mx-auto mt-2 text-lg text-white bg-black-3 xl:hidden"
                onClick={handleClickWhitelist}
              >
                Đăng ký Whitelist
              </ButtonRound>
            ) : (
              ''
            )}
          </div>
          <span className="px-4 py-2 mx-auto mb-8 text-lg font-bold text-center rounded-lg bg-white-1 text-black-3 xl:hidden">
            <div className="flex w-full px-4 xl:hidden">
              {!time ? (
                ''
              ) : BADGE_PROJECT[status]?.isCountdown ? (
                renderCountdown(duration)
              ) : (
                <span className="w-full">{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
              )}
            </div>
          </span>
          {/* ------------- */}
        </>
      )}
      {status === ASSET_STATUS.WHITELIST_SOON && (
        <>
          <div className="flex-col items-center justify-center flex-none hidden text-4xl font-bold text-center uppercase rounded-lg xl:flex w-80 bg-white-1 text-black-3">
            Dự án <br /> sắp mở Whitelist
            <div className="flex w-full px-4 mt-2">
              {!time ? (
                ''
              ) : BADGE_PROJECT[status]?.isCountdown ? (
                renderCountdown(duration)
              ) : (
                <span className="w-full text-3xl text-center">{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
              )}
            </div>
          </div>
          {/* mobile view */}
          <span className="px-8 py-4 mx-auto mt-2 mb-8 text-lg font-bold text-center rounded-lg bg-white-1 text-black-3 xl:hidden">
            Dự án sắp mở Whitelist
            <div className="flex w-full px-4 mt-2 xl:hidden">
              {!time ? (
                ''
              ) : BADGE_PROJECT[status]?.isCountdown ? (
                renderCountdown(duration)
              ) : (
                <span className="w-full">{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
              )}
            </div>
          </span>
          {/* ------------- */}
        </>
      )}
      <CheckLoginModal
        isShow={isShow.checkLogin}
        setShow={(status) => {
          setShow({ ...isShow, checkLogin: status });
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

StatusProject.propTypes = {
  status: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  whitelistEnabled: PropTypes.bool,
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isWhitelisted: PropTypes.bool,
};

export default StatusProject;

StatusProject.Badge = ({ status }) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-center px-2 py-2 font-bold leading-none text-center uppercase rounded-full w-32 xl:hidden',
        BADGE_PROJECT[status]?.bg,
      )}
    >
      <div className="w-3 h-3 mr-2 rounded-full bg-black-3 " />
      <span className={'text-sm text-black-3'}>{STATUS_PROJECT[status]}</span>
    </div>
  );
};
StatusProject.Badge.propTypes = {
  status: PropTypes.string,
};
