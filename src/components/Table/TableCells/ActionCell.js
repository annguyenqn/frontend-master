import { FiEdit, FiTrash } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

const ActionCell = ({ editText, onEdit, onDelete }) => {
  return (
    <div className="flex justify-center space-x-2 text-sm">
      {onEdit && (
        <Tooltip position="top" title={editText}>
          <FiEdit
            data-tip=""
            data-for={`edit-btn-tooltip`}
            size={'1.2rem'}
            className="mx-2 transition-transform duration-300 transform outline-none cursor-pointer hover:text-primary hover:-translate-y-1"
            onClick={onEdit}
          />
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip position="top" title="Xóa">
          <FiTrash
            data-tip=""
            data-for={`delete-btn-tooltip`}
            size={'1.2rem'}
            className="mx-2 transition-transform duration-300 transform outline-none cursor-pointer hover:text-primary hover:-translate-y-1"
            onClick={onDelete}
          />
        </Tooltip>
      )}
    </div>
  );
};

ActionCell.propTypes = {
  editText: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

ActionCell.defaultProps = {
  editText: 'Chỉnh sửa',
};

export default ActionCell;
