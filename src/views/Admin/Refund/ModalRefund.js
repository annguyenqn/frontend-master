import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { REFUND_STATUS } from 'constants/config';
import Modal from 'components/Modal/Modal';
import SelectSearchable from 'components/SelectMenu/SelectSearchable';
import ButtonRound from 'components/Button/ButtonRound';
import refundApi from 'api/refundApi';
import { handleToastError } from 'utils';
import { showToastSuccess } from 'components/CustomToast/CustomToast';

const ModalRefund = ({ editItem, open, onClose, resetData }) => {
  const [state, setState] = useState(null);

  const REFUND_STATUS_OPTIONS = [
    { value: 'NEW', label: REFUND_STATUS['NEW'] },
    { value: 'FAIL', label: REFUND_STATUS['FAIL'] },
    { value: 'SUCCESS', label: REFUND_STATUS['SUCCESS'] },
  ];

  const onChangeStatus = (data) => {
    setState({
      ...state,
      status: data.value,
    });
  };

  const onChangeNote = (e) => {
    setState({ ...state, note: e.target.value });
  };

  const handleChangeRefund = async () => {
    try {
      await refundApi.update({
        id: editItem?._id,
        body: state,
      });
      await onClose();
      await resetData();
      showToastSuccess('Thay đổi thành công');
    } catch (e) {
      console.log(e);
      handleToastError();
    }
  };

  useEffect(() => {
    setState({
      status: editItem?.status,
      note: editItem?.note,
    });
  }, [editItem]);

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="px-8">
        <h5 className="py-4 text-xl border-b border-black">Tùy chỉnh thông tin hoàn tiền</h5>
        <div className="flex flex-wrap py-8">
          <div className="flex items-center w-1/3">
            <p>Trạng thái</p>
          </div>
          <div className="w-2/3 p-1">
            <SelectSearchable
              className={`w-full p-2 flex items-center`}
              options={REFUND_STATUS_OPTIONS}
              onChange={onChangeStatus}
              selected={REFUND_STATUS_OPTIONS.find((item) => item.value === state?.status)}
            />
          </div>
        </div>
        <div className="flex flex-wrap pb-8">
          <div className="w-1/3 pt-2">Ghi chú</div>
          <div className="w-2/3 p-1">
            <textarea
              className="w-full p-4 bg-transparent border rounded-xl focus:outline-none"
              rows={10}
              onChange={onChangeNote}
              value={state?.note}
            />
          </div>
        </div>
        <div className="flex justify-center py-4 space-x-4 border-t border-black">
          <ButtonRound className="font-semibold text-black border-0 bg-primary" onClick={handleChangeRefund}>
            Thay đổi
          </ButtonRound>
          <ButtonRound className="font-semibold" onClick={onClose}>
            Hủy
          </ButtonRound>
        </div>
      </div>
    </Modal>
  );
};

ModalRefund.propTypes = {
  editItem: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  resetData: PropTypes.func,
};

ModalRefund.defaultProps = {
  editItem: {},
  open: false,
  onClose: () => {},
  resetData: () => {},
};

export default ModalRefund;
