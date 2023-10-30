import Container from 'components/Layout/Container/Container';
import Navbar from 'components/Layout/Navbar/Navbar';
import withUserLogin from 'hoc/withUserLogin';
import ForgetPasswordForm from './Components/ForgetPasswordForm';

const ForgetPassword = () => {
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
          <div className="relative mt-20 text-center z-1 2xl:mt-36 md:text-left animate-fade-in">
            <ForgetPasswordForm />
          </div>
        </Container>
      </div>
    </div>
  );
};

ForgetPassword.propTypes = {};

export default withUserLogin(ForgetPassword);
