import ButtonRound from 'components/Button/ButtonRound';
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const PageNoPermission = () => {
  const history = useHistory();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-end h-screen mb-20 max-h-screen-2/4">
        <p className="mt-4 font-black text-7xl"> 401 </p>
        <p className="text-2xl "> Không có quyền truy cập </p>
        <ButtonRound
          className="px-10 mt-8 text-xl border cursor-pointer hover:border-primary hover:text-primary"
          onClick={() => {
            history.goBack();
          }}
        >
          Quay lại
        </ButtonRound>
      </div>
    </>
  );
};

export default PageNoPermission;
