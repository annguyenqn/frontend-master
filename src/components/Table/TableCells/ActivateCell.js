import PropTypes from 'prop-types';
import { MdUpload } from 'react-icons/md';
import { Tooltip } from 'react-tippy';
// import InputSelect from 'components/Input/InputSelect';

const ActivateCell = ({ id, onActive, isActive, ...props }) => {
  return (
    <div className="flex justify-center space-x-2 text-sm">
      {onActive && !isActive && (
        <Tooltip position="top" title="Kích hoạt mở bán trên website">
          <div
            className="p-1 border rounded-full cursor-pointer bg-white-1 hover:bg-primary text-black-1 hover:opacity-100 hover:border-primary"
            onClick={onActive}
            data-tip=""
            data-for={id}
            {...props}
          >
            <MdUpload size="1rem" className="" />
          </div>
        </Tooltip>
        // <InputSelect
        //   className=""
        //   size="sm"
        //   checked={isActive}
        //   onClick={onActive}
        //   id={`active-select-${id}`}
        //   {...props}
        // />
      )}
      {onActive && isActive && (
        <Tooltip position="top" title="Đang mở bán trên website">
          <div data-tip="" data-for={id} className="p-1 text-primary">
            <MdUpload size="1rem" />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

ActivateCell.propTypes = {
  onActive: PropTypes.func,
  isActive: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

export default ActivateCell;
