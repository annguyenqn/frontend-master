import usersApi from 'api/usersApi';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogin } from 'store/userLogin';
import { USER_LOGIN } from 'utils/storage';
import { useHistory } from 'react-router-dom';
import PageLoading from '../components/Layout/PageLoading/PageLoading';

const withAuthUser = (WrappedComponent) => (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

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

  if (isLoading) return <PageLoading />;

  return <WrappedComponent {...props} />;
};

export default withAuthUser;
