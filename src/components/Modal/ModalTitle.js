import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';

const ModalTitle = ({ children, onClose }) => {
  return (
    <Dialog.Title
      as="h3"
      className="text-2xl mt-2 text-left leading-6 font-medium text-white text-center border-b-2 p-4 font-bold border-black mb-3"
    >
      {children}
    </Dialog.Title>
  );
};

ModalTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default ModalTitle;
