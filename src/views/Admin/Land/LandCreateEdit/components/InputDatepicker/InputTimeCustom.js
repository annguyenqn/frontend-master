import { useRef } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { FiClock } from 'react-icons/fi';

const InputTimeCustom = ({ date, value, onChange }) => {
  const inputRef = useRef();
  const timeNow = dayjs().format('HH:mm');
  const isValidFuture = dayjs().isBefore(date);
  return (
    <div className="flex items-center py-3 bg-white border rounded-lg ">
      <FiClock size="1.3rem" className="mx-2 text-gray-400" />
      <input
        className=""
        ref={inputRef}
        defaultValue={isValidFuture ? value : timeNow}
        onChange={(e) => {
          const newValue = e.target.value;
          const regTime = /^[0-9]{2}:[0-9]{2}/.test(newValue);
          const regTime2 = /^[0-9]{4}/.test(newValue);
          const regTime3 = /^[a-zA-Z]*$/.test(newValue);
          if (regTime) {
            onChange(newValue.substring(0, 5));
            inputRef.current.value = newValue.substring(0, 5);
          } else if (regTime2) {
            const newHour = newValue.substring(0, 2);
            const newMInute = newValue.substring(2, 4);
            onChange(`${newHour}:${newMInute}`);
            inputRef.current.value = `${newHour}:${newMInute}`;
          } else if (regTime3) {
            onChange(timeNow);
            inputRef.current.value = timeNow;
          }
        }}
      />
    </div>
  );
};

InputTimeCustom.propTypes = {
  date: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default InputTimeCustom;
