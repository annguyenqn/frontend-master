import Container from 'components/Layout/Container/Container';
import Navbar from 'components/Layout/Navbar/Navbar';
import withUserLogin from 'hoc/withUserLogin';
import { useHistory } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';

const RegistorLogin = () => {
  const history = useHistory();
  const { pathname } = history.location;

  const handleChangePage = (page) => {
    history.push(page);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(/images/register-login/background.jpg)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className="items-center min-h-screen pb-20 leading bg-black-2 pt-25"
      >
        <Container>
          <div className="relative mt-20 text-center z-1 2xl:mt-36 md:text-left">
            <div className="animate-fade-in">
              <div className="max-w-3xl mx-auto mb-10 divide-y bg-black-3 divide-black-2 rounded-xl">
                <div className="flex justify-center space-x-8 text-2xl font-bold">
                  <h5
                    className={`py-6 border-b-4 ${
                      pathname === '/login' ? 'border-primary' : 'border-transparent cursor-pointer'
                    }`}
                    onClick={() => {
                      handleChangePage('/login');
                    }}
                  >
                    Đăng nhập
                  </h5>
                  <h5
                    className={`cursor-pointer py-6 border-b-4 ${
                      pathname === '/register' ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => {
                      handleChangePage('/register');
                    }}
                  >
                    Đăng ký
                  </h5>
                </div>
                {pathname === '/register' && <Register />}
                {pathname === '/login' && <Login />}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

RegistorLogin.propTypes = {};

export default withUserLogin(RegistorLogin);
