import ButtonRound from 'components/Button/ButtonRound';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="flex flex-col items-center justify-end h-screen mb-20 max-h-screen-2/4">
      <p className="mt-4 font-black text-7xl"> 404 </p>
      <p className="text-2xl "> Không tìm thấy dữ liệu </p>
      <ButtonRound
        className="px-10 mt-8 text-xl border cursor-pointer hover:border-primary hover:text-primary"
        onClick={() => {
          history.goBack();
        }}
      >
        Quay lại
      </ButtonRound>
    </div>
  );
};

export default PageNotFound;
