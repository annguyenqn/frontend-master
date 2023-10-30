import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { MdFullscreen } from 'react-icons/md';

const Document = ({ data }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    src: '',
  });

  return (
    <div className="mt-10 divide-y divide-black rounded-lg bg-black-3">
      <div className="px-12 py-6 text-2xl font-bold"> Tài liệu dự án </div>
      <div className="px-12 py-6">
        {data?.map((item, index) => (
          <div className="relative group">
            <div
              className="absolute flex items-center text-sm opacity-0 cursor-pointer hover:underline top-14 text-black-3 group-hover:opacity-100 right-10"
              onClick={() => {
                setModal(() => ({ isOpen: true, src: item?.url }));
              }}
            >
              <MdFullscreen size="1.2rem" /> Fullscreen
            </div>
            <iframe
              key={`document-${index}`}
              className="flex items-center justify-center w-full text-2xl font-bold bg-black rounded-lg h-100"
              src={item?.url}
              allowFullScreen
            />
          </div>
        ))}
      </div>
      <Modal
        open={modal?.isOpen}
        onClose={() => setModal(() => ({ isOpen: false, src: '' }))}
        size="screen"
        className="p-10"
      >
        <iframe className="w-full h-screen rounded-lg" src={modal?.src} />
      </Modal>
    </div>
  );
};

Document.propTypes = {
  data: PropTypes.array,
};

Document.defaultProps = {
  data: [],
};

export default Document;
