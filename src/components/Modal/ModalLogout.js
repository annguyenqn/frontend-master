import Modal from './Modal';
import ModalTitle from './ModalTitle';
import ButtonRound from '../Button/ButtonRound';
import { USER_LOGIN } from 'utils/storage';
import { useHistory } from 'react-router-dom';

const ModalLogout = ({ isOpen, toggleModal }) => {
  const history = useHistory();
  const handleLogout = () => {
    USER_LOGIN.delete();
    toggleModal();
    history.go(0);
  };

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <ModalTitle onClose={toggleModal}>Thông báo</ModalTitle>
      <div className="text-lg text-center">Bạn có muốn thoát khỏi ứng dụng?</div>
      <div className="flex justify-center my-4">
        <ButtonRound onClick={toggleModal} className="mr-2 font-bold text-black border-0 bg-gray-1">
          Đóng
        </ButtonRound>
        <ButtonRound onClick={handleLogout} className="mr-2 font-bold text-black border-0 bg-primary">
          Thoát
        </ButtonRound>
      </div>
    </Modal>
  );
};

export default ModalLogout;
