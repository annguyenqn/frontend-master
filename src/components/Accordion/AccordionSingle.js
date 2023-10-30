import classNames from 'classnames';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';

const AccordionSingle = (props) => {
  const {
    isActive = false,
    title,
    iconAppend,
    iconPrepend,
    children,
    className,
    classNameBody,
    classNameTitle,
    classNameIconAppend,
    isToggle = true,
  } = props;
  const [state, setState] = useState(!isToggle || isActive);

  const handleToggle = () => {
    if (isToggle) {
      setState(!state);
    }
  };

  const IconAppend = iconAppend || (
    <FiChevronDown
      className={classNames(
        ' transition-transform duration-700 transform ',
        state && ' rotate-180',
        classNameIconAppend,
      )}
    />
  );

  return (
    <div className={className}>
      {/* TITLE */}
      <div
        className="flex items-center justify-between flex-1 w-full px-8 py-4 cursor-pointer select-none"
        onClick={handleToggle}
      >
        <div className="flex items-center font-bold">
          {iconPrepend}
          <span className={classNameTitle}> {title} </span>
        </div>
        {isToggle && IconAppend}
      </div>
      {/* BODY */}
      <div
        className={classNames(
          ' transition-all duration-500 ease-in-out max-h-0 overflow-hidden',
          state ? 'xl:max-h-screen max-h-screen-2' : '',
          classNameBody || 'bg-gray-100',
        )}
      >
        {children}
      </div>
    </div>
  );
};

AccordionSingle.propTypes = {
  isActive: PropTypes.bool,
  isToggle: PropTypes.bool,
  title: PropTypes.string,
  iconAppend: PropTypes.node,
  iconPrepend: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  classNameBody: PropTypes.string,
  classNameTitle: PropTypes.string,
};

export default AccordionSingle;
