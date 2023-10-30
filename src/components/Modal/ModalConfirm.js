import PropTypes from 'prop-types';
import Modal from './Modal';
import ButtonRound from 'components/Button/ButtonRound';

const ModalConfirm = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  className,
  size,
  classNameModal,
  children,
  message,
}) => {
  return (
    <Modal open={open} onClose={onClose} size={size} className={classNameModal}>
      <h5 className="px-8 py-4 text-xl border-b md:text-2xl border-black-2">{title || 'Thông báo'}</h5>
      <div className={`animate-fade-in py-8 px-8 ${className}`}>{children || message}</div>

      <div className="flex justify-center py-4 space-x-4 border-t border-black-2">
        <ButtonRound onClick={onCancel}>Hủy bỏ</ButtonRound>
        <ButtonRound className="font-bold text-black border-0 bg-primary" onClick={onConfirm}>
          Xác nhận
        </ButtonRound>
      </div>
    </Modal>
  );
};

ModalConfirm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  classNameModal: PropTypes.string,
  children: PropTypes.any,
  message: PropTypes.string,
};

ModalConfirm.defaultProps = {
  open: false,
  onClose: () => {},
  onConfirm: () => {},
  onCancel: () => {},
  title: '',
  className: '',
  size: '',
  classNameModal: '',
  children: '',
  message: '',
};

export default ModalConfirm;
