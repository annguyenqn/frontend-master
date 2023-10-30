import Modal from './Modal';
import ModalTitle from './ModalTitle';
import ButtonRound from '../Button/ButtonRound';
import { useState } from 'react';
import { fetchBanksDataAsync } from '../../store/banks';
import { showToastSuccess } from '../CustomToast/CustomToast';
import { useDispatch } from 'react-redux';
import { handleToastError } from '../../utils';
import bankAccountApi from '../../api/bankApi';

const ModalRemoveBank = ({ isOpen, toggleModal, bankId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveBank = async () => {
    try {
      setIsLoading(true);
      await bankAccountApi.delete(bankId);
      await dispatch(fetchBanksDataAsync());
      showToastSuccess('Hủy liên kết thành công!');
      setIsLoading(false);
      toggleModal();
    } catch (e) {
      handleToastError(e);
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <ModalTitle onClose={toggleModal}>Hủy liên kết</ModalTitle>
      <div className="text-center text-lg">Bạn có chắc chắn muốn hủy liên kết?</div>
      <div className="flex justify-center my-4">
        <ButtonRound
          disabled={isLoading}
          onClick={toggleModal}
          className="mr-2 bg-gray-1 text-black font-bold border-0"
        >
          Đóng
        </ButtonRound>
        <ButtonRound
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handleRemoveBank}
          className="mr-2 bg-primary text-black font-bold border-0"
        >
          Xác nhận
        </ButtonRound>
      </div>
    </Modal>
  );
};

export default ModalRemoveBank;
