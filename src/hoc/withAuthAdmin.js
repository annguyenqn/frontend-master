import usersApi from 'api/usersApi';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogin } from 'store/userLogin';
import { USER_LOGIN } from 'utils/storage';
import { useHistory } from 'react-router-dom';
import { useGetUserLogin } from 'store/userLogin/hook';
import NotMatch from 'views/NotMatch';
import PageLoadingAdmin from 'components/Layout/PageLoading/PageLoadingAdmin';
import { ROLE_USER } from 'constants/config';

const withAuthAdmin = (WrappedComponent) => (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useGetUserLogin();

  useEffect(() => {
    const checkUserLogin = async () => {
      const userToken = USER_LOGIN.get();
      if (userToken) {
        try {
          const res = await usersApi.me();
          await dispatch(setUserLogin(res));
          setIsLoading(false);
        } catch (e) {
          dispatch(setUserLogin({}));
          history.push('/');
          setIsLoading(false);
          console.error(e);
        }
      } else {
        dispatch(setUserLogin({}));
        history.push('/');
        setIsLoading(false);
      }
    };
    checkUserLogin();
    window.addEventListener('storage', checkUserLogin);
    return () => {
      window.removeEventListener('storage', checkUserLogin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <PageLoadingAdmin />;

  return userLogin?.user?.role === ROLE_USER.ADMIN ? <WrappedComponent {...props} /> : <NotMatch />;
};

export default withAuthAdmin;
