import usersApi from 'api/usersApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogin } from 'store/userLogin';
import { USER_LOGIN } from 'utils/storage';

const withUserLogin = (WrappedComponent) => (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserLogin = async () => {
      const userToken = USER_LOGIN.get();
      if (userToken) {
        try {
          const res = await usersApi.me();
          await dispatch(setUserLogin(res));
        } catch (e) {
          console.error(e);
        }
      } else {
        dispatch(setUserLogin({}));
      }
    };
    checkUserLogin();
    window.addEventListener('storage', checkUserLogin);
    return () => {
      window.removeEventListener('storage', checkUserLogin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <WrappedComponent {...props} />;
};

export default withUserLogin;
